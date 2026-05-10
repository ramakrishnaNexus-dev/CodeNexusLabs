import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Loader2, Check } from 'lucide-react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import axios from 'axios';

const Register = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' }
  });
  const password = watch('password');

  useEffect(() => {
    if (done && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (done && countdown === 0) navigate('/login');
  }, [done, countdown, navigate]);

  const onSubmit = async (data: any) => {
    setError(''); setLoading(true);
    try { await registerUser(data); setDone(true); }
    catch (e: any) { setError(e.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  const handleSocialRegister = (name: string, email: string) => {
    setLoading(true);
    axios.post('/api/v1/auth/google', { email, name })
      .then((res: any) => {
        const data = res.data?.data || res.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ email, fullName: name, role: 'STUDENT' }));
        navigate('/student/dashboard', { replace: true });
      })
      .catch(() => setError('Registration failed'))
      .finally(() => setLoading(false));
  };

  if (done) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10 text-green-600" /></div>
        <h1 className="text-3xl font-bold mb-3">Account Created! 🎉</h1>
        <p className="text-gray-500">Redirecting to login in {countdown} seconds...</p>
      </div>
    </div>
  );

  const passwordStrength = () => {
    let score = 0;
    if (password?.length >= 8) score++;
    if (/[A-Z]/.test(password || '')) score++;
    if (/[a-z]/.test(password || '')) score++;
    if (/[0-9]/.test(password || '')) score++;
    return score;
  };

  const strengthColor = ['bg-gray-200', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-8">
      <div className="w-full max-w-[900px] grid md:grid-cols-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="p-8 lg:p-10">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="CodeNexusLabs" className="w-10 h-10 rounded-lg object-contain" />
              <span className="font-bold text-xl text-gray-900">CodeNexus<span className="text-indigo-600">Labs</span></span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-500 mt-1">Start your learning journey today.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button type="button" onClick={() => handleSocialRegister('Google User', 'google@user.com')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-red-50 transition-all text-sm">
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button type="button" onClick={() => handleSocialRegister('GitHub User', 'github@user.com')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 transition-all text-sm">
              <FaGithub /> GitHub
            </button>
          </div>

          <div className="relative mb-5"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div><div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-gray-400">or register with email</span></div></div>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="John Doe" className={`input-field pl-9 ${errors.fullName ? 'input-error' : ''}`} {...register('fullName', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })} /></div>{errors.fullName && <p className="error-text">{errors.fullName.message}</p>}</div>
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="email" placeholder="you@example.com" className={`input-field pl-9 ${errors.email ? 'input-error' : ''}`} {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } })} /></div>{errors.email && <p className="error-text">{errors.email.message}</p>}</div>
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type={show ? 'text' : 'password'} placeholder="Create strong password" className={`input-field pl-9 pr-9 ${errors.password ? 'input-error' : ''}`} {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'At least 8 characters' }, validate: { hasUpper: v => /[A-Z]/.test(v) || 'Need uppercase', hasLower: v => /[a-z]/.test(v) || 'Need lowercase', hasNumber: v => /[0-9]/.test(v) || 'Need number' } })} /><button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>{password && (<div className="mt-1.5"><div className="flex gap-1 mb-1">{[...Array(4)].map((_, i) => (<div key={i} className={`h-1 flex-1 rounded-full ${i < passwordStrength() ? strengthColor[passwordStrength()] : 'bg-gray-200'}`} />))}</div><p className="text-[10px] text-gray-500">Strength: <span className="font-medium">{strengthLabel[passwordStrength()]}</span></p></div>)}{errors.password && <p className="error-text">{errors.password.message}</p>}</div>
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="password" placeholder="Repeat your password" className={`input-field pl-9 ${errors.confirmPassword ? 'input-error' : ''}`} {...register('confirmPassword', { required: 'Confirm your password', validate: v => v === password || 'Passwords do not match' })} /></div>{errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}</div>
            <p className="text-[10px] text-gray-400 text-center">By creating an account, you agree to our <a href="#" className="text-indigo-600 hover:underline">Terms</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a></p>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm shadow-md">{loading ? <><Loader2 className="w-4 h-4 animate-spin" />Creating...</> : 'Create Free Account'}</button>
          </form>
          <p className="text-center mt-4 text-xs text-gray-500">Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">Sign in</Link></p>
        </div>
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
          <h2 className="text-2xl font-bold mb-3">Join the Community</h2>
          <p className="text-xl font-semibold mb-2">Learn Programming the Right Way</p>
          <p className="text-white/70 text-sm leading-relaxed mb-6">Start your journey today.</p>
          <div className="space-y-2 text-sm text-white/60"><p>✓ Free access to all courses</p><p>✓ Interactive code practice</p><p>✓ Build professional resume</p><p>✓ Interview preparation</p></div>
        </div>
      </div>
    </div>
  );
};

export default Register;