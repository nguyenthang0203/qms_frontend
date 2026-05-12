import Sidebar from '../components/Sidebar';
import { Bell, CircleHelp, Search, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const titleMap = {
    '/': 'Dashboard',
    '/qf': 'Frameworks',
    '/assessment': 'Self-Assessment',
    '/evidence': 'Evidence',
    '/external-review': 'External Review',
    '/improvement': 'CAPA Improvement',
    '/reports': 'Reporting',
  };
  const currentTitle = titleMap[location.pathname] || 'QMS Workspace';

  return (
    <div className="flex min-h-screen bg-primary-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-primary-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="flex items-center space-x-2 text-xs text-primary-600 font-semibold uppercase tracking-wider">
              <span>Frameworks</span>
              <span>/</span>
              <span className="text-primary-800">{currentTitle}</span>
            </div>
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500" />
              <input
                type="text"
                placeholder="Search criteria, standards or codes..."
                className="w-full rounded-md border border-primary-100 bg-primary-50 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-5 ml-4">
            <Bell size={16} className="text-primary-600" />
            <CircleHelp size={16} className="text-primary-600" />
            <Settings size={16} className="text-primary-600" />
            <div className="text-right">
              <p className="text-xs font-bold text-primary-800">Admin Staff</p>
              <p className="text-[10px] text-primary-600 uppercase">Quality Assurance</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center text-white font-bold text-xs">
              AS
            </div>
          </div>
        </header>
        <div className="p-5 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
