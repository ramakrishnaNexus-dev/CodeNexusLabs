import { Link } from 'react-router-dom';
import { ShieldAlert, Home, LogIn } from 'lucide-react';

const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4">
    <div className="text-center max-w-lg">
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <ShieldAlert className="w-12 h-12 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
      <p className="text-gray-500 text-lg mb-8">
        You don't have permission to access this page. Please contact your administrator or log in with an authorized account.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="btn-primary px-8 py-3.5 text-base shadow-xl shadow-indigo-200 gap-2">
          <Home className="w-5 h-5" /> Go Home
        </Link>
        <Link to="/login" className="btn-white px-8 py-3.5 text-base gap-2">
          <LogIn className="w-5 h-5" /> Sign In
        </Link>
      </div>
    </div>
  </div>
);

export default Unauthorized;