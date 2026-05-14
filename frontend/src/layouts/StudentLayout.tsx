import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, BookOpen, Code2, FileText, LogOut, Menu, X, 
  LayoutDashboard, MessageSquare, ChevronDown, ArrowRight, Mail
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
  { label: 'Courses', icon: BookOpen, path: '/courses' },
  { label: 'Code', icon: Code2, path: '/student/practice' },
  { label: 'Resume', icon: FileText, path: '/student/resume' },
  { label: 'Interview', icon: MessageSquare, path: '/student/interview' },
];

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook', color: 'text-gray-400 hover:text-blue-600' },
  { icon: FaTwitter, href: '#', label: 'Twitter/X', color: 'text-gray-400 hover:text-sky-500' },
  { icon: FaInstagram, href: '#', label: 'Instagram', color: 'text-gray-400 hover:text-pink-600' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'text-gray-400 hover:text-blue-700' },
  { icon: FaGithub, href: '#', label: 'GitHub', color: 'text-gray-400 hover:text-white' },
];

const StudentLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/logo.png" alt="CodeNexusLabs" className="w-8 h-8 rounded-lg object-contain" />
            <div className="leading-tight">
              <span className="font-bold text-lg text-gray-900">
                CodeNexus<span className="text-indigo-600">Labs</span>
              </span>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide">Learn • Build • Ship</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {isAuthenticated && navItems.map(item => (
              <Link key={item.path} to={item.path} 
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === item.path 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}>{item.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setDropdown(!dropdown)} 
                  className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                    {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                </button>
                {dropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdown(false)} />
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20">
                      <div className="px-4 py-2.5 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 text-sm">{user?.fullName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link to="/student/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdown(false)}>
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <button onClick={() => { logout(); navigate('/'); }} 
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="btn-secondary py-2 px-4 text-sm">Sign In</Link>
                <Link to="/register" className="btn-primary py-2 px-4 text-sm">Get Started</Link>
              </div>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1.5 rounded-lg hover:bg-gray-100">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t bg-white px-4 py-3 space-y-1">
            {isAuthenticated ? navItems.map(item => (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                  location.pathname === item.path ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600'
                }`}><item.icon className="w-4 h-4" />{item.label}</Link>
            )) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" className="btn-secondary text-center text-sm" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/register" className="btn-primary text-center text-sm" onClick={() => setMobileOpen(false)}>Get Started</Link>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        {/* Newsletter */}
        <div className="border-b border-gray-800">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold mb-1">Stay Updated</h3>
                <p className="text-gray-400 text-sm">Get the latest courses and tech news directly to your inbox.</p>
              </div>
              <div className="flex gap-2.5 w-full lg:w-auto">
                <div className="flex-1 lg:w-64 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="email" placeholder="Enter your email" 
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none" />
                </div>
                <button className="btn-primary py-2.5 px-5 text-sm whitespace-nowrap">
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="text-center md:text-left">
              <Link to="/" className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <img src="/logo.png" alt="CodeNexusLabs" className="w-7 h-7 rounded-lg object-contain brightness-0 invert" />
                <span className="font-bold text-lg text-white">CodeNexusLabs</span>
              </Link>
              <p className="text-gray-400 text-xs">Learn • Build • Ship</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className={`text-lg transition-all ${social.color}`}
                  title={social.label}>
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-500">
                CodeNexusLabs — Learn • Build • Ship
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Built by <span className="text-gray-300 font-medium">Ramakrishna Baluguri</span>
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                © 2026 CodeNexusLabs. All rights reserved.
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs text-gray-500">
                📧 <a href="mailto:support@codenexuslabs.com" className="hover:text-white transition-colors">support@codenexuslabs.com</a>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                🌐 <a href="https://codenexuslabs.com" className="hover:text-white transition-colors">codenexuslabs.com</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentLayout;