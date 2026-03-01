import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ChevronLeft, Globe } from 'lucide-react';
import ClientLayout from '../../components/client/ClientLayout';
import SectionAccordion from '../../components/editor/SectionAccordion';
import { useApp } from '../../contexts/AppContext';
import type { Lang } from '../../types';

const ClientPageEditor = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { pages, activeTemplate, updatePage, clientAccount, lang, setLang, addToast } = useApp();

  const page = pages.find((p) => p.id === pageId);
  const [content, setContent] = useState(page?.content || {});
  const { permissions } = clientAccount;

  if (!page) {
    return (
      <ClientLayout>
        <div className="text-center py-16">
          <p className="text-slate-500">Page not found or access denied.</p>
        </div>
      </ClientLayout>
    );
  }

  const pageConfig = activeTemplate?.pages.find((pc) => pc.id === page.pageConfigId);
  const sectionIds = pageConfig?.sections || [];

  const visibleSections = sectionIds
    .map((sId) => activeTemplate?.sections.find((s) => s.id === sId))
    .filter((s): s is NonNullable<typeof s> => {
      if (!s) return false;
      const perm = permissions.sections[s.id];
      return perm?.visible === true;
    });

  const handleContentChange = useCallback((sectionId: string, key: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [key]: value },
    }));
  }, []);

  const handleSave = () => {
    updatePage(page.id, { content, lastEdited: new Date().toISOString().split('T')[0] });
    addToast('Changes saved', 'success');
  };

  return (
    <ClientLayout>
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/client')} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
              <ChevronLeft size={18} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-800">
                {lang === 'ar' ? page.name.ar : page.name.en}
              </h1>
              <p className="text-xs text-slate-500">{visibleSections.length} sections available</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {permissions.features.change_language && (
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                <Globe size={13} className="text-slate-400 ml-1" />
                {(['ar', 'en'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${lang === l ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                  >
                    {l === 'ar' ? 'عربي' : 'EN'}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Save size={15} />
              Save
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {visibleSections.map((section) => {
            const perm = permissions.sections[section.id];
            const editable = perm?.editable === true;
            return (
              <SectionAccordion
                key={section.id}
                section={section}
                content={content[section.id] || {}}
                onContentChange={handleContentChange}
                lang={lang}
                disabled={!editable}
                showVisibilityToggle={false}
              />
            );
          })}
          {visibleSections.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500 text-sm">No sections available for editing.</p>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientPageEditor;
