import React, { useState, useEffect } from 'react';
import { Shield, CloudSun, Calendar } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
}

export const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tabTitles: Record<ActiveTab, { title: string; subtitle: string }> = {
    home: { title: 'HẢI QUÂN NHÂN DÂN VIỆT NAM', subtitle: 'TRỢ LÝ AI HẢI QUÂN' },
    chat: { title: 'TRỢ LÝ AI HẢI QUÂN', subtitle: 'Hỏi đáp, tư vấn pháp luật biển & tình huống chiến đấu' },
    knowledge: { title: 'CƠ SỞ TRÍ THỨC', subtitle: 'Kho tài liệu chuyên ngành, công ước và điều lệ' },
    search: { title: 'TRA CỨU VĂN BẢN', subtitle: 'Tìm kiếm nhanh văn bản pháp luật, chỉ thị, nghị quyết' },
    political: { title: 'HỖ TRỢ CTĐ - CTCT', subtitle: 'Đề cương, giáo án và hướng dẫn công tác đảng, chính trị' },
    propaganda: { title: 'TUYÊN TRUYỀN ĐẶC BIỆT', subtitle: 'Chuyển đổi âm thanh tuyên truyền, phát loa cảnh báo' },
    video: { title: 'CHỈNH SỬA VIDEO', subtitle: 'Biên tập, cắt ghép video chuyên nghiệp phong cách Hải quân' },
    image: { title: 'XỬ LÝ HÌNH ẢNH', subtitle: 'Xử lý, ghép logo và tối ưu hóa hình ảnh tư liệu' },
    utilities: { title: 'TIỆN ÍCH QUÂN SỰ', subtitle: 'Công cụ tính toán, sổ tay ghi chú và lịch trực ban' },
    settings: { title: 'CÀI ĐẶT HỆ THỐNG', subtitle: 'Cấu hình hệ thống và tùy chọn trợ lý AI' },
  };

  const currentInfo = tabTitles[activeTab] || tabTitles.home;

  const formatDate = (date: Date) => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${dayName}, ${day} tháng ${month} năm ${year}`;
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs z-10">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Shield className="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">{currentInfo.title}</h2>
          <p className="text-xs text-slate-500">{currentInfo.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center space-x-6 text-sm text-slate-600">
        <div className="hidden md:flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-xs text-slate-700">{formatDate(currentTime)}</span>
        </div>

        <div className="hidden lg:flex items-center space-x-2 bg-blue-50/60 px-3 py-1.5 rounded-lg border border-blue-100 text-blue-900">
          <CloudSun className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold">Cam Ranh, Khánh Hoà</span>
          <span className="text-xs text-slate-500">|</span>
          <span className="text-xs font-bold text-blue-700">Biển lặng - 28°C</span>
        </div>

        <div className="flex items-center space-x-2 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-inner">
            CB
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800">Cán bộ, Chiến sĩ</p>
            <p className="text-[10px] text-emerald-600 font-medium">● Trực sẵn sàng</p>
          </div>
        </div>
      </div>
    </header>
  );
};
