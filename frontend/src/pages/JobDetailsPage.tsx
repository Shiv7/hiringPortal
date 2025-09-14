import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, DollarSign, Users, Calendar } from 'lucide-react';
import JobApplicationForm from '../components/employer/HiringSuite/JobManagement/JobApplicationForm'; // Import the new form component

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isApplying, setIsApplying] = useState(false); // State to control the application form visibility

  // Placeholder for job details - in a real app, this would be fetched based on 'id'
  const jobDetails = {
    title: 'Construction Worker',
    company: 'ABC Construction Co.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$25-35/hour',
    posted: '2 days ago',
  };

  // Placeholder for employee details - in a real app, this would come from AuthContext or user profile
  const employeeDetails = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  const handleApplyClick = () => {
    setIsApplying(true);
  };

  const handleCloseForm = () => {
    setIsApplying(false);
  };

  const handleSubmitApplication = (formData: FormData) => {
    console.log('Application submitted:', formData);
    // Here you would typically send formData to your API
    alert('Application submitted successfully!');
    setIsApplying(false); // Close the form after successful submission
  };
  
  // Use the id parameter to avoid unused variable warning
  console.log('Job ID:', id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Construction Worker</h1>
                <p className="text-xl text-gray-600">ABC Construction Co.</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    San Francisco, CA
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Full-time
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    $25-35/hour
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="btn-outline px-6 py-3">Save Job</button>
              <button className="btn-primary px-6 py-3" onClick={handleApplyClick}>Apply Now</button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  We are seeking a skilled Construction Worker to join our team. The ideal candidate will have experience in various construction tasks and be able to work in a fast-paced environment.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsibilities:</h3>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                  <li>Perform various construction tasks as assigned</li>
                  <li>Follow safety protocols and procedures</li>
                  <li>Work with hand and power tools</li>
                  <li>Assist with material handling and site preparation</li>
                  <li>Maintain clean and organized work areas</li>
                </ul>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>2+ years of construction experience</li>
                  <li>Valid driver's license</li>
                  <li>Ability to lift 50+ pounds</li>
                  <li>OSHA certification preferred</li>
                  <li>Reliable transportation</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">ABC Construction Co.</h3>
                  <p className="text-gray-600 mb-2">Building the future, one project at a time.</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      50-100 employees
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Founded 2010
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type</span>
                  <span className="font-medium">Full-time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">2+ years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary</span>
                  <span className="font-medium">$25-35/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">San Francisco, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium">2 days ago</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <h4 className="font-medium text-gray-900">Construction Worker</h4>
                    <p className="text-sm text-gray-600">XYZ Construction</p>
                    <p className="text-sm text-gray-500">$22-30/hour</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Conditionally render the JobApplicationForm */}
      {isApplying && (
        <JobApplicationForm
          job={jobDetails}
          employee={employeeDetails}
          onClose={handleCloseForm}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
};

export default JobDetailsPage;
