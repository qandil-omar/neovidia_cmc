import { useState } from 'react';
import { Bell, ChevronDown, ExternalLink, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const AdminTopBar = () => {
  const { user, logout } = useAuth();
  const { siteSettings, newLeadsCount } = useApp();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const siteName = siteSettings.general.siteNameEn || 'Your Site';

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
      <div>
        <h2 className="font-semibold text-slate-800">{siteName}</h2>
        <p className="text-xs text-slate-500">Admin Panel</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/preview')}
          className="flex items-center gap-2 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm"
        >
          <ExternalLink size={14} />
          Preview Site
        </button>

        <button
          className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors"
          onClick={() => navigate('/admin/leads')}
        >
          <Bell size={20} className="text-slate-600" />
          {newLeadsCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
              {newLeadsCount > 9 ? '9+' : newLeadsCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2.5 hover:bg-slate-50 rounded-xl px-3 py-2 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-800 leading-none">{user?.name}</p>
              <p className="text-xs text-slate-500 capitalize">Super Admin</p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20">
                <button
                  onClick={() => { setDropdownOpen(false); navigate('/admin/settings'); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Settings size={16} />
                  Settings
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;
