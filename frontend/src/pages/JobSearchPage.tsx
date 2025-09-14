import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Clock, Briefcase } from 'lucide-react';
import JobApplicationForm from '../components/employer/HiringSuite/JobManagement/JobApplicationForm'; // Import the new form component

// Define interfaces for job and employee details to ensure type safety
interface JobDetails {
  id: number; // Added id for unique identification
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string; // Added description for context
}

interface EmployeeDetails {
  fullName: string;
  email: string;
  phone: string;
}

const JobSearchPage: React.FC = () => {
  const [isApplying, setIsApplying] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobDetails | null>(null);

  // Placeholder for employee details - in a real app, this would come from AuthContext or user profile
  const employeeDetails: EmployeeDetails = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  // Placeholder job data - in a real app, this would be fetched from an API
  const jobs: JobDetails[] = [
    {
      id: 1,
      title: 'Construction Worker',
      company: 'ABC Construction Co.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$25-35/hour',
      posted: '2 days ago',
      description: 'We are looking for an experienced construction worker to join our team...',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80-120k/year',
      posted: '1 day ago',
      description: 'Join our dynamic team as a Frontend Developer...',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Minds Studio',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$50-70/hour',
      posted: '3 days ago',
      description: 'Seeking a talented UI/UX Designer for a contract role...',
    },
    {
      id: 4,
      title: 'Backend Engineer',
      company: 'Data Systems LLC',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$90-130k/year',
      posted: '5 days ago',
      description: 'Develop and maintain robust backend systems...',
    },
    {
      id: 5,
      title: 'DevOps Specialist',
      company: 'Cloud Services Corp.',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$100-150k/year',
      posted: '1 week ago',
      description: 'Manage and optimize cloud infrastructure...',
    },
  ];

  const handleApplyClick = (job: JobDetails) => {
    setSelectedJob(job);
    setIsApplying(true);
  };

  const handleCloseForm = () => {
    setIsApplying(false);
    setSelectedJob(null); // Clear selected job when closing form
  };

  const handleSubmitApplication = (formData: FormData) => {
    console.log('Application submitted:', formData);
    // In a real application, you would send formData to your API
    alert('Application submitted successfully!');
    setIsApplying(false); // Close the form after successful submission
    setSelectedJob(null); // Clear selected job after submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Job</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and preferences.</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="glass-input pl-10 w-full"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  className="glass-input pl-10 w-full"
                />
              </div>
            </div>
            <button className="btn-primary px-8 py-3 flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Contract', 'Temporary'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="ml-2 text-sm text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <div className="space-y-2">
                    {['Entry Level', 'Mid Level', 'Senior Level', 'Executive'].map((level) => (
                      <label key={level} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="ml-2 text-sm text-gray-600">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Job Listings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="space-y-4">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + job.id * 0.1 }}
                  className="glass-card hover:shadow-glow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {job.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.type}
                        </span>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="text-xs text-gray-500">{job.posted}</span>
                      <button className="btn-primary px-4 py-2 text-sm" onClick={() => handleApplyClick(job)}>Apply Now</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Conditionally render the JobApplicationForm */}
      {isApplying && selectedJob && (
        <JobApplicationForm
          job={selectedJob}
          employee={employeeDetails}
          onClose={handleCloseForm}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
};

export default JobSearchPage;
