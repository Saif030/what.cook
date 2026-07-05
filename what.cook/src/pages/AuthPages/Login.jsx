import React, { useState , useContext } from 'react';
import { mainlogo } from '../../assets/assets.js';
import Loader from '../../components/Loader';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Mail, 
  Lock, 
  Leaf
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const {handleLogin , isLoading} = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState('');
  

  const onSubmit = async (e) => {
      e.preventDefault();
      setFormError('');

      if (!email || !password) {
        setFormError('Please fill in all fields.');
        return;
      }
      const result = await handleLogin(email, password, rememberMe);
      if (result) {
        navigate('/');
        window.location.reload();
      } else {
        setFormError('Login failed. Please try again.');
      }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-yellow-500/20 to-green-500/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20 -translate-x-1/3 translate-y-1/3" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2.5">
            <img src={mainlogo} alt="Main Logo" className="h-11" />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Welcome back to <br />
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                your kitchen
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Log in to access your saved recipes, nutrition plans, and personalized cooking suggestions.
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-yellow-300 border-2 border-gray-900" />
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-white font-semibold">12,000+</span> cooks joined
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            © 2026 ChefAI. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 bg-white">
        {isLoading && <Loader />}
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
            <img src={mainlogo} alt="Main Logo" className="h-11" />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
            <p className="text-gray-500">
              Don't have an account?{' '}
              <a href="/register" className="font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                Create one
              </a>
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chef@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formError && (
                <p className="text-xs text-red-400 mt-1">{formError}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 rounded-lg border-2 border-gray-300 peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all flex items-center justify-center">
                    <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-2xl shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Sign in <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Leaf className="w-4 h-4 text-green-500" />
            <span>Secure, encrypted connection</span>
          </div>
        </div>
      </div>
    </div>
  );
}