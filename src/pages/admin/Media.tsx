import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import { Upload, Trash2, Copy, Filter } from 'lucide-react';

const Media = () => {
  const { media, showToast } = useApp();
  const [filter, setFilter] = useState('all');

  const filteredMedia = media.filter((item) =>
    filter === 'all' ? true : item.type === filter
  );

  const handleCopyLink = (url: string) => {
    showToast('Link copied to clipboard', 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Media Library</h1>
            <p className="text-slate-600 mt-1">
              Manage images and documents for your website
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Upload size={18} />
            Upload Files
          </button>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-500" />
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('image')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'image'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setFilter('document')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'document'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Documents
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-square bg-slate-100 flex items-center justify-center">
                {item.type === 'image' ? (
                  <div
                    className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
                  >
                    <span className="text-4xl">🖼️</span>
                  </div>
                ) : (
                  <div className="text-5xl">📄</div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {item.filename}
                </p>
                <p className="text-xs text-slate-500 mt-1">{item.size}</p>
                <p className="text-xs text-slate-400">{item.date}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleCopyLink(item.url)}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50"
                  >
                    <Copy size={12} />
                    Copy
                  </button>
                  <button className="flex items-center justify-center px-2 py-1 border border-red-300 text-red-600 rounded text-xs hover:bg-red-50">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No media files found.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Media;
