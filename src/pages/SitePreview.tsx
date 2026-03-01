import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { X } from 'lucide-react';

const SitePreview = () => {
  const navigate = useNavigate();
  const { pages, siteSettings } = useApp();
  const homepage = pages.find((p) => p.isHomepage);
  const sections = homepage?.sections || {};

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-yellow-400 text-slate-900 px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-medium">
          🔍 Preview Mode - This is how your website will look
        </span>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm font-medium hover:opacity-80"
        >
          <X size={16} />
          Close Preview
        </button>
      </div>

      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              {siteSettings.general.siteName.charAt(0)}
            </div>
            <span className="text-xl font-bold text-slate-800">
              {siteSettings.general.siteName}
            </span>
          </div>
          <nav className="flex gap-6">
            <a href="#home" className="text-slate-700 hover:text-indigo-600 transition-colors">
              Home
            </a>
            <a href="#about" className="text-slate-700 hover:text-indigo-600 transition-colors">
              About
            </a>
            <a href="#services" className="text-slate-700 hover:text-indigo-600 transition-colors">
              Services
            </a>
            <a href="#contact" className="text-slate-700 hover:text-indigo-600 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section
        id="home"
        className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white"
      >
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {sections.hero?.heading || 'Welcome to Your Amazing Business'}
          </h1>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            {sections.hero?.subheading ||
              'We provide exceptional services that help your business grow'}
          </p>
          <button
            style={{ backgroundColor: siteSettings.design.primaryColor }}
            className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
          >
            {sections.hero?.ctaText || 'Get Started'}
          </button>
        </div>
      </section>

      <section id="about" className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                {sections.about?.title || 'About Us'}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {sections.about?.body ||
                  'We are a team of passionate professionals dedicated to delivering excellence. With years of experience, we have helped hundreds of businesses achieve their goals.'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg h-80 flex items-center justify-center">
              <span className="text-6xl">🎯</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              {sections.services?.title || 'Our Services'}
            </h2>
            <p className="text-lg text-slate-600">
              {sections.services?.subtitle || 'What we offer to help you succeed'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(sections.services?.cards || [
              { icon: '💼', title: 'Consulting', description: 'Expert business consulting' },
              { icon: '🎨', title: 'Design', description: 'Beautiful designs' },
              { icon: '⚙️', title: 'Development', description: 'Robust solutions' },
            ]).map((card: any, index: number) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
            <p className="text-lg text-slate-600">
              We'd love to hear from you
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-slate-50 rounded-lg">
                <div className="text-3xl mb-2">📞</div>
                <p className="text-sm text-slate-600 mb-1">Phone</p>
                <p className="font-medium text-slate-800">
                  {sections.contact?.phone || '+1 (555) 123-4567'}
                </p>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-lg">
                <div className="text-3xl mb-2">📧</div>
                <p className="text-sm text-slate-600 mb-1">Email</p>
                <p className="font-medium text-slate-800">
                  {sections.contact?.email || 'hello@business.com'}
                </p>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-lg">
                <div className="text-3xl mb-2">📍</div>
                <p className="text-sm text-slate-600 mb-1">Location</p>
                <p className="font-medium text-slate-800">
                  {sections.contact?.address || '123 Business St'}
                </p>
              </div>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
              />
              <button
                type="submit"
                style={{ backgroundColor: siteSettings.design.primaryColor }}
                className="w-full py-3 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm">
              {sections.footer?.text || '© 2024 Your Business. All rights reserved.'}
            </p>
            {sections.footer?.showSocial && (
              <div className="flex gap-4 mt-4 md:mt-0">
                {siteSettings.social.facebook && (
                  <a href={siteSettings.social.facebook} className="text-slate-400 hover:text-white transition-colors">
                    Facebook
                  </a>
                )}
                {siteSettings.social.instagram && (
                  <a href={siteSettings.social.instagram} className="text-slate-400 hover:text-white transition-colors">
                    Instagram
                  </a>
                )}
                {siteSettings.social.linkedin && (
                  <a href={siteSettings.social.linkedin} className="text-slate-400 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SitePreview;
