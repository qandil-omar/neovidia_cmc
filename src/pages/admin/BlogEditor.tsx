import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import type { BlogPost, Lang } from '../../types';

const BlogEditor = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { blogPosts, updateBlogPost, addToast } = useApp();

  const existing = postId !== 'new' ? blogPosts.find((p) => p.id === postId) : undefined;
  const [lang, setLang] = useState<Lang>('en');

  const [post, setPost] = useState<BlogPost>(
    existing || {
      id: `post-${Date.now()}`,
      title: { ar: '', en: '' },
      slug: '',
      content: { ar: '', en: '' },
      excerpt: { ar: '', en: '' },
      category: '',
      tags: [],
      status: 'draft',
      publishDate: new Date().toISOString().split('T')[0],
      seo: {
        metaTitle: { ar: '', en: '' },
        metaDescription: { ar: '', en: '' },
      },
      author: 'Admin',
      createdAt: new Date().toISOString().split('T')[0],
    }
  );

  const [tagsInput, setTagsInput] = useState(post.tags.join(', '));

  const update = (field: string, value: any) => {
    setPost((prev) => ({ ...prev, [field]: value }));
  };

  const updateBiField = (field: string, value: string) => {
    setPost((prev) => ({ ...prev, [field]: { ...(prev[field as keyof BlogPost] as any), [lang]: value } }));
  };

  const handleSave = (publish: boolean = false) => {
    const updated = {
      ...post,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      status: publish ? 'published' as const : post.status,
    };
    updateBlogPost(updated);
    addToast(publish ? 'Post published!' : 'Post saved as draft', 'success');
    navigate('/admin/blog');
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin/blog')} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{postId === 'new' ? 'New Post' : 'Edit Post'}</h1>
            </div>
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {(['ar', 'en'] as Lang[]).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${lang === l ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>
                {l === 'ar' ? 'العربية' : 'English'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title ({lang.toUpperCase()})</label>
                <input
                  type="text"
                  value={(post.title as any)[lang]}
                  onChange={(e) => updateBiField('title', e.target.value)}
                  onBlur={() => { if (lang === 'en' && !post.slug) update('slug', (post.title.en || '').toLowerCase().replace(/\s+/g, '-')); }}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  placeholder={lang === 'ar' ? 'عنوان المقال' : 'Post Title'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Slug</label>
                <input
                  type="text"
                  value={post.slug}
                  onChange={(e) => update('slug', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Excerpt ({lang.toUpperCase()})</label>
                <textarea
                  value={(post.excerpt as any)[lang]}
                  onChange={(e) => updateBiField('excerpt', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Content ({lang.toUpperCase()})</label>
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-300 px-2 py-1.5 flex gap-1">
                    {[{l:'B',cmd:'bold'},{l:'I',cmd:'italic'},{l:'U',cmd:'underline'}].map(({l,cmd}) => (
                      <button key={cmd} onMouseDown={(e) => { e.preventDefault(); document.execCommand(cmd); }} className="px-2 py-0.5 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded">{l}</button>
                    ))}
                  </div>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateBiField('content', e.currentTarget.innerHTML)}
                    className="min-h-40 p-3 text-sm text-slate-800 focus:outline-none"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    dangerouslySetInnerHTML={{ __html: (post.content as any)[lang] || '' }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-slate-800">SEO Settings</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meta Title ({lang.toUpperCase()})</label>
                <input
                  type="text"
                  value={(post.seo.metaTitle as any)[lang]}
                  onChange={(e) => setPost((p) => ({ ...p, seo: { ...p.seo, metaTitle: { ...p.seo.metaTitle, [lang]: e.target.value } } }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description ({lang.toUpperCase()})</label>
                <textarea
                  value={(post.seo.metaDescription as any)[lang]}
                  onChange={(e) => setPost((p) => ({ ...p, seo: { ...p.seo, metaDescription: { ...p.seo.metaDescription, [lang]: e.target.value } } }))}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-slate-800">Publish</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select value={post.status} onChange={(e) => update('status', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Publish Date</label>
                <input type="date" value={post.publishDate} onChange={(e) => update('publishDate', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleSave(false)} className="w-full flex items-center justify-center gap-2 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm">
                  <Save size={14} />
                  Save Draft
                </button>
                <button onClick={() => handleSave(true)} className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                  Publish Now
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-semibold text-slate-800">Featured Image</h3>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors">
                <ImageIcon size={24} className="text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Click to upload</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-semibold text-slate-800">Details</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <input type="text" value={post.category} onChange={(e) => update('category', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="Technology" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma-separated)</label>
                <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="AI, Business" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogEditor;
