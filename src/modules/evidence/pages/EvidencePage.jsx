import React, { useState, useEffect } from 'react';
import { evidenceService } from '../evidenceService';
import { FileText, Search, Filter, Upload, ExternalLink } from 'lucide-react';

const EvidencePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await evidenceService.getEvidenceItems();
        setItems(data.items || []);
      } catch (err) {
        console.error('Lỗi tải minh chứng:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Kho Minh Chứng</h2>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center shadow-sm">
          <Upload size={18} className="mr-2" /> Tải lên minh chứng
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo mã hoặc tên minh chứng..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg flex items-center text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter size={18} className="mr-2" /> Bộ lọc
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Đang tải danh sách minh chứng...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <div className="p-4 bg-slate-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-slate-300">
              <FileText size={32} />
            </div>
            <p className="text-slate-500 font-medium">Chưa có minh chứng nào được lưu trữ.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Mã MC</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Tên Minh chứng</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Loại</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Trạng thái</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Xem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.evidence_id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-mono text-xs font-bold text-primary-600">{item.evidence_code}</td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-slate-700">{item.name}</div>
                    <div className="text-[10px] text-slate-400">Ngày cập nhật: {new Date(item.updated_at).toLocaleDateString()}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs text-slate-600">{item.evidence_type}</span>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-blue-100">
                      {item.approval_status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-primary-600">
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EvidencePage;
