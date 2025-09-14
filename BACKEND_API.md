# Backend API Documentation

This document outlines the API endpoints for the Shramii backend.

## Base URL

The base URL for the API is `/api`.

## Authentication

### `POST /api/auth/register`

Registers a new user.

-   **Request Body**:
    -   `email` (string, required)
    -   `password` (string, required)
    -   `role` (string, required, either `WORKER` or `EMPLOYER`)
-   **Response**:
    -   `201 Created`: User registered successfully.
    -   `400 Bad Request`: Invalid request body.

### `POST /api/auth/login`

Logs in a user.

-   **Request Body**:
    -   `email` (string, required)
    -   `password` (string, required)
-   **Response**:
    -   `200 OK`: Returns a JWT token.
    -   `401 Unauthorized`: Invalid credentials.

## Home Page

### `GET /api/home/stats`

Returns statistics for the home page.

-   **Response**:
    -   `200 OK`: Returns an array of stat objects.
        ```json
        [
          { "number": "10K+", "label": "Active Workers" },
          { "number": "5K+", "label": "Job Postings" },
          { "number": "95%", "label": "Success Rate" },
          { "number": "24/7", "label": "Support" }
        ]
        ```

### `GET /api/home/features`

Returns the features for the home page.

-   **Response**:
    -   `200 OK`: Returns an array of feature objects.
        ```json
        [
          { "icon": "Users", "title": "Smart Matching", "description": "..." },
          { "icon": "Shield", "title": "Verified Profiles", "description": "..." },
          { "icon": "Zap", "title": "Quick Hiring", "description": "..." },
          { "icon": "TrendingUp", "title": "Career Growth", "description": "..." }
        ]
        ```

### `GET /api/home/categories`

Returns the job categories for the home page.

-   **Response**:
    -   `200 OK`: Returns an array of strings.
        ```json
        [
          "Construction",
          "Manufacturing",
          "Logistics",
          "Healthcare",
          "Retail",
          "Hospitality",
          "Maintenance",
          "Security"
        ]
        ```

## Jobs

### `GET /api/jobs`

Returns a list of jobs.

-   **Query Parameters**:
    -   `category` (string, optional)
    -   `location` (string, optional)
    -   `type` (string, optional)
-   **Response**:
    -   `200 OK`: Returns an array of job objects.

### `GET /api/jobs/:id`

Returns a single job by ID.

-   **Response**:
    -   `200 OK`: Returns a job object.
    -   `404 Not Found`: Job not found.

### `POST /api/jobs`

Creates a new job posting. (Employer only)

-   **Request Body**:
    -   `title` (string, required)
    -   `description` (string, required)
    -   `category` (string, required)
    -   `location` (string, required)
    -   `type` (string, required)
-   **Response**:
    -   `201 Created`: Job created successfully.
    -   `400 Bad Request`: Invalid request body.
