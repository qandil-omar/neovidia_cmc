import { useState } from 'react';
import { Check, Eye, Upload, Layers, FileText, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/ui/Modal';
import { useApp } from '../../contexts/AppContext';

const Templates = () => {
  const { templates, activeTemplateId, setActiveTemplate, addToast } = useApp();
  const [filter, setFilter] = useState('all');
  const [styleFilter, setStyleFilter] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [confirmTemplate, setConfirmTemplate] = useState<any>(null);
  const [uploadMode, setUploadMode] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const types = ['all', 'multipage', 'onepage', 'landing'];
  const styles = ['all', 'modern', 'classic', 'minimal', 'bold'];

  const filtered = templates.filter((t) => {
    const matchType = filter === 'all' || t.type === filter;
    const matchStyle = styleFilter === 'all' || t.style === styleFilter;
    return matchType && matchStyle;
  });

  const handleActivate = (template: any) => {
    setActiveTemplate(template.id);
    setConfirmTemplate(null);
    addToast(`${template.name} template activated!`, 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Template Library</h1>
            <p className="text-slate-500 text-sm mt-1">Choose and manage website templates</p>
          </div>
          <button
            onClick={() => setUploadMode(true)}
            className="flex items-center gap-2 px-4 py-2 border border-indigo-300 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            <Upload size={18} />
            Upload Template
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Template Type</p>
            <div className="flex gap-2 flex-wrap">
              {types.map((t) => (
                <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${filter === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  {t === 'all' ? 'All Types' : t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Style</p>
            <div className="flex gap-2 flex-wrap">
              {styles.map((s) => (
                <button key={s} onClick={() => setStyleFilter(s)} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${styleFilter === s ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  {s === 'all' ? 'All Styles' : s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((template) => {
            const isActive = template.id === activeTemplateId;
            return (
              <div key={template.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                {isActive && (
                  <div className="bg-green-500 text-white text-xs font-semibold py-1.5 text-center flex items-center justify-center gap-1">
                    <Check size={14} />
                    ACTIVE TEMPLATE
                  </div>
                )}
                <div
                  className="h-44 flex items-center justify-center text-white font-bold text-xl"
                  style={{ background: template.preview_gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  {template.name}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">{template.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded capitalize">{template.type}</span>
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded capitalize">{template.style}</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded capitalize">{template.language}</span>
                  </div>
                  <div className="flex gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><FileText size={12} />{template.pages.length} pages</span>
                    <span className="flex items-center gap-1"><Layers size={12} />{template.sections.length} sections</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setPreviewTemplate(template)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm transition-colors">
                      <Eye size={14} />
                      Preview
                    </button>
                    {!isActive && (
                      <button onClick={() => setConfirmTemplate(template)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm transition-colors">
                        <Check size={14} />
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={!!previewTemplate} onClose={() => setPreviewTemplate(null)} title="Template Preview" size="xl">
        {previewTemplate && (
          <div className="flex gap-6">
            <div className="flex-1 rounded-xl overflow-hidden" style={{ background: previewTemplate.preview_gradient, height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-2">{previewTemplate.name}</h2>
                <p className="text-white/70">Template Preview</p>
              </div>
            </div>
            <div className="w-72 space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{previewTemplate.name}</h3>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded capitalize">{previewTemplate.type}</span>
                  <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded capitalize">{previewTemplate.style}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Pages ({previewTemplate.pages.length})</h4>
                <div className="space-y-1">
                  {previewTemplate.pages.map((p: any) => (
                    <div key={p.id} className="flex items-center gap-2 text-sm text-slate-600">
                      <FileText size={14} className="text-slate-400" />
                      {p.name.en}
                      <span className="ml-auto text-xs text-slate-400">{p.sections.length} sections</span>
                    </div>
                  ))}
                </div>
              </div>
              {previewTemplate.id !== activeTemplateId && (
                <button onClick={() => { setPreviewTemplate(null); setConfirmTemplate(previewTemplate); }} className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                  Activate This Template
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!confirmTemplate} onClose={() => setConfirmTemplate(null)} title="Confirm Template Change"
        footer={
          <>
            <button onClick={() => setConfirmTemplate(null)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">Cancel</button>
            <button onClick={() => handleActivate(confirmTemplate)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Yes, Activate</button>
          </>
        }
      >
        {confirmTemplate && (
          <div>
            <p className="text-slate-700 mb-3">Activate <strong>{confirmTemplate.name}</strong>?</p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
              <strong>Note:</strong> Your content will be preserved, but the layout will change to match the new template.
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={uploadMode} onClose={() => setUploadMode(false)} title="Upload New Template" size="md">
        <div>
          <p className="text-sm text-slate-600 mb-4">Upload a ZIP file containing your template folder with a valid <code className="bg-slate-100 px-1 rounded">template.config.json</code> file.</p>
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300'}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); addToast('Template upload requires a backend server', 'info'); }}
          >
            <Upload size={32} className="text-slate-400 mx-auto mb-3" />
            <p className="font-medium text-slate-700 mb-1">Drag & drop your template ZIP here</p>
            <p className="text-sm text-slate-500 mb-3">or</p>
            <label className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
              Browse Files
              <input type="file" accept=".zip" className="hidden" onChange={() => addToast('Backend server required for template upload', 'info')} />
            </label>
          </div>
          <div className="mt-4 bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-600 font-semibold mb-1">ZIP structure required:</p>
            <pre className="text-xs text-slate-500 font-mono">
{`template-name/
  template.config.json
  assets/
    preview.jpg
  ...`}
            </pre>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Templates;
