import { useState } from 'react';
import { Save, Globe, Palette, Search, Share2, Languages, Code2, Eye } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import type { SiteSettings } from '../../types';

type Tab = 'general' | 'design' | 'seo' | 'social' | 'language' | 'advanced';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'language', label: 'Language', icon: Languages },
  { id: 'advanced', label: 'Advanced', icon: Code2 },
];

const InputField = ({ label, value, onChange, type = 'text', dir }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; dir?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      dir={dir}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
    />
  </div>
);

const Settings = () => {
  const { siteSettings, updateSiteSettings, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [settings, setSettings] = useState<SiteSettings>(siteSettings);

  const update = <K extends keyof SiteSettings>(section: K, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as any), [field]: value },
    }));
  };

  const handleSave = () => {
    updateSiteSettings(settings);
    addToast('Settings saved successfully', 'success');
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Site Settings</h1>
            <p className="text-slate-500 text-sm mt-1">Configure your website settings</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <Save size={16} />
            Save Settings
          </button>
        </div>

        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon size={15} />
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="font-semibold text-slate-800 text-base border-b border-slate-100 pb-3">General Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Site Name (Arabic)" value={settings.general.siteNameAr} onChange={(v) => update('general', 'siteNameAr', v)} dir="rtl" />
                <InputField label="Site Name (English)" value={settings.general.siteNameEn} onChange={(v) => update('general', 'siteNameEn', v)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Tagline (Arabic)" value={settings.general.taglineAr} onChange={(v) => update('general', 'taglineAr', v)} dir="rtl" />
                <InputField label="Tagline (English)" value={settings.general.taglineEn} onChange={(v) => update('general', 'taglineEn', v)} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <InputField label="Contact Email" value={settings.general.contactEmail} onChange={(v) => update('general', 'contactEmail', v)} type="email" />
                <InputField label="Phone Number" value={settings.general.phone} onChange={(v) => update('general', 'phone', v)} />
                <InputField label="WhatsApp" value={settings.general.whatsapp} onChange={(v) => update('general', 'whatsapp', v)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Logo</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <p className="text-sm text-slate-500">Click to upload logo</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, SVG recommended</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Favicon</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <p className="text-sm text-slate-500">Click to upload favicon</p>
                    <p className="text-xs text-slate-400 mt-1">ICO, PNG 32x32</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-6">
              <h2 className="font-semibold text-slate-800 text-base border-b border-slate-100 pb-3">Design Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.design.primaryColor}
                      onChange={(e) => update('design', 'primaryColor', e.target.value)}
                      className="w-12 h-10 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={settings.design.primaryColor}
                      onChange={(e) => update('design', 'primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Secondary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.design.secondaryColor}
                      onChange={(e) => update('design', 'secondaryColor', e.target.value)}
                      className="w-12 h-10 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={settings.design.secondaryColor}
                      onChange={(e) => update('design', 'secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Font Family</label>
                <select
                  value={settings.design.fontFamily}
                  onChange={(e) => update('design', 'fontFamily', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Cairo', 'Inter', 'Roboto', 'Poppins', 'Noto Sans Arabic', 'IBM Plex Sans Arabic'].map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Font Size</label>
                  <div className="flex gap-2">
                    {(['small', 'medium', 'large'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => update('design', 'fontSize', s)}
                        className={`flex-1 py-2 rounded-lg text-sm capitalize border transition-colors ${
                          settings.design.fontSize === s
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Border Radius</label>
                  <div className="flex gap-2">
                    {(['sharp', 'rounded', 'pill'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => update('design', 'borderRadius', r)}
                        className={`flex-1 py-2 rounded-lg text-sm capitalize border transition-colors ${
                          settings.design.borderRadius === r
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Eye size={16} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Preview</span>
                </div>
                <div className="flex gap-3">
                  <button
                    style={{ backgroundColor: settings.design.primaryColor, borderRadius: settings.design.borderRadius === 'sharp' ? '4px' : settings.design.borderRadius === 'pill' ? '999px' : '10px' }}
                    className="px-5 py-2 text-white text-sm font-medium"
                  >
                    Primary Button
                  </button>
                  <button
                    style={{ backgroundColor: settings.design.secondaryColor, borderRadius: settings.design.borderRadius === 'sharp' ? '4px' : settings.design.borderRadius === 'pill' ? '999px' : '10px' }}
                    className="px-5 py-2 text-white text-sm font-medium"
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h2 className="font-semibold text-slate-800 text-base border-b border-slate-100 pb-3">SEO Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Meta Title (Arabic)" value={settings.seo.metaTitleAr} onChange={(v) => update('seo', 'metaTitleAr', v)} dir="rtl" />
                <InputField label="Meta Title (English)" value={settings.seo.metaTitleEn} onChange={(v) => update('seo', 'metaTitleEn', v)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description (Arabic)</label>
                  <textarea value={settings.seo.metaDescriptionAr} onChange={(e) => update('seo', 'metaDescriptionAr', e.target.value)} rows={3} dir="rtl" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description (English)</label>
                  <textarea value={settings.seo.metaDescriptionEn} onChange={(e) => update('seo', 'metaDescriptionEn', e.target.value)} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Google Analytics ID" value={settings.seo.analyticsId || ''} onChange={(v) => update('seo', 'analyticsId', v)} />
                <InputField label="Search Console Verification" value={settings.seo.searchConsoleCode || ''} onChange={(v) => update('seo', 'searchConsoleCode', v)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">OG Image</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <p className="text-sm text-slate-500">Upload Open Graph image (1200x630px)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="font-semibold text-slate-800 text-base border-b border-slate-100 pb-3">Social Media Links</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'facebook', label: 'Facebook' },
                  { key: 'instagram', label: 'Instagram' },
                  { key: 'twitter', label: 'Twitter / X' },
                  { key: 'linkedin', label: 'LinkedIn' },
                  { key: 'youtube', label: 'YouTube' },
                  { key: 'tiktok', label: 'TikTok' },
                  { key: 'snapchat', label: 'Snapchat' },
                  { key: 'pinterest', label: 'Pinterest' },
                ].map(({ key, label }) => (
                  <InputField
                    key={key}
                    label={label}
                    value={(settings.social as any)[key] || ''}
                    onChange={(v) => update('social', key, v)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="space-y-6">
              <h2 className="font-semibold text-slate-800 text-base border-b border-slate-100 pb-3">Language & RTL Settings</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Default Language</label>
                <div className="flex gap-3">
                  {[{ value: 'ar', label: 'Arabic (العربية)' }, { value: 'en', label: 'English' }].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => update('language', 'defaultLang', opt.value)}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-colors ${
                        settings.language.defaultLang === opt.value
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">RTL Mode</label>
                <div className="flex gap-3">
                  {[{ value: 'auto', label: 'Auto (detect by language)' }, { value: 'always', label: 'Always RTL' }, { value: 'never', label: 'Never RTL' }].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => update('language', 'rtlMode', opt.value)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition-colors ${
                        settings.language.rtlMode === opt.value
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Show Language Switcher</p>
                  <p className="text-xs text-slate-500 mt-0.5">Display AR/EN toggle on the public site</p>
                </div>
                <button
                  onClick={() => update('language', 'showSwitcher', !settings.language.showSwitcher)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.language.showSwitcher ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.language.showSwitcher ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <h2 className="font-semibold text-slate-800 text-base border-b border-slate-100 pb-3">Advanced Settings</h2>
              {[
                { key: 'customCSS', label: 'Custom CSS', placeholder: '/* Add your custom CSS here */' },
                { key: 'customJsHead', label: 'Custom JS (Head)', placeholder: '<!-- Scripts added to <head> -->' },
                { key: 'customJsFooter', label: 'Custom JS (Footer)', placeholder: '<!-- Scripts added before </body> -->' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                  <textarea
                    value={(settings.advanced as any)[key]}
                    onChange={(e) => update('advanced', key, e.target.value)}
                    rows={5}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-slate-950 text-green-400 placeholder:text-slate-600"
                  />
                </div>
              ))}
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div>
                  <p className="font-medium text-amber-800 text-sm">Maintenance Mode</p>
                  <p className="text-xs text-amber-600 mt-0.5">Show a maintenance page to visitors</p>
                </div>
                <button
                  onClick={() => update('advanced', 'maintenanceMode', !settings.advanced.maintenanceMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.advanced.maintenanceMode ? 'bg-amber-500' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.advanced.maintenanceMode ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
