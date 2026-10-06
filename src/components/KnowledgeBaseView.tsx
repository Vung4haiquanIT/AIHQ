import React, { useState } from 'react';
import { Database, Search, FileText, Download, Eye, Plus, Shield } from 'lucide-react';
import { INITIAL_DOCUMENTS } from '../data/mockData';
import { DocumentItem } from '../types';

export const KnowledgeBaseView: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Cơ sở trí thức & Văn bản chuyên ngành</h3>
            <p className="text-xs text-slate-500">Kho lưu trữ tài liệu, công ước UNCLOS 1982, điều lệnh và hướng dẫn chiến đấu</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tài liệu..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Tất cả tài liệu' },
          { id: 'unclos', label: 'UNCLOS 1982' },
          { id: 'phap_luat_bien', label: 'Pháp luật biển' },
          { id: 'ctd_ctct', label: 'Công tác CTĐ - CTCT' },
          { id: 'dieu_lenh', label: 'Điều lệnh & Trực chiến' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100 uppercase tracking-wider">
                  {doc.category}
                </span>
                <span className="text-xs text-slate-400">{doc.date}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setActiveDoc(doc)}>
                {doc.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{doc.summary}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-medium">Tác giả: {doc.author}</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setActiveDoc(doc)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-semibold transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem</span>
                </button>
                <button 
                  onClick={() => alert(`Đang tải xuống tài liệu: ${doc.title}`)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải ({doc.downloads})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document View Modal */}
      {activeDoc && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">{activeDoc.title}</h3>
              </div>
              <button 
                onClick={() => setActiveDoc(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xl p-1"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
              {activeDoc.content}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Tác giả: <strong>{activeDoc.author}</strong> • Ngày ban hành: {activeDoc.date}</span>
              <button
                onClick={() => setActiveDoc(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
