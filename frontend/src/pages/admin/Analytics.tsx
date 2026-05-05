import { useState, useEffect } from 'react';
import { Users, Eye, Clock, TrendingUp } from 'lucide-react';
import API from '../../services/api';

const Analytics = () => {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    API.get('/analytics/stats').then((res: any) => {
      setStats(res.data || {});
    }).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📊 Traffic Analytics</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Views Today', value: stats.totalViewsToday || 0, icon: Eye, color: 'from-blue-500 to-blue-600' },
          { label: 'Guest Visitors', value: stats.guestViewsToday || 0, icon: Users, color: 'from-orange-500 to-orange-600' },
          { label: 'Unique Visitors', value: stats.uniqueVisitorsToday || 0, icon: TrendingUp, color: 'from-green-500 to-green-600' },
          { label: 'Views This Week', value: stats.totalViewsThisWeek || 0, icon: Clock, color: 'from-purple-500 to-purple-600' },
        ].map(s => (
          <div key={s.label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-bold text-gray-900 mb-4">How it works</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• <strong>Guest Visitors:</strong> People browsing without login</li>
          <li>• <strong>Registered Views:</strong> Logged-in users</li>
          <li>• <strong>Unique Visitors:</strong> Different people (by session)</li>
          <li>• <strong>Views This Week:</strong> Total traffic this week</li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;