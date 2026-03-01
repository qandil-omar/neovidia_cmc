import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { Eye, LogOut, ChevronDown, ChevronUp, Save, Upload } from 'lucide-react';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pages, clientAccount, siteSettings, updatePage, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('content');
  const [expandedSection, setExpandedSection] = useState<string | null>('hero');

  const homepage = pages.find((p) => p.isHomepage);
  const [content, setContent] = useState(homepage?.sections || {});
  const [social, setSocial] = useState(siteSettings.social);

  const canEdit = (permission: string) => {
    return clientAccount.permissions[permission as keyof typeof clientAccount.permissions];
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = () => {
    if (homepage) {
      updatePage(homepage.id, { sections: content });
    }
    showToast('Changes saved successfully!', 'success');
  };

  const updateContent = (section: string, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const updateSocial = (field: string, value: string) => {
    setSocial((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {siteSettings.general.siteName}
            </h1>
            <p className="text-sm text-slate-600">Content Management</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/site/preview')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Eye size={18} />
              Preview My Website
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-1">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-slate-600">
            Update your website content using the simple tools below
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200">
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'content'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                My Content
              </button>
              {canEdit('accessMedia') && (
                <button
                  onClick={() => setActiveTab('images')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'images'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  My Images
                </button>
              )}
              <button
                onClick={() => setActiveTab('info')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'info'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                My Info
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'content' && (
              <div className="space-y-4">
                {canEdit('editHero') && (
                  <ContentSection
                    title="Hero Section"
                    description="The main banner at the top of your website"
                    expanded={expandedSection === 'hero'}
                    onToggle={() =>
                      setExpandedSection(expandedSection === 'hero' ? null : 'hero')
                    }
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Main Heading
                        </label>
                        <input
                          type="text"
                          value={content.hero?.heading || ''}
                          onChange={(e) =>
                            updateContent('hero', 'heading', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Subheading
                        </label>
                        <textarea
                          value={content.hero?.subheading || ''}
                          onChange={(e) =>
                            updateContent('hero', 'subheading', e.target.value)
                          }
                          rows={2}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={content.hero?.ctaText || ''}
                          onChange={(e) =>
                            updateContent('hero', 'ctaText', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                  </ContentSection>
                )}

                {canEdit('editAbout') && (
                  <ContentSection
                    title="About Section"
                    description="Tell visitors about your business"
                    expanded={expandedSection === 'about'}
                    onToggle={() =>
                      setExpandedSection(expandedSection === 'about' ? null : 'about')
                    }
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={content.about?.title || ''}
                          onChange={(e) =>
                            updateContent('about', 'title', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          About Text
                        </label>
                        <textarea
                          value={content.about?.body || ''}
                          onChange={(e) =>
                            updateContent('about', 'body', e.target.value)
                          }
                          rows={4}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Image
                        </label>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                          <Upload size={16} />
                          Change Image
                        </button>
                      </div>
                    </div>
                  </ContentSection>
                )}

                {canEdit('editContact') && (
                  <ContentSection
                    title="Contact Information"
                    description="Update your contact details"
                    expanded={expandedSection === 'contact'}
                    onToggle={() =>
                      setExpandedSection(
                        expandedSection === 'contact' ? null : 'contact'
                      )
                    }
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={content.contact?.phone || ''}
                          onChange={(e) =>
                            updateContent('contact', 'phone', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={content.contact?.email || ''}
                          onChange={(e) =>
                            updateContent('contact', 'email', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Business Address
                        </label>
                        <textarea
                          value={content.contact?.address || ''}
                          onChange={(e) =>
                            updateContent('contact', 'address', e.target.value)
                          }
                          rows={2}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                        />
                      </div>
                    </div>
                  </ContentSection>
                )}

                {canEdit('editSocialLinks') && (
                  <ContentSection
                    title="Social Media Links"
                    description="Update your social media profiles"
                    expanded={expandedSection === 'social'}
                    onToggle={() =>
                      setExpandedSection(expandedSection === 'social' ? null : 'social')
                    }
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Facebook
                        </label>
                        <input
                          type="url"
                          value={social.facebook}
                          onChange={(e) => updateSocial('facebook', e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Instagram
                        </label>
                        <input
                          type="url"
                          value={social.instagram}
                          onChange={(e) => updateSocial('instagram', e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={social.linkedin}
                          onChange={(e) => updateSocial('linkedin', e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                  </ContentSection>
                )}

                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'images' && (
              <div className="text-center py-12">
                <p className="text-slate-500 mb-4">
                  Upload and manage images for your website
                </p>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Upload Images
                </button>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-6 max-w-md">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Account Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Name</label>
                      <p className="font-medium text-slate-800">{user?.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Email</label>
                      <p className="font-medium text-slate-800">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Your Website URL
                  </h3>
                  <p className="text-sm text-slate-600">
                    https://yourwebsite.com
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentSection = ({ title, description, expanded, onToggle, children }: any) => (
  <div className="border border-slate-200 rounded-lg overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
    >
      <div className="text-left">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-600 mt-1">{description}</p>
      </div>
      {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {expanded && <div className="p-4 bg-white">{children}</div>}
  </div>
);

export default ClientDashboard;
