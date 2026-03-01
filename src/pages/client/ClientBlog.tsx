import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import ClientLayout from '../../components/client/ClientLayout';
import { useApp } from '../../contexts/AppContext';

const statusColors = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-slate-100 text-slate-600',
  scheduled: 'bg-amber-100 text-amber-700',
};

const ClientBlog = () => {
  const { blogPosts, deleteBlogPost, lang, addToast } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = blogPosts.filter((p) => {
    const title = lang === 'ar' ? p.title.ar : p.title.en;
    return title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <ClientLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {lang === 'ar' ? 'إدارة المدونة' : 'Blog Manager'}
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">{blogPosts.length} posts</p>
          </div>
          <button
            onClick={() => navigate('/client/blog/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            New Post
          </button>
        </div>

        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'ar' ? 'بحث في المقالات...' : 'Search posts...'}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filtered.map((post) => (
              <div key={post.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 text-sm truncate">
                    {lang === 'ar' ? post.title.ar : post.title.en}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[post.status]}`}>
                      {post.status}
                    </span>
                    <span className="text-xs text-slate-400">{post.publishDate}</span>
                    <span className="text-xs text-slate-400">{post.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigate(`/client/blog/${post.id}`)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={15} />
                  </button>
                  <button
                    onClick={() => { deleteBlogPost(post.id); addToast('Post deleted', 'success'); }}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-sm">No posts found</div>
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientBlog;
