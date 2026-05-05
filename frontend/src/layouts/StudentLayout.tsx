import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, BookOpen, Code2, FileText, LogOut, Menu, X, 
  LayoutDashboard, MessageSquare, ChevronDown, ArrowRight
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
  { label: 'Courses', icon: BookOpen, path: '/courses' },
  { label: 'Code', icon: Code2, path: '/student/practice' },
  { label: 'Resume', icon: FileText, path: '/student/resume' },
  { label: 'Interview', icon: MessageSquare, path: '/student/interview' },
];

const footerLinks = {
  Platform: ['Courses', 'Code Practice', 'Resume Builder', 'Interview Prep', 'Pricing'],
  Company: ['About Us', 'Careers', 'Blog', 'Press', 'Contact'],
  Support: ['Help Center', 'FAQs', 'Community', 'Feedback', 'Report Issue'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
};

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

      <footer className="bg-gray-900 text-white">
        <div className="border-b border-gray-800">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold mb-1">Stay Updated</h3>
                <p className="text-gray-400 text-sm">Get the latest courses and tech news directly to your inbox.</p>
              </div>
              <div className="flex gap-2.5 w-full lg:w-auto">
                <input type="email" placeholder="Enter your email" 
                  className="flex-1 lg:w-64 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none" />
                <button className="btn-primary py-2.5 px-5 text-sm whitespace-nowrap">
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-3">
                <img src="/logo.png" alt="CodeNexusLabs" className="w-8 h-8 rounded-lg object-contain brightness-0 invert" />
                <span className="font-bold text-lg text-white">CodeNexusLabs</span>
              </Link>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Empowering the next generation of developers with hands-on, text-based learning.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    className={`text-lg transition-all ${social.color}`}
                    title={social.label}>
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-white text-sm mb-3">{title}</h4>
                <ul className="space-y-2">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} CodeNexusLabs. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentLayout;