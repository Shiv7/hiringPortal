import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';

interface InterviewSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  jobTitle: string;
  onSchedule: (newInterview: { date: string; time: string; duration: string; candidateName: string; jobTitle: string }) => void; // Added onSchedule prop
}

const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({ isOpen, onClose, candidateName, jobTitle, onSchedule }) => {
  const [date, setDate] = useState('2025-09-15'); // Dummy date
  const [time, setTime] = useState('10:00'); // Dummy time
  const [duration, setDuration] = useState('45'); // Dummy duration, default to 45 minutes

  const handleSchedule = () => {
    // TODO: Implement actual scheduling logic (API call, calendar integration)
    console.log('Scheduling interview for:', candidateName, 'for', jobTitle);
    console.log('Date:', date, 'Time:', time, 'Duration:', duration, 'minutes');
    
    // Call the onSchedule prop with the new interview details
    onSchedule({ date, time, duration, candidateName, jobTitle });
    
    onClose(); // Close modal after scheduling
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule Interview</h3>
        <p className="text-gray-600 mb-6">For <span className="font-semibold">{candidateName}</span> - <span className="font-medium">{jobTitle}</span></p>

        <div className="space-y-4">
          <div>
            <label htmlFor="interview-date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="interview-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="interview-time" className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <div className="relative">
              <input
                type="time"
                id="interview-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input-field pl-10"
              />
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="interview-duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <select
              id="interview-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input-field"
            >
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
            </select>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="btn-outline mr-3">Cancel</button>
          <button onClick={handleSchedule} className="btn-primary" disabled={!date || !time}>
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
