import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Import các trang (Pages)
import StandardsPage from './modules/qf/pages/StandardsPage';
import UsersPage from './modules/iam/pages/UsersPage';
import CyclesPage from './modules/assessment/pages/CyclesPage';
import EvidencePage from './modules/evidence/pages/EvidencePage';

// Các trang mẫu (Sẽ được xây dựng dần)
const Dashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-sm font-medium text-slate-500 uppercase">Tiến độ chung</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">45%</h3>
    </div>
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-sm font-medium text-slate-500 uppercase">Minh chứng</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">128</h3>
    </div>
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-red-600">
      <p className="text-sm font-medium text-slate-500 uppercase">Cảnh báo</p>
      <h3 className="text-2xl font-bold mt-1 text-red-600">03 tiêu chí</h3>
    </div>
  </div>
);

const PlaceholderPage = ({ title }) => (
  <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center">
    <h2 className="text-xl font-semibold text-slate-400">Module {title}</h2>
    <p className="text-slate-400 mt-2">Đang trong quá trình kết nối API...</p>
  </div>
);

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/qf" element={<StandardsPage />} />
          
          {/* Các route cho các module khác */}
          <Route path="/org" element={<PlaceholderPage title="Tổ chức & CTĐT" />} />
          <Route path="/assessment" element={<CyclesPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/iam" element={<UsersPage />} />
          <Route path="/curriculum" element={<PlaceholderPage title="OBE Mapping" />} />
          <Route path="/improvement" element={<PlaceholderPage title="Cải tiến chất lượng" />} />
          
          {/* Route mặc định cho 404 */}
          <Route path="*" element={<div className="p-8 text-center">404 - Không tìm thấy trang</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
