import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  Scissors, 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Plus, 
  Music, 
  Type, 
  Sparkles, 
  Layers, 
  Filter, 
  Sliders, 
  Download,
  FolderPlus
} from 'lucide-react';
import { INITIAL_CLIPS } from '../data/mockData';
import { VideoClip } from '../types';

export const VideoEditorView: React.FC = () => {
  const [activeMediaTab, setActiveMediaTab] = useState<'all' | 'video' | 'image' | 'audio'>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [clips] = useState<VideoClip[]>(INITIAL_CLIPS);
  const [selectedSubTab, setSelectedSubTab] = useState<'media' | 'audio' | 'text' | 'effects' | 'transitions' | 'filters' | 'adjust'>('media');

  const filteredClips = clips.filter(c => {
    if (activeMediaTab === 'all') return true;
    if (activeMediaTab === 'video') return c.type === 'video';
    if (activeMediaTab === 'image') return c.type === 'image';
    if (activeMediaTab === 'audio') return c.type === 'audio';
    return true;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-900 text-slate-100 select-none">
      {/* Top Action Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Video className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Chỉnh sửa video • Dự án: Kiên quyết bảo vệ chủ quyền biển đảo</h3>
            <p className="text-[11px] text-slate-400">Tỷ lệ: 16:9 • 30fps • Độ phân giải 4K</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => alert('Đã tạo dự án video mới thành công!')}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
          >
            <FolderPlus className="w-4 h-4 text-blue-400" />
            <span>Dự án mới</span>
          </button>
          <button 
            onClick={() => alert('Đang kết xuất và xuất video (Export Video)... Vui lòng đợi trong giây lát.')}
            className="flex items-center space-x-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Xuất video</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Toolbar / Media Library (Cols 1-3) */}
        <div className="lg:col-span-5 bg-slate-950 border-r border-slate-800 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center space-x-1 px-4 py-3 border-b border-slate-800 bg-slate-900/50 overflow-x-auto">
            {[
              { id: 'media', label: 'Phương tiện', icon: Video },
              { id: 'audio', label: 'Âm thanh', icon: Music },
              { id: 'text', label: 'Văn bản', icon: Type },
              { id: 'effects', label: 'Hiệu ứng', icon: Sparkles },
              { id: 'transitions', label: 'Chuyển cảnh', icon: Layers },
              { id: 'filters', label: 'Bộ lọc', icon: Filter },
              { id: 'adjust', label: 'Điều chỉnh', icon: Sliders },
            ].map(tab => {
              const Icon = tab.icon;
              const active = selectedSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSubTab(tab.id as any)}
                  className={`flex flex-col items-center px-3 py-2 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                    active ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {selectedSubTab === 'media' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {['all', 'video', 'image', 'audio'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveMediaTab(t as any)}
                      className={`px-3 py-1 rounded text-xs font-medium capitalize ${
                        activeMediaTab === t ? 'bg-slate-800 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t === 'all' ? 'Tất cả' : t === 'video' ? 'Video' : t === 'image' ? 'Hình ảnh' : 'Âm thanh'}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div 
                    onClick={() => alert('Đã thêm file phương tiện vào thư viện!')}
                    className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 hover:text-blue-400 cursor-pointer transition-colors bg-slate-900/30 h-28"
                  >
                    <Plus className="w-6 h-6 mb-1" />
                    <span className="text-xs font-semibold">Thêm tệp</span>
                  </div>

                  {filteredClips.map(clip => (
                    <div 
                      key={clip.id}
                      onClick={() => alert(`Đã chọn tệp: ${clip.title}`)}
                      className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500 cursor-pointer transition-all"
                    >
                      <img src={clip.thumbnail} alt={clip.title} className="w-full h-20 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-1.5 flex items-center justify-between text-[10px]">
                        <span className="truncate font-medium text-slate-200">{clip.title}</span>
                        {clip.duration && <span className="text-slate-400">00:{clip.duration < 10 ? '0' + clip.duration : clip.duration}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSubTab === 'text' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Mẫu chữ tiêu đề và phụ đề quân sự:</p>
                {['KIÊN QUYẾT, KIÊN TRÌ BẢO VỆ CHỦ QUYỀN BIỂN, ĐẢO', 'HẢI QUÂN VIỆT NAM', 'SẴN SÀNG CHIẾN ĐẤU CAO'].map((txt, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-xs font-bold text-yellow-300 cursor-pointer">
                    {txt}
                  </div>
                ))}
              </div>
            )}

            {selectedSubTab !== 'media' && selectedSubTab !== 'text' && (
              <div className="text-center py-12 text-slate-500 text-xs">
                Chọn hiệu ứng, âm thanh hoặc bộ lọc để áp dụng vào timeline.
              </div>
            )}
          </div>
        </div>

        {/* Right Preview Player (Cols 4-12) */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950">
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black/60 relative">
            {/* Video Preview Frame */}
            <div className="w-full max-w-xl aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative flex items-center justify-center group">
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800" 
                alt="Preview" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <h3 className="text-base font-extrabold text-yellow-400 text-center tracking-wide drop-shadow-md">
                  KIÊN QUYẾT, KIÊN TRÌ BẢO VỆ CHỦ QUYỀN BIỂN, ĐẢO
                </h3>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
              </div>
            </div>

            {/* Player Controls Bar */}
            <div className="w-full max-w-xl flex items-center justify-between mt-4 px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              <span className="font-mono text-slate-400">00:00:00 / 00:15:20</span>
              <div className="flex items-center space-x-3 text-slate-300">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-blue-400 p-1">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-blue-400 font-bold">16:9</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="h-52 bg-slate-950 border-t border-slate-800 flex flex-col">
        {/* Timeline Tools */}
        <div className="px-6 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3 text-slate-300">
            <button className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer"><Scissors className="w-3.5 h-3.5" /><span>Chia nhỏ</span></button>
            <button className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer"><RotateCcw className="w-3.5 h-3.5" /><span>Hoàn tác</span></button>
            <button className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer"><RotateCw className="w-3.5 h-3.5" /><span>Làm lại</span></button>
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <button className="hover:text-white"><ZoomOut className="w-4 h-4" /></button>
            <span className="font-mono text-xs">100%</span>
            <button className="hover:text-white"><ZoomIn className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Tracks Area */}
        <div className="flex-1 p-4 overflow-x-auto space-y-2 relative custom-scrollbar bg-slate-950">
          <div className="absolute top-0 bottom-0 left-36 w-0.5 bg-yellow-400 z-10 pointer-events-none">
            <div className="w-3 h-3 bg-yellow-400 -ml-1 -mt-1 rounded-full shadow"></div>
          </div>

          {/* Track 1: Video */}
          <div className="flex items-center space-x-2">
            <span className="w-24 text-[11px] font-bold text-slate-400 flex items-center gap-1.5"><Video className="w-3.5 h-3.5 text-blue-400" /> Video</span>
            <div className="flex-1 bg-slate-900 h-10 rounded-lg border border-slate-800 flex items-center space-x-1 px-1 overflow-hidden">
              <div className="bg-blue-600/60 border border-blue-500 rounded h-8 px-3 flex items-center text-[10px] font-semibold text-white whitespace-nowrap">
                video1.mp4 (00:15)
              </div>
              <div className="bg-blue-700/60 border border-blue-500 rounded h-8 px-3 flex items-center text-[10px] font-semibold text-white whitespace-nowrap">
                tau_hai_quan.mp4 (00:28)
              </div>
              <div className="bg-teal-600/60 border border-teal-500 rounded h-8 px-3 flex items-center text-[10px] font-semibold text-white whitespace-nowrap">
                bien_dong.jpg
              </div>
            </div>
          </div>

          {/* Track 2: Audio */}
          <div className="flex items-center space-x-2">
            <span className="w-24 text-[11px] font-bold text-slate-400 flex items-center gap-1.5"><Music className="w-3.5 h-3.5 text-amber-400" /> Âm thanh</span>
            <div className="flex-1 bg-slate-900 h-10 rounded-lg border border-slate-800 flex items-center px-1">
              <div className="bg-amber-600/60 border border-amber-500 rounded h-8 px-4 flex items-center text-[10px] font-semibold text-white">
                🎵 Nhạc nền Lữ đoàn 162 (01:00)
              </div>
            </div>
          </div>

          {/* Track 3: Text */}
          <div className="flex items-center space-x-2">
            <span className="w-24 text-[11px] font-bold text-slate-400 flex items-center gap-1.5"><Type className="w-3.5 h-3.5 text-purple-400" /> Văn bản</span>
            <div className="flex-1 bg-slate-900 h-8 rounded-lg border border-slate-800 flex items-center px-1">
              <div className="bg-purple-600/60 border border-purple-500 rounded h-6 px-3 flex items-center text-[10px] font-semibold text-white">
                KIÊN QUYẾT, KIÊN TRÌ BẢO VỆ CHỦ QUYỀN BIỂN, ĐẢO
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
