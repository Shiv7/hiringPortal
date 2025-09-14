import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import JobPostingForm from './JobPostingForm'; // Import the new form component

const JobListingDashboard: React.FC = () => {
  const [isPostingJob, setIsPostingJob] = useState(false); // State to control form visibility

  // Placeholder job data
  const jobs = [
    { id: 1, title: 'Senior Frontend Developer', status: 'Open', applications: 25, posted: '2 days ago' },
    { id: 2, title: 'Backend Engineer', status: 'Open', applications: 18, posted: '3 days ago' },
    { id: 3, title: 'UI/UX Designer', status: 'Closed', applications: 10, posted: '1 week ago' },
    { id: 4, title: 'DevOps Specialist', status: 'Open', applications: 30, posted: '5 days ago' },
  ];

  const handlePostJobClick = () => {
    setIsPostingJob(true);
  };

  const handleCloseForm = () => {
    setIsPostingJob(false);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Job Postings</h3>
          <p className="text-sm text-gray-600">Manage your active and closed job openings.</p>
        </div>
        <button onClick={handlePostJobClick} className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </button>
      </div>

      <div className="flex items-center mb-6 space-x-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search jobs..."
            className="input-field pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button className="btn-outline flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applications}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.posted}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-gray-400 hover:text-gray-600" title="View"><Eye className="w-4 h-4 inline-block" /></button>
                  <button className="text-gray-400 hover:text-blue-600" title="Edit"><Edit className="w-4 h-4 inline-block" /></button>
                  <button className="text-red-400 hover:text-red-600" title="Delete"><Trash2 className="w-4 h-4 inline-block" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditionally render the JobPostingForm */}
      {isPostingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"> {/* Increased opacity */}
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto my-8 relative"> {/* Added solid background and styling to the form container */}
            <JobPostingForm />
            <button onClick={handleCloseForm} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl">&times;</button> {/* Adjusted close button color */}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingDashboard;
