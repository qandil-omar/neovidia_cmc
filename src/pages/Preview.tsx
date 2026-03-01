import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

type ViewMode = 'desktop' | 'tablet' | 'mobile';

const viewWidths: Record<ViewMode, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

const Preview = () => {
  const navigate = useNavigate();
  const { pages, siteSettings, activeTemplate, lang } = useApp();
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [selectedPage, setSelectedPage] = useState(pages[0]);

  const publishedPages = pages.filter((p) => p.status === 'published');

  const siteName = lang === 'ar' ? siteSettings.general.siteNameAr : siteSettings.general.siteNameEn;

  const PreviewContent = () => {
    const content = selectedPage?.content || {};
    const pageConfig = activeTemplate?.pages.find((pc) => pc.id === selectedPage?.pageConfigId);
    const sectionIds = pageConfig?.sections || [];

    return (
      <div style={{ fontFamily: siteSettings.design.fontFamily }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <nav style={{ backgroundColor: siteSettings.design.primaryColor }} className="px-8 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-lg">{siteName}</span>
          <div className="flex gap-6">
            {publishedPages.map((p) => (
              <button key={p.id} onClick={() => setSelectedPage(p)} className="text-white/80 hover:text-white text-sm transition-colors">
                {lang === 'ar' ? p.name.ar : p.name.en}
              </button>
            ))}
          </div>
        </nav>

        {sectionIds.map((sId) => {
          const sectionData = content[sId];
          if (!sectionData || sectionData.visible === false) return null;

          if (sId === 'hero' || sId === 'hero_landing') {
            return (
              <div key={sId} style={{ background: `linear-gradient(135deg, ${siteSettings.design.primaryColor}, ${siteSettings.design.secondaryColor})` }} className="py-24 px-8 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">{lang === 'ar' ? sectionData.title?.ar : sectionData.title?.en}</h1>
                <p className="text-lg text-white/80 max-w-xl mx-auto">{lang === 'ar' ? sectionData.subtitle?.ar : sectionData.subtitle?.en}</p>
                {sectionData.cta_button && (
                  <button className="mt-8 px-8 py-3 bg-white text-slate-800 font-semibold rounded-full hover:shadow-lg transition-all">
                    {lang === 'ar' ? sectionData.cta_button.text?.ar : sectionData.cta_button.text?.en}
                  </button>
                )}
              </div>
            );
          }

          if (sId === 'page_hero') {
            return (
              <div key={sId} style={{ backgroundColor: sectionData.background_color || '#1e293b' }} className="py-16 px-8 text-center text-white">
                <h1 className="text-3xl font-bold">{lang === 'ar' ? sectionData.title?.ar : sectionData.title?.en}</h1>
              </div>
            );
          }

          if (sId === 'about' || sId === 'about_detail') {
            return (
              <div key={sId} className="py-16 px-8 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{lang === 'ar' ? sectionData.title?.ar : sectionData.title?.en}</h2>
                <p className="text-slate-600 leading-relaxed">{lang === 'ar' ? sectionData.description?.ar || sectionData.content?.ar : sectionData.description?.en || sectionData.content?.en}</p>
              </div>
            );
          }

          if (sId === 'services') {
            const items = sectionData.items || [];
            return (
              <div key={sId} className="py-16 px-8 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">{lang === 'ar' ? sectionData.title?.ar : sectionData.title?.en}</h2>
                  <p className="text-slate-500 text-center mb-10">{lang === 'ar' ? sectionData.subtitle?.ar : sectionData.subtitle?.en}</p>
                  <div className="grid grid-cols-3 gap-6">
                    {items.map((item: any, i: number) => (
                      <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                        <div style={{ backgroundColor: siteSettings.design.primaryColor }} className="w-10 h-10 rounded-lg mb-4" />
                        <h3 className="font-semibold text-slate-800 mb-2">{lang === 'ar' ? item.title?.ar : item.title?.en}</h3>
                        <p className="text-sm text-slate-500">{lang === 'ar' ? item.description?.ar : item.description?.en}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          if (sId === 'stats') {
            const items = sectionData.items || [];
            return (
              <div key={sId} style={{ backgroundColor: sectionData.background_color || siteSettings.design.primaryColor }} className="py-14 px-8 text-white">
                <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8 text-center">
                  {items.map((item: any, i: number) => (
                    <div key={i}>
                      <p className="text-4xl font-bold mb-1">{item.number}</p>
                      <p className="text-white/70 text-sm">{lang === 'ar' ? item.label?.ar : item.label?.en}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (sId === 'contact') {
            return (
              <div key={sId} className="py-16 px-8 bg-white">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">{lang === 'ar' ? sectionData.title?.ar : sectionData.title?.en}</h2>
                  <p className="text-slate-500 mb-8">{lang === 'ar' ? sectionData.subtitle?.ar : sectionData.subtitle?.en}</p>
                  <div className="flex gap-3">
                    <input type="text" placeholder={lang === 'ar' ? 'اسمك الكامل' : 'Your full name'} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none" />
                    <input type="email" placeholder={lang === 'ar' ? 'بريدك الإلكتروني' : 'Your email'} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none" />
                  </div>
                  <textarea rows={4} placeholder={lang === 'ar' ? 'رسالتك' : 'Your message'} className="w-full mt-3 px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none resize-none" />
                  <button style={{ backgroundColor: siteSettings.design.primaryColor }} className="mt-3 px-8 py-2.5 text-white rounded-lg text-sm font-medium w-full">
                    {lang === 'ar' ? 'إرسال' : 'Send Message'}
                  </button>
                </div>
              </div>
            );
          }

          return null;
        })}

        <footer className="bg-slate-900 text-white py-8 px-8 text-center">
          <p className="font-semibold mb-1">{siteName}</p>
          <p className="text-slate-400 text-sm">{lang === 'ar' ? siteSettings.general.taglineAr : siteSettings.general.taglineEn}</p>
          <p className="text-slate-600 text-xs mt-4">&copy; 2025 {siteName}</p>
        </footer>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm">
            <X size={16} />
            Close Preview
          </button>
          <div className="w-px h-5 bg-slate-600" />
          <span className="text-white font-medium text-sm">{siteName}</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-700 rounded-lg p-1">
          {([
            { mode: 'desktop' as const, icon: Monitor },
            { mode: 'tablet' as const, icon: Tablet },
            { mode: 'mobile' as const, icon: Smartphone },
          ]).map(({ mode, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`p-2 rounded-md transition-colors ${viewMode === mode ? 'bg-white text-slate-800' : 'text-slate-400 hover:text-white'}`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {publishedPages.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPage(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedPage?.id === p.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {lang === 'ar' ? p.name.ar : p.name.en}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto py-6 px-6">
        <div
          className="mx-auto bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
          style={{ width: viewWidths[viewMode], minHeight: '600px' }}
        >
          <PreviewContent />
        </div>
      </div>
    </div>
  );
};

export default Preview;
