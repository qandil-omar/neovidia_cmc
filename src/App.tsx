import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Toast from './components/ui/Toast';

import Login from './pages/Login';
import Preview from './pages/Preview';

import Dashboard from './pages/admin/Dashboard';
import Templates from './pages/admin/Templates';
import PagesManager from './pages/admin/PagesManager';
import PageEditor from './pages/admin/PageEditor';
import Settings from './pages/admin/Settings';
import NavigationBuilder from './pages/admin/NavigationBuilder';
import Media from './pages/admin/Media';
import ClientAccount from './pages/admin/ClientAccount';
import Leads from './pages/admin/Leads';
import Blog from './pages/admin/Blog';
import BlogEditor from './pages/admin/BlogEditor';

import ClientDashboard from './pages/client/ClientDashboard';
import ClientPageEditor from './pages/client/ClientPageEditor';
import ClientBlog from './pages/client/ClientBlog';
import ClientMedia from './pages/client/ClientMedia';
import ClientLeads from './pages/client/ClientLeads';
import ClientAccountSettings from './pages/client/ClientAccountSettings';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user && !allowedRoles.includes(user.role)) return <Navigate to="/login" />;
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
            user?.role === 'superadmin' ? <Navigate to="/admin" /> : <Navigate to="/client" />
          ) : (
            <Login />
          )
        }
      />

      <Route path="/admin" element={<ProtectedRoute allowedRoles={['superadmin']}><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/templates" element={<ProtectedRoute allowedRoles={['superadmin']}><Templates /></ProtectedRoute>} />
      <Route path="/admin/pages" element={<ProtectedRoute allowedRoles={['superadmin']}><PagesManager /></ProtectedRoute>} />
      <Route path="/admin/pages/edit/:pageId" element={<ProtectedRoute allowedRoles={['superadmin']}><PageEditor /></ProtectedRoute>} />
      <Route path="/admin/blog" element={<ProtectedRoute allowedRoles={['superadmin']}><Blog /></ProtectedRoute>} />
      <Route path="/admin/blog/:postId" element={<ProtectedRoute allowedRoles={['superadmin']}><BlogEditor /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['superadmin']}><Settings /></ProtectedRoute>} />
      <Route path="/admin/navigation" element={<ProtectedRoute allowedRoles={['superadmin']}><NavigationBuilder /></ProtectedRoute>} />
      <Route path="/admin/media" element={<ProtectedRoute allowedRoles={['superadmin']}><Media /></ProtectedRoute>} />
      <Route path="/admin/client" element={<ProtectedRoute allowedRoles={['superadmin']}><ClientAccount /></ProtectedRoute>} />
      <Route path="/admin/leads" element={<ProtectedRoute allowedRoles={['superadmin']}><Leads /></ProtectedRoute>} />

      <Route path="/client" element={<ProtectedRoute allowedRoles={['client']}><ClientDashboard /></ProtectedRoute>} />
      <Route path="/client/pages/:pageId" element={<ProtectedRoute allowedRoles={['client']}><ClientPageEditor /></ProtectedRoute>} />
      <Route path="/client/blog" element={<ProtectedRoute allowedRoles={['client']}><ClientBlog /></ProtectedRoute>} />
      <Route path="/client/blog/:postId" element={<ProtectedRoute allowedRoles={['client']}><BlogEditor /></ProtectedRoute>} />
      <Route path="/client/media" element={<ProtectedRoute allowedRoles={['client']}><ClientMedia /></ProtectedRoute>} />
      <Route path="/client/leads" element={<ProtectedRoute allowedRoles={['client']}><ClientLeads /></ProtectedRoute>} />
      <Route path="/client/account" element={<ProtectedRoute allowedRoles={['client']}><ClientAccountSettings /></ProtectedRoute>} />

      <Route path="/preview" element={<ProtectedRoute allowedRoles={['superadmin', 'client']}><Preview /></ProtectedRoute>} />

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
