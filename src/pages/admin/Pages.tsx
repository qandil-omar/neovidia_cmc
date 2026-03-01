import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import Modal from '../../components/Modal';
import { useApp } from '../../contexts/AppContext';
import { FileText, Star, Edit, Settings as SettingsIcon, Trash2, Plus } from 'lucide-react';

const Pages = () => {
  const { pages, updatePage, showToast } = useApp();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');

  const handleToggleStatus = (pageId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'hidden' : 'published';
    updatePage(pageId, { status: newStatus });
    showToast(
      `Page ${newStatus === 'published' ? 'published' : 'hidden'} successfully`,
      'success'
    );
  };

  const handleAddPage = () => {
    setShowAddModal(false);
    setNewPageName('');
    setNewPageSlug('');
    showToast('Page created successfully', 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Pages</h1>
            <p className="text-slate-600 mt-1">
              Manage all pages in your website
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} />
            Add New Page
          </button>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                  Page
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                  Slug
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                  Last Edited
                </th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-slate-400" />
                      <span className="font-medium text-slate-800">
                        {page.name}
                      </span>
                      {page.isHomepage && (
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {page.slug}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(page.id, page.status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        page.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {page.status === 'published' ? 'Published' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {page.lastEdited}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/pages/edit/${page.id}`)}
                        className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                        title="Edit Content"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                        title="SEO Settings"
                      >
                        <SettingsIcon size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Page"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Page
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Page Name
            </label>
            <input
              type="text"
              value={newPageName}
              onChange={(e) => {
                setNewPageName(e.target.value);
                setNewPageSlug(
                  '/' + e.target.value.toLowerCase().replace(/\s+/g, '-')
                );
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="About Us"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={newPageSlug}
              onChange={(e) => setNewPageSlug(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="/about-us"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Visibility
            </label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
              <option>Published</option>
              <option>Hidden</option>
            </select>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Pages;
