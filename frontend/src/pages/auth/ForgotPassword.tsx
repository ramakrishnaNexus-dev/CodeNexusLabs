import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, ArrowLeft, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import API from '../../services/api';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await API.post('/auth/forgot-password', { email: data.email });
      setSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch {
      // Always show success for security
      setSent(true);
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
          <p className="text-gray-500 mb-4">If an account exists, we've sent a reset link.</p>
          <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">Back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="CodeNexusLabs" className="w-10 h-10 rounded-lg object-contain" />
            <span className="font-bold text-xl text-gray-900">CodeNexus<span className="text-indigo-600">Labs</span></span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your email and we'll send a reset link.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" placeholder="you@example.com" className={`input-field pl-9 ${errors.email ? 'input-error' : ''}`}
                  {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } })} />
              </div>
              {errors.email && <p className="error-text">{(errors.email?.message as string) || 'Email is required'}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : 'Send Reset Link'}
            </button>
          </form>
          <p className="text-center mt-5 text-xs text-gray-500">
            <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center justify-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;