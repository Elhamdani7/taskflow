import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/AuthContext';
// import Login from './features/auth/Login';
// import LoginMUI from './features/auth/LoginMUI';
import LoginBS from './features/auth/LoginBS';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const { state } = useAuth();

  return (
    <Routes>
      {/* Test Login Bootstrap - décommenté */}
      <Route path="/login" element={<LoginBS />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}