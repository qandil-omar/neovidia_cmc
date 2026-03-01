import { useState } from 'react';
import { Inbox, Mail, MailOpen, MessageSquare, Trash2, X, Phone, Clock, CheckCircle2, Download } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import type { Lead } from '../../types';

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: Mail },
  read: { label: 'Read', color: 'bg-slate-100 text-slate-600', icon: MailOpen },
  replied: { label: 'Replied', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
};

const Leads = () => {
  const { leads, updateLeadStatus, deleteLead, addToast } = useApp();
  const [selected, setSelected] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<'all' | Lead['status']>('all');

  const filtered = filter === 'all' ? leads : leads.filter((l) => l.status === filter);
  const newCount = leads.filter((l) => l.status === 'new').length;
  const readCount = leads.filter((l) => l.status === 'read').length;
  const repliedCount = leads.filter((l) => l.status === 'replied').length;

  const handleOpen = (lead: Lead) => {
    setSelected(lead);
    if (lead.status === 'new') {
      updateLeadStatus(lead.id, 'read');
    }
  };

  const handleDelete = (id: string) => {
    deleteLead(id);
    if (selected?.id === id) setSelected(null);
    addToast('Lead deleted', 'success');
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Forms & Leads</h1>
            <p className="text-slate-500 text-sm mt-1">{leads.length} total submissions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-sm">
            <Download size={16} />
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'New', count: newCount, color: 'bg-blue-50 border-blue-200', text: 'text-blue-700', icon: Mail },
            { label: 'Read', count: readCount, color: 'bg-slate-50 border-slate-200', text: 'text-slate-700', icon: MailOpen },
            { label: 'Replied', count: repliedCount, color: 'bg-green-50 border-green-200', text: 'text-green-700', icon: CheckCircle2 },
          ].map(({ label, count, color, text, icon: Icon }) => (
            <div key={label} className={`${color} border rounded-xl p-4 flex items-center gap-4`}>
              <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
                <Icon size={20} className={text} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${text}`}>{count}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-1 p-3 border-b border-slate-100">
                {(['all', 'new', 'read', 'replied'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm capitalize font-medium transition-colors ${
                      filter === f ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {f === 'all' ? `All (${leads.length})` : `${f} (${leads.filter((l) => l.status === f).length})`}
                  </button>
                ))}
              </div>
              <div className="divide-y divide-slate-100">
                {filtered.map((lead) => {
                  const cfg = statusConfig[lead.status];
                  return (
                    <div
                      key={lead.id}
                      onClick={() => handleOpen(lead)}
                      className={`flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors ${selected?.id === lead.id ? 'bg-blue-50' : ''}`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${lead.status === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                        <span className="text-sm font-bold">{lead.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-medium text-sm ${lead.status === 'new' ? 'text-slate-900' : 'text-slate-700'}`}>{lead.name}</span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.color}`}>{cfg.label}</span>
                            <span className="text-xs text-slate-400">{formatDate(lead.createdAt)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{lead.email}</p>
                        <p className="text-xs text-slate-600 mt-1 truncate">{lead.message}</p>
                      </div>
                    </div>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="py-16 text-center">
                    <Inbox size={36} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No leads in this category</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {selected && (
            <div className="w-80 bg-white rounded-xl border border-slate-200 h-fit sticky top-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Lead Details</h3>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-lg font-bold text-slate-600">
                    {selected.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{selected.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[selected.status].color}`}>
                      {statusConfig[selected.status].label}
                    </span>
                  </div>
                </div>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5">
                    <Mail size={15} className="text-slate-400 flex-shrink-0" />
                    <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline truncate">{selected.email}</a>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2.5">
                      <Phone size={15} className="text-slate-400 flex-shrink-0" />
                      <span className="text-slate-700">{selected.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5">
                    <Clock size={15} className="text-slate-400 flex-shrink-0" />
                    <span className="text-slate-500 text-xs">{formatDate(selected.createdAt)}</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MessageSquare size={14} className="text-slate-500" />
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Message</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{selected.message}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Update Status</p>
                  <div className="flex gap-2">
                    {(['new', 'read', 'replied'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => { updateLeadStatus(selected.id, s); setSelected({ ...selected, status: s }); addToast(`Marked as ${s}`, 'success'); }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors capitalize ${
                          selected.status === s
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Mail size={14} />
                    Reply by Email
                  </a>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-2 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Leads;
