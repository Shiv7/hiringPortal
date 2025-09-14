# Shramii Hiring Portal - Frontend Documentation

This document provides a comprehensive overview of the frontend architecture, components, and data flow for the Shramii Hiring Portal.

## 1. Project Structure

The frontend is a React application built with TypeScript. The project follows a standard feature-based organization, with a clear separation of concerns.

```
frontend/
├── build/                  # Production build output
├── public/                 # Public assets (index.html, manifest.json, etc.)
└── src/
    ├── assets/             # Images, icons, and other static assets
    ├── components/         # Reusable UI components
    │   ├── auth/           # Authentication-related components
    │   ├── employer/       # Components specific to the employer dashboard
    │   └── layout/         # Layout components (Navbar, Footer, etc.)
    ├── contexts/           # React contexts for global state management
    ├── hooks/              # Custom React hooks
    ├── pages/              # Top-level page components
    │   ├── auth/           # Authentication pages (Login, Register)
    │   ├── employer/       # Employer-specific pages
    │   └── worker/         # Worker-specific pages
    ├── services/           # API services for communicating with the backend
    ├── styles/             # Global styles and CSS modules
    ├── types/              # TypeScript type definitions
    └── utils/              # Utility functions
```

## 2. Key Technologies

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **React Router:** For declarative routing in the application.

## 3. Core Features

### 3.1. Authentication

*   **User Roles:** The application supports two user roles: `WORKER` and `EMPLOYER`.
*   **Registration:** New users can register as either a worker or an employer.
*   **Login:** Existing users can log in to access their respective dashboards.
*   **Protected Routes:** Certain routes are protected and require authentication.

### 3.2. Worker Features

*   **Dashboard:** A personalized dashboard for workers.
*   **Job Search:** Workers can search and filter job listings.
*   **Job Details:** View detailed information about a specific job.
*   **Apply for Jobs:** Workers can apply for jobs directly through the platform.
*   **Profile Management:** Workers can create and manage their profiles.

### 3.3. Employer Features

*   **Dashboard:** A comprehensive dashboard for employers.
*   **Hiring Suite:** A suite of tools for managing the hiring process, including:
    *   **Analytics:** View analytics and reports on hiring metrics.
    *   **Candidate Management:** A pipeline for tracking candidates.
    *   **Job Management:** Post, edit, and manage job listings.
    *   **Interview Scheduling:** Schedule and manage interviews with candidates.
    *   **Team Collaboration:** Collaborate with team members on hiring.

## 4. Data Models

The frontend uses the following data models, which will be implemented in the backend.

### 4.1. User

```typescript
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'WORKER' | 'EMPLOYER';
  isActive: boolean;
  createdAt: string;
}
```

### 4.2. Job

```typescript
export interface Job {
  id: string;
  title: string;
  description: string;
  employer: {
    id: string;
    companyName: string;
    location: string;
  };
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  skills: string[];
  experience: string;
  education: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY';
  employmentType: 'ON_SITE' | 'REMOTE' | 'HYBRID';
  status: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
  benefits: string[];
  contactInfo: {
    email: string;
    phone: string;
  };
  views: number;
  applications: number;
  postedAt: string;
  deadline: string;
}
```

## 5. API Integration

The frontend currently uses a mock API (`src/services/mockApi.ts`) for development. This will be replaced with a real backend API. The API endpoints and data structures are defined in the mock API and will be used as a reference for backend development.
