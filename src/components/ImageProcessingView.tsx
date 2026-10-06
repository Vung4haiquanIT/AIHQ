import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Upload, Download, Check } from 'lucide-react';

export const ImageProcessingView: React.FC = () => {
  const [selectedEffect, setSelectedEffect] = useState('badge');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Xử lý & Chỉnh sửa hình ảnh tư liệu</h3>
            <p className="text-xs text-slate-500">Chèn phù hiệu Hải quân, tăng cường độ nét ảnh chụp trên biển và thiết kế banner tuyên truyền</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h4 className="font-bold text-slate-900 text-sm">Công cụ xử lý</h4>
          <div className="space-y-2">
            {[
              { id: 'badge', label: 'Chèn phù hiệu Hải quân' },
              { id: 'enhance', label: 'Tăng cường độ nét ảnh trên biển' },
              { id: 'watermark', label: 'Đóng dấu bản quyền quân đội' },
              { id: 'banner', label: 'Thiết kế banner tuyên truyền' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedEffect(item.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                  selectedEffect === item.id 
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => alert('Đã tải lên ảnh tư liệu mới thành công!')}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Tải ảnh lên</span>
          </button>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center shadow-xs space-y-4">
          <div className="w-full max-w-lg aspect-video rounded-xl overflow-hidden border border-slate-200 relative group">
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" 
              alt="Processed" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-slate-950/80 text-yellow-400 px-3 py-1 rounded-lg text-xs font-bold border border-yellow-400/40 flex items-center gap-1.5 shadow-md">
              ⚓ HẢI QUÂN NHÂN DÂN VIỆT NAM
            </div>
          </div>

          <button 
            onClick={() => alert('Đã lưu và tải xuống hình ảnh xử lý thành công!')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Tải xuống hình ảnh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
