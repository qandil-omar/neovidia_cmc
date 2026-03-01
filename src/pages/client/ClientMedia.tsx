import { useState, useRef } from 'react';
import { Upload, Trash2, Copy, Search } from 'lucide-react';
import ClientLayout from '../../components/client/ClientLayout';
import { useApp } from '../../contexts/AppContext';
import { uploadMediaApi } from '../../api/media';

const ClientMedia = () => {
  const { media, addMedia, deleteMedia, lang, addToast } = useApp();
  const [search, setSearch] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = media.filter((item) =>
    item.filename.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1000) return `${bytes} B`;
    if (bytes < 1000000) return `${(bytes / 1000).toFixed(1)} KB`;
    return `${(bytes / 1000000).toFixed(1)} MB`;
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;
    for (const file of Array.from(files)) {
      try {
        const item = await uploadMediaApi(file);
        addMedia(item);
        addToast(`${file.name} uploaded`, 'success');
      } catch {
        addToast('Upload failed', 'error');
      }
    }
  };

  return (
    <ClientLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {lang === 'ar' ? 'مكتبة الوسائط' : 'Media Library'}
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">{media.length} files</p>
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Upload size={16} />
            Upload
          </button>
          <input ref={fileRef} type="file" multiple accept="image/*,.pdf,.svg" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
        </div>

        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'ar' ? 'بحث في الملفات...' : 'Search files...'}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden group hover:shadow-md transition-all">
              <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-3xl">{item.type === 'document' ? '📄' : '🎯'}</div>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-slate-700 truncate">{item.filename}</p>
                <p className="text-xs text-slate-400">{formatSize(item.size)}</p>
                <div className="flex gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { navigator.clipboard.writeText(item.url).catch(() => {}); addToast('URL copied', 'success'); }}
                    className="flex-1 flex items-center justify-center py-1 text-xs text-slate-600 hover:bg-slate-100 rounded transition-colors"
                  >
                    <Copy size={11} className="mr-1" /> Copy
                  </button>
                  <button
                    onClick={() => { deleteMedia(item.id); addToast('Deleted', 'success'); }}
                    className="p-1 text-red-400 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 text-sm">
              No media files found
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientMedia;
