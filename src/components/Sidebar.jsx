import React from 'react';
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
  ChevronRight 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuGroups = [
    {
      group: "Hệ thống",
      items: [
        { title: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/' },
        { title: 'Cơ cấu tổ chức', icon: <Building2 size={18} />, path: '/org' },
        { title: 'Người dùng', icon: <Users size={18} />, path: '/iam' },
      ]
    },
    {
      group: "Đảm bảo chất lượng",
      items: [
        { title: 'Khung tiêu chuẩn', icon: <Layers size={18} />, path: '/qf' },
        { title: 'Tự đánh giá', icon: <FileCheck size={18} />, path: '/assessment' },
        { title: 'Quản lý minh chứng', icon: <Database size={18} />, path: '/evidence' },
        { title: 'OBE Mapping', icon: <BookOpen size={18} />, path: '/curriculum' },
      ]
    },
    {
      group: "Cải tiến & Báo cáo",
      items: [
        { title: 'Cải tiến (CAPA)', icon: <TrendingUp size={18} />, path: '/improvement' },
        { title: 'Quy định & Biểu mẫu', icon: <ClipboardCheck size={18} />, path: '/regulatory' },
      ]
    }
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-slate-200 flex flex-col sticky top-0 overflow-y-auto">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-primary-600 tracking-tight flex items-center">
          <div className="w-8 h-8 bg-primary-600 rounded-lg mr-2 flex items-center justify-center text-white text-lg">Q</div>
          QMS TT04
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-6">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-2">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3">
              {group.group}
            </h2>
            <div className="space-y-1">
              {group.items.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 group ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium text-sm">{item.title}</span>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="p-3 rounded-lg border border-slate-200 bg-white shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Phiên bản</p>
          <p className="text-xs font-bold text-slate-700">2.2 Professional</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
