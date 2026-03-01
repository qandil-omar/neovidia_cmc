import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, BookOpen, Image, Inbox, Settings, ChevronRight,
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const ClientSidebar = () => {
  const location = useLocation();
  const { clientAccount, pages, newLeadsCount } = useApp();
  const { permissions } = clientAccount;

  const isActive = (path: string) => {
    if (path === '/client') return location.pathname === '/client';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/client', always: true },
    ...pages
      .filter((p) => permissions.pages[p.pageConfigId])
      .map((p) => ({
        icon: FileText,
        label: p.name.en,
        path: `/client/pages/${p.id}`,
        always: false,
      })),
    ...(permissions.features.blog ? [{ icon: BookOpen, label: 'Blog', path: '/client/blog', always: false }] : []),
    ...(permissions.features.media ? [{ icon: Image, label: 'Media', path: '/client/media', always: false }] : []),
    ...(permissions.features.leads ? [{ icon: Inbox, label: 'Leads', path: '/client/leads', badge: newLeadsCount || undefined, always: false }] : []),
    { icon: Settings, label: 'My Account', path: '/client/account', always: true },
  ];

  return (
    <div className="w-60 bg-white border-r border-slate-200 min-h-screen flex flex-col flex-shrink-0">
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center font-black text-sm shadow-md text-white">
            N
          </div>
          <div>
            <span className="font-bold text-slate-800 text-base leading-none">Neovidia</span>
            <span className="block text-xs text-slate-400 leading-none mt-0.5">Client Portal</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon size={17} className={active ? 'text-blue-600' : ''} />
                <span className="text-sm font-medium flex-1">{item.label}</span>
                {'badge' in item && item.badge ? (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {(item.badge as number) > 9 ? '9+' : item.badge}
                  </span>
                ) : active ? (
                  <ChevronRight size={14} className="opacity-40" />
                ) : null}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="px-4 py-3 border-t border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
            {clientAccount.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-700 truncate">{clientAccount.name}</p>
            <p className="text-xs text-slate-400 truncate">{clientAccount.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSidebar;
