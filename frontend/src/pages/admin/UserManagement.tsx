import { useState, useEffect } from 'react';
import { Search, Users, Mail, Calendar, UserCheck, UserX, Filter, Shield, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchUsers = () => {
    setLoading(true);
    API.get('/admin/users')
      .then((res: any) => {
        const data = res.data?.data || res.data || [];
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const filteredUsers = users.filter((user: any) => {
    const nameMatch = (user.fullName || user.name || '').toLowerCase().includes(search.toLowerCase()) || 
                      (user.email || '').toLowerCase().includes(search.toLowerCase());
    const roleMatch = roleFilter === 'All' || user.role === roleFilter;
    const statusMatch = statusFilter === 'All' || 
      (statusFilter === 'Active' && user.active) || 
      (statusFilter === 'Inactive' && !user.active);
    return nameMatch && roleMatch && statusMatch;
  });

  const toggleStatus = async (userId: number) => {
    try {
      await API.put(`/admin/users/${userId}/toggle-status`);
      toast.success('User status updated');
      fetchUsers();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u: any) => u.active).length;
  const studentCount = users.filter((u: any) => u.role === 'STUDENT').length;
  const adminCount = users.filter((u: any) => u.role === 'ADMIN').length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all registered users ({totalUsers} total)</p>
        </div>
        <button onClick={fetchUsers} className="btn-secondary py-1.5 px-3 text-xs gap-1.5">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Users', value: totalUsers, color: 'from-blue-500 to-blue-600' },
          { label: 'Active', value: activeUsers, color: 'from-green-500 to-green-600' },
          { label: 'Students', value: studentCount, color: 'from-purple-500 to-purple-600' },
          { label: 'Admins', value: adminCount, color: 'from-orange-500 to-orange-600' },
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
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Joined</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: any) => (
                <tr key={user.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {(user.fullName || user.name || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.fullName || user.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" />{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                      user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      <Shield className="w-3 h-3" />{user.role || 'STUDENT'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      user.active ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => toggleStatus(user.id)}
                      className={`p-2 rounded-lg transition-all ${
                        user.active 
                          ? 'hover:bg-red-50 text-gray-400 hover:text-red-600' 
                          : 'hover:bg-green-50 text-gray-400 hover:text-green-600'
                      }`}
                      title={user.active ? 'Deactivate' : 'Activate'}>
                      {user.active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No users found</p>
          </div>
        )}
        {loading && (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
            <p className="text-gray-500 mt-2">Loading users...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;