import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import PermissionToggle from '../../components/PermissionToggle';
import { useApp } from '../../contexts/AppContext';
import { User, Mail, Clock, Save, Eye } from 'lucide-react';

const ClientAccount = () => {
  const { clientAccount, updateClientPermissions, showToast } = useApp();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState(clientAccount.permissions);

  const handlePermissionChange = (key: string, value: boolean) => {
    setPermissions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateClientPermissions(permissions);
    showToast('Permissions updated successfully', 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Client Account</h1>
            <p className="text-slate-600 mt-1">
              Manage client access and permissions
            </p>
          </div>
          <button
            onClick={() => navigate('/client/dashboard')}
            className="flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <Eye size={18} />
            Preview Client View
          </button>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Account Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-medium text-slate-800">{clientAccount.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Mail size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-800">{clientAccount.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Last Login</p>
                <p className="font-medium text-slate-800">
                  {clientAccount.lastLogin}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">✓</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <p className="font-medium text-green-600 capitalize">
                  {clientAccount.status}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              Edit Account
            </button>
            <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              Reset Password
            </button>
            <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              Deactivate Account
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Content Permissions
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Control what the client can view and edit in their dashboard
          </p>

          <div className="space-y-1">
            <PermissionToggle
              label="✅ Edit Hero Section"
              enabled={permissions.editHero}
              onChange={(val) => handlePermissionChange('editHero', val)}
            />
            <PermissionToggle
              label="✅ Edit About Section"
              enabled={permissions.editAbout}
              onChange={(val) => handlePermissionChange('editAbout', val)}
            />
            <PermissionToggle
              label="✅ Edit Services"
              enabled={permissions.editServices}
              onChange={(val) => handlePermissionChange('editServices', val)}
            />
            <PermissionToggle
              label="✅ Edit Contact Info"
              enabled={permissions.editContact}
              onChange={(val) => handlePermissionChange('editContact', val)}
            />
            <PermissionToggle
              label="✅ Edit Social Links"
              enabled={permissions.editSocialLinks}
              onChange={(val) => handlePermissionChange('editSocialLinks', val)}
            />
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Restricted Features
            </h3>
            <div className="space-y-1">
              <PermissionToggle
                label="❌ Edit Site Colors"
                enabled={permissions.editColors}
                onChange={(val) => handlePermissionChange('editColors', val)}
              />
              <PermissionToggle
                label="❌ Edit Fonts"
                enabled={permissions.editFonts}
                onChange={(val) => handlePermissionChange('editFonts', val)}
              />
              <PermissionToggle
                label="❌ Add/Delete Pages"
                enabled={permissions.addDeletePages}
                onChange={(val) => handlePermissionChange('addDeletePages', val)}
              />
              <PermissionToggle
                label="❌ Change Template"
                enabled={permissions.changeTemplate}
                onChange={(val) => handlePermissionChange('changeTemplate', val)}
              />
              <PermissionToggle
                label="❌ Access Media Library"
                enabled={permissions.accessMedia}
                onChange={(val) => handlePermissionChange('accessMedia', val)}
              />
              <PermissionToggle
                label="❌ View SEO Settings"
                enabled={permissions.viewSEO}
                onChange={(val) => handlePermissionChange('viewSEO', val)}
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Save size={16} />
              Save Permissions
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ClientAccount;
