# Shramii Hiring Portal - Backend API Specification

This document outlines the API endpoints, data models, and request/response formats for the Shramii Hiring Portal backend.

## 1. Base URL

The base URL for the API will be `/api/v1`.

## 2. Authentication

Authentication will be handled using JSON Web Tokens (JWT).

*   **`POST /api/v1/auth/register`**: Register a new user.
*   **`POST /api/v1/auth/login`**: Log in an existing user and receive a JWT.

## 3. Data Models

### 3.1. User

| Field       | Type     | Description                  |
| :---------- | :------- | :--------------------------- |
| `id`        | `UUID`   | Unique identifier for the user |
| `username`  | `String` | User's username              |
| `email`     | `String` | User's email address         |
| `password`  | `String` | Hashed password              |
| `firstName` | `String` | User's first name            |
| `lastName`  | `String` | User's last name             |
| `role`      | `Enum`   | `WORKER` or `EMPLOYER`       |
| `isActive`  | `Boolean`| Whether the user is active   |
| `createdAt` | `Date`   | Timestamp of user creation   |

### 3.2. Job

| Field            | Type     | Description                             |
| :--------------- | :------- | :-------------------------------------- |
| `id`             | `UUID`   | Unique identifier for the job           |
| `title`          | `String` | Job title                               |
| `description`    | `String` | Detailed job description                |
| `employerId`     | `UUID`   | Foreign key to the `User` table         |
| `location`       | `String` | Job location                            |
| `minSalary`      | `Number` | Minimum salary                          |
| `maxSalary`      | `Number` | Maximum salary                          |
| `currency`       | `String` | Salary currency (e.g., `INR`)           |
| `skills`         | `Array`  | List of required skills                 |
| `experience`     | `String` | Required experience level               |
| `education`      | `String` | Required education level                |
| `jobType`        | `Enum`   | `FULL_TIME`, `PART_TIME`, etc.          |
| `employmentType` | `Enum`   | `ON_SITE`, `REMOTE`, `HYBRID`           |
| `status`         | `Enum`   | `ACTIVE`, `INACTIVE`, `CLOSED`          |
| `benefits`       | `Array`  | List of job benefits                    |
| `contactEmail`   | `String` | Contact email for the job               |
| `contactPhone`   | `String` | Contact phone for the job               |
| `views`          | `Number` | Number of times the job has been viewed |
| `applications`   | `Number` | Number of applications for the job      |
| `postedAt`       | `Date`   | Timestamp of when the job was posted    |
| `deadline`       | `Date`   | Application deadline                    |

## 4. API Endpoints

### 4.1. Authentication

#### `POST /api/v1/auth/register`

*   **Request Body:**
    ```json
    {
      "username": "john_worker",
      "email": "john@example.com",
      "password": "password123",
      "firstName": "John",
      "lastName": "Doe",
      "role": "WORKER"
    }
    ```
*   **Response:**
    ```json
    {
      "token": "mock-jwt-token-1",
      "user": {
        "id": "1",
        "username": "john_worker",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "WORKER",
        "isActive": true,
        "createdAt": "2024-01-15T10:00:00Z"
      }
    }
    ```

#### `POST /api/v1/auth/login`

*   **Request Body:**
    ```json
    {
      "username": "john_worker",
      "password": "password123"
    }
    ```
*   **Response:**
    ```json
    {
      "token": "mock-jwt-token-1",
      "user": {
        "id": "1",
        "username": "john_worker",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "WORKER",
        "isActive": true,
        "createdAt": "2024-01-15T10:00:00Z"
      }
    }
    ```

### 4.2. Jobs

#### `GET /api/v1/jobs`

*   **Query Parameters:**
    *   `search` (string)
    *   `location` (string)
    *   `jobType` (string)
    *   `minSalary` (number)
    *   `maxSalary` (number)
*   **Response:** An array of `Job` objects.

#### `GET /api/v1/jobs/:id`

*   **Response:** A single `Job` object.

#### `POST /api/v1/jobs/:id/apply`

*   **Request Body:**
    ```json
    {
      "userId": "1"
    }
    ```
*   **Response:**
    ```json
    {
      "success": true,
      "message": "Application submitted successfully!"
    }
    ```

### 4.3. User

#### `GET /api/v1/users/:id`

*   **Response:** A single `User` object.

#### `PUT /api/v1/users/:id`

*   **Request Body:** A partial `User` object with the fields to update.
*   **Response:** The updated `User` object.
