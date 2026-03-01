import { useState } from 'react';
import { User, Mail, Lock, Copy, CheckCircle } from 'lucide-react';
import ClientLayout from '../../components/client/ClientLayout';
import { useApp } from '../../contexts/AppContext';

const ClientAccountSettings = () => {
  const { clientAccount, siteSettings, lang, addToast } = useApp();
  const [copied, setCopied] = useState(false);

  const siteUrl = window.location.origin;

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl).catch(() => {});
    setCopied(true);
    addToast(lang === 'ar' ? 'تم نسخ الرابط' : 'URL copied', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ClientLayout>
      <div className="max-w-lg space-y-5">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {lang === 'ar' ? 'حسابي' : 'My Account'}
          </h1>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-xl font-bold text-white">
              {clientAccount.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{clientAccount.name}</p>
              <p className="text-sm text-slate-500">{clientAccount.email}</p>
              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium mt-1 inline-block">
                {clientAccount.status}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Lock size={14} />
              {lang === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
            </h3>
            <div className="space-y-3">
              <input type="password" placeholder={lang === 'ar' ? 'كلمة المرور الحالية' : 'Current password'} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="password" placeholder={lang === 'ar' ? 'كلمة المرور الجديدة' : 'New password'} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="password" placeholder={lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm new password'} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <button
                onClick={() => addToast(lang === 'ar' ? 'تم تحديث كلمة المرور' : 'Password updated', 'success')}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {lang === 'ar' ? 'تحديث كلمة المرور' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            {lang === 'ar' ? 'رابط الموقع' : 'Site URL'}
          </h3>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-3">
            <p className="flex-1 text-sm text-slate-700 font-mono truncate">{siteUrl}</p>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                copied ? 'bg-green-100 text-green-700' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">
            {lang === 'ar' ? 'معلومات الموقع' : 'Site Information'}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Site Name (EN):</span>
              <span className="font-medium text-slate-800">{siteSettings.general.siteNameEn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Site Name (AR):</span>
              <span className="font-medium text-slate-800 font-cairo" dir="rtl">{siteSettings.general.siteNameAr}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email:</span>
              <span className="font-medium text-slate-800">{siteSettings.general.contactEmail}</span>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientAccountSettings;
