import React, { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';

interface Asset {
  id: number;
  value: string;
}

const JobPostingForm: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Entry-level');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [assetsRequired, setAssetsRequired] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [newAsset, setNewAsset] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [benefits, setBenefits] = useState('');

  const handleAddAsset = () => {
    if (newAsset.trim()) {
      setAssets([...assets, { id: Date.now(), value: newAsset }]);
      setNewAsset('');
    }
  };

  const handleRemoveAsset = (id: number) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual job posting submission logic
    console.log('Job posting submitted:', {
      jobTitle,
      jobDescription,
      employmentType,
      location,
      minSalary,
      maxSalary,
      experienceLevel,
      applicationDeadline,
      companyName,
      companyDescription,
      assetsRequired,
      assets,
      contactInfo,
      benefits,
    });
    alert('Job posted successfully!');
    // Reset form after submission
    setJobTitle('');
    setJobDescription('');
    setEmploymentType('Full-time');
    setLocation('');
    setMinSalary('');
    setMaxSalary('');
    setExperienceLevel('Entry-level');
    setApplicationDeadline('');
    setCompanyName('');
    setCompanyDescription('');
    setAssetsRequired(false);
    setAssets([]);
    setNewAsset('');
    setContactInfo('');
    setBenefits('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto my-8 overflow-y-auto max-h-[80vh] border border-gray-200"> {/* Added border and adjusted max-h */}
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Post a New Job</h3>
      <form onSubmit={handleSubmit} className="space-y-6 pb-12"> {/* Reduced bottom padding to ensure button visibility */}
        {/* Job Title */}
        <div className="mb-6"> {/* Added margin-bottom for spacing */}
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            className="input-field mt-1 block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
          />
        </div>

        {/* Job Description */}
        <div className="mb-6"> {/* Added margin-bottom for spacing */}
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            rows={6}
            className="input-field mt-1 block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
          ></textarea>
        </div>

        {/* Employment Type & Experience Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> {/* Added margin-bottom for spacing */}
          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
            <select
              id="employmentType"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              required
              className="input-field mt-1 block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <select
              id="experienceLevel"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              required
              className="input-field mt-1 block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
            >
              <option value="Entry-level">Entry-level</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>
        </div>

        {/* Location & Application Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> {/* Added margin-bottom for spacing */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco, CA or Remote"
              required
              className="input-field mt-1 block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
            />
          </div>
          <div>
            <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
            <input
              type="date"
              id="applicationDeadline"
              value={applicationDeadline}
              onChange={(e) => setApplicationDeadline(e.target.value)}
              required
              className="input-field mt-1 block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
            />
          </div>
        </div>

        {/* Salary Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-6"> {/* Added margin-bottom for spacing */}
          <label className="block text-sm font-medium text-gray-700 col-span-1">Salary Range</label>
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-2">
            <input
              type="number"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              placeholder="Min Salary"
              className="input-field block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
            />
            <input
              type="number"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              placeholder="Max Salary"
              className="input-field block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
            />
          </div>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> {/* Added margin-bottom for spacing */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="input-field mt-1 block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
            />
          </div>
          <div>
            <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
            <textarea
              id="companyDescription"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              rows={3}
              className="input-field mt-1 block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
            ></textarea>
          </div>
        </div>

        {/* Assets */}
        <div className="border-t pt-6 mb-6"> {/* Added margin-bottom for spacing */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="assetsRequired"
              checked={assetsRequired}
              onChange={(e) => setAssetsRequired(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="assetsRequired" className="ml-2 block text-sm font-medium text-gray-700">Assets Required</label>
          </div>
          {assetsRequired && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assets</label>
              <div className="space-y-2">
                {assets.map((asset) => (
                  <div key={asset.id} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={asset.value}
                      readOnly // Display only, editing handled by adding new
                      className="input-field flex-grow block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
                      placeholder="Asset Name or URL"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAsset(asset.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex mt-2 space-x-2">
                <input
                  type="text"
                  value={newAsset}
                  onChange={(e) => setNewAsset(e.target.value)}
                  placeholder="Add Asset Name or URL"
                  className="input-field flex-grow block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
                />
                <button
                  type="button"
                  onClick={handleAddAsset}
                  className="btn-secondary flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Info & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> {/* Added margin-bottom for spacing */}
          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">Contact Email/Link</label>
            <input
              type="text"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="e.g., careers@company.com or careers.company.com"
              required
              className="input-field mt-1 block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
            />
          </div>
          <div>
            <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
            <textarea
              id="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              rows={3}
              className="input-field mt-1 block w-full rounded-md border-gray-400 bg-gray-50 shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" /* Added padding */
            ></textarea>
          </div>
        </div>

        <div className="text-center pt-4"> {/* Added padding-top to ensure button is not cut off */}
          <button type="submit" className="btn-primary px-8 py-3">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;
