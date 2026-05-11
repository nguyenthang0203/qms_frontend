import React, { useState, useEffect } from 'react';
import { qfService } from '../qfService';
import { Layers, ListChecks, AlertCircle, ChevronDown, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';

const StandardsPage = () => {
  const [standards, setStandards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State quản lý việc mở rộng hàng và lưu trữ tiêu chí đã load
  const [expandedId, setExpandedId] = useState(null);
  const [criteriaMap, setCriteriaMap] = useState({});
  const [loadingCriteria, setLoadingCriteria] = useState(false);

  useEffect(() => {
    const fetchStandards = async () => {
      try {
        setLoading(true);
        const data = await qfService.getStandards();
        setStandards(data.items || []);
      } catch (err) {
        setError('Không thể tải dữ liệu Tiêu chuẩn.');
      } finally {
        setLoading(false);
      }
    };
    fetchStandards();
  }, []);

  // Hàm xử lý khi nhấn vào một hàng tiêu chuẩn
  const toggleExpand = async (standardId) => {
    if (expandedId === standardId) {
      setExpandedId(null);
      return;
    }
    
    setExpandedId(standardId);
    
    // Nếu chưa load tiêu chí cho tiêu chuẩn này thì gọi API
    if (!criteriaMap[standardId]) {
      try {
        setLoadingCriteria(true);
        const data = await qfService.getCriteria(standardId);
        setCriteriaMap(prev => ({ ...prev, [standardId]: data.items || [] }));
      } catch (err) {
        console.error('Lỗi khi tải tiêu chí:', err);
      } finally {
        setLoadingCriteria(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Khung Tiêu Chuẩn & Tiêu Chí (TT04)</h2>
        <div className="flex space-x-2">
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-md text-xs font-bold flex items-center">
                <AlertCircle size={14} className="mr-1"/> Tiêu chí điều kiện
            </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Đang tải dữ liệu tiêu chuẩn...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 w-10"></th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase w-24">Mã TC</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Tên Tiêu chuẩn</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center w-32">Thứ tự</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {standards.map((std) => (
                <React.Fragment key={std.standard_id}>
                  {/* Hàng chính (Tiêu chuẩn) */}
                  <tr 
                    onClick={() => toggleExpand(std.standard_id)}
                    className={`cursor-pointer transition-colors ${expandedId === std.standard_id ? 'bg-primary-50' : 'hover:bg-slate-50'}`}
                  >
                    <td className="p-4 text-center text-slate-400">
                      {expandedId === std.standard_id ? <ChevronDown size={18} className="text-primary-600" /> : <ChevronRight size={18} />}
                    </td>
                    <td className="p-4 font-mono text-sm text-primary-700 font-bold">{std.standard_code}</td>
                    <td className="p-4 text-sm text-slate-700 font-semibold">{std.standard_name}</td>
                    <td className="p-4 text-center text-sm text-slate-500">{std.display_order}</td>
                  </tr>

                  {/* Hàng sổ xuống (Tiêu chí) */}
                  {expandedId === std.standard_id && (
                    <tr className="bg-slate-50/50">
                      <td colSpan="4" className="p-0 border-b border-slate-200">
                        <div className="px-12 py-4 space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                            <ListChecks size={14} className="mr-2" /> Danh sách tiêu chí của {std.standard_code}
                          </h4>
                          
                          {loadingCriteria && !criteriaMap[std.standard_id] ? (
                            <div className="py-4 text-sm text-slate-400 italic">Đang tải danh sách tiêu chí...</div>
                          ) : (criteriaMap[std.standard_id] || []).length === 0 ? (
                            <div className="py-4 text-sm text-slate-400 italic">Tiêu chuẩn này chưa có tiêu chí nào.</div>
                          ) : (
                            <div className="grid grid-cols-1 gap-2">
                              {criteriaMap[std.standard_id].map((crit) => (
                                <div 
                                  key={crit.criterion_id} 
                                  className={`flex items-center justify-between p-3 rounded-lg border bg-white ${crit.is_mandatory ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100'}`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <span className="font-mono text-xs font-bold text-slate-500 w-12">{crit.criterion_code}</span>
                                    <span className="text-sm text-slate-600">{crit.criterion_name}</span>
                                  </div>
                                  {crit.is_mandatory && (
                                    <span className="flex items-center text-[10px] font-bold text-amber-600 uppercase bg-amber-100 px-2 py-0.5 rounded">
                                      Bắt buộc
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StandardsPage;
