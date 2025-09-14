import React from 'react';
import { Briefcase, Users, TrendingUp, Eye, Calendar } from 'lucide-react'; // Added Calendar for interviews

const AnalyticsOverview: React.FC = () => {
  const stats = [
    { title: 'Active Job Postings', value: '8', icon: Briefcase, color: 'text-blue-600' },
    { title: 'Total Applications', value: '156', icon: Users, color: 'text-green-600' },
    { title: 'Interviews Scheduled', value: '25', icon: Calendar, color: 'text-purple-600' },
    { title: 'Profile Views', value: '89', icon: Eye, color: 'text-yellow-600' },
    { title: 'Hired This Month', value: '5', icon: TrendingUp, color: 'text-red-600' },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className={`p-3 rounded-lg ${stat.color} bg-gray-100`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Placeholder for charts */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Hiring Trends (Placeholder)</h4>
        <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
          Chart visualizations will be added here.
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
