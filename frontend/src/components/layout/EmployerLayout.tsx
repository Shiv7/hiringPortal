import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home, Briefcase, Users, TrendingUp, Settings, Calendar } from 'lucide-react'; // Added Calendar for scheduling

const EmployerLayout: React.FC = () => {
  const sidebarItems = [
    { name: 'Dashboard', icon: Home, path: '/employer/dashboard' },
    { name: 'Hiring Suite', icon: Briefcase, path: '/employer/hiring-suite' },
    { name: 'Job Management', icon: Briefcase, path: '/employer/jobs' }, // Placeholder
    { name: 'Candidate Pipeline', icon: Users, path: '/employer/candidates' }, // Placeholder
    { name: 'Interviews', icon: Calendar, path: '/employer/interviews' }, // Placeholder for scheduling
    { name: 'Analytics', icon: TrendingUp, path: '/employer/analytics' }, // Placeholder
    { name: 'Settings', icon: Settings, path: '/employer/settings' }, // Placeholder
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white bg-opacity-50 backdrop-blur-lg shadow-lg flex flex-col">
        <div className="p-6 text-center border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Employer Portal</h2>
          <p className="text-sm text-gray-600">Welcome back!</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center p-3 rounded-lg hover:bg-blue-100 hover:bg-opacity-50 transition-colors duration-200 text-gray-700 hover:text-blue-700 font-medium"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          {/* Potential for user profile/logout here */}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar will be rendered here if it's part of the layout */}
        {/* For now, assuming Navbar is rendered globally in App.tsx */}
        <div className="p-8 flex-1 overflow-y-auto">
          <Outlet /> {/* This is where the routed component will be rendered */}
        </div>
      </main>
    </div>
  );
};

export default EmployerLayout;
