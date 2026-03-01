import { Eye, Check } from 'lucide-react';

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    type: string;
    style: string;
    pages: number;
    preview: string;
    features: string[];
    isActive: boolean;
  };
  onPreview: () => void;
  onActivate: () => void;
}

const TemplateCard = ({ template, onPreview, onActivate }: TemplateCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      {template.isActive && (
        <div className="bg-green-500 text-white text-xs font-semibold py-1 px-3 text-center">
          ACTIVE TEMPLATE
        </div>
      )}
      <div
        className="h-48 flex items-center justify-center text-white font-semibold text-lg"
        style={{ background: template.preview }}
      >
        {template.name}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 mb-2">{template.name}</h3>
        <div className="flex gap-2 mb-3">
          <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
            {template.type}
          </span>
          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
            {template.style}
          </span>
        </div>
        <p className="text-sm text-slate-600 mb-3">
          {template.pages} {template.pages === 1 ? 'Page' : 'Pages'} Included
        </p>
        <div className="flex gap-2">
          <button
            onClick={onPreview}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm"
          >
            <Eye size={16} />
            Preview
          </button>
          {!template.isActive && (
            <button
              onClick={onActivate}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              <Check size={16} />
              Use This
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
