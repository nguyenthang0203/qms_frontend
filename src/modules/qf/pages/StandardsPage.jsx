import { useState, useEffect, Fragment } from 'react';
import { qfService } from '../qfService';
import { ListChecks, AlertCircle, ChevronDown, ChevronRight, Download, Plus, Star } from 'lucide-react';

const StandardsPage = () => {
  const [standards, setStandards] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
        console.error('Không thể tải dữ liệu Tiêu chuẩn.', err);
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
      <div className="card-qms p-6 space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold text-primary-700">Institutional Accreditation Framework</h2>
            <p className="text-sm text-primary-600 mt-2">
              Comprehensive quality standards and criteria defined by TT04/2025 for higher education institutions.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-primary-200 rounded-lg text-sm font-semibold text-primary-700 bg-white hover:bg-primary-50 flex items-center">
              <Download size={16} className="mr-2" /> Export PDF
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary-700 hover:bg-primary-800 flex items-center">
              <Plus size={16} className="mr-2" /> Update Framework
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-lg border border-primary-100 p-4 bg-primary-50/40">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">Total standards</p>
            <p className="text-4xl font-bold text-primary-700 mt-2">08</p>
            <p className="text-xs text-primary-700 mt-1">Fully Configured</p>
          </div>
          <div className="rounded-lg border border-primary-100 p-4 bg-primary-50/40">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">Total criteria</p>
            <p className="text-4xl font-bold text-primary-700 mt-2">52</p>
            <p className="text-xs text-primary-600 mt-1">Institutional Coverage</p>
          </div>
          <div className="rounded-lg border border-secondary-200 p-4 bg-secondary-50/40">
            <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-700">Mandatory (critical)</p>
            <p className="text-4xl font-bold text-secondary-700 mt-2">10</p>
            <p className="text-xs text-secondary-700 mt-1">Zero failure tolerance</p>
          </div>
          <div className="rounded-lg border border-primary-100 p-4 bg-primary-50/40">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">Evidence collected</p>
            <p className="text-4xl font-bold text-primary-700 mt-2">1,284</p>
            <p className="text-xs text-primary-600 mt-1">Across all departments</p>
          </div>
        </div>
      </div>

      <div className="card-qms overflow-hidden">
        <div className="px-4 py-3 border-b border-primary-100 bg-primary-50 flex items-center justify-between">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-md border border-primary-200 bg-white text-xs font-semibold text-primary-700">Show: All Standards</button>
            <button className="px-3 py-1.5 rounded-md border border-secondary-200 bg-secondary-50 text-xs font-semibold text-secondary-700">
              <AlertCircle size={12} className="inline mr-1" /> Mandatory Only
            </button>
          </div>
          <p className="text-[10px] uppercase tracking-wider text-primary-500 font-bold">Framework version: TT04/2025-V1.2</p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-primary-600">Đang tải dữ liệu tiêu chuẩn...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-800 border-b border-primary-900">
                <th className="p-4 w-10"></th>
                <th className="p-4 text-xs font-bold text-primary-100 uppercase w-24">ID</th>
                <th className="p-4 text-xs font-bold text-primary-100 uppercase">Description of Quality Criterion</th>
                <th className="p-4 text-xs font-bold text-primary-100 uppercase text-center w-40">Mandatory Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100">
              {standards.map((std) => (
                <Fragment key={std.standard_id}>
                  <tr className="bg-primary-50">
                    <td colSpan="4" className="px-4 py-2 text-xs font-bold uppercase text-primary-700 tracking-wide">
                      Standard {std.standard_code} &nbsp; {std.standard_name}
                    </td>
                  </tr>
                  <tr 
                    onClick={() => toggleExpand(std.standard_id)}
                    className={`cursor-pointer transition-colors ${expandedId === std.standard_id ? 'bg-primary-50' : 'hover:bg-primary-50'}`}
                  >
                    <td className="p-4 text-center text-primary-500">
                      {expandedId === std.standard_id ? <ChevronDown size={18} className="text-primary-600" /> : <ChevronRight size={18} />}
                    </td>
                    <td className="p-4 font-mono text-sm text-primary-600 font-bold">{std.standard_code}</td>
                    <td className="p-4 text-sm text-primary-800">
                      <p className="font-semibold">{std.standard_name}</p>
                      <p className="text-xs text-primary-600 mt-1">Click để xem danh sách tiêu chí chi tiết của tiêu chuẩn này.</p>
                    </td>
                    <td className="p-4 text-center text-sm text-primary-600">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-50 text-secondary-700 text-[10px] font-bold">
                        <Star size={11} className="mr-1" />
                        Mandatory
                      </span>
                    </td>
                  </tr>

                  {/* Hàng sổ xuống (Tiêu chí) */}
                  {expandedId === std.standard_id && (
                    <tr className="bg-primary-50/50">
                      <td colSpan="4" className="p-0 border-b border-primary-100">
                        <div className="px-12 py-4 space-y-3">
                          <h4 className="text-xs font-bold text-primary-500 uppercase tracking-wider flex items-center">
                            <ListChecks size={14} className="mr-2" /> Danh sách tiêu chí của {std.standard_code}
                          </h4>
                          
                          {loadingCriteria && !criteriaMap[std.standard_id] ? (
                            <div className="py-4 text-sm text-primary-500 italic">Đang tải danh sách tiêu chí...</div>
                          ) : (criteriaMap[std.standard_id] || []).length === 0 ? (
                            <div className="py-4 text-sm text-primary-500 italic">Tiêu chuẩn này chưa có tiêu chí nào.</div>
                          ) : (
                            <div className="grid grid-cols-1 gap-2">
                              {criteriaMap[std.standard_id].map((crit) => (
                                <div 
                                  key={crit.criterion_id} 
                                  className={`flex items-center justify-between p-3 rounded-lg border bg-white ${crit.is_mandatory ? 'border-secondary-200 bg-secondary-50/40' : 'border-primary-100'}`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <span className="font-mono text-xs font-bold text-primary-600 w-14">{crit.criterion_code}</span>
                                    <span className="text-sm text-primary-700">{crit.criterion_name}</span>
                                  </div>
                                  {crit.is_mandatory && (
                                    <span className="flex items-center text-[10px] font-bold text-secondary-600 uppercase bg-secondary-100 px-2 py-0.5 rounded">
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
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StandardsPage;
