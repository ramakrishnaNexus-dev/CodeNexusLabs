import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Users, FileQuestion, BarChart3, LogOut, Menu, MessageSquare ,Grid3X3} from 'lucide-react';
//import { LayoutDashboard, BookOpen, Users, FileQuestion, BarChart3, LogOut, Menu, MessageSquare, Grid3X3 } from 'lucide-react';
const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Courses', icon: BookOpen, path: '/admin/courses' },
  { label: 'Users', icon: Users, path: '/admin/users' },
  { label: 'Quizzes', icon: FileQuestion, path: '/admin/quizzes' },
  { label: 'Interview', icon: MessageSquare, path: '/admin/interview' },
  { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  //{ label: 'Categories', icon: Layout, path: '/admin/categories' },
  { label: 'Categories', icon: Grid3X3, path: '/admin/categories' },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const SidebarContent = () => (
    <>
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="w-7 h-7 rounded-md object-contain" />
          {sidebarOpen && <span className="font-bold text-base text-gray-900">CodeNexus</span>}
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:block p-1 rounded-lg hover:bg-gray-100">
          <Menu className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <nav className="flex-1 p-2.5 space-y-0.5 overflow-y-auto">
        {navItems.map(item => (
          <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
              location.pathname === item.path ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`} title={!sidebarOpen ? item.label : ''}>
            <item.icon className="w-4.5 h-4.5 flex-shrink-0" />{sidebarOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="p-2.5 border-t border-gray-100">
        <button onClick={() => { logout(); }} className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600">
          <LogOut className="w-4.5 h-4.5" />{sidebarOpen && 'Logout'}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}
      
      <aside className={`fixed lg:hidden inset-y-0 left-0 z-50 w-60 bg-white border-r transform transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      <aside className={`hidden lg:flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-16'}`}>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-5 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100"><Menu className="w-5 h-5" /></button>
          <h1 className="text-base font-semibold text-gray-800">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:block">{user?.fullName}</span>
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-700 font-semibold text-xs">{user?.fullName?.charAt(0) || 'A'}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-3 lg:p-5"><Outlet /></main>
      </div>
    </div>
  );
};

export default AdminLayout;