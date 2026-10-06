import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  FileSearch, 
  Volume2, 
  Video, 
  ImageIcon, 
  BookOpen, 
  Database, 
  Wrench, 
  ChevronRight, 
  Bell, 
  ShieldCheck,
  Calendar,
  CloudSun,
  MapPin
} from 'lucide-react';
import { ActiveTab } from '../types';
import { INITIAL_NEWS } from '../data/mockData';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const [currentDateString, setCurrentDateString] = useState('');
  const [locationName, setLocationName] = useState('Cam Ranh, Khánh Hoà');
  const [weatherTemp, setWeatherTemp] = useState('28°C');
  const [weatherCondition, setWeatherCondition] = useState('Biển lặng • Gió cấp 3-4');

  useEffect(() => {
    // Format current date
    const now = new Date();
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    setCurrentDateString(`${dayName}, ${day} tháng ${month} năm ${year}`);

    // Get actual user geolocation if permitted
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocoding via open nominatim or fallback
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=vi`);
            const data = await res.json();
            if (data && data.address) {
              const city = data.address.city || data.address.town || data.address.state || data.address.county;
              const country = data.address.country;
              if (city) {
                setLocationName(`${city}${country ? `, ${country}` : ''}`);
              }
            }
          } catch (e) {
            console.log('Could not resolve location name:', e);
          }
        },
        (error) => {
          console.log('Geolocation permission denied or error, using default Cam Ranh:', error);
        },
        { timeout: 10000 }
      );
    }
  }, []);

  const quickActions = [
    { id: 'chat' as ActiveTab, title: 'Trò chuyện AI', desc: 'Hỏi đáp, tư vấn, hỗ trợ công tác', icon: MessageSquare, bg: 'bg-blue-500', text: 'text-blue-500', lightBg: 'bg-blue-50 hover:bg-blue-100' },
    { id: 'search' as ActiveTab, title: 'Tra cứu văn bản', desc: 'Văn bản pháp luật, chỉ thị, nghị quyết', icon: FileSearch, bg: 'bg-emerald-500', text: 'text-emerald-600', lightBg: 'bg-emerald-50 hover:bg-emerald-100' },
    { id: 'propaganda' as ActiveTab, title: 'Tuyên truyền', desc: 'Nội dung, âm thanh tuyên truyền', icon: Volume2, bg: 'bg-amber-500', text: 'text-amber-600', lightBg: 'bg-amber-50 hover:bg-amber-100' },
    { id: 'video' as ActiveTab, title: 'Chỉnh sửa video', desc: 'Cắt ghép, biên tập video', icon: Video, bg: 'bg-rose-500', text: 'text-rose-600', lightBg: 'bg-rose-50 hover:bg-rose-100' },
    { id: 'image' as ActiveTab, title: 'Xử lý hình ảnh', desc: 'Chỉnh sửa, nhận diện, thiết kế', icon: ImageIcon, bg: 'bg-purple-500', text: 'text-purple-600', lightBg: 'bg-purple-50 hover:bg-purple-100' },
    { id: 'political' as ActiveTab, title: 'Hỗ trợ CTĐ - CTCT', desc: 'Tài liệu, hướng dẫn nghiệp vụ', icon: BookOpen, bg: 'bg-indigo-500', text: 'text-indigo-600', lightBg: 'bg-indigo-50 hover:bg-indigo-100' },
    { id: 'knowledge' as ActiveTab, title: 'Cơ sở trí thức', desc: 'Dữ liệu chuyên ngành', icon: Database, bg: 'bg-teal-500', text: 'text-teal-600', lightBg: 'bg-teal-500/10 hover:bg-teal-500/20' },
    { id: 'utilities' as ActiveTab, title: 'Tiện ích', desc: 'Chuyển đổi, ghi chú, nhắc việc', icon: Wrench, bg: 'bg-violet-500', text: 'text-violet-600', lightBg: 'bg-violet-50 hover:bg-violet-100' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-200 font-medium">Hôm nay</p>
            <h3 className="text-lg font-bold mt-0.5">{currentDateString || 'Đang cập nhật ngày...'}</h3>
            <p className="text-xs text-blue-100 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" /> Sẵn sàng chiến đấu cao
            </p>
          </div>
          <div className="p-3 bg-white/10 rounded-lg backdrop-blur-xs">
            <Calendar className="w-8 h-8 text-yellow-300" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-500" /> Vị trí hiện tại & Thời tiết
            </p>
            <h3 className="text-base font-bold text-slate-800 mt-0.5">{locationName}</h3>
            <p className="text-xs text-slate-600 mt-1">{weatherCondition}</p>
          </div>
          <div className="flex items-center space-x-3 bg-blue-50 px-3 py-2 rounded-xl">
            <CloudSun className="w-8 h-8 text-amber-500" />
            <span className="text-xl font-bold text-slate-800">{weatherTemp}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-5 rounded-xl shadow-md flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">Trợ Lý AI Hải Quân</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ● Hoạt động
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-2">Trợ lý đắc lực hỗ trợ cán bộ chiến sĩ Hải quân trong chuyên môn, tra cứu văn bản và tuyên truyền.</p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <span className="w-2 h-5 bg-blue-600 rounded-full"></span>
            Chức năng nhanh
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => setActiveTab(action.id)}
                className={`${action.lightBg} p-5 rounded-xl border border-slate-200/80 transition-all text-left flex flex-col justify-between group hover:shadow-md cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${action.bg} text-white shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">{action.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{action.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tin tức - Thông báo */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Bell className="w-5 h-5 text-rose-600" />
            Tin tức - Thông báo mới
          </h3>
          <button 
            onClick={() => setActiveTab('knowledge')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Xem thêm <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {INITIAL_NEWS.map((news) => (
            <div 
              key={news.id} 
              onClick={() => setActiveTab('knowledge')}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-none"
            >
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors">{news.title}</h4>
                  <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium mt-1 inline-block">{news.category}</span>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{news.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
