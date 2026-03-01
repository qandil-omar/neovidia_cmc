import { useState } from 'react';
import { Inbox, Mail, MailOpen, CheckCircle2 } from 'lucide-react';
import ClientLayout from '../../components/client/ClientLayout';
import { useApp } from '../../contexts/AppContext';
import type { Lead } from '../../types';

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700' },
  read: { label: 'Read', color: 'bg-slate-100 text-slate-600' },
  replied: { label: 'Replied', color: 'bg-green-100 text-green-700' },
};

const ClientLeads = () => {
  const { leads, updateLeadStatus, lang } = useApp();
  const [selected, setSelected] = useState<Lead | null>(null);

  const handleOpen = (lead: Lead) => {
    setSelected(lead);
    if (lead.status === 'new') updateLeadStatus(lead.id, 'read');
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <ClientLayout>
      <div className="max-w-3xl space-y-5">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {lang === 'ar' ? 'الرسائل والاستفسارات' : 'Forms & Leads'}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">{leads.length} total submissions</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => handleOpen(lead)}
                className={`flex items-start gap-3 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors ${selected?.id === lead.id ? 'bg-blue-50' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${lead.status === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                  {lead.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${lead.status === 'new' ? 'text-slate-900' : 'text-slate-700'}`}>{lead.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[lead.status].color}`}>{statusConfig[lead.status].label}</span>
                      <span className="text-xs text-slate-400">{formatDate(lead.createdAt)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{lead.email}</p>
                  <p className="text-xs text-slate-600 mt-1 truncate">{lead.message}</p>
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <div className="py-16 text-center">
                <Inbox size={36} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No leads yet</p>
              </div>
            )}
          </div>
        </div>

        {selected && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Message Details</h3>
              <button onClick={() => setSelected(null)} className="text-xs text-slate-400 hover:text-slate-600">Close</button>
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="text-slate-500">From: </span><span className="font-medium">{selected.name}</span></div>
              <div><span className="text-slate-500">Email: </span><a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">{selected.email}</a></div>
              {selected.phone && <div><span className="text-slate-500">Phone: </span><span>{selected.phone}</span></div>}
              <div><span className="text-slate-500">Date: </span><span>{formatDate(selected.createdAt)}</span></div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <p className="text-sm text-slate-700 leading-relaxed">{selected.message}</p>
            </div>
            <a
              href={`mailto:${selected.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Mail size={14} />
              Reply by Email
            </a>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientLeads;
