import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, Image, Inbox, ChevronRight, TrendingUp, Clock } from 'lucide-react';
import ClientLayout from '../../components/client/ClientLayout';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

const ClientDashboard = () => {
  const { clientAccount, pages, leads, blogPosts, lang } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { permissions } = clientAccount;

  const accessiblePages = pages.filter((p) => permissions.pages[p.pageConfigId]);
  const newLeads = leads.filter((l) => l.status === 'new');
  const recentLeads = leads.slice(0, 4);

  const quickLinks = [
    ...accessiblePages.map((p) => ({
      icon: FileText,
      label: lang === 'ar' ? p.name.ar : p.name.en,
      desc: lang === 'ar' ? 'تعديل محتوى الصفحة' : 'Edit page content',
      path: `/client/pages/${p.id}`,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    })),
    ...(permissions.features.blog ? [{
      icon: BookOpen,
      label: lang === 'ar' ? 'المدونة' : 'Blog',
      desc: lang === 'ar' ? 'إدارة المقالات' : 'Manage articles',
      path: '/client/blog',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    }] : []),
    ...(permissions.features.media ? [{
      icon: Image,
      label: lang === 'ar' ? 'الوسائط' : 'Media',
      desc: lang === 'ar' ? 'رفع الصور والملفات' : 'Upload images and files',
      path: '/client/media',
      color: 'bg-orange-50 text-orange-600 border-orange-100',
    }] : []),
    ...(permissions.features.leads ? [{
      icon: Inbox,
      label: lang === 'ar' ? 'الرسائل' : 'Leads',
      desc: lang === 'ar' ? 'عرض الاستفسارات' : 'View inquiries',
      path: '/client/leads',
      color: 'bg-rose-50 text-rose-600 border-rose-100',
    }] : []),
  ];

  return (
    <ClientLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
          <div dir="rtl" className="mb-1">
            <p className="text-blue-100 text-sm font-cairo">مرحباً بك,</p>
            <h1 className="text-2xl font-bold font-cairo">{clientAccount.name}</h1>
          </div>
          <div className="mt-3 flex items-center gap-2 text-blue-200 text-xs">
            <Clock size={13} />
            <span>
              {lang === 'ar' ? 'آخر تسجيل دخول: ' : 'Last login: '}
              {new Date(clientAccount.lastLogin).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB')}
            </span>
          </div>
        </div>

        {(permissions.features.leads || accessiblePages.length > 0 || permissions.features.blog) && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">
                {lang === 'ar' ? 'الصفحات المتاحة' : 'Accessible Pages'}
              </p>
              <p className="text-3xl font-bold text-slate-800">{accessiblePages.length}</p>
            </div>
            {permissions.features.blog && (
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">
                  {lang === 'ar' ? 'المقالات' : 'Blog Posts'}
                </p>
                <p className="text-3xl font-bold text-slate-800">{blogPosts.length}</p>
              </div>
            )}
            {permissions.features.leads && (
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">
                  {lang === 'ar' ? 'رسائل جديدة' : 'New Leads'}
                </p>
                <p className="text-3xl font-bold text-blue-600">{newLeads.length}</p>
              </div>
            )}
          </div>
        )}

        <div>
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
            {lang === 'ar' ? 'الوصول السريع' : 'Quick Access'}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-all text-left group"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${link.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 text-sm">{link.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {permissions.features.leads && recentLeads.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                {lang === 'ar' ? 'آخر الرسائل' : 'Recent Leads'}
              </h2>
              <button onClick={() => navigate('/client/leads')} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                {lang === 'ar' ? 'عرض الكل' : 'View All'}
                <ChevronRight size={12} />
              </button>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${lead.status === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    {lead.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{lead.name}</p>
                    <p className="text-xs text-slate-500 truncate">{lead.message}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {lead.status === 'new' && (
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {lang === 'ar' ? 'جديد' : 'New'}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <TrendingUp size={11} />
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;
