import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  FileCheck,
  Database,
  Users,
  BookOpen,
  TrendingUp,
  Building2,
  ClipboardCheck,
  Gavel,
  Scale,
  FileBarChart2,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuGroups = [
    {
      group: 'Hệ thống',
      items: [
        { title: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/' },
        { title: 'Cơ cấu tổ chức', icon: <Building2 size={18} />, path: '/org' },
        { title: 'Người dùng', icon: <Users size={18} />, path: '/iam' },
      ],
    },
    {
      group: 'Đảm bảo chất lượng',
      items: [
        { title: 'Khung tiêu chuẩn', icon: <Layers size={18} />, path: '/qf' },
        { title: 'Tự đánh giá', icon: <FileCheck size={18} />, path: '/assessment' },
        { title: 'External Review', icon: <Gavel size={18} />, path: '/external-review' },
        { title: 'Quản lý minh chứng', icon: <Database size={18} />, path: '/evidence' },
        { title: 'OBE Mapping', icon: <BookOpen size={18} />, path: '/curriculum' },
        { title: 'Rule Engine', icon: <Scale size={18} />, path: '/decision-rules' },
      ],
    },
    {
      group: 'Cải tiến & Báo cáo',
      items: [
        { title: 'Cải tiến (CAPA)', icon: <TrendingUp size={18} />, path: '/improvement' },
        { title: 'Quy định & Biểu mẫu', icon: <ClipboardCheck size={18} />, path: '/regulatory' },
        { title: 'Dashboard & Reports', icon: <FileBarChart2 size={18} />, path: '/reports' },
      ],
    },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-slate-200 flex flex-col sticky top-0 overflow-y-auto">
      
      {/* Logo */}
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#003155] rounded-xl flex items-center justify-center text-white font-black shadow-sm">
            QMS
          </div>

          <div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">
              Quality Management
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-2">
            
            {/* Group Title */}
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-3">
              {group.group}
            </h2>

            {/* Menu */}
            <div className="space-y-1">
              {group.items.map((item, index) => {
                const isActive =
                  item.path === '/assessment'
                    ? location.pathname.startsWith('/assessment')
                    : location.pathname === item.path;

                return (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-slate-100 text-[#003155] border-r-4 border-[#003155] font-bold'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-[#003155]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`transition-colors ${
                          isActive
                            ? 'text-[#003155]'
                            : 'text-slate-400 group-hover:text-[#003155]'
                        }`}
                      >
                        {item.icon}
                      </span>

                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    </div>

                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-[#003155]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 mt-auto space-y-3">

        <button className="w-full flex items-center justify-center text-xs uppercase tracking-wide font-bold py-2.5 rounded-lg bg-[#003155] text-white hover:opacity-90 transition-all">
          System Support
        </button>

        <button className="w-full flex items-center justify-center text-sm font-semibold py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-all">
          Logout
        </button>

        <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Phiên bản
          </p>

          <p className="text-sm font-bold text-[#003155] mt-1">
            2.2 Professional
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;