import React, { useState } from 'react';
import { BookOpen, Sparkles, Check, Copy, FileText } from 'lucide-react';

export const PoliticalWorkView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('bvdq');
  const [copied, setCopied] = useState(false);

  const topics: Record<string, { title: string; content: string }> = {
    bvdq: {
      title: 'Đề cương sinh hoạt: Kiên quyết, kiên trì bảo vệ chủ quyền biển, đảo',
      content: `I. MỤC ĐÍCH, YÊU CẦU
1. Mục đích: Quán triệt sâu sắc quan điểm, đường lối của Đảng, Nhà nước về bảo vệ chủ quyền biển, đảo thiêng liêng của Tổ quốc; nâng cao bản lĩnh chính trị, tinh thần trách nhiệm cho cán bộ, chiến sĩ Hải quân.
2. Yêu cầu: 100% cán bộ, chiến sĩ nắm vững nguyên tắc đối xử, ứng phó linh hoạt, kiên quyết không để bị động, bất ngờ trong mọi tình huống.

II. NỘI DUNG TRỌNG TÂM
1. Phân tích tình hình biển Đông hiện nay và yêu cầu đặt ra cho lực lượng tàu chiến đấu mặt nước Hải quân.
2. Quán triệt phương châm: "Đúng trọng tâm, đúng pháp lý, đúng văn phong quân đội".
   - Đúng trọng tâm: Nhấn mạnh hành vi xâm phạm chủ quyền, kéo giàn khoan trái phép.
   - Đúng pháp lý: Trích dẫn UNCLOS 1982 và Luật Biển Việt Nam 2012.
   - Đúng văn phong quân đội: Ngắn gọn, mạnh mẽ, không dùng ngôn ngữ cảm xúc, thể hiện tính kiên quyết.

III. KẾT LUẬN & HÀNH ĐỘNG
- Duy trì nghiêm chế độ trực ban chiến đấu, sẵn sàng xuất phát thực hiện nhiệm vụ khi có mệnh lệnh.`
    },
    nq20: {
      title: 'Học tập Nghị quyết về Chiến lược phát triển kinh tế biển',
      content: `I. TỔNG QUAN
- Việt Nam là quốc gia biển với bờ biển dài hơn 3.260 km, không gian sinh tồn gắn liền với biển đảo.
- Xây dựng thế trận quốc phòng toàn dân trên biển vững chắc.

II. NHIỆM VỤ CỦA HẢI QUÂN
1. Nâng cao chất lượng huấn luyện làm chủ trang bị kỹ thuật hiện đại.
2. Đẩy mạnh hợp tác quốc tế, tuần tra chung và bảo vệ an ninh hàng hải khu vực.`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(topics[selectedTopic].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Hỗ trợ công tác CTĐ - CTCT</h3>
            <p className="text-xs text-slate-500">Đề cương sinh hoạt chính trị, giáo dục tư tưởng và hướng dẫn nghiệp vụ công tác Đảng</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Topics */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-800 text-sm">Chủ đề sinh hoạt & Hướng dẫn</h4>
          <button
            onClick={() => setSelectedTopic('bvdq')}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedTopic === 'bvdq'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <p className="font-bold text-sm mb-1">Bảo vệ chủ quyền biển đảo</p>
            <p className={`text-xs ${selectedTopic === 'bvdq' ? 'text-indigo-100' : 'text-slate-500'}`}>Đề cương giáo dục chính trị tư tưởng toàn lữ đoàn</p>
          </button>

          <button
            onClick={() => setSelectedTopic('nq20')}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedTopic === 'nq20'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <p className="font-bold text-sm mb-1">Nghị quyết kinh tế biển</p>
            <p className={`text-xs ${selectedTopic === 'nq20' ? 'text-indigo-100' : 'text-slate-500'}`}>Tài liệu học tập nghị quyết chuyên đề</p>
          </button>
        </div>

        {/* Main Content Viewer */}
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">{topics[selectedTopic].title}</h3>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép nội dung'}</span>
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
              {topics[selectedTopic].content}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-500">
            <span>Phê duyệt bởi: Phòng Chính trị Lữ đoàn 162</span>
            <span className="text-emerald-600 font-semibold">● Sẵn sàng sử dụng</span>
          </div>
        </div>
      </div>
    </div>
  );
};
