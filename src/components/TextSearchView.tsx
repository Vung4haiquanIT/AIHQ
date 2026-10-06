import React, { useState } from 'react';
import { FileSearch, Search, BookOpen, ExternalLink, CheckCircle } from 'lucide-react';
import { INITIAL_DOCUMENTS } from '../data/mockData';

export const TextSearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(INITIAL_DOCUMENTS);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const filtered = INITIAL_DOCUMENTS.filter(d => 
      d.title.toLowerCase().includes(query.toLowerCase()) || 
      d.content.toLowerCase().includes(query.toLowerCase()) ||
      d.summary.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FileSearch className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Tra cứu văn bản pháp luật biển & chỉ thị</h3>
            <p className="text-xs text-slate-500">Hệ thống tìm kiếm thông minh trích xuất từ các văn bản quy phạm pháp luật và chỉ thị sẵn sàng chiến đấu</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nhập từ khóa cần tra cứu (VD: giàn khoan, vùng đặc quyền kinh tế, qua lại không gây hại...)"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer flex items-center space-x-2"
          >
            <span>Tra cứu</span>
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-800 text-base">
            Kết quả tra cứu {searched && `(${results.length})`}
          </h4>
        </div>

        {results.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center border border-slate-200 text-slate-500">
            Không tìm thấy văn bản phù hợp với từ khóa "<span className="font-semibold text-slate-800">{query}</span>".
          </div>
        ) : (
          results.map(doc => (
            <div key={doc.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                  {doc.category.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-medium">Cập nhật: {doc.date}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{doc.title}</h3>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono leading-relaxed">
                {doc.content}
              </p>
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                <span>Ban hành bởi: <strong>{doc.author}</strong></span>
                <button 
                  onClick={() => alert(`Đã sao chép trích dẫn văn bản: ${doc.title}`)}
                  className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" /> Sao chép trích dẫn
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
