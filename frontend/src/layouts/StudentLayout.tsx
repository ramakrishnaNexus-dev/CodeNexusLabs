import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, BookOpen, Code2, FileText, LogOut, Menu, X, 
  LayoutDashboard, MessageSquare, ChevronDown, ArrowRight, Mail, ExternalLink
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
  { label: 'Courses', icon: BookOpen, path: '/courses' },
  { label: 'Code', icon: Code2, path: '/student/practice' },
  { label: 'Resume', icon: FileText, path: '/student/resume' },
  { label: 'Interview', icon: MessageSquare, path: '/student/interview' },
];

const courseLinks = [
  { name: 'SDLC', path: '/courses?category=SDLC' },
  { name: 'HTML', path: '/courses?category=HTML' },
  { name: 'CSS', path: '/courses?category=CSS' },
  { name: 'Core Java', path: '/courses?category=Java' },
  { name: 'JavaScript', path: '/courses?category=JavaScript' },
  { name: 'Selenium', path: '/courses?category=Selenium' },
  { name: 'Python', path: '/courses?category=Python' },
  { name: 'React', path: '/courses?category=React' },
  { name: 'Spring Boot', path: '/courses?category=Spring Boot' },
  { name: 'MySQL', path: '/courses?category=MySQL' },
  { name: 'API Testing', path: '/courses?category=API' },
  { name: 'Postman', path: '/courses?category=Postman' },
];

const companyLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Service', path: '/terms' },
];

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
  { icon: FaTwitter, href: '#', label: 'Twitter/X', color: 'hover:text-sky-400' },
  { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
  { icon: FaGithub, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
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

      {/* Premium Footer */}
      <footer className="bg-gray-900 text-white">
        {/* Newsletter */}
        <div className="border-b border-gray-800 bg-gradient-to-r from-gray-900 via-indigo-900/20 to-gray-900">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold mb-1">🚀 Stay Ahead in Tech</h3>
                <p className="text-gray-400 text-sm">Subscribe for new courses, tutorials, and exclusive learning resources.</p>
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                <div className="flex-1 lg:w-72 relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="email" placeholder="you@email.com" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white text-sm placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <button className="btn-primary py-3 px-6 text-sm whitespace-nowrap shadow-lg shadow-indigo-500/20">
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <img src="/logo.png" alt="CodeNexusLabs" className="w-9 h-9 rounded-xl object-contain brightness-0 invert bg-white/10 p-1" />
                <div>
                  <span className="font-bold text-xl text-white">CodeNexus<span className="text-indigo-400">Labs</span></span>
                  <p className="text-[10px] text-gray-400 tracking-wide">Learn • Build • Ship</p>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
                Free, structured programming education for everyone. Built by developers who believe knowledge should be open.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:bg-gray-700`}
                    title={social.label}>
                    <social.icon className="text-base" />
                  </a>
                ))}
              </div>
            </div>

            {/* Learn */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" /> Learn
              </h4>
              <ul className="space-y-2.5">
                {courseLinks.map(course => (
                  <li key={course.name}>
                    <Link to={course.path} className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                      <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                      {course.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-indigo-400" /> Company
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                      <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-indigo-400" /> Legal
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                      <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 bg-gray-950">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col items-center gap-3">
            <div className="text-center">
              <p className="text-sm text-gray-300 font-medium">
                CodeNexusLabs — Learn • Build • Ship
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Built by <span className="text-gray-300 font-medium">Ramakrishna Baluguri</span>
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                © 2026 CodeNexusLabs. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <a href="mailto:support@codenexuslabs.com" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> support@codenexuslabs.com
              </a>
              <span className="text-gray-600">|</span>
              <a href="https://codenexuslabs.com" className="hover:text-white transition-colors flex items-center gap-1.5">
                🌐 codenexuslabs.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentLayout;