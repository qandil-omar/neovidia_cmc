import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import { Upload, Save } from 'lucide-react';

const Settings = () => {
  const { siteSettings, updateSiteSettings, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(siteSettings);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'design', label: 'Design' },
    { id: 'seo', label: 'SEO' },
    { id: 'social', label: 'Social' },
    { id: 'advanced', label: 'Advanced' },
  ];

  const handleSave = () => {
    updateSiteSettings(activeTab, settings[activeTab as keyof typeof settings]);
    showToast('Settings saved successfully', 'success');
  };

  const updateField = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Site Settings</h1>
          <p className="text-slate-600 mt-1">Configure your website settings</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200">
          <div className="border-b border-slate-200">
            <div className="flex gap-1 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'general' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => updateField('siteName', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.general.tagline}
                    onChange={(e) => updateField('tagline', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Logo
                  </label>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                    <Upload size={16} />
                    Upload Logo
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Favicon
                  </label>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                    <Upload size={16} />
                    Upload Favicon
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Default Language
                  </label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => updateField('language', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.design.primaryColor}
                        onChange={(e) => updateField('primaryColor', e.target.value)}
                        className="w-12 h-10 rounded-lg border border-slate-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.design.primaryColor}
                        onChange={(e) => updateField('primaryColor', e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.design.secondaryColor}
                        onChange={(e) => updateField('secondaryColor', e.target.value)}
                        className="w-12 h-10 rounded-lg border border-slate-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.design.secondaryColor}
                        onChange={(e) => updateField('secondaryColor', e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={settings.design.fontFamily}
                    onChange={(e) => updateField('fontFamily', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Raleway">Raleway</option>
                    <option value="Nunito">Nunito</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="Merriweather">Merriweather</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Font Size Scale
                  </label>
                  <select
                    value={settings.design.fontSize}
                    onChange={(e) => updateField('fontSize', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Border Radius
                  </label>
                  <select
                    value={settings.design.borderRadius}
                    onChange={(e) => updateField('borderRadius', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="sharp">Sharp (0px)</option>
                    <option value="rounded">Rounded (8px)</option>
                    <option value="pill">Pill (999px)</option>
                  </select>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">
                    Button Preview
                  </h3>
                  <button
                    style={{
                      backgroundColor: settings.design.primaryColor,
                      borderRadius:
                        settings.design.borderRadius === 'sharp'
                          ? '0px'
                          : settings.design.borderRadius === 'pill'
                          ? '999px'
                          : '8px',
                    }}
                    className="px-6 py-2 text-white font-medium"
                  >
                    Sample Button
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={settings.seo.metaTitle}
                    onChange={(e) => updateField('metaTitle', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={settings.seo.metaDescription}
                    onChange={(e) => updateField('metaDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={settings.seo.keywords}
                    onChange={(e) => updateField('keywords', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    OG Image
                  </label>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                    <Upload size={16} />
                    Upload OG Image
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settings.seo.analyticsId}
                    onChange={(e) => updateField('analyticsId', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="UA-XXXXXXXXX-X"
                  />
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={settings.social.facebook}
                    onChange={(e) => updateField('facebook', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settings.social.instagram}
                    onChange={(e) => updateField('instagram', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Twitter/X URL
                  </label>
                  <input
                    type="url"
                    value={settings.social.twitter}
                    onChange={(e) => updateField('twitter', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={settings.social.linkedin}
                    onChange={(e) => updateField('linkedin', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={settings.social.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={settings.social.youtube}
                    onChange={(e) => updateField('youtube', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Custom CSS
                  </label>
                  <textarea
                    value={settings.advanced.customCSS}
                    onChange={(e) => updateField('customCSS', e.target.value)}
                    rows={8}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono text-sm resize-none"
                    placeholder="/* Your custom CSS here */"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Custom JavaScript
                  </label>
                  <textarea
                    value={settings.advanced.customJS}
                    onChange={(e) => updateField('customJS', e.target.value)}
                    rows={8}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono text-sm resize-none"
                    placeholder="// Your custom JavaScript here"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Header Scripts
                  </label>
                  <textarea
                    value={settings.advanced.headerScripts}
                    onChange={(e) => updateField('headerScripts', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono text-sm resize-none"
                    placeholder="<script>...</script>"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 p-6 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Save size={16} />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
