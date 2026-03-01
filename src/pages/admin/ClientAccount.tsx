import { useState } from 'react';
import { User, Mail, Shield, Eye, Edit3, Save, ToggleLeft, ToggleRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import type { ClientPermissions } from '../../types';

const ClientAccount = () => {
  const { clientAccount, updateClientAccount, activeTemplate, pages, addToast } = useApp();
  const navigate = useNavigate();
  const [account, setAccount] = useState(clientAccount);
  const [activeSection, setActiveSection] = useState<'info' | 'pages' | 'sections' | 'features'>('info');

  const updatePermission = (path: string[], value: any) => {
    setAccount((prev) => {
      const updated = { ...prev, permissions: { ...prev.permissions } };
      if (path[0] === 'pages') {
        updated.permissions.pages = { ...prev.permissions.pages, [path[1]]: value };
      } else if (path[0] === 'sections') {
        updated.permissions.sections = {
          ...prev.permissions.sections,
          [path[1]]: { ...prev.permissions.sections[path[1]], [path[2]]: value },
        };
      } else if (path[0] === 'features') {
        updated.permissions.features = { ...prev.permissions.features, [path[1]]: value };
      }
      return updated;
    });
  };

  const handleSave = () => {
    updateClientAccount(account);
    addToast('Client account updated', 'success');
  };

  const allSections = activeTemplate?.sections || [];
  const pageList = pages;

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Client Account</h1>
            <p className="text-slate-500 text-sm mt-1">Manage client access and permissions</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/client/dashboard')}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-sm"
            >
              <ExternalLink size={16} />
              Preview as Client
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { id: 'info' as const, label: 'Client Info', icon: User },
            { id: 'pages' as const, label: 'Page Access', icon: Eye },
            { id: 'sections' as const, label: 'Section Permissions', icon: Shield },
            { id: 'features' as const, label: 'Feature Access', icon: ToggleRight },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                activeSection === id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          {activeSection === 'info' && (
            <div className="space-y-5">
              <h2 className="font-semibold text-slate-800 border-b border-slate-100 pb-3">Account Information</h2>
              <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                  {account.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-lg">{account.name}</p>
                  <p className="text-sm text-slate-500">{account.email}</p>
                  <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-medium mt-1 ${account.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {account.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={account.name}
                    onChange={(e) => setAccount((a) => ({ ...a, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={account.email}
                      onChange={(e) => setAccount((a) => ({ ...a, email: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Account Status</label>
                <div className="flex gap-3">
                  {(['active', 'inactive'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setAccount((a) => ({ ...a, status: s }))}
                      className={`px-5 py-2 rounded-lg text-sm font-medium border-2 capitalize transition-colors ${
                        account.status === s
                          ? s === 'active' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-slate-100 border-slate-400 text-slate-700'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Edit3 size={15} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Reset Password</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="password" placeholder="New password" className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="password" placeholder="Confirm password" className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'pages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="font-semibold text-slate-800">Page Access</h2>
                <p className="text-xs text-slate-500">Toggle which pages the client can access</p>
              </div>
              <div className="space-y-2">
                {pageList.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{page.name.en}</p>
                      <p className="text-xs text-slate-500 font-cairo mt-0.5" dir="rtl">{page.name.ar}</p>
                    </div>
                    <Toggle
                      checked={account.permissions.pages[page.pageConfigId] ?? false}
                      onChange={(v) => updatePermission(['pages', page.pageConfigId], v)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'sections' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="font-semibold text-slate-800">Section Permissions</h2>
                <p className="text-xs text-slate-500 mt-1">Control visibility and editability per section</p>
              </div>
              <div className="bg-slate-50 rounded-lg px-4 py-2.5 grid grid-cols-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <span>Section</span>
                <span className="text-center">Visible to Client</span>
                <span className="text-center">Client Can Edit</span>
              </div>
              <div className="space-y-2">
                {allSections.map((section) => {
                  const perm = account.permissions.sections[section.id] || { visible: false, editable: false };
                  return (
                    <div key={section.id} className="grid grid-cols-3 items-center px-4 py-3.5 bg-white border border-slate-200 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{section.name.en}</p>
                        <p className="text-xs text-slate-500 font-cairo" dir="rtl">{section.name.ar}</p>
                      </div>
                      <div className="flex justify-center">
                        <Toggle
                          checked={perm.visible}
                          onChange={(v) => updatePermission(['sections', section.id, 'visible'], v)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Toggle
                          checked={perm.editable}
                          onChange={(v) => updatePermission(['sections', section.id, 'editable'], v)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === 'features' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="font-semibold text-slate-800">Feature Access</h2>
                <p className="text-xs text-slate-500 mt-1">Enable or disable specific features for this client</p>
              </div>
              <div className="space-y-3">
                {[
                  { key: 'blog' as const, label: 'Blog Manager', desc: 'Create and manage blog posts' },
                  { key: 'leads' as const, label: 'Forms & Leads', desc: 'View form submissions and leads' },
                  { key: 'media' as const, label: 'Media Library', desc: 'Upload and manage media files' },
                  { key: 'change_language' as const, label: 'Language Switcher', desc: 'Switch between AR and EN in the editor' },
                  { key: 'seo_settings' as const, label: 'SEO Settings', desc: 'Edit page SEO metadata' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                    </div>
                    <Toggle
                      checked={account.permissions.features[key]}
                      onChange={(v) => updatePermission(['features', key], v)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ClientAccount;
