import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Bot, 
  User, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  Settings, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { ChatMessage, SettingsState } from '../types';
import { PROMPT_SUGGESTIONS } from '../data/mockData';

interface AIChatViewProps {
  settings: SettingsState;
  goToSettings: () => void;
}

export const AIChatView: React.FC<AIChatViewProps> = ({ settings, goToSettings }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content: `### TRỢ LÝ AI HẢI QUÂN\nSẵn sàng hỗ trợ cán bộ, chiến sĩ!\n\nTôi là Trợ lý AI chuyên trách hỗ trợ tra cứu thông tin văn bản pháp luật biển, UNCLOS 1982 và các nội dung nghiệp vụ. Bạn có thể hỏi bất kỳ vấn đề nào về tác chiến, tuyên truyền hoặc tra cứu văn bản.`,
      timestamp: '08:00',
      provider: 'Hệ thống AI'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const textContent = textToSend || input;
    if (!textContent.trim() && !attachedFile) return;

    const userMsgContent = attachedFile 
      ? `[Đã đính kèm tài liệu: ${attachedFile}]\n${textContent}` 
      : textContent;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMsgContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachedFile(null);
    setLoading(true);

    try {
      // Prepare history for API
      const apiMessages = messages.concat(userMessage).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          lmStudioUrl: settings.lmStudioUrl,
          modelName: settings.modelName,
          temperature: settings.temperature,
          systemPrompt: settings.systemPrompt || 'Bạn là trợ lý AI chuyên nghiệp của Lữ đoàn 162, Vùng 4 Hải Quân. Hãy đưa ra câu trả lời chính xác, đúng đắn, kiên quyết bảo vệ chủ quyền biển đảo theo pháp luật Việt Nam và quốc tế.'
        })
      });

      const data = await res.json();

      if (data.success) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          provider: data.provider
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Lỗi phản hồi từ server');
      }
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Không thể kết nối đến mô hình Qwen qua LMStudio** (${settings.lmStudioUrl}).\n\nChi tiết lỗi: ${err.message}\n\nVui lòng kiểm tra lại:\n1. LMStudio đã được khởi động và bật Local Server chưa?\n2. Đã tải mô hình Qwen và nhấn **Start Server** chưa?\n3. Kiểm tra cấu hình tại mục **Cài đặt** trên thanh menu.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: 'Error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = () => {
    const fileName = `Tai_lieu_nghien_cuu_${Math.floor(Math.random() * 1000)}.pdf`;
    setAttachedFile(fileName);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50">
      {/* Top Status Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between text-xs shadow-xs">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Trợ lý AI Sẵn sàng</span>
          </span>
          <span className="text-slate-500">Hệ thống thông minh chuyên ngành Hải quân</span>
        </div>
        <button 
          onClick={goToSettings}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 px-3 py-1 rounded-lg transition-colors cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Cài đặt hệ thống</span>
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md shrink-0 ${
                isUser ? 'bg-blue-600 text-white' : 'bg-gradient-to-br from-slate-800 to-blue-900 text-yellow-300 border border-yellow-400/50'
              }`}>
                {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div className={`max-w-2xl rounded-2xl px-5 py-4 shadow-xs relative group ${
                isUser 
                  ? 'bg-blue-600 text-white rounded-tr-xs' 
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
              }`}>
                <div className="flex items-center justify-between mb-1.5 text-[11px] opacity-75">
                  <span className="font-bold">{isUser ? 'Cán bộ chiến sĩ' : 'Trợ lý Qwen 162'}</span>
                  <div className="flex items-center space-x-2">
                    {msg.provider && <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded text-[9px] font-medium">{msg.provider}</span>}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>

                {!isUser && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 transition-colors"
                      title="Sao chép câu trả lời"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-yellow-300 flex items-center justify-center font-bold shadow-md">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="bg-white border border-slate-200 px-5 py-4 rounded-2xl rounded-tl-xs shadow-xs flex items-center space-x-3 text-slate-600">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-sm font-medium">Qwen đang suy nghĩ và tra cứu văn bản...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestions Bar */}
      <div className="px-6 py-2 bg-slate-100 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto custom-scrollbar">
        <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Gợi ý nhanh:
        </span>
        {PROMPT_SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(item.prompt)}
            className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap transition-colors"
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-lg">
        {attachedFile && (
          <div className="mb-2 flex items-center justify-between bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg text-xs text-blue-900 max-w-md">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">{attachedFile}</span>
            </div>
            <button onClick={() => setAttachedFile(null)} className="text-slate-400 hover:text-rose-600 font-bold">×</button>
          </div>
        )}

        <div className="flex items-center space-x-3 max-w-5xl mx-auto">
          <button 
            onClick={handleFileUpload}
            className="p-3 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Đính kèm tài liệu / văn bản"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Nhập câu hỏi hoặc yêu cầu tra cứu văn bản, quy định bảo vệ chủ quyền..."
            rows={1}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none max-h-32"
          />

          <button
            onClick={() => handleSend()}
            disabled={loading || (!input.trim() && !attachedFile)}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-xl shadow-md transition-all flex items-center justify-center cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
