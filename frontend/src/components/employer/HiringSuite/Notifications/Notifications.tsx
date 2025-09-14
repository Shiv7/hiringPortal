import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock function to simulate receiving notifications
  const fetchNotifications = () => {
    // In a real app, this would fetch from an API or WebSocket
    const newNotifications: Notification[] = [
      { id: Date.now(), message: 'New application received for Frontend Developer.', type: 'info', timestamp: new Date().toLocaleTimeString() },
      { id: Date.now() + 1, message: 'Interview scheduled for Bob Williams.', type: 'success', timestamp: new Date().toLocaleTimeString() },
    ];
    setNotifications(prev => [...prev, ...newNotifications]);
  };

  useEffect(() => {
    // Simulate fetching notifications periodically
    const intervalId = setInterval(fetchNotifications, 30000); // Fetch every 30 seconds
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationClass = (type: Notification['type']): string => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'success': return 'bg-green-100 text-green-800 border-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'error': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="btn-primary flex items-center space-x-2 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        aria-label="Toggle Notifications"
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && notifications.length > 0 && (
        <div className="absolute right-0 mt-2 w-80 max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
            <h4 className="text-lg font-semibold text-gray-900">Notifications</h4>
            <button onClick={toggleNotifications} aria-label="Close Notifications">
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto p-4 space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className={`relative p-3 rounded-lg border ${getNotificationClass(notification.type)}`}>
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-full ${getNotificationClass(notification.type).replace('bg-', 'bg-')}`}>
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium leading-tight">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                  </div>
                </div>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  aria-label="Dismiss Notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
            <button onClick={toggleNotifications} className="text-blue-600 hover:underline text-sm font-medium">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
