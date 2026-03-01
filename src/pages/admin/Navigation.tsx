import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';
import Modal from '../../components/Modal';

const Navigation = () => {
  const { navigationMenu, addNavigationItem, deleteNavigationItem, updateNavigationMenu, showToast } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newLink, setNewLink] = useState('');

  const handleAddItem = () => {
    addNavigationItem({ label: newLabel, link: newLink, order: navigationMenu.length + 1, parent: null });
    setShowAddModal(false);
    setNewLabel('');
    setNewLink('');
    showToast('Menu item added', 'success');
  };

  const handleSave = () => {
    showToast('Navigation menu saved', 'success');
  };

  const getChildren = (parentId: string) => {
    return navigationMenu.filter((item) => item.parent === parentId);
  };

  const topLevelItems = navigationMenu.filter((item) => !item.parent);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Navigation Menu</h1>
            <p className="text-slate-600 mt-1">Build and organize your site navigation</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} />
            Add Menu Item
          </button>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="space-y-2">
            {topLevelItems.map((item) => {
              const children = getChildren(item.id);
              return (
                <div key={item.id}>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group">
                    <GripVertical size={18} className="text-slate-400 cursor-move" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{item.label}</p>
                      <p className="text-sm text-slate-500">{item.link}</p>
                    </div>
                    <button
                      onClick={() => deleteNavigationItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {children.length > 0 && (
                    <div className="ml-12 mt-2 space-y-2">
                      {children.map((child) => (
                        <div
                          key={child.id}
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border-l-2 border-indigo-400 group"
                        >
                          <GripVertical size={18} className="text-slate-400 cursor-move" />
                          <div className="flex-1">
                            <p className="font-medium text-slate-800">{child.label}</p>
                            <p className="text-sm text-slate-500">{child.link}</p>
                          </div>
                          <button
                            onClick={() => deleteNavigationItem(child.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {navigationMenu.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No menu items yet. Add one to get started.
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Save size={16} />
              Save Menu
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Menu Item"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Item
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Label</label>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="About Us"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Link</label>
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="/about"
            />
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Navigation;
