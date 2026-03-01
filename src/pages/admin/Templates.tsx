import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import TemplateCard from '../../components/TemplateCard';
import Modal from '../../components/Modal';
import { useApp } from '../../contexts/AppContext';
import { Check } from 'lucide-react';

const Templates = () => {
  const { templates, updateTemplate, showToast } = useApp();
  const [typeFilter, setTypeFilter] = useState('All');
  const [styleFilter, setStyleFilter] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [confirmTemplate, setConfirmTemplate] = useState<any>(null);

  const types = ['All', 'Landing Page', 'One Page', 'Multi-Page'];
  const styles = ['All', 'Modern', 'Classic', 'Minimal', 'Bold'];

  const filteredTemplates = templates.filter((template) => {
    const matchType = typeFilter === 'All' || template.type === typeFilter;
    const matchStyle = styleFilter === 'All' || template.style === styleFilter;
    return matchType && matchStyle;
  });

  const handleActivateTemplate = (template: any) => {
    updateTemplate(template.id);
    setConfirmTemplate(null);
    showToast(`${template.name} template activated successfully!`, 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Template Library</h1>
          <p className="text-slate-600 mt-1">
            Choose a professional template for your website
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Template Type
              </h3>
              <div className="flex gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      typeFilter === type
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">Style</h3>
              <div className="flex gap-2">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setStyleFilter(style)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      styleFilter === style
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={() => setPreviewTemplate(template)}
              onActivate={() => setConfirmTemplate(template)}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">
              No templates found with the selected filters.
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title="Template Preview"
        size="full"
      >
        {previewTemplate && (
          <div className="flex gap-6 h-full">
            <div className="flex-1 bg-slate-100 rounded-lg flex items-center justify-center">
              <div
                className="w-full h-full rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: previewTemplate.preview }}
              >
                {previewTemplate.name} Preview
              </div>
            </div>
            <div className="w-80 space-y-4">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  {previewTemplate.name}
                </h3>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                    {previewTemplate.type}
                  </span>
                  <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
                    {previewTemplate.style}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-2">
                  Pages Included
                </h4>
                <p className="text-sm text-slate-600">
                  {previewTemplate.pages} pages
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-2">
                  Features
                </h4>
                <ul className="space-y-1">
                  {previewTemplate.features.map((feature: string, index: number) => (
                    <li
                      key={index}
                      className="text-sm text-slate-600 flex items-center gap-2"
                    >
                      <Check size={16} className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {!previewTemplate.isActive && (
                <button
                  onClick={() => {
                    setPreviewTemplate(null);
                    setConfirmTemplate(previewTemplate);
                  }}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Activate This Template
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!confirmTemplate}
        onClose={() => setConfirmTemplate(null)}
        title="Confirm Template Change"
        footer={
          <>
            <button
              onClick={() => setConfirmTemplate(null)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleActivateTemplate(confirmTemplate)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Yes, Activate Template
            </button>
          </>
        }
      >
        {confirmTemplate && (
          <div>
            <p className="text-slate-700">
              Are you sure you want to activate{' '}
              <strong>{confirmTemplate.name}</strong>? This will replace your
              current template layout.
            </p>
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Your content will be preserved, but the
                layout and design will change.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Templates;
