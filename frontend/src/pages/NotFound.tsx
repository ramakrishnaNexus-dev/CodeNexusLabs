import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4">
    <div className="text-center max-w-lg">
      <h1 className="text-[150px] font-black text-gray-100 leading-none select-none">404</h1>
      <div className="-mt-16 mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h2>
        <p className="text-gray-500 text-lg">Oops! The page you're looking for doesn't exist or has been moved.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="btn-primary px-8 py-3.5 text-base shadow-xl shadow-indigo-200 gap-2">
          <Home className="w-5 h-5" /> Go Home
        </Link>
        <button onClick={() => window.history.back()} className="btn-white px-8 py-3.5 text-base gap-2">
          <ArrowLeft className="w-5 h-5" /> Go Back
        </button>
      </div>
    </div>
  </div>
);

export default NotFound;