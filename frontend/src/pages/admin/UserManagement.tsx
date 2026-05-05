import { useState } from 'react';
import { Search, Users, Mail, Calendar, MoreVertical, UserCheck, UserX, Filter, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const initialUsers = [
  { id: 1, name: 'Ram Kumar', email: 'ram@gmail.com', role: 'ADMIN', status: 'Active', joined: '2026-01-15', courses: 0, avatar: 'RK' },
  { id: 2, name: 'Priya Singh', email: 'priya@email.com', role: 'STUDENT', status: 'Active', joined: '2026-02-20', courses: 3, avatar: 'PS' },
  { id: 3, name: 'Rahul Verma', email: 'rahul@email.com', role: 'STUDENT', status: 'Active', joined: '2026-03-10', courses: 5, avatar: 'RV' },
  { id: 4, name: 'Ananya Patel', email: 'ananya@email.com', role: 'STUDENT', status: 'Inactive', joined: '2026-01-28', courses: 2, avatar: 'AP' },
  { id: 5, name: 'Vikram Joshi', email: 'vikram@email.com', role: 'STUDENT', status: 'Active', joined: '2026-04-05', courses: 7, avatar: 'VJ' },
  { id: 6, name: 'Sneha Reddy', email: 'sneha@email.com', role: 'STUDENT', status: 'Active', joined: '2026-03-22', courses: 4, avatar: 'SR' },
  { id: 7, name: 'Arun Nair', email: 'arun@email.com', role: 'STUDENT', status: 'Active', joined: '2026-04-15', courses: 1, avatar: 'AN' },
  { id: 8, name: 'Deepa Menon', email: 'deepa@email.com', role: 'STUDENT', status: 'Inactive', joined: '2026-02-14', courses: 6, avatar: 'DM' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleStatus = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
    toast.success('User status updated');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all registered users ({users.length} total)</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Users', value: users.length, color: 'from-blue-500 to-blue-600' },
          { label: 'Active', value: users.filter(u => u.status === 'Active').length, color: 'from-green-500 to-green-600' },
          { label: 'Students', value: users.filter(u => u.role === 'STUDENT').length, color: 'from-purple-500 to-purple-600' },
          { label: 'Admins', value: users.filter(u => u.role === 'ADMIN').length, color: 'from-orange-500 to-orange-600' },
        ].map(stat => (
          <div key={stat.label} className="card p-4">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color} mb-2`} />
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search by name or email..." value={search}
            onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="input-field w-auto">
          <option value="All">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="STUDENT">Student</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field w-auto">
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Courses</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Joined</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" />{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                      user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      <Shield className="w-3 h-3" />{user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      user.status === 'Active' ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.courses}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />{user.joined}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => toggleStatus(user.id)}
                      className={`p-2 rounded-lg transition-all ${
                        user.status === 'Active' 
                          ? 'hover:bg-red-50 text-gray-400 hover:text-red-600' 
                          : 'hover:bg-green-50 text-gray-400 hover:text-green-600'
                      }`}
                      title={user.status === 'Active' ? 'Deactivate' : 'Activate'}>
                      {user.status === 'Active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;