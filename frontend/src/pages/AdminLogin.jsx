import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, LogIn, Shield } from 'lucide-react';
import API_BASE_URL from '../config/api.js';

const API_URL = `${API_BASE_URL}/api/auth`;

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Icon Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-4 border border-white/20">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Admin Login
          </h1>
          <p className="text-white/80 text-lg">
            Welcome back! Please sign in to continue
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white/90 text-sm font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white/90 text-sm font-semibold mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Secure admin access portal
            </p>
          </div>
        </div>

        {/* Additional Decorative Elements */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-white/40 text-sm">
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span>Protected Area</span>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
