import { useNavigate } from 'react-router-dom';
import { FileText, Layout, Inbox, Clock, Edit, Eye, TrendingUp, UserCheck } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

const StatCard = ({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { pages, activeTemplate, leads, clientAccount, activityLog } = useApp() as any;
  const navigate = useNavigate();
  const allLeads = leads || [];
  const newLeads = allLeads.filter((l: any) => l.status === 'new');
  const publishedPages = (pages || []).filter((p: any) => p.status === 'published');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const quickActions = [
    { icon: Edit, label: 'Edit Homepage', color: 'text-indigo-600 bg-indigo-50', onClick: () => navigate('/admin/pages/edit/page-home') },
    { icon: Layout, label: 'Change Template', color: 'text-purple-600 bg-purple-50', onClick: () => navigate('/admin/templates') },
    { icon: Eye, label: 'Preview Site', color: 'text-green-600 bg-green-50', onClick: () => navigate('/preview') },
    { icon: Inbox, label: 'View Leads', color: 'text-orange-600 bg-orange-50', onClick: () => navigate('/admin/leads') },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-1">{greeting}, {user?.name}! 👋</h1>
          <p className="text-indigo-200 text-sm">Here's an overview of your website today.</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-indigo-200">Site is live and running</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={FileText} label="Active Pages" value={publishedPages.length} color="text-blue-600 bg-blue-100" />
          <StatCard icon={Layout} label="Active Template" value={activeTemplate?.name?.split(' ')[0] || 'Modern'} color="text-purple-600 bg-purple-100" />
          <StatCard icon={Inbox} label="Total Leads" value={allLeads.length} color="text-orange-600 bg-orange-100" />
          <StatCard icon={UserCheck} label="Client Status" value={clientAccount?.status === 'active' ? 'Active' : 'Inactive'} color="text-green-600 bg-green-100" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-left"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">Recent Leads</h2>
              <button onClick={() => navigate('/admin/leads')} className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
            </div>
            <div className="space-y-3">
              {newLeads.slice(0, 5).map((lead: any) => (
                <div key={lead.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                    {lead.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{lead.name}</p>
                    <p className="text-xs text-slate-500 truncate">{lead.message.slice(0, 50)}...</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full flex-shrink-0">New</span>
                </div>
              ))}
              {newLeads.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">No new leads</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp size={16} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Site Health</h3>
              <p className="text-xs text-slate-500">All systems operational — Last checked: just now</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
