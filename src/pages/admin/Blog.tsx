import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApp } from '../../contexts/AppContext';

const Blog = () => {
  const { blogPosts, deleteBlogPost, addToast } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = blogPosts.filter((p) =>
    p.title.en.toLowerCase().includes(search.toLowerCase()) ||
    p.title.ar.includes(search)
  );

  const handleDelete = (id: string) => {
    deleteBlogPost(id);
    addToast('Post deleted', 'success');
  };

  const statusColors: Record<string, string> = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
    scheduled: 'bg-blue-100 text-blue-700',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Blog Manager</h1>
            <p className="text-slate-500 text-sm mt-1">{blogPosts.length} posts total</p>
          </div>
          <button
            onClick={() => navigate('/admin/blog/new')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} />
            New Post
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              placeholder="Search posts..."
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">{post.title.en}</p>
                    <p className="text-xs text-slate-500 font-cairo" dir="rtl">{post.title.ar}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{post.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColors[post.status] || ''}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{post.publishDate}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate(`/admin/blog/${post.id}`)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">No posts found.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Blog;
