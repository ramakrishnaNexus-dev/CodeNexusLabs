import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: '', password: '' } });
  const from = (location.state as any)?.from?.pathname || '/courses';

  const onSubmit = async (data: any) => {
    setError(''); setLoading(true);
    try {
      await login(data, remember);
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
      navigate(savedUser.role === 'ADMIN' ? '/admin/dashboard' : from, { replace: true });
    } catch (e: any) { setError(e.message || 'Login failed'); }
    finally { setLoading(false); }
  };

  const handleSocialLogin = (email: string) => {
    login({ email, password: 'social-' + Date.now() }, false).then(() => {
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
      navigate(savedUser.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard', { replace: true });
    }).catch(() => setError('Login failed'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-8">
      <div className="w-full max-w-[900px] grid md:grid-cols-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 lg:p-10">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="CodeNexusLabs" className="w-10 h-10 rounded-lg object-contain" />
              <span className="font-bold text-xl text-gray-900">CodeNexus<span className="text-indigo-600">Labs</span></span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
            <p className="text-sm text-gray-500 mt-1">Welcome back! Please enter your details.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button type="button" onClick={() => handleSocialLogin('google@user.com')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-red-50 hover:border-red-200 transition-all text-sm">
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button type="button" onClick={() => handleSocialLogin('github@user.com')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-400 transition-all text-sm">
              <FaGithub /> GitHub
            </button>
          </div>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-gray-400">or continue with email</span></div>
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" placeholder="you@example.com" className={`input-field pl-9 ${errors.email ? 'input-error' : ''}`}
                  {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } })} /></div>
              {errors.email && <p className="error-text">{errors.email.message}</p>}</div>

            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={show ? 'text' : 'password'} placeholder="Enter your password" className={`input-field pl-9 pr-9 ${errors.password ? 'input-error' : ''}`}
                  {...register('password', { required: 'Password is required' })} />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
              {errors.password && <p className="error-text">{errors.password.message}</p>}</div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                Forgot password?
              </Link>
            </div>

            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-indigo-600" /><span className="text-xs text-gray-600">Remember me</span></label>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm shadow-md">{loading ? <><Loader2 className="w-4 h-4 animate-spin" />Signing in...</> : 'Sign In'}</button>
          </form>
          <p className="text-center mt-5 text-xs text-gray-500">Don't have an account? <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700">Create free account</Link></p>
        </div>
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
          <h2 className="text-2xl font-bold mb-3">Welcome Back</h2>
          <p className="text-xl font-semibold mb-2">Learn Programming the Right Way</p>
          <p className="text-white/70 text-sm leading-relaxed mb-6">Continue your journey with CodeNexusLabs.</p>
          <div className="space-y-2 text-sm text-white/60"><p>✓ Pick up where you left off</p><p>✓ Track quiz results & improve</p><p>✓ Access saved courses & resumes</p></div>
        </div>
      </div>
    </div>
  );
};

export default Login;