import { LogOut, Globe } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const ClientTopBar = () => {
  const { logout } = useAuth();
  const { lang, setLang, clientAccount } = useApp();

  return (
    <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
      <div />
      <div className="flex items-center gap-3">
        {clientAccount.permissions.features.change_language && (
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            <Globe size={14} className="text-slate-400 ml-1" />
            {(['ar', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  lang === l ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {l === 'ar' ? 'عربي' : 'EN'}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ClientTopBar;
