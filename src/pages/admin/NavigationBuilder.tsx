import { useState } from 'react';
import { Plus, Trash2, Save, GripVertical, ChevronRight, ExternalLink } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import type { NavigationItem } from '../../types';

const NavigationBuilder = () => {
  const { navigation, updateNavigation, addToast } = useApp();
  const [items, setItems] = useState<NavigationItem[]>(navigation);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const topLevel = items.filter((i) => !i.parentId).sort((a, b) => a.order - b.order);

  const addItem = (parentId?: string) => {
    const newItem: NavigationItem = {
      id: `nav-${Date.now()}`,
      labelAr: 'رابط جديد',
      labelEn: 'New Link',
      link: '/',
      openInNewTab: false,
      order: items.filter((i) => i.parentId === (parentId || null)).length + 1,
      parentId: parentId || null,
    };
    setItems((prev) => [...prev, newItem]);
    setEditingId(newItem.id);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id && i.parentId !== id));
  };

  const updateItem = (id: string, field: keyof NavigationItem, value: any) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleSave = () => {
    updateNavigation(items);
    addToast('Navigation saved', 'success');
  };

  const NavItemRow = ({ item, depth = 0 }: { item: NavigationItem; depth?: number }) => {
    const children = items.filter((i) => i.parentId === item.id).sort((a, b) => a.order - b.order);
    const isEditing = editingId === item.id;

    return (
      <div className={depth > 0 ? 'ml-8' : ''}>
        <div
          draggable
          onDragStart={() => setDraggedId(item.id)}
          onDragEnd={() => setDraggedId(null)}
          className={`bg-white border border-slate-200 rounded-xl mb-2 overflow-hidden transition-all ${draggedId === item.id ? 'opacity-50' : ''}`}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <GripVertical size={16} className="text-slate-300 cursor-grab flex-shrink-0" />
            {depth > 0 && <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="grid grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={item.labelEn}
                    onChange={(e) => updateItem(item.id, 'labelEn', e.target.value)}
                    placeholder="English label"
                    className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={item.labelAr}
                    onChange={(e) => updateItem(item.id, 'labelAr', e.target.value)}
                    placeholder="التسمية العربية"
                    dir="rtl"
                    className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 font-cairo"
                  />
                  <input
                    type="text"
                    value={item.link}
                    onChange={(e) => updateItem(item.id, 'link', e.target.value)}
                    placeholder="URL or /path"
                    className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.openInNewTab}
                        onChange={(e) => updateItem(item.id, 'openInNewTab', e.target.checked)}
                        className="w-3.5 h-3.5"
                      />
                      New tab
                    </label>
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium">
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-800">{item.labelEn}</span>
                      {item.openInNewTab && <ExternalLink size={12} className="text-slate-400" />}
                    </div>
                    <span className="text-xs text-slate-500 font-cairo" dir="rtl">{item.labelAr}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">{item.link}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {!isEditing && (
                <button onClick={() => setEditingId(item.id)} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  Edit
                </button>
              )}
              {depth === 0 && (
                <button
                  onClick={() => addItem(item.id)}
                  className="px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Plus size={12} />
                  Sub-item
                </button>
              )}
              <button onClick={() => removeItem(item.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
        {children.map((child) => (
          <NavItemRow key={child.id} item={child} depth={depth + 1} />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Navigation Builder</h1>
            <p className="text-slate-500 text-sm mt-1">Build and organize your website navigation menu</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <Save size={16} />
            Save Menu
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <GripVertical size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-800">Drag to reorder</p>
            <p className="text-xs text-blue-600 mt-0.5">Drag items up or down to change their order. Use "Sub-item" to create dropdown menus.</p>
          </div>
        </div>

        <div>
          {topLevel.map((item) => (
            <NavItemRow key={item.id} item={item} />
          ))}
          {topLevel.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-sm">No navigation items yet</p>
            </div>
          )}
        </div>

        <button
          onClick={() => addItem()}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 text-slate-600 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Add Navigation Item
        </button>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Preview</h3>
          <div className="bg-slate-900 rounded-xl p-4">
            <nav className="flex items-center gap-1 flex-wrap">
              {topLevel.map((item) => {
                const children = items.filter((i) => i.parentId === item.id);
                return (
                  <div key={item.id} className="relative group">
                    <div className="flex items-center gap-1 px-4 py-2 text-white text-sm hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
                      {item.labelEn}
                      {children.length > 0 && <ChevronRight size={12} className="opacity-60" />}
                    </div>
                    {children.length > 0 && (
                      <div className="absolute top-full left-0 bg-white border border-slate-200 rounded-xl shadow-xl p-1 min-w-40 hidden group-hover:block z-10">
                        {children.map((child) => (
                          <div key={child.id} className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer">
                            {child.labelEn}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NavigationBuilder;
