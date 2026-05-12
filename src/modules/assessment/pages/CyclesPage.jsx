import { useState, useEffect } from 'react';
import { assessmentService } from '../assessmentService';
import { Calendar, Plus, Clock } from 'lucide-react';

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
      case 'COMPLETED': return <span className="badge-primary">HOÀN THÀNH</span>;
      case 'IN_PROGRESS': return <span className="badge-danger">ĐANG THỰC HIỆN</span>;
      case 'PLANNED': return <span className="badge-primary">LẬP KẾ HOẠCH</span>;
      default: return <span className="badge-primary">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">Chu kỳ Đánh giá</h2>
          <p className="text-sm text-primary-600">Quản lý các đợt kiểm định chương trình đào tạo</p>
        </div>
        <button className="btn-primary inline-flex items-center">
          <Plus size={18} className="mr-2" /> Tạo chu kỳ mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 text-center text-primary-500">Đang tải danh sách chu kỳ...</div>
        ) : cycles.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-xl border border-dashed border-primary-200 text-center">
            <Calendar size={48} className="mx-auto text-primary-200 mb-4" />
            <p className="text-primary-600 font-medium">Chưa có chu kỳ đánh giá nào được tạo.</p>
            <p className="text-sm text-primary-500">Hãy nhấn nút "Tạo chu kỳ mới" để bắt đầu.</p>
          </div>
        ) : (
          cycles.map((cycle) => (
            <div key={cycle.cycle_id} className="card-qms hover:shadow-md transition-shadow p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                  <Calendar size={20} />
                </div>
                {getStatusBadge(cycle.status)}
              </div>
              
              <div>
                <h3 className="font-bold text-primary-900 line-clamp-1">{cycle.name || `Chu kỳ ${cycle.start_year}`}</h3>
                <p className="text-xs text-primary-600 mt-1 flex items-center">
                  <Clock size={12} className="mr-1" /> {cycle.start_year} - {cycle.end_year}
                </p>
              </div>

              <div className="pt-4 border-t border-primary-100 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-600">
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
