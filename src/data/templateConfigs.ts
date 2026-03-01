import type { TemplateConfig } from '../types';

export const modernBusinessConfig: TemplateConfig = {
  id: 'modern-business',
  name: 'Modern Business',
  version: '1.0.0',
  type: 'multipage',
  style: 'modern',
  language: 'both',
  preview_gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  pages: [
    {
      id: 'home',
      name: { ar: 'الرئيسية', en: 'Home' },
      sections: ['hero', 'about', 'services', 'stats', 'testimonials', 'contact'],
      slug: '/',
    },
    {
      id: 'about',
      name: { ar: 'من نحن', en: 'About' },
      sections: ['page_hero', 'about_detail', 'team', 'stats'],
      slug: '/about',
    },
    {
      id: 'services',
      name: { ar: 'خدماتنا', en: 'Services' },
      sections: ['page_hero', 'services', 'faq'],
      slug: '/services',
    },
    {
      id: 'contact',
      name: { ar: 'تواصل معنا', en: 'Contact' },
      sections: ['page_hero', 'contact'],
      slug: '/contact',
    },
  ],
  sections: [
    {
      id: 'hero',
      name: { ar: 'قسم البطولة', en: 'Hero Section' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'العنوان الرئيسي', en: 'Main Title' },
          multilingual: true,
        },
        {
          key: 'subtitle',
          type: 'textarea',
          label: { ar: 'العنوان الفرعي', en: 'Subtitle' },
          multilingual: true,
        },
        {
          key: 'background_type',
          type: 'select',
          label: { ar: 'نوع الخلفية', en: 'Background Type' },
          options: ['gradient', 'color', 'image', 'video'],
          multilingual: false,
        },
        {
          key: 'background_color',
          type: 'color',
          label: { ar: 'لون الخلفية', en: 'Background Color' },
          multilingual: false,
          condition: { field: 'background_type', value: 'color' },
        },
        {
          key: 'background_image',
          type: 'image',
          label: { ar: 'صورة الخلفية', en: 'Background Image' },
          multilingual: false,
          condition: { field: 'background_type', value: 'image' },
        },
        {
          key: 'text_align',
          type: 'select',
          label: { ar: 'محاذاة النص', en: 'Text Alignment' },
          options: ['left', 'center', 'right'],
          multilingual: false,
        },
        {
          key: 'cta_button',
          type: 'group',
          label: { ar: 'زر الدعوة للعمل', en: 'CTA Button' },
          multilingual: false,
          subfields: [
            {
              key: 'text',
              type: 'text',
              label: { ar: 'نص الزر', en: 'Button Text' },
              multilingual: true,
            },
            {
              key: 'link',
              type: 'text',
              label: { ar: 'الرابط', en: 'Button Link' },
              multilingual: false,
            },
            {
              key: 'style',
              type: 'select',
              label: { ar: 'تصميم الزر', en: 'Button Style' },
              options: ['primary', 'secondary', 'outline', 'ghost'],
              multilingual: false,
            },
          ],
        },
      ],
    },
    {
      id: 'page_hero',
      name: { ar: 'بانر الصفحة', en: 'Page Banner' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'عنوان الصفحة', en: 'Page Title' },
          multilingual: true,
        },
        {
          key: 'breadcrumb',
          type: 'toggle',
          label: { ar: 'إظهار مسار التنقل', en: 'Show Breadcrumb' },
          multilingual: false,
        },
        {
          key: 'background_color',
          type: 'color',
          label: { ar: 'لون الخلفية', en: 'Background Color' },
          multilingual: false,
        },
      ],
    },
    {
      id: 'about',
      name: { ar: 'من نحن', en: 'About Us' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'العنوان', en: 'Title' },
          multilingual: true,
        },
        {
          key: 'description',
          type: 'richtext',
          label: { ar: 'النص', en: 'Description' },
          multilingual: true,
        },
        {
          key: 'image',
          type: 'image',
          label: { ar: 'الصورة', en: 'Image' },
          multilingual: false,
        },
        {
          key: 'image_position',
          type: 'select',
          label: { ar: 'موضع الصورة', en: 'Image Position' },
          options: ['left', 'right'],
          multilingual: false,
        },
        {
          key: 'show_stats',
          type: 'toggle',
          label: { ar: 'إظهار الإحصائيات', en: 'Show Stats' },
          multilingual: false,
        },
      ],
    },
    {
      id: 'about_detail',
      name: { ar: 'تفاصيل من نحن', en: 'About Detail' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'العنوان', en: 'Title' },
          multilingual: true,
        },
        {
          key: 'content',
          type: 'richtext',
          label: { ar: 'المحتوى', en: 'Content' },
          multilingual: true,
        },
        {
          key: 'mission_title',
          type: 'text',
          label: { ar: 'عنوان الرسالة', en: 'Mission Title' },
          multilingual: true,
        },
        {
          key: 'mission_text',
          type: 'textarea',
          label: { ar: 'نص الرسالة', en: 'Mission Text' },
          multilingual: true,
        },
        {
          key: 'vision_title',
          type: 'text',
          label: { ar: 'عنوان الرؤية', en: 'Vision Title' },
          multilingual: true,
        },
        {
          key: 'vision_text',
          type: 'textarea',
          label: { ar: 'نص الرؤية', en: 'Vision Text' },
          multilingual: true,
        },
      ],
    },
    {
      id: 'services',
      name: { ar: 'الخدمات', en: 'Services' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'عنوان القسم', en: 'Section Title' },
          multilingual: true,
        },
        {
          key: 'subtitle',
          type: 'textarea',
          label: { ar: 'النص التعريفي', en: 'Subtitle' },
          multilingual: true,
        },
        {
          key: 'columns',
          type: 'select',
          label: { ar: 'عدد الأعمدة', en: 'Columns' },
          options: ['2', '3', '4'],
          multilingual: false,
        },
        {
          key: 'items',
          type: 'repeater',
          label: { ar: 'الخدمات', en: 'Service Items' },
          multilingual: false,
          subfields: [
            {
              key: 'icon',
              type: 'icon',
              label: { ar: 'الأيقونة', en: 'Icon' },
              multilingual: false,
            },
            {
              key: 'title',
              type: 'text',
              label: { ar: 'العنوان', en: 'Title' },
              multilingual: true,
            },
            {
              key: 'description',
              type: 'textarea',
              label: { ar: 'الوصف', en: 'Description' },
              multilingual: true,
            },
            {
              key: 'link',
              type: 'text',
              label: { ar: 'الرابط', en: 'Link' },
              multilingual: false,
            },
          ],
        },
      ],
    },
    {
      id: 'stats',
      name: { ar: 'الإحصائيات', en: 'Statistics' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'عنوان القسم', en: 'Section Title' },
          multilingual: true,
        },
        {
          key: 'background_color',
          type: 'color',
          label: { ar: 'لون الخلفية', en: 'Background Color' },
          multilingual: false,
        },
        {
          key: 'items',
          type: 'repeater',
          label: { ar: 'الإحصائيات', en: 'Stat Items' },
          multilingual: false,
          subfields: [
            {
              key: 'icon',
              type: 'icon',
              label: { ar: 'الأيقونة', en: 'Icon' },
              multilingual: false,
            },
            {
              key: 'number',
              type: 'text',
              label: { ar: 'الرقم', en: 'Number' },
              multilingual: false,
            },
            {
              key: 'label',
              type: 'text',
              label: { ar: 'التسمية', en: 'Label' },
              multilingual: true,
            },
          ],
        },
      ],
    },
    {
      id: 'testimonials',
      name: { ar: 'آراء العملاء', en: 'Testimonials' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'عنوان القسم', en: 'Section Title' },
          multilingual: true,
        },
        {
          key: 'items',
          type: 'repeater',
          label: { ar: 'التقييمات', en: 'Testimonials' },
          multilingual: false,
          subfields: [
            {
              key: 'name',
              type: 'text',
              label: { ar: 'الاسم', en: 'Name' },
              multilingual: true,
            },
            {
              key: 'role',
              type: 'text',
              label: { ar: 'المسمى الوظيفي', en: 'Role' },
              multilingual: true,
            },
            {
              key: 'text',
              type: 'textarea',
              label: { ar: 'نص التقييم', en: 'Testimonial Text' },
              multilingual: true,
            },
            {
              key: 'avatar',
              type: 'image',
              label: { ar: 'الصورة', en: 'Avatar' },
              multilingual: false,
            },
            {
              key: 'rating',
              type: 'number',
              label: { ar: 'التقييم (1-5)', en: 'Rating (1-5)' },
              multilingual: false,
            },
          ],
        },
      ],
    },
    {
      id: 'team',
      name: { ar: 'فريق العمل', en: 'Team' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'عنوان القسم', en: 'Section Title' },
          multilingual: true,
        },
        {
          key: 'members',
          type: 'repeater',
          label: { ar: 'أعضاء الفريق', en: 'Team Members' },
          multilingual: false,
          subfields: [
            {
              key: 'name',
              type: 'text',
              label: { ar: 'الاسم', en: 'Name' },
              multilingual: true,
            },
            {
              key: 'position',
              type: 'text',
              label: { ar: 'المنصب', en: 'Position' },
              multilingual: true,
            },
            {
              key: 'photo',
              type: 'image',
              label: { ar: 'الصورة', en: 'Photo' },
              multilingual: false,
            },
            {
              key: 'bio',
              type: 'textarea',
              label: { ar: 'نبذة', en: 'Bio' },
              multilingual: true,
            },
          ],
        },
      ],
    },
    {
      id: 'faq',
      name: { ar: 'الأسئلة الشائعة', en: 'FAQ' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'عنوان القسم', en: 'Section Title' },
          multilingual: true,
        },
        {
          key: 'items',
          type: 'repeater',
          label: { ar: 'الأسئلة', en: 'Questions' },
          multilingual: false,
          subfields: [
            {
              key: 'question',
              type: 'text',
              label: { ar: 'السؤال', en: 'Question' },
              multilingual: true,
            },
            {
              key: 'answer',
              type: 'textarea',
              label: { ar: 'الإجابة', en: 'Answer' },
              multilingual: true,
            },
          ],
        },
      ],
    },
    {
      id: 'contact',
      name: { ar: 'تواصل معنا', en: 'Contact' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'عنوان القسم', en: 'Section Title' },
          multilingual: true,
        },
        {
          key: 'subtitle',
          type: 'textarea',
          label: { ar: 'النص التعريفي', en: 'Subtitle' },
          multilingual: true,
        },
        {
          key: 'phone',
          type: 'text',
          label: { ar: 'رقم الهاتف', en: 'Phone' },
          multilingual: false,
        },
        {
          key: 'email',
          type: 'text',
          label: { ar: 'البريد الإلكتروني', en: 'Email' },
          multilingual: false,
        },
        {
          key: 'address',
          type: 'textarea',
          label: { ar: 'العنوان', en: 'Address' },
          multilingual: true,
        },
        {
          key: 'show_map',
          type: 'toggle',
          label: { ar: 'إظهار الخريطة', en: 'Show Map' },
          multilingual: false,
        },
        {
          key: 'map_embed',
          type: 'text',
          label: { ar: 'رابط الخريطة', en: 'Map Embed URL' },
          multilingual: false,
          condition: { field: 'show_map', value: 'true' },
        },
      ],
    },
  ],
};

export const creativeLandingConfig: TemplateConfig = {
  id: 'creative-landing',
  name: 'Creative Landing',
  version: '1.0.0',
  type: 'landing',
  style: 'bold',
  language: 'both',
  preview_gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  pages: [
    {
      id: 'main',
      name: { ar: 'الصفحة الرئيسية', en: 'Main Page' },
      sections: ['hero_landing', 'features', 'pricing', 'cta_section'],
      slug: '/',
    },
  ],
  sections: [
    {
      id: 'hero_landing',
      name: { ar: 'البطولة', en: 'Hero' },
      fields: [
        {
          key: 'badge',
          type: 'text',
          label: { ar: 'الشارة', en: 'Badge Text' },
          multilingual: true,
        },
        {
          key: 'headline',
          type: 'text',
          label: { ar: 'العنوان الرئيسي', en: 'Headline' },
          multilingual: true,
        },
        {
          key: 'subheadline',
          type: 'textarea',
          label: { ar: 'العنوان الثانوي', en: 'Sub-headline' },
          multilingual: true,
        },
        {
          key: 'primary_cta',
          type: 'group',
          label: { ar: 'الزر الأول', en: 'Primary CTA' },
          multilingual: false,
          subfields: [
            {
              key: 'text',
              type: 'text',
              label: { ar: 'النص', en: 'Text' },
              multilingual: true,
            },
            {
              key: 'link',
              type: 'text',
              label: { ar: 'الرابط', en: 'Link' },
              multilingual: false,
            },
          ],
        },
        {
          key: 'secondary_cta',
          type: 'group',
          label: { ar: 'الزر الثاني', en: 'Secondary CTA' },
          multilingual: false,
          subfields: [
            {
              key: 'text',
              type: 'text',
              label: { ar: 'النص', en: 'Text' },
              multilingual: true,
            },
            {
              key: 'link',
              type: 'text',
              label: { ar: 'الرابط', en: 'Link' },
              multilingual: false,
            },
          ],
        },
        {
          key: 'hero_image',
          type: 'image',
          label: { ar: 'صورة البطولة', en: 'Hero Image' },
          multilingual: false,
        },
      ],
    },
    {
      id: 'features',
      name: { ar: 'المميزات', en: 'Features' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'عنوان القسم', en: 'Section Title' },
          multilingual: true,
        },
        {
          key: 'subtitle',
          type: 'textarea',
          label: { ar: 'التعريف', en: 'Subtitle' },
          multilingual: true,
        },
        {
          key: 'layout',
          type: 'select',
          label: { ar: 'التخطيط', en: 'Layout' },
          options: ['grid', 'list', 'alternating'],
          multilingual: false,
        },
        {
          key: 'items',
          type: 'repeater',
          label: { ar: 'المميزات', en: 'Features' },
          multilingual: false,
          subfields: [
            {
              key: 'icon',
              type: 'icon',
              label: { ar: 'الأيقونة', en: 'Icon' },
              multilingual: false,
            },
            {
              key: 'title',
              type: 'text',
              label: { ar: 'العنوان', en: 'Title' },
              multilingual: true,
            },
            {
              key: 'description',
              type: 'textarea',
              label: { ar: 'الوصف', en: 'Description' },
              multilingual: true,
            },
          ],
        },
      ],
    },
    {
      id: 'pricing',
      name: { ar: 'الأسعار', en: 'Pricing' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'عنوان القسم', en: 'Title' },
          multilingual: true,
        },
        {
          key: 'plans',
          type: 'repeater',
          label: { ar: 'الخطط', en: 'Plans' },
          multilingual: false,
          subfields: [
            {
              key: 'name',
              type: 'text',
              label: { ar: 'اسم الخطة', en: 'Plan Name' },
              multilingual: true,
            },
            {
              key: 'price',
              type: 'text',
              label: { ar: 'السعر', en: 'Price' },
              multilingual: false,
            },
            {
              key: 'period',
              type: 'text',
              label: { ar: 'الفترة', en: 'Period' },
              multilingual: true,
            },
            {
              key: 'featured',
              type: 'toggle',
              label: { ar: 'مميز', en: 'Featured' },
              multilingual: false,
            },
            {
              key: 'features_list',
              type: 'textarea',
              label: { ar: 'المميزات (سطر لكل واحد)', en: 'Features (one per line)' },
              multilingual: true,
            },
          ],
        },
      ],
    },
    {
      id: 'cta_section',
      name: { ar: 'قسم الدعوة', en: 'CTA Section' },
      fields: [
        {
          key: 'title',
          type: 'text',
          label: { ar: 'العنوان', en: 'Title' },
          multilingual: true,
        },
        {
          key: 'subtitle',
          type: 'text',
          label: { ar: 'التعريف', en: 'Subtitle' },
          multilingual: true,
        },
        {
          key: 'background_color',
          type: 'color',
          label: { ar: 'لون الخلفية', en: 'Background Color' },
          multilingual: false,
        },
        {
          key: 'button_text',
          type: 'text',
          label: { ar: 'نص الزر', en: 'Button Text' },
          multilingual: true,
        },
        {
          key: 'button_link',
          type: 'text',
          label: { ar: 'رابط الزر', en: 'Button Link' },
          multilingual: false,
        },
      ],
    },
  ],
};

export const allTemplates = [modernBusinessConfig, creativeLandingConfig];
