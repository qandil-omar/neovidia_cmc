import { createContext, useContext, useState, ReactNode } from 'react';
import {
  mockTemplates,
  mockPages,
  mockMedia,
  mockLeads,
  mockClientAccount,
  mockSiteSettings,
  mockNavigationMenu,
  mockActivityLog,
} from '../mockData';

interface AppContextType {
  templates: typeof mockTemplates;
  pages: typeof mockPages;
  media: typeof mockMedia;
  leads: typeof mockLeads;
  clientAccount: typeof mockClientAccount;
  siteSettings: typeof mockSiteSettings;
  navigationMenu: typeof mockNavigationMenu;
  activityLog: typeof mockActivityLog;
  updateTemplate: (id: string) => void;
  updatePage: (id: string, data: any) => void;
  updateSiteSettings: (category: string, data: any) => void;
  updateClientPermissions: (permissions: any) => void;
  updateLeadStatus: (id: string, status: string) => void;
  addNavigationItem: (item: any) => void;
  deleteNavigationItem: (id: string) => void;
  updateNavigationMenu: (items: any[]) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  toast: { show: boolean; message: string; type: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [templates, setTemplates] = useState(mockTemplates);
  const [pages, setPages] = useState(mockPages);
  const [media] = useState(mockMedia);
  const [leads, setLeads] = useState(mockLeads);
  const [clientAccount, setClientAccount] = useState(mockClientAccount);
  const [siteSettings, setSiteSettings] = useState(mockSiteSettings);
  const [navigationMenu, setNavigationMenu] = useState(mockNavigationMenu);
  const [activityLog] = useState(mockActivityLog);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: string } | null>(null);

  const updateTemplate = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => ({ ...t, isActive: t.id === id }))
    );
  };

  const updatePage = (id: string, data: any) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const updateSiteSettings = (category: string, data: any) => {
    setSiteSettings((prev) => ({
      ...prev,
      [category]: { ...prev[category as keyof typeof prev], ...data },
    }));
  };

  const updateClientPermissions = (permissions: any) => {
    setClientAccount((prev) => ({
      ...prev,
      permissions: { ...prev.permissions, ...permissions },
    }));
  };

  const updateLeadStatus = (id: string, status: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  const addNavigationItem = (item: any) => {
    setNavigationMenu((prev) => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const deleteNavigationItem = (id: string) => {
    setNavigationMenu((prev) => prev.filter((item) => item.id !== id));
  };

  const updateNavigationMenu = (items: any[]) => {
    setNavigationMenu(items);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppContext.Provider
      value={{
        templates,
        pages,
        media,
        leads,
        clientAccount,
        siteSettings,
        navigationMenu,
        activityLog,
        updateTemplate,
        updatePage,
        updateSiteSettings,
        updateClientPermissions,
        updateLeadStatus,
        addNavigationItem,
        deleteNavigationItem,
        updateNavigationMenu,
        showToast,
        toast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
