import { useState, useRef } from 'react';
import { Upload, Trash2, Copy, Search, Filter, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import { uploadMediaApi } from '../../api/media';

const Media = () => {
  const { media, addMedia, deleteMedia, addToast } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = media.filter((item) => {
    const matchType = filter === 'all' || item.type === filter;
    const matchSearch = item.filename.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

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
        addToast(`${file.name} uploaded successfully`, 'success');
      } catch {
        addToast('Upload failed', 'error');
      }
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url).catch(() => {});
    addToast('URL copied to clipboard', 'success');
  };

  const selectedItem = media.find((m) => m.id === selected);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Media Library</h1>
            <p className="text-slate-500 text-sm mt-1">{media.length} files uploaded</p>
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Upload size={18} />
            Upload Files
          </button>
          <input ref={fileRef} type="file" multiple accept="image/*,.pdf,.svg" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="Search files..." />
          </div>
          <div className="flex gap-1 items-center">
            <Filter size={16} className="text-slate-400 mr-1" />
            {['all', 'image', 'icon', 'document'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-lg text-sm capitalize transition-colors ${filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                {f === 'all' ? 'All' : f + 's'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelected(item.id === selected ? null : item.id)}
                className={`bg-white rounded-xl border-2 overflow-hidden cursor-pointer hover:shadow-md transition-all group ${selected === item.id ? 'border-indigo-500' : 'border-slate-200'}`}
              >
                <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                  {item.type === 'image' ? (
                    <img src={item.url} alt={item.filename} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
                  ) : (
                    <div className="text-4xl">{item.type === 'document' ? '📄' : '🎯'}</div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-slate-800 truncate">{item.filename}</p>
                  <p className="text-xs text-slate-500">{formatSize(item.size)}</p>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16">
                <Upload size={40} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No media found. Upload some files.</p>
              </div>
            )}
          </div>

          {selectedItem && (
            <div className="w-72 bg-white rounded-xl border border-slate-200 p-5 h-fit sticky top-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800 text-sm">File Details</h3>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
              </div>
              <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-4">
                {selectedItem.type === 'image' ? (
                  <img src={selectedItem.url} alt={selectedItem.filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">📄</div>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="text-slate-500">Name:</span> <span className="font-medium text-slate-800 break-all">{selectedItem.filename}</span></div>
                <div><span className="text-slate-500">Size:</span> <span className="font-medium text-slate-800">{formatSize(selectedItem.size)}</span></div>
                <div><span className="text-slate-500">Type:</span> <span className="font-medium text-slate-800 capitalize">{selectedItem.type}</span></div>
                <div><span className="text-slate-500">Date:</span> <span className="font-medium text-slate-800">{selectedItem.uploadedAt}</span></div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleCopyUrl(selectedItem.url)} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm">
                  <Copy size={14} />
                  Copy URL
                </button>
                <button onClick={() => { deleteMedia(selectedItem.id); setSelected(null); addToast('File deleted', 'success'); }} className="p-2 text-red-500 border border-red-200 rounded-lg hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Media;
