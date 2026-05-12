const OrgPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">Cơ cấu Tổ chức</h2>
          <p className="text-sm text-primary-600">Quản lý cấu trúc đơn vị, phòng ban và chu kỳ đánh giá.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-qms p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-500 font-bold">Đơn vị</p>
          <p className="text-3xl font-bold text-primary-900 mt-4">12</p>
          <p className="mt-2 text-sm text-primary-600">Đơn vị đang hoạt động</p>
        </div>
        <div className="card-qms p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-500 font-bold">Phòng ban</p>
          <p className="text-3xl font-bold text-primary-900 mt-4">24</p>
          <p className="mt-2 text-sm text-primary-600">Phòng ban đang quản lý</p>
        </div>
        <div className="card-qms p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-500 font-bold">Chu kỳ</p>
          <p className="text-3xl font-bold text-primary-900 mt-4">4</p>
          <p className="mt-2 text-sm text-primary-600">Chu kỳ đánh giá đang mở</p>
        </div>
      </div>

      <div className="card-qms overflow-hidden">
        <div className="p-6 border-b border-primary-100">
          <h3 className="text-lg font-semibold text-primary-900">Danh sách Đơn vị</h3>
          <p className="text-sm text-primary-600 mt-1">Các đơn vị và phòng ban trong hệ thống.</p>
        </div>
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: 'Phòng Kế hoạch', type: 'Phòng ban', status: 'Hoạt động' },
              { name: 'Ban Đảm bảo chất lượng', type: 'Ban', status: 'Hoạt động' },
              { name: 'Phòng Đào tạo', type: 'Phòng ban', status: 'Tạm dừng' },
              { name: 'Trung tâm Nghiên cứu', type: 'Khoa', status: 'Hoạt động' },
            ].map((item, index) => (
              <div key={index} className="rounded-2xl border border-primary-100 p-4 bg-primary-50">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-primary-900">{item.name}</p>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary-600">{item.type}</span>
                </div>
                <p className="mt-3 text-sm text-primary-700">Trạng thái: <span className="font-semibold text-primary-900">{item.status}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgPage;
