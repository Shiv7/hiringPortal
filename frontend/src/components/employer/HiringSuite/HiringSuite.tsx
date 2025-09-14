import React from 'react';
import AnalyticsOverview from './Analytics/AnalyticsOverview'; // Import the Analytics component
import JobListingDashboard from './JobManagement/JobListingDashboard'; // Import the Job Listing Dashboard
import CandidatePipeline from './CandidateManagement/CandidatePipeline'; // Import the Candidate Pipeline component
import TeamCollaboration from './TeamCollaboration/TeamCollaboration'; // Import the Team Collaboration component
import Notifications from './Notifications/Notifications'; // Import the Notifications component
import DataExportReporting from './DataExportReporting/DataExportReporting'; // Import the Data Export Reporting component

const HiringSuite: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Employer Hiring Suite</h1>
      <p className="text-gray-600 mb-8">Your comprehensive hub for managing job openings and candidates.</p>
      
      {/* Analytics Section */}
      <div className="mb-8">
        <AnalyticsOverview />
      </div>

      {/* Job Management Section */}
      <div className="mb-8">
        <JobListingDashboard />
      </div>

      {/* Candidate Pipeline Section */}
      <div className="mb-8">
        <CandidatePipeline />
      </div>

      {/* Team Collaboration Section */}
      <div className="mb-8">
        <TeamCollaboration />
      </div>

      {/* Notifications Section */}
      <div className="mb-8">
        <Notifications />
      </div>

      {/* Data Export & Reporting Section */}
      <div className="mb-8">
        <DataExportReporting />
      </div>

      {/* Placeholder for other future components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Other placeholders can be added here */}
      </div>
    </div>
  );
};

export default HiringSuite;
