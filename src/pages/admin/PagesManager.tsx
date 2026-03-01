import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Star, Edit, Trash2, Plus, Globe, EyeOff } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/ui/Modal';
import { useApp } from '../../contexts/AppContext';

const PagesManager = () => {
  const { pages, updatePage, activeTemplate, addToast } = useApp();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState({ ar: '', en: '' });
  const [newSlug, setNewSlug] = useState('');

  const handleToggleStatus = (id: string, current: string) => {
    const next = current === 'published' ? 'hidden' : 'published';
    updatePage(id, { status: next as any });
    addToast(`Page ${next}`, 'success');
  };

  const templatePages = activeTemplate?.pages || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Pages Manager</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and organize website pages</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} />
            Add Page
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Page</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Slug</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Sections</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Last Edited</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pages.map((page) => {
                  const tPage = templatePages.find((tp) => tp.id === page.pageConfigId);
                  return (
                    <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <FileText size={16} className="text-indigo-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">{page.name.en}</span>
                              {page.isHomepage && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                            </div>
                            <span className="text-xs text-slate-500 font-cairo" dir="rtl">{page.name.ar}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600 font-mono bg-slate-100 px-2 py-0.5 rounded">{page.slug}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {tPage?.sections.length || 0} sections
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleToggleStatus(page.id, page.status)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            page.status === 'published'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {page.status === 'published' ? <Globe size={12} /> : <EyeOff size={12} />}
                          {page.status === 'published' ? 'Published' : 'Hidden'}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">{page.lastEdited}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/admin/pages/edit/${page.id}`)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Page"
        footer={
          <>
            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">Cancel</button>
            <button
              onClick={() => { setShowAddModal(false); addToast('Page created successfully', 'success'); }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Create Page
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Page Name (English)</label>
            <input type="text" value={newName.en} onChange={(e) => { setNewName((n) => ({ ...n, en: e.target.value })); setNewSlug('/' + e.target.value.toLowerCase().replace(/\s+/g, '-')); }} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="About Us" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Page Name (Arabic)</label>
            <input type="text" value={newName.ar} onChange={(e) => setNewName((n) => ({ ...n, ar: e.target.value }))} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-right font-cairo" dir="rtl" placeholder="من نحن" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Slug</label>
            <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono" placeholder="/about-us" />
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default PagesManager;
