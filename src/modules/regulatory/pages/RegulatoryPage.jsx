const RegulatoryPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">Quy định & Biểu mẫu</h2>
          <p className="text-sm text-primary-600">Quản lý tài liệu quy định, biểu mẫu và hướng dẫn nội bộ.</p>
        </div>
        <button className="btn-primary">
          Thêm tài liệu
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: 'Biểu mẫu đánh giá nội bộ', type: 'Biểu mẫu', updated: '02/05/2026' },
          { title: 'Hướng dẫn quản lý minh chứng', type: 'Tài liệu', updated: '20/04/2026' },
          { title: 'Quy trình CAPA', type: 'Quy định', updated: '12/04/2026' },
          { title: 'Tiêu chí kiểm định TT04', type: 'Tiêu chuẩn', updated: '28/03/2026' },
        ].map((item, index) => (
          <div key={index} className="card-qms p-6 rounded-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-primary-600 uppercase tracking-[0.2em] font-bold">{item.type}</p>
                <h3 className="text-lg font-semibold text-primary-900 mt-2">{item.title}</h3>
              </div>
              <span className="text-xs text-primary-500">{item.updated}</span>
            </div>
            <p className="mt-4 text-sm text-primary-700">Tải xuống hoặc xem trực tiếp để kiểm tra chi tiết nội dung.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegulatoryPage;
