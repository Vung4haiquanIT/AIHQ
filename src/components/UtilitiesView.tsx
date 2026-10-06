import React, { useState } from 'react';
import { Wrench, Compass, Clock, FileText, Check } from 'lucide-react';

export const UtilitiesView: React.FC = () => {
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([
    'Trực ban chiến đấu kíp 1: Tàu 015 Trần Hưng Đạo',
    'Kiểm tra hệ thống radar và thông tin liên lạc trước 08:00'
  ]);

  const handleAddNote = () => {
    if (!note.trim()) return;
    setSavedNotes([note, ...savedNotes]);
    setNote('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Tiện ích quân sự & Sổ tay trực ban</h3>
            <p className="text-xs text-slate-500">Công cụ tính toán hải lý, ghi chú nhanh nhiệm vụ và lịch trực sẵn sàng chiến đấu</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sổ tay ghi chú */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-violet-600" />
            Sổ tay ghi chú nhiệm vụ
          </h4>

          <div className="flex gap-2">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú hoặc nhiệm vụ mới..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={handleAddNote}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer"
            >
              Thêm
            </button>
          </div>

          <div className="space-y-2">
            {savedNotes.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 flex items-center justify-between">
                <span>{item}</span>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Công cụ tính toán hàng hải */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Compass className="w-4 h-4 text-violet-600" />
            Công cụ hàng hải cơ bản
          </h4>

          <div className="space-y-3">
            <div className="p-4 bg-violet-50/60 rounded-xl border border-violet-100 text-xs space-y-2">
              <p className="font-bold text-violet-900">Quy đổi Hải lý (Nautical Mile) sang Kilomet:</p>
              <div className="flex items-center space-x-3">
                <input type="number" defaultValue={10} className="w-20 bg-white border border-slate-300 rounded p-1.5 text-xs font-mono" />
                <span>Hải lý (nm) = <strong>18.52 km</strong></span>
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-xs space-y-2">
              <p className="font-bold text-blue-900">Trực ban chiến đấu:</p>
              <p className="text-slate-600">Đơn vị duy trì nghiêm ngặt cấp độ trực chiến 1 đối với các tàu chiến đấu mặt nước tại Quân cảng Cam Ranh.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
