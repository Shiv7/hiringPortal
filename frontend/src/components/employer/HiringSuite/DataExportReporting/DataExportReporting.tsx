import React from 'react';
import { Download, FileText, Users, Calendar } from 'lucide-react';

const DataExportReporting: React.FC = () => {
  const handleExport = (type: 'jobs' | 'candidates' | 'interviews') => {
    // TODO: Implement actual data export logic
    console.log(`Exporting ${type} data...`);
    alert(`Exporting ${type} data. This is a placeholder.`);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Export & Reporting</h3>
      <p className="text-sm text-gray-600 mb-6">Export your hiring data for analysis.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleExport('jobs')}
          className="btn-secondary flex items-center justify-center space-x-2 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <FileText className="w-5 h-5" />
          <span>Export Jobs</span>
        </button>
        <button
          onClick={() => handleExport('candidates')}
          className="btn-secondary flex items-center justify-center space-x-2 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Users className="w-5 h-5" />
          <span>Export Candidates</span>
        </button>
        <button
          onClick={() => handleExport('interviews')}
          className="btn-secondary flex items-center justify-center space-x-2 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Calendar className="w-5 h-5" />
          <span>Export Interviews</span>
        </button>
      </div>
    </div>
  );
};

export default DataExportReporting;
