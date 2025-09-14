import React from 'react';
import { MessageSquare, Users, ThumbsUp, Share2 } from 'lucide-react';

const TeamCollaboration: React.FC = () => {
  // Mock data for team activity feed
  const activityFeed = [
    { id: 1, user: 'Alice Johnson', action: 'commented on candidate', target: 'Bob Williams', time: '2 hours ago', icon: MessageSquare },
    { id: 2, user: 'David Lee', action: 'updated job status', target: 'Backend Engineer', time: '5 hours ago', icon: Share2 },
    { id: 3, user: 'Alice Johnson', action: 'gave feedback on candidate', target: 'Charlie Brown', time: '1 day ago', icon: ThumbsUp },
    { id: 4, user: 'Sarah Chen', action: 'added new job posting', target: 'Frontend Developer', time: '2 days ago', icon: Users },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Collaboration & Feedback</h3>
      <p className="text-sm text-gray-600 mb-6">Stay updated on team activities and candidate feedback.</p>

      <div className="space-y-4">
        {activityFeed.map((item) => (
          <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className={`p-3 rounded-lg ${getColorForAction(item.action)} bg-gray-100`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-900">
                <span className="font-semibold">{item.user}</span> {item.action} <span className="font-semibold">{item.target}</span>
              </p>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
            {/* Placeholder for quick actions like 'Reply' or 'View' */}
          </div>
        ))}
      </div>
      {/* Placeholder for adding comments or feedback */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Add Feedback (Placeholder)</h4>
        <textarea
          className="textarea-field w-full h-24"
          placeholder="Add your feedback or comment..."
        ></textarea>
        <div className="flex justify-end mt-3">
          <button className="btn-primary">Post Feedback</button>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine color based on action (can be expanded)
const getColorForAction = (action: string): string => {
  if (action.includes('commented')) return 'text-blue-800';
  if (action.includes('feedback')) return 'text-green-800';
  if (action.includes('job status')) return 'text-purple-800';
  if (action.includes('new job')) return 'text-teal-800';
  return 'text-gray-800';
};

export default TeamCollaboration;
