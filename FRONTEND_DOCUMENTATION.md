# Frontend Documentation

This document provides a comprehensive overview of the frontend architecture, project structure, and component breakdown.

## Project Overview

The frontend is a React application built with TypeScript that serves as a portal for blue-collar workers to find jobs and for employers to hire them. It features a modern, responsive UI with a focus on user experience.

## Project Structure

The project is organized into the following directories:

-   **`src/`**: Contains the main source code for the application.
    -   **`assets/`**: Static assets like images and icons.
    -   **`components/`**: Reusable UI components.
        -   **`auth/`**: Components related to authentication (e.g., `ProtectedRoute`).
        -   **`employer/`**: Components specific to the employer dashboard.
        -   **`layout/`**: Layout components like `Navbar` and `Footer`.
    -   **`contexts/`**: React contexts for state management (e.g., `AuthContext`).
    -   **`hooks/`**: Custom React hooks.
    -   **`pages/`**: Top-level page components for each route.
        -   **`auth/`**: Authentication pages (`LoginPage`, `RegisterPage`).
        -   **`employer/`**: Employer-specific pages.
        -   **`worker/`**: Worker-specific pages.
    -   **`services/`**: Services for interacting with external APIs (e.g., `api.ts`).
    -   **`styles/`**: Global styles and CSS modules.
    -   **`types/`**: TypeScript type definitions.
    -   **`utils/`**: Utility functions.

## Component Breakdown

### Home Page (`src/pages/HomePage.tsx`)

The home page is the landing page for the application and contains the following sections:

-   **Hero Section**: A prominent section with a call-to-action to either find jobs or hire workers.
-   **Stats**: Displays key statistics about the platform (e.g., active workers, job postings).
-   **Features Section**: Highlights the key features of the platform.
-   **Job Categories**: Lists popular job categories.
-   **How It Works**: A step-by-step guide on how to use the platform.
-   **CTA Section**: A final call-to-action to encourage users to sign up or browse jobs.

### Data Requirements

The home page currently uses dummy data for the following:

-   **Stats**: `stats` array.
-   **Features**: `features` array.
-   **Job Categories**: `jobCategories` array.

This data will need to be replaced with data fetched from the backend API.
