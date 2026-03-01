import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Layout,
  Image,
  Settings,
  Menu,
  Inbox,
  Users,
  Archive,
  Wrench,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navSections = [
    {
      title: 'SITE',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: FileText, label: 'Pages', path: '/admin/pages' },
        { icon: Layout, label: 'Template Library', path: '/admin/templates' },
        { icon: Image, label: 'Media Library', path: '/admin/media' },
      ],
    },
    {
      title: 'CONTENT',
      items: [
        { icon: Settings, label: 'Site Settings', path: '/admin/settings' },
        { icon: Menu, label: 'Navigation Menu', path: '/admin/navigation' },
        { icon: Inbox, label: 'Forms & Leads', path: '/admin/forms' },
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
        { icon: Archive, label: 'Backup', path: '/admin/backup' },
        { icon: Wrench, label: 'Settings', path: '/admin/system' },
      ],
    },
  ];

  return (
    <div className="w-64 bg-slate-900 min-h-screen text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold">
            SC
          </div>
          <span className="text-xl font-bold">SiteCraft</span>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 mb-2 px-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
        v1.0.0
      </div>
    </div>
  );
};

export default Sidebar;
