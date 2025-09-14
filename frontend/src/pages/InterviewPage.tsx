import React, { useState } from 'react';
import InterviewScheduler from '../components/employer/HiringSuite/InterviewScheduling/InterviewScheduler';
import { Calendar } from 'lucide-react'; // Assuming Calendar icon might be used here

// Define a type for interview data
interface Interview {
  id: number;
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
}

const InterviewPage: React.FC = () => {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [scheduledInterviews, setScheduledInterviews] = useState<Interview[]>([
    // Dummy data for scheduled interviews
    { id: 1, candidateName: 'Alice Smith', jobTitle: 'Frontend Developer', date: '2025-09-20', time: '11:00 AM' },
    { id: 2, candidateName: 'Bob Johnson', jobTitle: 'Backend Developer', date: '2025-09-21', time: '02:00 PM' },
  ]);

  // Dummy list of candidates
  const candidates = [
    { id: 'c1', name: 'Alice Smith', jobTitle: 'Frontend Developer' },
    { id: 'c2', name: 'Bob Johnson', jobTitle: 'Backend Developer' },
    { id: 'c3', name: 'Charlie Brown', jobTitle: 'UI/UX Designer' },
    { id: 'c4', name: 'Diana Prince', jobTitle: 'Project Manager' },
  ];

  const handleOpenScheduler = () => {
    if (selectedCandidate) { // Only open if a candidate is selected
      setIsSchedulerOpen(true);
    }
  };

  const handleCloseScheduler = () => {
    setIsSchedulerOpen(false);
    // Optionally clear selected candidate or reset form after closing
    // setSelectedCandidate('');
  };

  const handleCandidateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCandidate(event.target.value);
  };

  // This function would be called from InterviewScheduler to add a new interview
  const handleAddInterview = (newInterview: Omit<Interview, 'id'>) => {
    const interviewWithId = { ...newInterview, id: scheduledInterviews.length + 1 };
    setScheduledInterviews([...scheduledInterviews, interviewWithId]);
    handleCloseScheduler(); // Close scheduler after adding
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Interview Scheduling</h1>
      <p className="text-gray-600 mb-8">Manage and schedule interviews for candidates.</p>

      {/* Section to schedule a new interview */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule New Interview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label htmlFor="candidate-select" className="block text-sm font-medium text-gray-700 mb-1">
              Candidate
            </label>
            <select
              id="candidate-select"
              value={selectedCandidate}
              onChange={handleCandidateChange}
              className="input-field"
            >
              <option value="" disabled>Select a candidate</option>
              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.name}>
                  {candidate.name} ({candidate.jobTitle})
                </option>
              ))}
            </select>
          </div>
          
          {/* Button to open the scheduler - now enabled only if a candidate is selected */}
          <button
            onClick={handleOpenScheduler}
            className="btn-primary"
            disabled={!selectedCandidate}
          >
            <Calendar className="w-5 h-5 mr-2" /> Schedule Interview
          </button>
        </div>
      </div>

      {/* Render the InterviewScheduler component - it will receive the selected candidate */}
      {isSchedulerOpen && (
        <InterviewScheduler
          isOpen={isSchedulerOpen}
          onClose={handleCloseScheduler}
          candidateName={selectedCandidate} // Pass the selected candidate
          jobTitle={candidates.find(c => c.name === selectedCandidate)?.jobTitle || ''} // Pass job title based on selected candidate
          onSchedule={handleAddInterview} // Pass a handler to add the new interview
        />
      )}

      {/* Display list of scheduled interviews */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Scheduled Interviews</h2>
        {scheduledInterviews.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scheduledInterviews.map((interview) => (
                  <tr key={interview.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{interview.candidateName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.jobTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Add actions like edit/delete if needed */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No interviews scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
