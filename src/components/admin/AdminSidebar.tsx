import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, BookOpen, Layout, Image,
  Settings, Menu, Inbox, Users, Database, Wrench, ChevronRight,
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const AdminSidebar = () => {
  const location = useLocation();
  const { newLeadsCount } = useApp();

  const sections: NavSection[] = [
    {
      title: 'SITE',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: FileText, label: 'Pages Manager', path: '/admin/pages' },
        { icon: BookOpen, label: 'Blog Manager', path: '/admin/blog' },
        { icon: Layout, label: 'Template Library', path: '/admin/templates' },
        { icon: Image, label: 'Media Library', path: '/admin/media' },
      ],
    },
    {
      title: 'CONTENT',
      items: [
        { icon: Settings, label: 'Site Settings', path: '/admin/settings' },
        { icon: Menu, label: 'Navigation Builder', path: '/admin/navigation' },
        { icon: Inbox, label: 'Forms & Leads', path: '/admin/leads', badge: newLeadsCount || undefined },
      ],
    },
    {
      title: 'USERS',
      items: [
        { icon: Users, label: 'Client Account', path: '/admin/client' },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { icon: Database, label: 'Backup & Export', path: '/admin/backup' },
        { icon: Wrench, label: 'System Settings', path: '/admin/system' },
      ],
    },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-slate-900 min-h-screen flex flex-col text-white flex-shrink-0">
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-black text-sm shadow-lg">
            N
          </div>
          <div>
            <span className="font-bold text-white text-lg leading-none">Neovidia</span>
            <span className="block text-xs text-slate-400 leading-none mt-0.5">CMS</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="mb-5">
            <h3 className="text-[10px] font-bold text-slate-500 tracking-widest mb-1.5 px-3">
              {section.title}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                      active
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {item.badge ? (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    ) : active ? (
                      <ChevronRight size={14} className="opacity-60" />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-slate-800 text-xs text-slate-500">
        Neovidia CMS v2.0
      </div>
    </div>
  );
};

export default AdminSidebar;
