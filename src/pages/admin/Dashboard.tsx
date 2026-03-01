import { FileText, Layout, Clock, User, Edit, Eye, UserPlus, Palette } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import StatsCard from '../../components/StatsCard';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { pages, templates, activityLog, clientAccount } = useApp();
  const navigate = useNavigate();

  const activeTemplate = templates.find((t) => t.isActive);
  const publishedPages = pages.filter((p) => p.status === 'published');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Good morning, Admin 👋
          </h1>
          <p className="text-slate-600 mt-1">
            Here's what's happening with your site today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={FileText}
            label="Active Pages"
            value={publishedPages.length}
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
          />
          <StatsCard
            icon={Layout}
            label="Template Used"
            value={activeTemplate?.name.split(' ')[0] || 'None'}
            iconColor="text-purple-600"
            iconBg="bg-purple-100"
          />
          <StatsCard
            icon={Clock}
            label="Last Updated"
            value="2 hours ago"
            iconColor="text-green-600"
            iconBg="bg-green-100"
          />
          <StatsCard
            icon={User}
            label="Client Last Login"
            value="Yesterday"
            iconColor="text-orange-600"
            iconBg="bg-orange-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/admin/pages/edit/1')}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Edit size={20} className="text-indigo-600" />
                <span className="text-sm font-medium text-slate-700">
                  Edit Homepage
                </span>
              </button>
              <button
                onClick={() => navigate('/admin/templates')}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Palette size={20} className="text-purple-600" />
                <span className="text-sm font-medium text-slate-700">
                  Change Template
                </span>
              </button>
              <button
                onClick={() => navigate('/site/preview')}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Eye size={20} className="text-green-600" />
                <span className="text-sm font-medium text-slate-700">
                  Preview Site
                </span>
              </button>
              <button
                onClick={() => navigate('/admin/client')}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <UserPlus size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-slate-700">
                  Client Account
                </span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {activityLog.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0"
                >
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {activity.user} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Site Health</h3>
              <p className="text-sm text-slate-600">
                All systems operational • Last checked: 5 minutes ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
