import React, { useState, useEffect } from 'react';
import { assessmentService } from '../assessmentService';
import { Calendar, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const CyclesPage = () => {
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const data = await assessmentService.getCycles();
        setCycles(data.items || []);
      } catch (err) {
        console.error('Lỗi tải chu kỳ:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCycles();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold">HOÀN THÀNH</span>;
      case 'IN_PROGRESS': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold">ĐANG THỰC HIỆN</span>;
      case 'PLANNED': return <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[10px] font-bold">LẬP KẾ HOẠCH</span>;
      default: return <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[10px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Chu kỳ Đánh giá</h2>
          <p className="text-sm text-slate-500">Quản lý các đợt kiểm định chương trình đào tạo</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center shadow-sm">
          <Plus size={18} className="mr-2" /> Tạo chu kỳ mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 text-center text-slate-400">Đang tải danh sách chu kỳ...</div>
        ) : cycles.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center">
            <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">Chưa có chu kỳ đánh giá nào được tạo.</p>
            <p className="text-sm text-slate-400">Hãy nhấn nút "Tạo chu kỳ mới" để bắt đầu.</p>
          </div>
        ) : (
          cycles.map((cycle) => (
            <div key={cycle.cycle_id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                  <Calendar size={20} />
                </div>
                {getStatusBadge(cycle.status)}
              </div>
              
              <div>
                <h3 className="font-bold text-slate-800 line-clamp-1">{cycle.name || `Chu kỳ ${cycle.start_year}`}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <Clock size={12} className="mr-1" /> {cycle.start_year} - {cycle.end_year}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      U{i}
                    </div>
                  ))}
                </div>
                <button className="text-primary-600 text-xs font-bold hover:underline">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CyclesPage;
