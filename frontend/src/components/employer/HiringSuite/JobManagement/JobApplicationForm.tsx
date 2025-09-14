import React, { useState } from 'react';
import { MapPin, Briefcase, DollarSign, Users, Calendar } from 'lucide-react';

interface JobDetails {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
}

interface EmployeeDetails {
  fullName: string;
  email: string;
  phone: string;
}

interface JobApplicationFormProps {
  job: JobDetails;
  employee: EmployeeDetails;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ job, employee, onClose, onSubmit }) => {
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setResume(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!resume) {
      alert('Please upload your resume.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('jobTitle', job.title);
    formData.append('company', job.company);
    formData.append('location', job.location);
    formData.append('employeeName', employee.fullName);
    formData.append('employeeEmail', employee.email);
    formData.append('employeePhone', employee.phone);
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resume);

    // In a real application, you would send this formData to an API
    // For now, we'll simulate a submission
    console.log('Submitting application with:', {
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      employeeName: employee.fullName,
      employeeEmail: employee.email,
      employeePhone: employee.phone,
      coverLetter: coverLetter,
      resumeFileName: resume.name,
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    onSubmit(formData); // Call the onSubmit prop with the FormData
    setIsLoading(false);
    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full mx-auto my-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold">&times;</button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for Job</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Information */}
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.company}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-1" />
                {job.salary}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {job.type} - {job.posted}
              </div>
            </div>
          </div>

          {/* Employee Information */}
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={employee.fullName}
                  readOnly
                  className="input-field-readonly mt-1 block w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={employee.email}
                  readOnly
                  className="input-field-readonly mt-1 block w-full"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={employee.phone}
                  readOnly
                  className="input-field-readonly mt-1 block w-full"
                />
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Application Details</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {resume && <p className="text-xs text-gray-500 mt-1">Selected: {resume.name}</p>}
              </div>
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter (Optional)</label>
                <textarea
                  id="coverLetter"
                  rows={6}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="input-field mt-1 block w-full"
                  placeholder="Tell us why you're a great fit for this role..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="btn-outline px-6 py-3">Cancel</button>
            <button type="submit" className="btn-primary px-6 py-3" disabled={isLoading || !resume}>
              {isLoading ? 'Applying...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
