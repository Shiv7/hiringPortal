import { User } from '../types/user';
import { Job } from '../types/job';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'WORKER' | 'EMPLOYER';
}

export interface AuthResponse {
  token: string;
  user: User;
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
  async getJobs(page = 0, size = 10, sortBy = 'postedAt', sortDir = 'desc'): Promise<{ content: Job[]; totalElements: number; totalPages: number }> {
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
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job');
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
}

export const apiService = new ApiService();

// Additional loginUser function for compatibility with the new login page
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiService.login({
      username: username,
      password: password
    });

    // Transform the response to match the expected format
    return {
      resCode: 200,
      resMsg: "Login successful",
      res: {
        token: response.token,
        user: {
          username: response.user.username,
          email: response.user.email,
          userType: response.user.role,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          id: response.user.id,
          role: response.user.role
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
