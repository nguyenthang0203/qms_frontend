import { Download, FileText, FileSpreadsheet, ShieldCheck } from 'lucide-react';

const reports = [
  { name: 'Báo cáo SAR tổng hợp', format: 'PDF', owner: 'QA Officer' },
  { name: 'Phiếu tự đánh giá theo tiêu chí', format: 'PDF', owner: 'Secretary' },
  { name: 'Báo cáo giữa chu kỳ', format: 'PDF', owner: 'Chair' },
  { name: 'Danh sách minh chứng theo tiêu chí', format: 'XLSX', owner: 'Evidence Coordinator' },
];

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">Dashboard & Reporting</h2>
          <p className="text-sm text-primary-600 mt-1">
            Quản lý biểu mẫu và xuất báo cáo phục vụ tự đánh giá, đánh giá ngoài và kiểm định.
          </p>
        </div>
        <button className="btn-primary inline-flex items-center">
          <Download size={16} className="mr-2" /> Xuất báo cáo nhanh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-qms p-6">
          <p className="text-xs font-bold uppercase text-primary-600">Báo cáo đã phát hành</p>
          <p className="text-3xl font-bold text-primary-900 mt-2">37</p>
        </div>
        <div className="card-qms p-6">
          <p className="text-xs font-bold uppercase text-primary-600">Định dạng hỗ trợ</p>
          <p className="text-3xl font-bold text-primary-900 mt-2">PDF/XLSX</p>
        </div>
        <div className="card-qms p-6">
          <p className="text-xs font-bold uppercase text-primary-600">Bản có chữ ký số</p>
          <p className="text-3xl font-bold text-primary-700 mt-2">12</p>
        </div>
      </div>

      <div className="card-qms overflow-hidden">
        <div className="px-6 py-4 border-b border-primary-100 bg-primary-50">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary-800">Danh mục biểu mẫu/báo cáo</h3>
        </div>
        <div className="divide-y divide-primary-100">
          {reports.map((item) => (
            <div key={item.name} className="p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {item.format === 'PDF' ? (
                  <FileText size={18} className="text-primary-600" />
                ) : (
                  <FileSpreadsheet size={18} className="text-primary-600" />
                )}
                <div>
                  <p className="font-semibold text-primary-900">{item.name}</p>
                  <p className="text-xs text-primary-600 mt-1">Chủ trách nhiệm: {item.owner}</p>
                </div>
              </div>
              <button className="text-sm font-semibold text-primary-700 hover:underline">Tải xuống</button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-xl p-5">
        <p className="text-sm text-primary-800 font-semibold flex items-center">
          <ShieldCheck size={16} className="mr-2" />
          Chỉ role được phân quyền theo scope mới có thể xuất SAR và biểu mẫu chính thức.
        </p>
      </div>
    </div>
  );
};

export default ReportsPage;
