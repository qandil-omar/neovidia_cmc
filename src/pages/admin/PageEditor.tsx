import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { ChevronDown, ChevronUp, Save, Eye, Plus, Trash2, Upload } from 'lucide-react';

const PageEditor = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { pages, updatePage, showToast } = useApp();
  const page = pages.find((p) => p.id === pageId);

  const [sections, setSections] = useState(page?.sections || {});
  const [expandedSections, setExpandedSections] = useState<string[]>(['hero']);
  const [lastSaved, setLastSaved] = useState('Just now');

  useEffect(() => {
    if (page?.sections) {
      setSections(page.sections);
    }
  }, [page]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const updateSection = (section: string, field: string, value: any) => {
    setSections((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSave = (publish: boolean = false) => {
    updatePage(pageId!, { sections, lastEdited: new Date().toISOString().split('T')[0] });
    setLastSaved('Just now');
    showToast(
      publish ? 'Page published successfully' : 'Changes saved successfully',
      'success'
    );
  };

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="w-[40%] bg-white border-r border-slate-200 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 z-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-slate-800">{page.name}</h1>
            <button
              onClick={() => navigate('/admin/pages')}
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              ← Back to Pages
            </button>
          </div>
          <p className="text-sm text-slate-500">Editing: {page.slug}</p>
        </div>

        <div className="p-6 space-y-4">
          <Section
            title="Hero Section"
            id="hero"
            expanded={expandedSections.includes('hero')}
            onToggle={() => toggleSection('hero')}
          >
            <div className="space-y-4">
              <Input
                label="Heading"
                value={sections.hero?.heading || ''}
                onChange={(e) => updateSection('hero', 'heading', e.target.value)}
              />
              <Textarea
                label="Subheading"
                value={sections.hero?.subheading || ''}
                onChange={(e) => updateSection('hero', 'subheading', e.target.value)}
                rows={3}
              />
              <Input
                label="CTA Button Text"
                value={sections.hero?.ctaText || ''}
                onChange={(e) => updateSection('hero', 'ctaText', e.target.value)}
              />
              <Input
                label="CTA Button Link"
                value={sections.hero?.ctaLink || ''}
                onChange={(e) => updateSection('hero', 'ctaLink', e.target.value)}
              />
              <Select
                label="CTA Button Style"
                value={sections.hero?.ctaStyle || 'primary'}
                onChange={(e) => updateSection('hero', 'ctaStyle', e.target.value)}
                options={['primary', 'secondary', 'outline']}
              />
              <Select
                label="Background Type"
                value={sections.hero?.backgroundType || 'gradient'}
                onChange={(e) => updateSection('hero', 'backgroundType', e.target.value)}
                options={['color', 'image', 'gradient']}
              />
              <Select
                label="Text Alignment"
                value={sections.hero?.textAlignment || 'center'}
                onChange={(e) => updateSection('hero', 'textAlignment', e.target.value)}
                options={['left', 'center', 'right']}
              />
            </div>
          </Section>

          <Section
            title="About Section"
            id="about"
            expanded={expandedSections.includes('about')}
            onToggle={() => toggleSection('about')}
          >
            <div className="space-y-4">
              <Input
                label="Title"
                value={sections.about?.title || ''}
                onChange={(e) => updateSection('about', 'title', e.target.value)}
              />
              <Textarea
                label="Body Text"
                value={sections.about?.body || ''}
                onChange={(e) => updateSection('about', 'body', e.target.value)}
                rows={6}
              />
              <ImageUpload label="Image" />
              <Select
                label="Image Position"
                value={sections.about?.imagePosition || 'right'}
                onChange={(e) => updateSection('about', 'imagePosition', e.target.value)}
                options={['left', 'right']}
              />
            </div>
          </Section>

          <Section
            title="Services Section"
            id="services"
            expanded={expandedSections.includes('services')}
            onToggle={() => toggleSection('services')}
          >
            <div className="space-y-4">
              <Input
                label="Section Title"
                value={sections.services?.title || ''}
                onChange={(e) => updateSection('services', 'title', e.target.value)}
              />
              <Input
                label="Section Subtitle"
                value={sections.services?.subtitle || ''}
                onChange={(e) => updateSection('services', 'subtitle', e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Service Cards
                </label>
                {sections.services?.cards?.map((card: any, index: number) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-lg p-4 mb-3"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{card.icon}</span>
                      <button className="text-red-600 hover:bg-red-50 p-1 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <Input
                      label="Title"
                      value={card.title}
                      onChange={() => {}}
                      className="mb-2"
                    />
                    <Textarea
                      label="Description"
                      value={card.description}
                      onChange={() => {}}
                      rows={2}
                    />
                  </div>
                ))}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                  <Plus size={16} />
                  Add Service Card
                </button>
              </div>
              <Select
                label="Cards Per Row"
                value={sections.services?.cardsPerRow || 3}
                onChange={(e) => updateSection('services', 'cardsPerRow', parseInt(e.target.value))}
                options={['2', '3', '4']}
              />
            </div>
          </Section>

          <Section
            title="Contact Section"
            id="contact"
            expanded={expandedSections.includes('contact')}
            onToggle={() => toggleSection('contact')}
          >
            <div className="space-y-4">
              <Input
                label="Phone"
                value={sections.contact?.phone || ''}
                onChange={(e) => updateSection('contact', 'phone', e.target.value)}
              />
              <Input
                label="Email"
                value={sections.contact?.email || ''}
                onChange={(e) => updateSection('contact', 'email', e.target.value)}
              />
              <Textarea
                label="Address"
                value={sections.contact?.address || ''}
                onChange={(e) => updateSection('contact', 'address', e.target.value)}
                rows={2}
              />
              <Input
                label="Google Maps Embed Link"
                value={sections.contact?.mapLink || ''}
                onChange={(e) => updateSection('contact', 'mapLink', e.target.value)}
              />
              <Toggle
                label="Show Map"
                checked={sections.contact?.showMap || false}
                onChange={(checked) => updateSection('contact', 'showMap', checked)}
              />
            </div>
          </Section>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex items-center justify-between">
          <span className="text-sm text-slate-500">Last saved: {lastSaved}</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleSave(false)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              <Save size={16} />
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Eye size={16} />
              Save & Publish
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-100 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 text-${sections.hero?.textAlignment || 'center'}`}
            >
              <h1 className="text-4xl font-bold mb-4">
                {sections.hero?.heading || 'Your Heading Here'}
              </h1>
              <p className="text-lg mb-6">
                {sections.hero?.subheading || 'Your subheading text will appear here'}
              </p>
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold">
                {sections.hero?.ctaText || 'Get Started'}
              </button>
            </div>

            <div className="p-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                {sections.about?.title || 'About Us'}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {sections.about?.body || 'Your about text will appear here...'}
              </p>
            </div>

            <div className="bg-slate-50 p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  {sections.services?.title || 'Our Services'}
                </h2>
                <p className="text-slate-600">
                  {sections.services?.subtitle || 'What we offer'}
                </p>
              </div>
              <div className={`grid grid-cols-${sections.services?.cardsPerRow || 3} gap-6`}>
                {sections.services?.cards?.map((card: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg border border-slate-200"
                  >
                    <div className="text-4xl mb-3">{card.icon}</div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-slate-600">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Contact Us</h2>
              <div className="space-y-2 text-slate-600">
                <p>📞 {sections.contact?.phone || '+1 (555) 123-4567'}</p>
                <p>📧 {sections.contact?.email || 'hello@business.com'}</p>
                <p>📍 {sections.contact?.address || '123 Business Street'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, id, expanded, onToggle, children }: any) => (
  <div className="border border-slate-200 rounded-lg overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
    >
      <span className="font-semibold text-slate-800">{title}</span>
      {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {expanded && <div className="p-4">{children}</div>}
  </div>
);

const Input = ({ label, value, onChange, className = '' }: any) => (
  <div className={className}>
    <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
    />
  </div>
);

const Textarea = ({ label, value, onChange, rows = 3 }: any) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-none"
    />
  </div>
);

const Select = ({ label, value, onChange, options }: any) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm capitalize"
    >
      {options.map((option: string) => (
        <option key={option} value={option} className="capitalize">
          {option}
        </option>
      ))}
    </select>
  </div>
);

const ImageUpload = ({ label }: any) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-600">
      <Upload size={16} />
      Upload Image
    </button>
  </div>
);

const Toggle = ({ label, checked, onChange }: any) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-slate-700">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        checked ? 'bg-green-500' : 'bg-slate-300'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      ></div>
    </button>
  </div>
);

export default PageEditor;
