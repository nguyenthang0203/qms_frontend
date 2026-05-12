const ImprovementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">Cải tiến chất lượng (CAPA)</h2>
          <p className="text-sm text-primary-600">Quản lý hành động khắc phục, phòng ngừa và báo cáo cải tiến.</p>
        </div>
        <button className="btn-primary">
          Tạo kế hoạch mới
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-qms p-6 rounded-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-500">Vấn đề</p>
          <p className="text-3xl font-bold text-primary-900 mt-4">6</p>
          <p className="mt-2 text-sm text-primary-600">Vấn đề đang được xử lý</p>
        </div>
        <div className="card-qms p-6 rounded-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-500">Hành động</p>
          <p className="text-3xl font-bold text-primary-900 mt-4">14</p>
          <p className="mt-2 text-sm text-primary-600">Hành động cải tiến trong tiến trình</p>
        </div>
        <div className="card-qms p-6 rounded-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-500">Hoàn thành</p>
          <p className="text-3xl font-bold text-primary-900 mt-4">8</p>
          <p className="mt-2 text-sm text-primary-600">Hoạt động CAPA đã hoàn thành</p>
        </div>
      </div>

      <div className="card-qms overflow-hidden">
        <div className="p-6 border-b border-primary-100">
          <h3 className="text-lg font-semibold text-primary-900">Danh sách hành động</h3>
          <p className="text-sm text-primary-600 mt-1">Các hoạt động CAPA cần theo dõi.</p>
        </div>
        <div className="p-6 space-y-4">
          {[
            { title: 'Cải tiến quy trình kiểm tra minh chứng', owner: 'NV A', due: '15/05/2026', status: 'Đang thực hiện' },
            { title: 'Hoàn thiện báo cáo chất lượng', owner: 'NV B', due: '22/05/2026', status: 'Chưa bắt đầu' },
            { title: 'Rà soát tài liệu quy định', owner: 'NV C', due: '30/05/2026', status: 'Hoàn thành' },
          ].map((item, index) => (
            <div key={index} className="rounded-2xl border border-primary-100 p-4 bg-primary-50">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-primary-900">{item.title}</p>
                <span className="text-xs uppercase tracking-[0.2em] text-primary-600">{item.status}</span>
              </div>
              <p className="text-sm text-primary-700 mt-2">Người phụ trách: {item.owner}</p>
              <p className="text-sm text-primary-600">Hạn hoàn thành: {item.due}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImprovementPage;
