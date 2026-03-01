import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login, quickLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Invalid credentials. Try demo buttons below.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role: 'superadmin' | 'client') => {
    setLoading(true);
    await quickLogin(role);
    navigate(role === 'superadmin' ? '/admin' : '/client');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 to-transparent" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-900/50">
              <span className="text-white font-black text-2xl">N</span>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black text-white">Neovidia</h1>
              <p className="text-indigo-400 text-sm font-medium">Content Management System</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Sign In</h2>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 text-sm px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                placeholder="admin@neovidia.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600"
              />
              <label htmlFor="remember" className="text-sm text-slate-400 cursor-pointer">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
            >
              <LogIn size={18} />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center mb-3">Quick Demo Access</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleQuickLogin('superadmin')}
                disabled={loading}
                className="flex-1 py-2.5 border border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/10 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
              >
                Admin Demo
              </button>
              <button
                onClick={() => handleQuickLogin('client')}
                disabled={loading}
                className="flex-1 py-2.5 border border-green-500/40 text-green-400 hover:bg-green-500/10 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
              >
                Client Demo
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">Powered by Neovidia CMS</p>
      </div>
    </div>
  );
};

export default Login;
