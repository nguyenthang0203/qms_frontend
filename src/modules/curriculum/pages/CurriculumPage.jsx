const CurriculumPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">OBE Mapping</h2>
          <p className="text-sm text-primary-600">Theo dõi kết nối giữa CLO, PLO và tiêu chí đảm bảo chất lượng.</p>
        </div>
        <button className="btn-primary">
          Thêm bản đồ mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-qms p-6 rounded-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-500 font-bold">CLO</p>
          <p className="text-3xl font-bold text-primary-900 mt-4">28</p>
          <p className="mt-2 text-sm text-primary-600">Chỉ số kết quả học tập</p>
        </div>
        <div className="card-qms p-6 rounded-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-500 font-bold">PLO</p>
          <p className="text-3xl font-bold text-primary-900 mt-4">12</p>
          <p className="mt-2 text-sm text-primary-600">Chuẩn đầu ra chương trình</p>
        </div>
        <div className="card-qms p-6 rounded-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-500 font-bold">Bản đồ</p>
          <p className="text-3xl font-bold text-primary-900 mt-4">8</p>
          <p className="mt-2 text-sm text-primary-600">Bản đồ CLO ↔ PLO đang quản lý</p>
        </div>
      </div>

      <div className="card-qms overflow-hidden">
        <div className="p-6 border-b border-primary-100">
          <h3 className="text-lg font-semibold text-primary-900">Bản đồ mẫu</h3>
          <p className="text-sm text-primary-600 mt-1">Xem nhanh kết nối giữa các chỉ tiêu học tập và đầu ra.</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: 'CLO 1: Hiểu biết chuyên môn', plo: 'PLO 1, PLO 2', status: 'Đã hoàn thành' },
              { name: 'CLO 5: Kỹ năng giao tiếp', plo: 'PLO 3', status: 'Chưa đầy đủ' },
              { name: 'CLO 8: Nghiên cứu độc lập', plo: 'PLO 5, PLO 6', status: 'Đang cập nhật' },
            ].map((item, index) => (
              <div key={index} className="rounded-2xl border border-primary-100 p-4 bg-primary-50">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-primary-900">{item.name}</p>
                  <span className="text-xs uppercase tracking-[0.2em] text-primary-600">{item.status}</span>
                </div>
                <p className="mt-3 text-sm text-primary-700">PLO liên quan: {item.plo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;
