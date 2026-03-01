import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { allTemplates } from '../data/templateConfigs';
import { mockPages, mockBlogPosts, mockMedia, mockLeads, mockClientAccount, mockSiteSettings, mockNavigation } from '../data/mockData';
import type {
  TemplateConfig,
  Page,
  BlogPost,
  MediaItem,
  Lead,
  ClientAccount,
  SiteSettings,
  NavigationItem,
  ToastMessage,
  Lang,
} from '../types';

interface AppContextType {
  activeTemplateId: string;
  templates: TemplateConfig[];
  activeTemplate: TemplateConfig | undefined;
  pages: Page[];
  blogPosts: BlogPost[];
  media: MediaItem[];
  leads: Lead[];
  clientAccount: ClientAccount;
  siteSettings: SiteSettings;
  navigation: NavigationItem[];
  lang: Lang;
  toasts: ToastMessage[];
  newLeadsCount: number;

  setActiveTemplate: (id: string) => void;
  updatePage: (id: string, data: Partial<Page>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  addMedia: (item: MediaItem) => void;
  deleteMedia: (id: string) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  deleteLead: (id: string) => void;
  updateClientAccount: (data: Partial<ClientAccount>) => void;
  updateSiteSettings: (data: Partial<SiteSettings>) => void;
  updateNavigation: (items: NavigationItem[]) => void;
  setLang: (lang: Lang) => void;
  addToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeTemplateId, setActiveTemplateId] = useState('modern-business');
  const [templates] = useState<TemplateConfig[]>(allTemplates);
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [media, setMedia] = useState<MediaItem[]>(mockMedia);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [clientAccount, setClientAccount] = useState<ClientAccount>(mockClientAccount);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(mockSiteSettings);
  const [navigation, setNavigation] = useState<NavigationItem[]>(mockNavigation);
  const [lang, setLang] = useState<Lang>('ar');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const activeTemplate = templates.find((t) => t.id === activeTemplateId);
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  const setActiveTemplate = useCallback((id: string) => setActiveTemplateId(id), []);

  const updatePage = useCallback((id: string, data: Partial<Page>) => {
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const updateBlogPost = useCallback((post: BlogPost) => {
    setBlogPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === post.id);
      if (idx >= 0) return prev.map((p) => (p.id === post.id ? post : p));
      return [...prev, post];
    });
  }, []);

  const deleteBlogPost = useCallback((id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addMedia = useCallback((item: MediaItem) => {
    setMedia((prev) => [item, ...prev]);
  }, []);

  const deleteMedia = useCallback((id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const updateLeadStatus = useCallback((id: string, status: Lead['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateClientAccount = useCallback((data: Partial<ClientAccount>) => {
    setClientAccount((prev) => ({ ...prev, ...data }));
  }, []);

  const updateSiteSettings = useCallback((data: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...data }));
  }, []);

  const updateNavigation = useCallback((items: NavigationItem[]) => {
    setNavigation(items);
  }, []);

  const addToast = useCallback((message: string, type: ToastMessage['type']) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeTemplateId,
        templates,
        activeTemplate,
        pages,
        blogPosts,
        media,
        leads,
        clientAccount,
        siteSettings,
        navigation,
        lang,
        toasts,
        newLeadsCount,
        setActiveTemplate,
        updatePage,
        updateBlogPost,
        deleteBlogPost,
        addMedia,
        deleteMedia,
        updateLeadStatus,
        deleteLead,
        updateClientAccount,
        updateSiteSettings,
        updateNavigation,
        setLang,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
