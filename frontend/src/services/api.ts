import mockApi, { User, Job as MockJob, AuthResponse as MockAuthResponse } from './mockApi';

const API_BASE_URL = 'http://localhost:8080/api';
const USE_MOCK_API = true; // Use mock API due to disk space issues

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  location?: string;
  role: 'WORKER' | 'EMPLOYER';
  experience?: string;
  education?: string;
  bio?: string;
  companyName?: string;
  companyDescription?: string;
  industry?: string;
  companySize?: number;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  employerId: string;
  companyName: string;
  location: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERNSHIP';
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  requiredSkills: string[];
  experienceLevel: string;
  minExperienceYears: number;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'CLOSED' | 'EXPIRED';
  views: number;
  applications: number;
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Authentication APIs
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    if (USE_MOCK_API) {
      const mockResponse = await mockApi.login(credentials.email, credentials.password);
      return {
        token: mockResponse.token,
        type: 'Bearer',
        id: mockResponse.user.id,
        username: mockResponse.user.username,
        email: mockResponse.user.email,
        role: mockResponse.user.role,
        firstName: mockResponse.user.firstName,
        lastName: mockResponse.user.lastName,
      };
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    if (USE_MOCK_API) {
      const mockResponse = await mockApi.register({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
      });
      return {
        token: mockResponse.token,
        type: 'Bearer',
        id: mockResponse.user.id,
        username: mockResponse.user.username,
        email: mockResponse.user.email,
        role: mockResponse.user.role,
        firstName: mockResponse.user.firstName,
        lastName: mockResponse.user.lastName,
      };
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  }

  async logout(): Promise<void> {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
  }

  // Job APIs
  async getJobs(page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc'): Promise<{ content: Job[]; totalElements: number; totalPages: number }> {
    if (USE_MOCK_API) {
      const mockJobs = await mockApi.getJobs();
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedJobs = mockJobs.slice(startIndex, endIndex);
      
      return {
        content: paginatedJobs.map(job => ({
          id: job.id,
          title: job.title,
          description: job.description,
          employerId: job.employer.id,
          companyName: job.employer.companyName,
          location: job.location,
          jobType: job.jobType,
          salaryMin: job.salary.min,
          salaryMax: job.salary.max,
          salaryCurrency: job.salary.currency,
          requiredSkills: job.skills,
          experienceLevel: job.experience,
          minExperienceYears: 0,
          status: job.status as any,
          views: job.views,
          applications: job.applications,
          createdAt: job.postedAt,
          updatedAt: job.postedAt,
        })),
        totalElements: mockJobs.length,
        totalPages: Math.ceil(mockJobs.length / size),
      };
    }

    const response = await fetch(
      `${API_BASE_URL}/jobs?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    return response.json();
  }

  async getJobById(id: string): Promise<Job> {
    if (USE_MOCK_API) {
      const mockJob = await mockApi.getJobById(id);
      return {
        id: mockJob.id,
        title: mockJob.title,
        description: mockJob.description,
        employerId: mockJob.employer.id,
        companyName: mockJob.employer.companyName,
        location: mockJob.location,
        jobType: mockJob.jobType,
        salaryMin: mockJob.salary.min,
        salaryMax: mockJob.salary.max,
        salaryCurrency: mockJob.salary.currency,
        requiredSkills: mockJob.skills,
        experienceLevel: mockJob.experience,
        minExperienceYears: 0,
        status: mockJob.status as any,
        views: mockJob.views,
        applications: mockJob.applications,
        createdAt: mockJob.postedAt,
        updatedAt: mockJob.postedAt,
      };
    }

    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job');
    }

    return response.json();
  }

  async getFeaturedJobs(): Promise<Job[]> {
    const response = await fetch(`${API_BASE_URL}/jobs/featured`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured jobs');
    }

    return response.json();
  }

  async getUrgentJobs(): Promise<Job[]> {
    const response = await fetch(`${API_BASE_URL}/jobs/urgent`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch urgent jobs');
    }

    return response.json();
  }

  async searchJobs(query: string, page = 0, size = 10): Promise<Job[]> {
    const response = await fetch(
      `${API_BASE_URL}/jobs/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search jobs');
    }

    return response.json();
  }

  async createJob(jobData: Partial<Job>): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  }

  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  }

  async deleteJob(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  }

  async publishJob(id: string): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}/publish`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  }
}

export const apiService = new ApiService();

// Additional loginUser function for compatibility with the new login page
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiService.login({
      email: username, // Using username as email for compatibility
      password: password
    });
    
    // Transform the response to match the expected format
    return {
      resCode: 200,
      resMsg: "Login successful",
      res: {
        token: response.token,
        user: {
          username: response.username,
          email: response.email,
          userType: response.role,
          firstName: response.firstName,
          lastName: response.lastName,
          id: response.id,
          role: response.role
        }
      }
    };
  } catch (error) {
    return {
      resCode: 401,
      resMsg: error instanceof Error ? error.message : "Login failed",
      res: null
    };
  }
};
