import React from 'react';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span>Hệ thống</span>
            <span>/</span>
            <span className="font-medium text-slate-900">Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
            <span className="text-sm font-medium text-slate-700">Administrator</span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
