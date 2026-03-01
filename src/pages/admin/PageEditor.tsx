import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Eye, ChevronLeft } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import SectionAccordion from '../../components/editor/SectionAccordion';
import { IconDisplay } from '../../components/editor/IconPicker';
import type { Lang, PageContent } from '../../types';

const PageEditor = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { pages, activeTemplate, updatePage, addToast, lang: globalLang } = useApp();
  const [lang, setLang] = useState<Lang>(globalLang);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const page = pages.find((p) => p.id === pageId);
  const [content, setContent] = useState<PageContent>(page?.content || {});

  useEffect(() => {
    if (page?.content) setContent(page.content);
  }, [page?.id]);

  if (!page || !activeTemplate) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-slate-500">Page not found</p>
      </div>
    );
  }

  const pageConfig = activeTemplate.pages.find((p) => p.id === page.pageConfigId);
  if (!pageConfig) return null;

  const sections = pageConfig.sections
    .map((sId) => activeTemplate.sections.find((s) => s.id === sId))
    .filter(Boolean) as typeof activeTemplate.sections;

  const handleContentChange = (sectionId: string, key: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [sectionId]: { ...(prev[sectionId] || {}), [key]: value },
    }));
  };

  const handleVisibilityChange = (sectionId: string, visible: boolean) => {
    setContent((prev) => ({
      ...prev,
      [sectionId]: { ...(prev[sectionId] || {}), visible },
    }));
  };

  const handleSave = (publish: boolean = false) => {
    const now = new Date().toISOString().split('T')[0];
    updatePage(page.id, {
      content,
      lastEdited: now,
      status: publish ? 'published' : page.status,
    });
    setLastSaved(new Date().toLocaleTimeString());
    addToast(publish ? 'Page published successfully' : 'Draft saved', 'success');
  };

  const heroContent = content['hero'] || content['hero_landing'] || {};

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <div className="w-[42%] bg-white border-r border-slate-200 flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate('/admin/pages')}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ChevronLeft size={16} />
              Back to Pages
            </button>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              {(['ar', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${lang === l ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {l === 'ar' ? 'العربية' : 'English'}
                </button>
              ))}
            </div>
          </div>
          <h1 className="text-lg font-bold text-slate-800">
            {lang === 'ar' ? page.name.ar : page.name.en}
          </h1>
          <p className="text-xs text-slate-500 font-mono">{page.slug}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sections.map((section, idx) => (
            <SectionAccordion
              key={section.id}
              section={section}
              content={content[section.id] || {}}
              onContentChange={handleContentChange}
              onVisibilityChange={handleVisibilityChange}
              lang={lang}
              showVisibilityToggle={true}
              defaultExpanded={idx === 0}
            />
          ))}
        </div>

        <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between flex-shrink-0 bg-white">
          <span className="text-xs text-slate-500">
            {lastSaved ? `Saved at ${lastSaved}` : 'Unsaved changes'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleSave(false)}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm"
            >
              <Save size={14} />
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              <Eye size={14} />
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-100 p-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-4xl mx-auto">
          <div
            className="relative flex items-center justify-center text-white overflow-hidden"
            style={{
              background: heroContent.background_type === 'color'
                ? heroContent.background_color || '#6366f1'
                : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              minHeight: '280px',
              textAlign: heroContent.text_align || 'center',
            }}
          >
            <div className="relative z-10 p-12">
              <h1 className={`text-4xl font-bold mb-4 ${lang === 'ar' ? 'font-cairo' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {(heroContent.title?.[lang] || heroContent.headline?.[lang]) || (lang === 'ar' ? 'العنوان الرئيسي' : 'Main Headline')}
              </h1>
              <p className={`text-lg text-white/80 max-w-2xl mx-auto mb-6 ${lang === 'ar' ? 'font-cairo' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {(heroContent.subtitle?.[lang] || heroContent.subheadline?.[lang]) || (lang === 'ar' ? 'نص توضيحي' : 'Descriptive text')}
              </p>
              {heroContent.cta_button && (
                <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold">
                  {heroContent.cta_button.text?.[lang] || 'Click Here'}
                </button>
              )}
            </div>
          </div>

          {content['services'] && (
            <div className="bg-slate-50 p-8">
              <h2 className={`text-2xl font-bold text-slate-800 text-center mb-6 ${lang === 'ar' ? 'font-cairo' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {content['services'].title?.[lang] || (lang === 'ar' ? 'خدماتنا' : 'Our Services')}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {(content['services'].items || []).slice(0, 3).map((item: any, i: number) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 text-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      {item.icon ? <IconDisplay name={item.icon} size={24} className="text-indigo-600" /> : <span className="text-2xl">⭐</span>}
                    </div>
                    <h3 className={`font-semibold text-slate-800 mb-1 ${lang === 'ar' ? 'font-cairo' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                      {item.title?.[lang] || 'Service'}
                    </h3>
                    <p className={`text-xs text-slate-500 ${lang === 'ar' ? 'font-cairo' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                      {item.description?.[lang] || ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {content['contact'] && (
            <div className="p-8 border-t border-slate-200">
              <h2 className={`text-xl font-bold text-slate-800 mb-4 ${lang === 'ar' ? 'font-cairo' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {content['contact'].title?.[lang] || (lang === 'ar' ? 'تواصل معنا' : 'Contact')}
              </h2>
              <div className="flex gap-4 text-sm text-slate-600">
                <span>📞 {content['contact'].phone}</span>
                <span>📧 {content['contact'].email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
