import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Toast from './components/Toast';

import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Templates from './pages/admin/Templates';
import Pages from './pages/admin/Pages';
import PageEditor from './pages/admin/PageEditor';
import Settings from './pages/admin/Settings';
import Navigation from './pages/admin/Navigation';
import Media from './pages/admin/Media';
import ClientAccount from './pages/admin/ClientAccount';
import Forms from './pages/admin/Forms';
import ClientDashboard from './pages/client/ClientDashboard';
import SitePreview from './pages/SitePreview';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user && !allowedRoles.includes(user.role!)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            user?.role === 'superadmin' ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/client/dashboard" />
            )
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/templates"
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <Templates />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/pages"
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <Pages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/pages/edit/:pageId"
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <PageEditor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/navigation"
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <Navigation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/media"
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <Media />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/client"
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <ClientAccount />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/forms"
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <Forms />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/dashboard"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/site/preview"
        element={
          <ProtectedRoute allowedRoles={['superadmin', 'client']}>
            <SitePreview />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
          <Toast />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
