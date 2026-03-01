import { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import FieldRenderer from './FieldRenderer';
import type { SectionConfig, Lang } from '../../types';

interface SectionAccordionProps {
  section: SectionConfig;
  content: Record<string, any>;
  onContentChange: (sectionId: string, key: string, value: any) => void;
  onVisibilityChange?: (sectionId: string, visible: boolean) => void;
  lang: Lang;
  disabled?: boolean;
  showVisibilityToggle?: boolean;
  defaultExpanded?: boolean;
}

const SectionAccordion = ({
  section,
  content,
  onContentChange,
  onVisibilityChange,
  lang,
  disabled = false,
  showVisibilityToggle = true,
  defaultExpanded = false,
}: SectionAccordionProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const isVisible = content?.visible !== false;
  const sectionName = section.name[lang] || section.name.en;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div
        className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
          expanded ? 'bg-indigo-50 border-b border-indigo-100' : 'bg-slate-50 hover:bg-slate-100'
        }`}
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex items-center gap-3">
          {showVisibilityToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVisibilityChange?.(section.id, !isVisible);
              }}
              className={`p-1 rounded ${isVisible ? 'text-indigo-600 hover:bg-indigo-100' : 'text-slate-400 hover:bg-slate-200'}`}
              title={isVisible ? 'Hide section' : 'Show section'}
            >
              {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          )}
          <span className={`font-semibold text-sm ${expanded ? 'text-indigo-700' : 'text-slate-800'}`}>
            {sectionName}
          </span>
          {!isVisible && (
            <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-500 rounded-full">Hidden</span>
          )}
        </div>
        {expanded ? (
          <ChevronUp size={18} className="text-slate-500" />
        ) : (
          <ChevronDown size={18} className="text-slate-500" />
        )}
      </div>

      {expanded && (
        <div className={`p-4 space-y-4 bg-white ${!isVisible ? 'opacity-50 pointer-events-none' : ''}`}>
          {section.fields.map((field) => (
            <FieldRenderer
              key={field.key}
              field={field}
              value={content?.[field.key]}
              onChange={(k, v) => onContentChange(section.id, k, v)}
              lang={lang}
              allValues={content || {}}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionAccordion;
