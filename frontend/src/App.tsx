import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
// import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import JobSearchPage from './pages/JobSearchPage';
import JobDetailsPage from './pages/JobDetailsPage';
import ProfilePage from './pages/ProfilePage';
import InterviewPage from './pages/InterviewPage'; // Import the new InterviewPage
import HiringSuite from './components/employer/HiringSuite/HiringSuite'; // Import the new component
import JobListingDashboard from './components/employer/HiringSuite/JobManagement/JobListingDashboard'; // Import JobListingDashboard
import CandidatePipeline from './components/employer/HiringSuite/CandidateManagement/CandidatePipeline'; // Import CandidatePipeline
import InterviewScheduler from './components/employer/HiringSuite/InterviewScheduling/InterviewScheduler'; // Import InterviewScheduler
import AnalyticsOverview from './components/employer/HiringSuite/Analytics/AnalyticsOverview'; // Import AnalyticsOverview

// Layouts
import EmployerLayout from './components/layout/EmployerLayout'; // Import the new layout

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Styles
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main className="min-h-screen">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/jobs" element={<JobSearchPage />} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                
                {/* Employer Routes with Layout */}
                <Route path="/employer" element={<EmployerLayout />}>
                  <Route index element={<EmployerDashboard />} /> {/* Default for /employer */}
                  <Route path="dashboard" element={<EmployerDashboard />} />
                  <Route path="hiring-suite" element={<HiringSuite />} />
                  <Route path="jobs" element={<JobListingDashboard />} />
                  <Route path="candidates" element={<CandidatePipeline />} />
                  <Route path="interviews" element={<InterviewPage />} /> {/* Route for Interviews */}
                  <Route path="analytics" element={<AnalyticsOverview />} />
                  {/* Add other employer routes here that use EmployerLayout */}
                </Route>

                {/* Protected Routes (Worker/Profile) */}
                <Route
                  path="/worker/dashboard"
                  element={
                    <ProtectedRoute role="WORKER">
                      <WorkerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </motion.div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#1f2937',
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
