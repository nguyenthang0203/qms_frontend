import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Import các trang (Pages)
import StandardsPage from './modules/qf/pages/StandardsPage';
import UsersPage from './modules/iam/pages/UsersPage';
import SelfAssessmentPage from './modules/assessment/pages/SelfAssessmentPage';
import EvidencePage from './modules/evidence/pages/EvidencePage';
import OrgPage from './modules/org/pages/OrgPage';
import CurriculumPage from './modules/curriculum/pages/CurriculumPage';
import ImprovementPage from './modules/improvement/pages/ImprovementPage';
import RegulatoryPage from './modules/regulatory/pages/RegulatoryPage';
import DashboardPage from './modules/dashboard/pages/DashboardPage';
import ExternalReviewPage from './modules/external/pages/ExternalReviewPage';
import DecisionRulesPage from './modules/rules/pages/DecisionRulesPage';
import ReportsPage from './modules/reports/pages/ReportsPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/qf" element={<StandardsPage />} />
          
          {/* Các route cho các module khác */}
          <Route path="/org" element={<OrgPage />} />
          <Route path="/assessment" element={<SelfAssessmentPage />} />
          <Route path="/assessment/:step" element={<SelfAssessmentPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/iam" element={<UsersPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/improvement" element={<ImprovementPage />} />
          <Route path="/regulatory" element={<RegulatoryPage />} />
          <Route path="/external-review" element={<ExternalReviewPage />} />
          <Route path="/decision-rules" element={<DecisionRulesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          
          {/* Route mặc định cho 404 */}
          <Route path="*" element={<div className="p-8 text-center">404 - Không tìm thấy trang</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
