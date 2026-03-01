import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useApp } from '../../contexts/AppContext';
import { Mail, Phone, MessageSquare, Calendar, Download, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const Forms = () => {
  const { leads, updateLeadStatus, showToast } = useApp();
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  const newLeads = leads.filter((lead) => lead.status === 'new');
  const readLeads = leads.filter((lead) => lead.status === 'read');

  const handleToggleLead = (id: string) => {
    setExpandedLead(expandedLead === id ? null : id);
  };

  const handleMarkAsRead = (id: string) => {
    updateLeadStatus(id, 'read');
    showToast('Lead marked as read', 'success');
  };

  const handleExport = () => {
    showToast('Exporting leads as CSV...', 'info');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Forms & Leads</h1>
            <p className="text-slate-600 mt-1">
              Manage contact form submissions
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {newLeads.length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
              <h2 className="font-semibold text-blue-900">
                New Leads ({newLeads.length})
              </h2>
            </div>
            <div className="divide-y divide-slate-200">
              {newLeads.map((lead) => (
                <LeadRow
                  key={lead.id}
                  lead={lead}
                  expanded={expandedLead === lead.id}
                  onToggle={() => handleToggleLead(lead.id)}
                  onMarkAsRead={() => handleMarkAsRead(lead.id)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
            <h2 className="font-semibold text-slate-800">
              Read Leads ({readLeads.length})
            </h2>
          </div>
          <div className="divide-y divide-slate-200">
            {readLeads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                expanded={expandedLead === lead.id}
                onToggle={() => handleToggleLead(lead.id)}
                onMarkAsRead={() => {}}
              />
            ))}
          </div>
        </div>

        {leads.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-500">No form submissions yet.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

const LeadRow = ({ lead, expanded, onToggle, onMarkAsRead }: any) => {
  return (
    <div>
      <div
        className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-slate-800">{lead.name}</h3>
              {lead.status === 'new' && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  NEW
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Mail size={14} />
                {lead.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={14} />
                {lead.phone}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {lead.date}
              </span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-4 bg-slate-50">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-start gap-2 mb-3">
              <MessageSquare size={16} className="text-slate-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700 mb-1">Message</p>
                <p className="text-sm text-slate-600">{lead.message}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {lead.status === 'new' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead();
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Mark as Read
                </button>
              )}
              <button className="px-3 py-1 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors flex items-center gap-1">
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forms;
