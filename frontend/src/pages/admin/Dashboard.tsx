import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { 
  Users, BookOpen, UserCheck, TrendingUp, ArrowUp, ArrowDown,
  RefreshCw, Eye, Clock
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const COLORS: string[] = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const emptyUserGrowth: any[] = [
  { month: 'Jan', students: 0, activeUsers: 0 },
  { month: 'Feb', students: 0, activeUsers: 0 },
  { month: 'Mar', students: 0, activeUsers: 0 },
  { month: 'Apr', students: 0, activeUsers: 0 },
  { month: 'May', students: 0, activeUsers: 0 },
  { month: 'Jun', students: 0, activeUsers: 0 },
  { month: 'Jul', students: 0, activeUsers: 0 },
  { month: 'Aug', students: 0, activeUsers: 0 },
  { month: 'Sep', students: 0, activeUsers: 0 },
  { month: 'Oct', students: 0, activeUsers: 0 },
  { month: 'Nov', students: 0, activeUsers: 0 },
  { month: 'Dec', students: 0, activeUsers: 0 },
];

const emptyCourseData: any[] = [];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 text-xs">
        <p className="font-semibold text-gray-900 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-gray-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}: <span className="font-semibold">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiStats, setApiStats] = useState<any>({});

  const fetchStats = () => {
    setIsRefreshing(true);
    adminAPI.getStats().then((res: any) => {
      setApiStats(res.data || {});
    }).catch(() => {}).finally(() => setIsRefreshing(false));
  };

  useEffect(() => { fetchStats(); }, []);

  const userGrowthData = (apiStats.userGrowthData && apiStats.userGrowthData.length > 0) 
    ? apiStats.userGrowthData 
    : emptyUserGrowth;

  const courseData = (apiStats.courseData && apiStats.courseData.length > 0) 
    ? apiStats.courseData 
    : emptyCourseData;

  const stats: any[] = [
    { title: 'Total Users', value: apiStats.totalUsers ?? 0, icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Active Now', value: apiStats.activeUsersNow ?? 0, icon: UserCheck, color: 'from-green-500 to-green-600' },
    { title: 'Total Courses', value: apiStats.totalCourses ?? 0, icon: BookOpen, color: 'from-purple-500 to-purple-600' },
    { title: 'Views Today', value: apiStats.totalViewsToday ?? 0, icon: Eye, color: 'from-orange-500 to-orange-600' },
  ];

  const trafficStats: any[] = [
    { title: 'Guest Views Today', value: apiStats.guestViewsToday ?? 0, icon: Eye, color: 'from-sky-500 to-cyan-500' },
    { title: 'Unique Visitors', value: apiStats.uniqueVisitorsToday ?? 0, icon: Users, color: 'from-pink-500 to-rose-500' },
    { title: 'Views This Week', value: apiStats.totalViewsThisWeek ?? 0, icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
    { title: 'Views This Month', value: apiStats.totalViewsThisMonth ?? 0, icon: Clock, color: 'from-indigo-500 to-purple-500' },
  ];

  const recentUsers = (apiStats.recentUsers || []).slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-xs mt-0.5">Real-time platform statistics</p>
        </div>
        <button onClick={fetchStats} className="btn-secondary py-1.5 px-3 text-xs gap-1.5">
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat: any) => (
          <div key={stat.title} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Traffic Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {trafficStats.map((stat: any) => (
          <div key={stat.title} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm" style={{ minHeight: '300px' }}>
          <h3 className="text-sm font-bold text-gray-900 mb-3">User Growth</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} /><stop offset="95%" stopColor="#4f46e5" stopOpacity={0} /></linearGradient>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={10} />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="students" stroke="#4f46e5" fill="url(#colorStudents)" strokeWidth={2} name="Students" />
                <Area type="monotone" dataKey="activeUsers" stroke="#10b981" fill="url(#colorActive)" strokeWidth={2} name="Active" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm" style={{ minHeight: '300px' }}>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Course Enrollments</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={courseData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="students" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm" style={{ minHeight: '300px' }}>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Completion Rate (%)</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={courseData} layout="vertical" barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9ca3af" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={10} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="completion" fill="#10b981" radius={[0, 6, 6, 0]} name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm" style={{ minHeight: '300px' }}>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Distribution</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={courseData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="students" nameKey="name"
                  label={(entry: any) => `${entry.name} ${((entry.percent || 0) * 100).toFixed(0)}%`}>
                  {courseData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h3 className="text-sm font-bold text-gray-900">Recent Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 text-[11px] font-semibold text-gray-500 uppercase">User</th>
                <th className="text-left px-4 py-2 text-[11px] font-semibold text-gray-500 uppercase">Role</th>
                <th className="text-left px-4 py-2 text-[11px] font-semibold text-gray-500 uppercase">Joined</th>
                <th className="text-left px-4 py-2 text-[11px] font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {(recentUsers.length > 0 ? recentUsers : []).map((user: any, i: number) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-[11px]">
                        {user.fullName?.charAt(0) || user.name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-xs">{user.fullName || user.name}</p>
                        <p className="text-[10px] text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                      {user.role || 'STUDENT'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`flex items-center gap-1 text-[10px] font-medium ${user.lastActiveAt && new Date(user.lastActiveAt).getTime() > Date.now() - 300000 ? 'text-green-600' : 'text-gray-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.lastActiveAt && new Date(user.lastActiveAt).getTime() > Date.now() - 300000 ? 'bg-green-500' : 'bg-gray-300'}`} />
                      {user.lastActiveAt && new Date(user.lastActiveAt).getTime() > Date.now() - 300000 ? 'Online' : 'Offline'}
                    </span>
                  </td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400 text-sm">No users registered yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;