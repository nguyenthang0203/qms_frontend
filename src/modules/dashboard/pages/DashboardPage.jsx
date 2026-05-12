import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, ClipboardList, FileStack, Loader2, Timer, Wrench } from 'lucide-react';
import { orgService } from '../../org/orgService';

const DashboardCard = ({ title, value, helper, icon, tone = 'primary' }) => {
  const toneMap = {
    primary: 'bg-primary-50 border-primary-100 text-primary-700',
    secondary: 'bg-secondary-50 border-secondary-100 text-secondary-700',
    success: 'bg-primary-100 border-primary-200 text-primary-700',
  };

  return (
    <div className="card-qms p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-primary-600 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-primary-900 mt-2">{value}</h3>
          <p className="text-sm text-primary-600 mt-2">{helper}</p>
        </div>
        <div className={`p-2 rounded-lg border ${toneMap[tone]}`}>{icon}</div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [orgHealth, setOrgHealth] = useState({ loading: true, ok: null, message: '', payload: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await orgService.health();
        if (cancelled) return;
        const inner = res?.data ?? res;
        setOrgHealth({
          loading: false,
          ok: true,
          message: res?.message ?? 'API phản hồi',
          payload: inner,
        });
      } catch (e) {
        if (cancelled) return;
        setOrgHealth({
          loading: false,
          ok: false,
          message: e.response?.data?.message || e.message || 'Không kết nối được API',
          payload: null,
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-900">Dashboard đảm bảo chất lượng</h2>
        <p className="text-sm text-primary-600 mt-1">
          Theo dõi tiến độ tự đánh giá, minh chứng, CAPA và trạng thái kiểm định theo TT04.
        </p>
      </div>

      <div
        className={`rounded-lg border px-4 py-3 flex items-center gap-3 text-sm ${
          orgHealth.loading
            ? 'border-primary-200 bg-primary-50 text-primary-700'
            : orgHealth.ok
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-800'
        }`}
      >
        {orgHealth.loading ? (
          <Loader2 className="shrink-0 animate-spin" size={20} />
        ) : orgHealth.ok ? (
          <CheckCircle2 className="shrink-0 text-green-600" size={20} />
        ) : (
          <AlertTriangle className="shrink-0 text-red-600" size={20} />
        )}
        <div>
          <p className="font-semibold">Kết nối API (GET /api/v1/org/health)</p>
          <p className="text-xs mt-0.5 opacity-90">
            {orgHealth.loading
              ? 'Đang gọi backend…'
              : orgHealth.ok
                ? `${orgHealth.message}${orgHealth.payload?.module ? ` — module: ${orgHealth.payload.module}` : ''}`
                : orgHealth.message}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <DashboardCard
          title="Phiếu tự đánh giá"
          value="112 / 140"
          helper="Đã hoàn thành và khóa"
          icon={<ClipboardList size={18} />}
          tone="primary"
        />
        <DashboardCard
          title="Minh chứng hợp lệ"
          value="428"
          helper="Đã review và đủ điều kiện"
          icon={<FileStack size={18} />}
          tone="success"
        />
        <DashboardCard
          title="Cảnh báo mandatory"
          value="03"
          helper="Tiêu chí điều kiện chưa đạt"
          icon={<AlertTriangle size={18} />}
          tone="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-qms p-6">
          <h3 className="text-sm font-bold text-primary-800 uppercase tracking-wider">CAPA</h3>
          <p className="text-3xl font-bold text-primary-900 mt-3">14</p>
          <p className="text-sm text-primary-600 mt-2">Issue đang mở cần theo dõi</p>
          <div className="mt-4 flex items-center text-secondary-600 text-xs font-semibold">
            <Wrench size={14} className="mr-1" /> 4 issue quá hạn
          </div>
        </div>
        <div className="card-qms p-6">
          <h3 className="text-sm font-bold text-primary-800 uppercase tracking-wider">Đạt có điều kiện</h3>
          <p className="text-3xl font-bold text-primary-900 mt-3">24 ngày</p>
          <p className="text-sm text-primary-600 mt-2">Thời gian còn lại để hoàn tất cải tiến</p>
          <div className="mt-4 flex items-center text-primary-700 text-xs font-semibold">
            <Timer size={14} className="mr-1" /> Countdown 24 tháng đang chạy
          </div>
        </div>
        <div className="card-qms p-6">
          <h3 className="text-sm font-bold text-primary-800 uppercase tracking-wider">Kết luận CTĐT</h3>
          <p className="text-3xl font-bold text-primary-900 mt-3">Đạt</p>
          <p className="text-sm text-primary-600 mt-2">100% tiêu chuẩn ở trạng thái đạt</p>
          <div className="mt-4 flex items-center text-primary-700 text-xs font-semibold">
            <CheckCircle2 size={14} className="mr-1" /> Rule engine xác nhận hợp lệ
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
