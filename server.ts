import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));

  const PORT = Number(process.env.PORT || 3000);

  // Initialize Gemini as robust fallback
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

  // API Chat endpoint supporting LMStudio (Qwen) with fallback to Gemini
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, lmStudioUrl, modelName, systemPrompt, temperature } = req.body;
      
      const targetUrl = lmStudioUrl || 'http://localhost:1234/v1';
      const targetModel = modelName || 'qwen2.5-7b-instruct';

      // First try connecting to LMStudio
      try {
        const fullMessages = [];
        if (systemPrompt) {
          fullMessages.push({ role: 'system', content: systemPrompt });
        }
        if (Array.isArray(messages)) {
          fullMessages.push(...messages);
        }

        const response = await fetch(`${targetUrl.replace(/\/$/, '')}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: targetModel,
            messages: fullMessages,
            temperature: temperature ?? 0.7,
            stream: false,
          }),
          signal: AbortSignal.timeout(8000), // 8s timeout for local LMStudio check
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content || 'Không nhận được phản hồi từ LMStudio.';
          return res.json({
            success: true,
            provider: 'lmstudio',
            model: targetModel,
            reply,
          });
        }
      } catch (lmError) {
        console.log('LMStudio not reachable or timeout, falling back to Gemini / Standard engine:', lmError);
      }

      // Fallback to Gemini if available
      if (ai) {
        const geminiModel = 'gemini-2.5-flash';
        const formattedHistory = (messages || []).map((m: any) => `${m.role === 'user' ? 'Người dùng' : 'Trợ lý'}: ${m.content}`).join('\n');
        
        const prompt = `${systemPrompt ? `[Quy tắc/Ngữ cảnh]: ${systemPrompt}\n\n` : ''}${formattedHistory}\n\nTrợ lý Lữ đoàn 162 trả lời:`;
        
        const response = await ai.models.generateContent({
          model: geminiModel,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });

        const reply = response.text || 'Xin lỗi, tôi không thể xử lý yêu cầu lúc này.';
        return res.json({
          success: true,
          provider: 'gemini-fallback',
          model: geminiModel,
          reply,
        });
      }

      // If neither LMStudio nor Gemini is ready
      return res.status(503).json({
        success: false,
        error: 'Không thể kết nối đến LMStudio (kiểm tra lại URL tại Cài đặt) và chưa cấu hình khóa Gemini API.',
      });

    } catch (error: any) {
      console.error('Chat API Error:', error);
      res.status(500).json({ success: false, error: error.message || 'Lỗi server nội bộ' });
    }
  });

  // Text-to-Speech mock endpoint or proxy
  app.post('/api/tts', async (req, res) => {
    try {
      const { text, voice, language } = req.body;
      // Return success status for audio generation mock
      res.json({
        success: true,
        message: 'Đã tạo âm thanh tuyên truyền thành công',
        audioUrl: '#',
        duration: Math.min(60, Math.max(5, Math.floor(text.length / 10))),
        language,
        voice,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
