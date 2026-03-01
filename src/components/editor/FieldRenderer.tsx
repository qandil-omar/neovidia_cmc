import { useState } from 'react';
import { Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import type { FieldConfig, Lang } from '../../types';
import IconPicker, { IconDisplay } from './IconPicker';

interface FieldRendererProps {
  field: FieldConfig;
  value: any;
  onChange: (key: string, value: any) => void;
  lang: Lang;
  allValues: Record<string, any>;
  disabled?: boolean;
  depth?: number;
}

const inputBase =
  'w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-colors disabled:bg-slate-50 disabled:text-slate-500';

const FieldRenderer = ({ field, value, onChange, lang, allValues, disabled = false, depth = 0 }: FieldRendererProps) => {
  if (field.condition) {
    const condVal = allValues[field.condition.field];
    const matches = String(condVal) === field.condition.value;
    if (!matches) return null;
  }

  const getVal = () => {
    if (field.multilingual) {
      return typeof value === 'object' && value !== null ? (value[lang] ?? '') : (value ?? '');
    }
    return value ?? '';
  };

  const setVal = (v: any) => {
    if (field.multilingual) {
      const curr = typeof value === 'object' && value !== null ? value : {};
      onChange(field.key, { ...curr, [lang]: v });
    } else {
      onChange(field.key, v);
    }
  };

  const label = field.label[lang] || field.label.en;

  if (field.type === 'text') {
    return (
      <div>
        <Label text={label} multilingual={field.multilingual} lang={lang} />
        <input
          type="text"
          value={getVal()}
          onChange={(e) => setVal(e.target.value)}
          disabled={disabled}
          className={inputBase}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div>
        <Label text={label} multilingual={field.multilingual} lang={lang} />
        <textarea
          value={getVal()}
          onChange={(e) => setVal(e.target.value)}
          disabled={disabled}
          rows={3}
          className={`${inputBase} resize-none`}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />
      </div>
    );
  }

  if (field.type === 'richtext') {
    return (
      <div>
        <Label text={label} multilingual={field.multilingual} lang={lang} />
        <RichTextEditor
          value={getVal()}
          onChange={setVal}
          disabled={disabled}
          lang={lang}
        />
      </div>
    );
  }

  if (field.type === 'number') {
    return (
      <div>
        <Label text={label} multilingual={field.multilingual} lang={lang} />
        <input
          type="number"
          value={getVal()}
          onChange={(e) => setVal(Number(e.target.value))}
          disabled={disabled}
          className={inputBase}
        />
      </div>
    );
  }

  if (field.type === 'color') {
    return (
      <div>
        <Label text={label} />
        <div className="flex gap-2">
          <input
            type="color"
            value={getVal() || '#6366f1'}
            onChange={(e) => setVal(e.target.value)}
            disabled={disabled}
            className="w-12 h-10 rounded-lg border border-slate-300 cursor-pointer p-0.5"
          />
          <input
            type="text"
            value={getVal() || '#6366f1'}
            onChange={(e) => setVal(e.target.value)}
            disabled={disabled}
            className={`flex-1 ${inputBase}`}
            placeholder="#000000"
          />
        </div>
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div>
        <Label text={label} />
        <select
          value={getVal()}
          onChange={(e) => setVal(e.target.value)}
          disabled={disabled}
          className={inputBase}
        >
          <option value="">-- Select --</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === 'toggle') {
    const checked = Boolean(getVal());
    return (
      <div className="flex items-center justify-between py-1">
        <Label text={label} />
        <button
          onClick={() => !disabled && setVal(!checked)}
          disabled={disabled}
          className={`relative w-12 h-6 rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-slate-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>
    );
  }

  if (field.type === 'image') {
    return (
      <div>
        <Label text={label} />
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors">
          {value ? (
            <div className="relative">
              <img src={value} alt="" className="max-h-32 mx-auto rounded object-cover" />
              {!disabled && (
                <button
                  onClick={() => onChange(field.key, '')}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ) : (
            <div className="py-2">
              <ImageIcon size={24} className="text-slate-400 mx-auto mb-1" />
              <p className="text-xs text-slate-500">Click to upload image</p>
            </div>
          )}
          {!disabled && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  onChange(field.key, url);
                }
              }}
              className="hidden"
              id={`img-${field.key}`}
            />
          )}
          {!disabled && (
            <label
              htmlFor={`img-${field.key}`}
              className="mt-2 inline-block cursor-pointer px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
            >
              {value ? 'Change Image' : 'Upload Image'}
            </label>
          )}
        </div>
      </div>
    );
  }

  if (field.type === 'icon') {
    return (
      <IconField
        label={label}
        value={value}
        onChange={(v) => onChange(field.key, v)}
        disabled={disabled}
      />
    );
  }

  if (field.type === 'group') {
    return (
      <div className="border border-slate-200 rounded-lg p-4 space-y-3">
        <h4 className="text-sm font-semibold text-slate-700">{label}</h4>
        {field.subfields?.map((sub) => (
          <FieldRenderer
            key={sub.key}
            field={sub}
            value={value?.[sub.key]}
            onChange={(k, v) => onChange(field.key, { ...(value || {}), [k]: v })}
            lang={lang}
            allValues={value || {}}
            disabled={disabled}
            depth={depth + 1}
          />
        ))}
      </div>
    );
  }

  if (field.type === 'repeater') {
    return (
      <RepeaterField
        field={field}
        value={value}
        onChange={(v) => onChange(field.key, v)}
        lang={lang}
        disabled={disabled}
        depth={depth}
      />
    );
  }

  return null;
};

const Label = ({ text, multilingual, lang }: { text: string; multilingual?: boolean; lang?: Lang }) => (
  <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
    {text}
    {multilingual && lang && (
      <span className="text-xs px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded font-normal">
        {lang.toUpperCase()}
      </span>
    )}
  </label>
);

const IconField = ({ label, value, onChange, disabled }: { label: string; value: string; onChange: (v: string) => void; disabled?: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Label text={label} />
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 border border-slate-300 rounded-lg flex items-center justify-center bg-slate-50">
          {value ? <IconDisplay name={value} size={24} className="text-slate-700" /> : <span className="text-xs text-slate-400">None</span>}
        </div>
        {!disabled && (
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm hover:bg-slate-50"
          >
            {value ? 'Change Icon' : 'Choose Icon'}
          </button>
        )}
        {value && !disabled && (
          <button onClick={() => onChange('')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
            <Trash2 size={14} />
          </button>
        )}
      </div>
      <IconPicker isOpen={open} onClose={() => setOpen(false)} onSelect={onChange} currentIcon={value} />
    </div>
  );
};

const RepeaterField = ({
  field, value, onChange, lang, disabled, depth,
}: {
  field: FieldConfig;
  value: any[];
  onChange: (v: any[]) => void;
  lang: Lang;
  disabled?: boolean;
  depth: number;
}) => {
  const items = Array.isArray(value) ? value : [];
  const label = field.label[lang] || field.label.en;

  const addItem = () => {
    const newItem: Record<string, any> = {};
    field.subfields?.forEach((sf) => { newItem[sf.key] = sf.multilingual ? { ar: '', en: '' } : ''; });
    onChange([...items, newItem]);
  };

  const removeItem = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, key: string, v: any) => {
    const updated = items.map((item, i) => (i === idx ? { ...item, [key]: v } : item));
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label text={label} />
        {!disabled && (
          <button
            onClick={addItem}
            className="flex items-center gap-1 text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={12} />
            Add Item
          </button>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-slate-50 relative">
            {!disabled && (
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GripVertical size={16} className="text-slate-400 cursor-move" />
                  <span className="text-xs font-medium text-slate-600">Item {idx + 1}</span>
                </div>
                <button
                  onClick={() => removeItem(idx)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
            <div className="space-y-3">
              {field.subfields?.map((sf) => (
                <FieldRenderer
                  key={sf.key}
                  field={sf}
                  value={item[sf.key]}
                  onChange={(k, v) => updateItem(idx, k, v)}
                  lang={lang}
                  allValues={item}
                  disabled={disabled}
                  depth={depth + 1}
                />
              ))}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-6 text-sm text-slate-500 border-2 border-dashed border-slate-300 rounded-lg">
            No items yet. Click "Add Item" to start.
          </div>
        )}
      </div>
    </div>
  );
};

const RichTextEditor = ({ value, onChange, disabled, lang }: { value: string; onChange: (v: string) => void; disabled?: boolean; lang: Lang }) => {
  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden">
      {!disabled && (
        <div className="flex gap-1 bg-slate-50 border-b border-slate-300 px-2 py-1">
          {[
            { label: 'B', cmd: 'bold' },
            { label: 'I', cmd: 'italic' },
            { label: 'U', cmd: 'underline' },
          ].map(({ label, cmd }) => (
            <button
              key={cmd}
              onMouseDown={(e) => {
                e.preventDefault();
                document.execCommand(cmd);
              }}
              className="px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded"
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div
        contentEditable={!disabled}
        suppressContentEditableWarning
        onBlur={(e) => onChange(e.currentTarget.innerHTML)}
        className="min-h-24 p-3 text-sm text-slate-800 focus:outline-none"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        dangerouslySetInnerHTML={{ __html: value || '' }}
      />
    </div>
  );
};

export default FieldRenderer;
