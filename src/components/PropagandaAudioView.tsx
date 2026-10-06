import React, { useState } from 'react';
import { Volume2, Play, Pause, Download, RefreshCw, Sliders, CheckCircle } from 'lucide-react';

export const PropagandaAudioView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [language, setLanguage] = useState('Tiếng Trung Quốc (中文)');
  const [voice, setVoice] = useState('Giọng nam (Chuẩn)');
  const [text, setText] = useState(`中国渔船注意！\n您的船只正在侵犯越南的主权和海洋管辖权。\n根据《联合国海洋法公约》（UNCLOS）1982年及越南2012年《海洋法》规定，越南d的领海和专属кinh tế不允许任何船只非法侵入。\n请立即离开区域。若不配合，我们将依法采取管控和处理措施，依照越南法律和国际法执行。`);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('Bình thường');
  const [volume, setVolume] = useState(100);

  const presetTexts = [
    {
      title: 'Cảnh báo tàu cá nước ngoài xâm phạm',
      lang: 'Tiếng Trung Quốc (中文)',
      content: `中国渔船注意！\n您的船只正在侵犯越南的主权和海洋管辖权。\n根据《联合国海洋法公约》（UNCLOS）1982年及越南2012年《海洋法》规定...\n请立即离开区域。`
    },
    {
      title: 'Cảnh báo tàu giàn khoan trái phép',
      lang: 'Tiếng Trung Quốc (中文)',
      content: `“Tàu Trung Quốc chú ý!\nGiàn khoan hiện đang tiến vào vùng biển thuộc chủ quyền và quyền tài phân của Việt Nam...\nYêu cầu lập tức rút khỏi khu vực này.”`
    },
    {
      title: 'Lời kêu gọi tuần tra bảo vệ chủ quyền (Tiếng Việt)',
      lang: 'Tiếng Việt',
      content: `Phát hiện tàu nước ngoài kéo giàn khoan vào vùng biển Việt Nam. Lực lượng Lữ đoàn 162 kiên quyết đấu tranh bảo vệ vững chắc chủ quyền biển, đảo.`
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Chuyển âm thanh tuyên truyền</h3>
            <p className="text-xs text-slate-500">Chuyển đổi nội dung tuyên truyền, cảnh báo thành giọng đọc chuyên nghiệp đa ngôn ngữ</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Input Section */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <button
              onClick={() => setActiveTab('preset')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'preset' ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Chuyển từ nội dung đã tạo
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'custom' ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Nhập văn bản tùy chỉnh
            </button>
          </div>

          {activeTab === 'preset' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Chọn mẫu nội dung tuyên truyền chuẩn:</p>
              <div className="grid grid-cols-1 gap-2">
                {presetTexts.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => { setText(item.content); setLanguage(item.lang); }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 truncate max-w-md">{item.content}</p>
                    </div>
                    <span className="text-[10px] bg-white px-2 py-1 rounded border border-slate-200 font-semibold">{item.lang}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ngôn ngữ</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option>Tiếng Trung Quốc (中文)</option>
                <option>Tiếng Việt</option>
                <option>Tiếng Anh (English)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Giọng đọc</label>
              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option>Giọng nam (Chuẩn)</option>
                <option>Giọng nữ (Phát thanh viên)</option>
                <option>Giọng nam (Mạnh mẽ, kiên quyết)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Nội dung văn bản phát loa</label>
              <span className="text-[11px] text-slate-400">{text.length}/1000 ký tự</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => alert('Đang tổng hợp giọng nói tuyên truyền thành công!')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Tạo giọng đọc</span>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors flex items-center space-x-2 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-600" /> : <Play className="w-4 h-4 text-amber-600" />}
              <span>{isPlaying ? 'Tạm dừng' : 'Phát thử'}</span>
            </button>
          </div>
        </div>

        {/* Right Audio Player & Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-500" />
              Trình phát âm thanh tuyên truyền
            </h4>

            <div className="bg-slate-900 text-white p-4 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-yellow-400">Nội dung tuyên truyền</p>
                  <p className="text-[11px] text-slate-300">{language}</p>
                </div>
                <span className="text-xs font-mono text-slate-400">00:00 / 00:28</span>
              </div>

              {/* Waveform visualizer mock */}
              <div className="flex items-center space-x-1 h-8 justify-center">
                {[40, 65, 30, 80, 95, 45, 60, 85, 30, 70, 90, 50, 40, 75, 60, 30, 85, 90, 40].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="w-1 bg-amber-400 rounded-full animate-pulse"></div>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4 pt-2">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
              </div>
            </div>

            <button
              onClick={() => alert('Đã tải xuống file MP3 tuyên truyền thành công!')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Tải xuống MP3</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-slate-600" />
              Tùy chọn nâng cao
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tốc độ đọc</label>
              <select
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
              >
                <option>Chậm (0.8x)</option>
                <option>Bình thường</option>
                <option>Nhanh (1.2x)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Âm lượng</span>
                <span>{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
