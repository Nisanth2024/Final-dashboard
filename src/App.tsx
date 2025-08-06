import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import CandidatesPage from "./pages/CandidatesPage";
import InterviewsPage from "./pages/InterviewsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/candidates" element={<CandidatesPage />} />
      <Route path="/interviews" element={<InterviewsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
