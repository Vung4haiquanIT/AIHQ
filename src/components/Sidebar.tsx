import React from 'react';
import { 
  Home, 
  MessageSquare, 
  Database, 
  FileSearch, 
  BookOpen, 
  Volume2, 
  Video, 
  Image as ImageIcon, 
  Wrench, 
  Settings 
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home' as ActiveTab, label: 'Trang chủ', icon: Home },
    { id: 'chat' as ActiveTab, label: 'Trò chuyện AI', icon: MessageSquare },
    { id: 'knowledge' as ActiveTab, label: 'Cơ sở trí thức', icon: Database },
    { id: 'search' as ActiveTab, label: 'Tra cứu văn bản', icon: FileSearch },
    { id: 'political' as ActiveTab, label: 'Hỗ trợ CTĐ - CTCT', icon: BookOpen },
    { id: 'propaganda' as ActiveTab, label: 'Tuyên truyền', icon: Volume2 },
    { id: 'video' as ActiveTab, label: 'Chỉnh sửa video', icon: Video },
    { id: 'image' as ActiveTab, label: 'Xử lý hình ảnh', icon: ImageIcon },
    { id: 'utilities' as ActiveTab, label: 'Tiện ích', icon: Wrench },
    { id: 'settings' as ActiveTab, label: 'Cài đặt', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen border-r border-slate-800 shadow-xl select-none z-20">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center space-x-3 bg-gradient-to-r from-blue-950 to-slate-900">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-yellow-300 border-2 border-yellow-400 shadow-md">
          ⚓
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-wide text-yellow-400">HẢI QUÂN</h1>
          <p className="text-xs text-slate-300">Trợ Lý AI Hải Quân</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-yellow-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Navy Motto */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 text-center">
        <p className="text-[11px] font-bold text-yellow-400 tracking-wider">
          ĐOÀN KẾT - HIỆP ĐỒNG<br />CƠ ĐỘNG - QUYẾT THẮNG
        </p>
      </div>
    </aside>
  );
};
