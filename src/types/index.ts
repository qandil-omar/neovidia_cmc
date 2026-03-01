export type Lang = 'ar' | 'en';
export type UserRole = 'superadmin' | 'client';

export interface BilingualString {
  ar: string;
  en: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

export interface FieldCondition {
  field: string;
  value: string;
}

export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'image'
  | 'icon'
  | 'color'
  | 'select'
  | 'toggle'
  | 'number'
  | 'repeater'
  | 'group';

export interface FieldConfig {
  key: string;
  type: FieldType;
  label: BilingualString;
  multilingual?: boolean;
  options?: string[];
  subfields?: FieldConfig[];
  condition?: FieldCondition;
  placeholder?: BilingualString;
  required?: boolean;
}

export interface SectionConfig {
  id: string;
  name: BilingualString;
  fields: FieldConfig[];
}

export interface PageConfig {
  id: string;
  name: BilingualString;
  sections: string[];
  slug?: string;
}

export interface TemplateConfig {
  id: string;
  name: string;
  version: string;
  type: 'multipage' | 'onepage' | 'landing';
  style: 'modern' | 'classic' | 'minimal' | 'bold';
  language: 'ar' | 'en' | 'both';
  preview_image?: string;
  preview_gradient?: string;
  pages: PageConfig[];
  sections: SectionConfig[];
}

export interface PageContent {
  [sectionId: string]: {
    visible?: boolean;
    [fieldKey: string]: any;
  };
}

export interface Page {
  id: string;
  templateId: string;
  pageConfigId: string;
  name: BilingualString;
  slug: string;
  status: 'published' | 'draft' | 'hidden';
  isHomepage: boolean;
  lastEdited: string;
  content: PageContent;
}

export interface BlogPost {
  id: string;
  title: BilingualString;
  slug: string;
  content: BilingualString;
  excerpt: BilingualString;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft' | 'scheduled';
  publishDate: string;
  seo: {
    metaTitle: BilingualString;
    metaDescription: BilingualString;
    ogImage?: string;
  };
  author: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  type: 'image' | 'icon' | 'document';
  size: number;
  url: string;
  uploadedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface NavigationItem {
  id: string;
  labelAr: string;
  labelEn: string;
  link: string;
  openInNewTab: boolean;
  order: number;
  parentId?: string | null;
  children?: NavigationItem[];
}

export interface ClientPermissions {
  pages: Record<string, boolean>;
  sections: Record<string, { visible: boolean; editable: boolean }>;
  features: {
    blog: boolean;
    leads: boolean;
    media: boolean;
    change_language: boolean;
    seo_settings: boolean;
  };
}

export interface ClientAccount {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: ClientPermissions;
}

export interface SiteSettings {
  general: {
    siteNameAr: string;
    siteNameEn: string;
    taglineAr: string;
    taglineEn: string;
    logo?: string;
    favicon?: string;
    contactEmail: string;
    phone: string;
    whatsapp: string;
  };
  design: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: 'small' | 'medium' | 'large';
    borderRadius: 'sharp' | 'rounded' | 'pill';
  };
  seo: {
    metaTitleAr: string;
    metaTitleEn: string;
    metaDescriptionAr: string;
    metaDescriptionEn: string;
    ogImage?: string;
    analyticsId?: string;
    searchConsoleCode?: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
    snapchat?: string;
    pinterest?: string;
  };
  language: {
    defaultLang: 'ar' | 'en';
    rtlMode: 'auto' | 'always' | 'never';
    showSwitcher: boolean;
  };
  advanced: {
    customCSS: string;
    customJsHead: string;
    customJsFooter: string;
    maintenanceMode: boolean;
  };
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
