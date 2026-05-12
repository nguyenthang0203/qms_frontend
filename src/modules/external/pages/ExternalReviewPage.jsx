import { MessageSquareWarning, RefreshCcw, ShieldCheck, UsersRound } from 'lucide-react';

const mockReviews = [
  {
    criterion: 'TC01.01 - Muc tieu dao tao',
    externalComment: 'Can bo sung minh chung ve cap nhat CLO theo chu ky.',
    response: 'Da bo sung bien ban hop hoi dong chuong trinh thang 03/2026.',
    status: 'RESPONDED',
  },
  {
    criterion: 'TC03.02 - Phuong phap danh gia',
    externalComment: 'Chua thay doi sanh ket qua hoc tap truoc/sau cai tien.',
    response: 'Dang tong hop so lieu hoc ky 2 de cap nhat vao SAR.',
    status: 'IN_PROGRESS',
  },
];

const statusBadge = {
  RESPONDED: 'bg-primary-100 text-primary-700',
  IN_PROGRESS: 'bg-secondary-100 text-secondary-700',
};

const ExternalReviewPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">External Review (ĐGN)</h2>
          <p className="text-sm text-primary-600 mt-1">
            Quản lý session đánh giá ngoài, nhận xét của đoàn ngoài và phản hồi của cơ sở đào tạo.
          </p>
        </div>
        <button className="btn-primary">
          Mở phiên ĐGN mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-qms p-5">
          <p className="text-xs font-bold uppercase text-primary-600">Phiên hiện tại</p>
          <p className="text-lg font-bold text-primary-900 mt-2">DGN-CTDT-CNTT-2026</p>
          <p className="text-sm text-primary-600 mt-1">Chu kỳ: 2025-2030</p>
        </div>
        <div className="card-qms p-5">
          <p className="text-xs font-bold uppercase text-primary-600">Đoàn đánh giá</p>
          <p className="text-lg font-bold text-primary-900 mt-2">05 chuyên gia</p>
          <p className="text-sm text-primary-600 mt-1">Quyền read-only theo session</p>
        </div>
        <div className="card-qms p-5">
          <p className="text-xs font-bold uppercase text-primary-600">Khuyến nghị mở</p>
          <p className="text-lg font-bold text-secondary-700 mt-2">08 mục</p>
          <p className="text-sm text-primary-600 mt-1">Cần phản hồi và theo dõi CAPA</p>
        </div>
      </div>

      <div className="card-qms overflow-hidden">
        <div className="px-6 py-4 border-b border-primary-100 bg-primary-50">
          <h3 className="text-sm font-bold text-primary-800 uppercase tracking-wider">
            Nhận xét và phản hồi theo tiêu chí
          </h3>
        </div>
        <div className="divide-y divide-primary-100">
          {mockReviews.map((item) => (
            <div key={item.criterion} className="p-6 space-y-3">
              <div className="flex justify-between gap-4">
                <p className="text-sm font-semibold text-primary-900">{item.criterion}</p>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusBadge[item.status]}`}>
                  {item.status === 'RESPONDED' ? 'ĐÃ PHẢN HỒI' : 'ĐANG XỬ LÝ'}
                </span>
              </div>
              <p className="text-sm text-primary-700 flex items-start gap-2">
                <MessageSquareWarning size={16} className="text-secondary-600 mt-0.5" />
                {item.externalComment}
              </p>
              <p className="text-sm text-primary-700 flex items-start gap-2">
                <RefreshCcw size={16} className="text-primary-600 mt-0.5" />
                {item.response}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-qms p-5">
          <h4 className="font-semibold text-primary-900 flex items-center">
            <ShieldCheck size={16} className="mr-2 text-primary-600" /> Quyền truy cập
          </h4>
          <p className="text-sm text-primary-600 mt-2">
            External reviewer chỉ xem SAR/minh chứng trong đúng session và đúng chương trình được phân quyền.
          </p>
        </div>
        <div className="card-qms p-5">
          <h4 className="font-semibold text-primary-900 flex items-center">
            <UsersRound size={16} className="mr-2 text-primary-600" /> Đồng bộ CAPA
          </h4>
          <p className="text-sm text-primary-600 mt-2">
            Khuyến nghị từ đoàn ngoài sẽ được tạo issue CAPA để theo dõi cải tiến liên tục.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExternalReviewPage;
