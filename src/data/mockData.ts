import type {
  Page,
  BlogPost,
  MediaItem,
  Lead,
  NavigationItem,
  ClientAccount,
  SiteSettings,
} from '../types';

export const mockPages: Page[] = [
  {
    id: 'page-home',
    templateId: 'modern-business',
    pageConfigId: 'home',
    name: { ar: 'الرئيسية', en: 'Home' },
    slug: '/',
    status: 'published',
    isHomepage: true,
    lastEdited: '2024-02-28',
    content: {
      hero: {
        visible: true,
        title: { ar: 'نقود مستقبل الأعمال الرقمية', en: 'Leading the Digital Business Future' },
        subtitle: {
          ar: 'نقدم حلولاً إبداعية ومتكاملة تساعد عملك على النمو والتوسع في العالم الرقمي',
          en: 'We deliver creative and integrated solutions that help your business grow in the digital world',
        },
        background_type: 'gradient',
        text_align: 'center',
        cta_button: {
          text: { ar: 'ابدأ الآن', en: 'Get Started' },
          link: '/contact',
          style: 'primary',
        },
      },
      about: {
        visible: true,
        title: { ar: 'من نحن', en: 'About Us' },
        description: {
          ar: 'نحن شركة رائدة في مجال الحلول الرقمية مع خبرة تمتد لأكثر من 10 سنوات. نؤمن بقوة التكنولوجيا في تحويل الأعمال وتحقيق النجاح.',
          en: 'We are a leading digital solutions company with over 10 years of experience. We believe in the power of technology to transform businesses.',
        },
        image_position: 'right',
        show_stats: true,
      },
      services: {
        visible: true,
        title: { ar: 'خدماتنا', en: 'Our Services' },
        subtitle: {
          ar: 'نقدم مجموعة شاملة من الخدمات الرقمية',
          en: 'We offer a comprehensive range of digital services',
        },
        columns: '3',
        items: [
          {
            icon: 'Code',
            title: { ar: 'تطوير الويب', en: 'Web Development' },
            description: {
              ar: 'نبني مواقع وتطبيقات ويب احترافية',
              en: 'We build professional websites and web apps',
            },
            link: '/services/web',
          },
          {
            icon: 'Palette',
            title: { ar: 'التصميم الجرافيكي', en: 'Graphic Design' },
            description: {
              ar: 'تصاميم إبداعية تعكس هوية علامتك التجارية',
              en: 'Creative designs reflecting your brand identity',
            },
            link: '/services/design',
          },
          {
            icon: 'TrendingUp',
            title: { ar: 'التسويق الرقمي', en: 'Digital Marketing' },
            description: {
              ar: 'استراتيجيات تسويقية تزيد وصولك وتحقق أهدافك',
              en: 'Marketing strategies that increase your reach',
            },
            link: '/services/marketing',
          },
        ],
      },
      stats: {
        visible: true,
        title: { ar: 'أرقامنا', en: 'Our Numbers' },
        background_color: '#6366f1',
        items: [
          { icon: 'Users', number: '500+', label: { ar: 'عميل راضٍ', en: 'Happy Clients' } },
          { icon: 'CheckCircle', number: '1200+', label: { ar: 'مشروع منجز', en: 'Projects Done' } },
          { icon: 'Award', number: '15+', label: { ar: 'جائزة حصدناها', en: 'Awards Won' } },
          { icon: 'Clock', number: '10+', label: { ar: 'سنوات خبرة', en: 'Years Experience' } },
        ],
      },
      testimonials: {
        visible: true,
        title: { ar: 'ماذا يقول عملاؤنا', en: 'What Our Clients Say' },
        items: [
          {
            name: { ar: 'أحمد الشريف', en: 'Ahmed Al-Sharif' },
            role: { ar: 'المدير التنفيذي، شركة النجاح', en: 'CEO, Success Corp' },
            text: {
              ar: 'خدمة ممتازة وفريق محترف جداً. نصحت بهم جميع أصدقائي.',
              en: 'Excellent service and highly professional team. Highly recommended.',
            },
            avatar: '',
            rating: 5,
          },
          {
            name: { ar: 'سارة المنصور', en: 'Sara Al-Mansour' },
            role: { ar: 'مديرة التسويق، شركة الإبداع', en: 'Marketing Director, Creative Co' },
            text: {
              ar: 'تعاملنا مع شركتهم لسنوات والنتائج دائماً تفوق توقعاتنا.',
              en: 'We have worked with them for years and results always exceed expectations.',
            },
            avatar: '',
            rating: 5,
          },
        ],
      },
      contact: {
        visible: true,
        title: { ar: 'تواصل معنا', en: 'Contact Us' },
        subtitle: {
          ar: 'نحن هنا للإجابة على جميع استفساراتك',
          en: 'We are here to answer all your inquiries',
        },
        phone: '+966 50 123 4567',
        email: 'hello@company.com',
        address: {
          ar: 'الرياض، المملكة العربية السعودية',
          en: 'Riyadh, Saudi Arabia',
        },
        show_map: false,
      },
    },
  },
  {
    id: 'page-about',
    templateId: 'modern-business',
    pageConfigId: 'about',
    name: { ar: 'من نحن', en: 'About' },
    slug: '/about',
    status: 'published',
    isHomepage: false,
    lastEdited: '2024-02-27',
    content: {
      page_hero: {
        visible: true,
        title: { ar: 'من نحن', en: 'About Us' },
        breadcrumb: true,
        background_color: '#1e293b',
      },
      about_detail: {
        visible: true,
        title: { ar: 'قصتنا', en: 'Our Story' },
        content: {
          ar: 'تأسست شركتنا في عام 2010 برؤية واضحة لتقديم حلول رقمية مبتكرة للشركات.',
          en: 'Our company was founded in 2010 with a clear vision to provide innovative digital solutions.',
        },
        mission_title: { ar: 'رسالتنا', en: 'Our Mission' },
        mission_text: {
          ar: 'مساعدة الشركات على التحول الرقمي وتحقيق النمو',
          en: 'Helping businesses achieve digital transformation and growth',
        },
        vision_title: { ar: 'رؤيتنا', en: 'Our Vision' },
        vision_text: {
          ar: 'أن نكون الشريك الرقمي الأول في المنطقة',
          en: 'To be the leading digital partner in the region',
        },
      },
      team: {
        visible: true,
        title: { ar: 'فريقنا', en: 'Our Team' },
        members: [
          {
            name: { ar: 'محمد العمر', en: 'Mohammed Al-Omar' },
            position: { ar: 'المدير التنفيذي', en: 'CEO' },
            photo: '',
            bio: { ar: 'خبرة 15 عاماً في مجال التكنولوجيا', en: '15 years in technology sector' },
          },
          {
            name: { ar: 'نورة السعيد', en: 'Noura Al-Saeed' },
            position: { ar: 'مديرة التصميم', en: 'Design Director' },
            photo: '',
            bio: { ar: 'مصممة إبداعية بخبرة 10 سنوات', en: '10 years of creative design experience' },
          },
        ],
      },
      stats: {
        visible: true,
        title: { ar: 'إنجازاتنا', en: 'Our Achievements' },
        background_color: '#6366f1',
        items: [
          { icon: 'Users', number: '500+', label: { ar: 'عميل', en: 'Clients' } },
          { icon: 'Globe', number: '30+', label: { ar: 'دولة', en: 'Countries' } },
        ],
      },
    },
  },
  {
    id: 'page-services',
    templateId: 'modern-business',
    pageConfigId: 'services',
    name: { ar: 'خدماتنا', en: 'Services' },
    slug: '/services',
    status: 'published',
    isHomepage: false,
    lastEdited: '2024-02-26',
    content: {
      page_hero: {
        visible: true,
        title: { ar: 'خدماتنا', en: 'Our Services' },
        breadcrumb: true,
        background_color: '#0f172a',
      },
      services: {
        visible: true,
        title: { ar: 'ما نقدمه لك', en: 'What We Offer' },
        subtitle: { ar: 'حلول متكاملة لعملك', en: 'Integrated solutions for your business' },
        columns: '3',
        items: [
          {
            icon: 'Code',
            title: { ar: 'تطوير الويب', en: 'Web Development' },
            description: { ar: 'مواقع احترافية', en: 'Professional websites' },
            link: '#',
          },
        ],
      },
      faq: {
        visible: true,
        title: { ar: 'الأسئلة الشائعة', en: 'Frequently Asked Questions' },
        items: [
          {
            question: { ar: 'كم تستغرق مدة تنفيذ المشروع؟', en: 'How long does the project take?' },
            answer: { ar: 'تعتمد المدة على حجم المشروع، وعادة من 4-8 أسابيع', en: 'Duration depends on project size, usually 4-8 weeks' },
          },
        ],
      },
    },
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: { ar: 'مستقبل الذكاء الاصطناعي في الأعمال', en: 'The Future of AI in Business' },
    slug: 'future-of-ai-in-business',
    content: {
      ar: '<p>يشهد الذكاء الاصطناعي تطوراً متسارعاً يغير طريقة عمل الشركات...</p>',
      en: '<p>Artificial intelligence is evolving rapidly, changing the way businesses operate...</p>',
    },
    excerpt: {
      ar: 'يشهد الذكاء الاصطناعي تطوراً متسارعاً',
      en: 'AI is evolving rapidly in the business world',
    },
    featuredImage: '',
    category: 'Technology',
    tags: ['AI', 'Business', 'Innovation'],
    status: 'published',
    publishDate: '2024-02-28',
    seo: {
      metaTitle: { ar: 'الذكاء الاصطناعي في الأعمال', en: 'AI in Business' },
      metaDescription: { ar: 'مقال عن مستقبل الذكاء الاصطناعي', en: 'Article about the future of AI' },
    },
    author: 'Admin',
    createdAt: '2024-02-28',
  },
  {
    id: 'post-2',
    title: { ar: 'أفضل ممارسات تصميم تجربة المستخدم', en: 'Best UX Design Practices' },
    slug: 'best-ux-design-practices',
    content: {
      ar: '<p>تجربة المستخدم هي العامل الأهم في نجاح أي موقع أو تطبيق...</p>',
      en: '<p>User experience is the most important factor in the success of any website...</p>',
    },
    excerpt: {
      ar: 'تعرف على أفضل ممارسات تصميم تجربة المستخدم',
      en: 'Learn the best UX design practices',
    },
    featuredImage: '',
    category: 'Design',
    tags: ['UX', 'Design', 'Web'],
    status: 'published',
    publishDate: '2024-02-25',
    seo: {
      metaTitle: { ar: 'تصميم تجربة المستخدم', en: 'UX Design Best Practices' },
      metaDescription: { ar: 'دليل شامل لتصميم تجربة المستخدم', en: 'A comprehensive guide to UX design' },
    },
    author: 'Admin',
    createdAt: '2024-02-25',
  },
  {
    id: 'post-3',
    title: { ar: 'كيف تبني استراتيجية تسويق رقمي ناجحة', en: 'Building a Successful Digital Marketing Strategy' },
    slug: 'digital-marketing-strategy',
    content: {
      ar: '<p>التسويق الرقمي أصبح ضرورة لا رفاهية في عالم اليوم...</p>',
      en: '<p>Digital marketing has become a necessity in today\'s world...</p>',
    },
    excerpt: { ar: 'دليل شامل لاستراتيجية التسويق الرقمي', en: 'A complete guide to digital marketing strategy' },
    featuredImage: '',
    category: 'Marketing',
    tags: ['Marketing', 'Digital', 'Strategy'],
    status: 'draft',
    publishDate: '2024-03-01',
    seo: {
      metaTitle: { ar: 'التسويق الرقمي', en: 'Digital Marketing Strategy' },
      metaDescription: { ar: 'استراتيجية تسويق رقمي', en: 'Digital marketing strategy guide' },
    },
    author: 'Admin',
    createdAt: '2024-02-20',
  },
];

export const mockMedia: MediaItem[] = [
  { id: 'm1', filename: 'hero-bg.jpg', originalName: 'hero-bg.jpg', type: 'image', size: 2450000, url: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg', uploadedAt: '2024-02-28' },
  { id: 'm2', filename: 'about-team.jpg', originalName: 'about-team.jpg', type: 'image', size: 1800000, url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg', uploadedAt: '2024-02-27' },
  { id: 'm3', filename: 'service-web.jpg', originalName: 'service-web.jpg', type: 'image', size: 1200000, url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg', uploadedAt: '2024-02-26' },
  { id: 'm4', filename: 'team-ceo.jpg', originalName: 'team-ceo.jpg', type: 'image', size: 980000, url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', uploadedAt: '2024-02-25' },
  { id: 'm5', filename: 'logo.png', originalName: 'logo.png', type: 'image', size: 45000, url: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg', uploadedAt: '2024-02-24' },
  { id: 'm6', filename: 'icon-code.svg', originalName: 'icon-code.svg', type: 'icon', size: 2500, url: '/icons/code.svg', uploadedAt: '2024-02-23' },
  { id: 'm7', filename: 'icon-design.svg', originalName: 'icon-design.svg', type: 'icon', size: 2800, url: '/icons/design.svg', uploadedAt: '2024-02-22' },
  { id: 'm8', filename: 'brochure.pdf', originalName: 'Company Brochure.pdf', type: 'document', size: 5200000, url: '/docs/brochure.pdf', uploadedAt: '2024-02-21' },
  { id: 'm9', filename: 'product-demo.jpg', originalName: 'product-demo.jpg', type: 'image', size: 3100000, url: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg', uploadedAt: '2024-02-20' },
  { id: 'm10', filename: 'testimonial-1.jpg', originalName: 'testimonial-1.jpg', type: 'image', size: 890000, url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', uploadedAt: '2024-02-19' },
];

export const mockLeads: Lead[] = [
  { id: 'l1', name: 'محمد أحمد', email: 'mohammed@email.com', phone: '+966501234567', message: 'أريد الاستفسار عن خدمات تطوير الويب وتكاليفها', status: 'new', createdAt: '2024-02-28T14:30:00' },
  { id: 'l2', name: 'Sarah Johnson', email: 'sarah@company.com', phone: '+1234567890', message: 'I need a quote for a complete website redesign project.', status: 'new', createdAt: '2024-02-28T12:00:00' },
  { id: 'l3', name: 'فاطمة العلي', email: 'fatima@business.com', phone: '+966502345678', message: 'أحتاج مساعدة في حملة تسويق رقمي لمنتجاتنا الجديدة', status: 'read', createdAt: '2024-02-27T16:45:00' },
  { id: 'l4', name: 'David Chen', email: 'david@startup.io', phone: '+65987654321', message: 'Interested in your mobile app development services.', status: 'read', createdAt: '2024-02-27T09:20:00' },
  { id: 'l5', name: 'عبدالله الخالد', email: 'abdullah@corp.sa', phone: '+966503456789', message: 'نريد تصميم هوية بصرية جديدة لشركتنا', status: 'new', createdAt: '2024-02-26T11:10:00' },
  { id: 'l6', name: 'Emma Williams', email: 'emma@agency.com', phone: '+447911123456', message: 'Looking for a long-term digital marketing partnership.', status: 'replied', createdAt: '2024-02-25T15:30:00' },
  { id: 'l7', name: 'خالد المطيري', email: 'khalid@est.com', phone: '+966504567890', message: 'أريد إنشاء متجر إلكتروني متكامل', status: 'read', createdAt: '2024-02-24T13:00:00' },
  { id: 'l8', name: 'Laura Martinez', email: 'laura@boutique.es', phone: '+34612345678', message: 'Need help with our e-commerce website optimization.', status: 'read', createdAt: '2024-02-23T10:45:00' },
  { id: 'l9', name: 'أسامة النصر', email: 'osama@group.com', phone: '+966505678901', message: 'نحتاج تطوير تطبيق جوال لشركتنا', status: 'new', createdAt: '2024-02-22T14:20:00' },
  { id: 'l10', name: 'James Wilson', email: 'james@enterprise.com', phone: '+12025551234', message: 'Exploring options for complete digital transformation of our company.', status: 'read', createdAt: '2024-02-21T09:00:00' },
];

export const mockClientAccount: ClientAccount = {
  id: 'client-1',
  name: 'John Anderson',
  email: 'john@clientsite.com',
  status: 'active',
  lastLogin: '2024-02-27T14:32:00',
  permissions: {
    pages: {
      home: true,
      about: true,
      services: false,
      contact: true,
    },
    sections: {
      hero: { visible: true, editable: true },
      about: { visible: true, editable: true },
      services: { visible: true, editable: false },
      stats: { visible: false, editable: false },
      testimonials: { visible: true, editable: true },
      contact: { visible: true, editable: true },
      page_hero: { visible: true, editable: false },
      about_detail: { visible: true, editable: true },
      team: { visible: false, editable: false },
    },
    features: {
      blog: true,
      leads: true,
      media: false,
      change_language: true,
      seo_settings: false,
    },
  },
};

export const mockSiteSettings: SiteSettings = {
  general: {
    siteNameAr: 'اسم شركتك',
    siteNameEn: 'Your Company Name',
    taglineAr: 'التميز في كل ما نقدم',
    taglineEn: 'Excellence in Everything We Do',
    contactEmail: 'hello@company.com',
    phone: '+966 50 123 4567',
    whatsapp: '+966501234567',
  },
  design: {
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    fontFamily: 'Cairo',
    fontSize: 'medium',
    borderRadius: 'rounded',
  },
  seo: {
    metaTitleAr: 'شركتك | الرائد في الحلول الرقمية',
    metaTitleEn: 'Your Company | Leading Digital Solutions',
    metaDescriptionAr: 'نقدم حلولاً رقمية متكاملة لمساعدة عملك على النمو',
    metaDescriptionEn: 'We provide integrated digital solutions to help your business grow',
    analyticsId: 'UA-XXXXXXXXX-X',
  },
  social: {
    facebook: 'https://facebook.com/yourpage',
    instagram: 'https://instagram.com/yourpage',
    twitter: 'https://twitter.com/yourhandle',
    linkedin: 'https://linkedin.com/company/yourco',
    youtube: 'https://youtube.com/@yourchannel',
  },
  language: {
    defaultLang: 'ar',
    rtlMode: 'auto',
    showSwitcher: true,
  },
  advanced: {
    customCSS: '',
    customJsHead: '',
    customJsFooter: '',
    maintenanceMode: false,
  },
};

export const mockNavigation: NavigationItem[] = [
  { id: 'nav-1', labelAr: 'الرئيسية', labelEn: 'Home', link: '/', openInNewTab: false, order: 1, parentId: null },
  { id: 'nav-2', labelAr: 'من نحن', labelEn: 'About', link: '/about', openInNewTab: false, order: 2, parentId: null },
  { id: 'nav-3', labelAr: 'خدماتنا', labelEn: 'Services', link: '/services', openInNewTab: false, order: 3, parentId: null },
  { id: 'nav-4', labelAr: 'تطوير الويب', labelEn: 'Web Development', link: '/services/web', openInNewTab: false, order: 1, parentId: 'nav-3' },
  { id: 'nav-5', labelAr: 'التصميم', labelEn: 'Design', link: '/services/design', openInNewTab: false, order: 2, parentId: 'nav-3' },
  { id: 'nav-6', labelAr: 'المدونة', labelEn: 'Blog', link: '/blog', openInNewTab: false, order: 4, parentId: null },
  { id: 'nav-7', labelAr: 'تواصل معنا', labelEn: 'Contact', link: '/contact', openInNewTab: false, order: 5, parentId: null },
];
