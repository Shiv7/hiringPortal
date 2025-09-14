// Mock API service to simulate backend responses
// This allows the frontend to work while we resolve the disk space issue

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

export interface AuthResponse {
  token: string;
  user: User;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_worker',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'WORKER',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    username: 'jane_employer',
    email: 'jane@company.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'EMPLOYER',
    isActive: true,
    createdAt: '2024-01-10T09:00:00Z'
  }
];

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Construction Worker',
    description: 'We are looking for experienced construction workers to join our team. Must have experience with heavy machinery and construction tools.',
    employer: {
      id: '2',
      companyName: 'BuildCorp Construction',
      location: 'Mumbai, Maharashtra'
    },
    location: 'Mumbai, Maharashtra',
    salary: {
      min: 25000,
      max: 35000,
      currency: 'INR'
    },
    skills: ['Construction', 'Heavy Machinery', 'Safety Protocols', 'Team Work'],
    experience: '2-5 years',
    education: 'High School Diploma',
    jobType: 'FULL_TIME',
    employmentType: 'ON_SITE',
    status: 'ACTIVE',
    benefits: ['Health Insurance', 'Overtime Pay', 'Safety Equipment'],
    contactInfo: {
      email: 'hr@buildcorp.com',
      phone: '+91-9876543210'
    },
    views: 45,
    applications: 12,
    postedAt: '2024-01-20T08:00:00Z',
    deadline: '2024-02-20T23:59:59Z'
  },
  {
    id: '2',
    title: 'Electrician',
    description: 'Experienced electrician needed for commercial and residential projects. Must be licensed and have 3+ years experience.',
    employer: {
      id: '2',
      companyName: 'PowerTech Solutions',
      location: 'Delhi, NCR'
    },
    location: 'Delhi, NCR',
    salary: {
      min: 30000,
      max: 45000,
      currency: 'INR'
    },
    skills: ['Electrical Wiring', 'Circuit Installation', 'Safety Standards', 'Problem Solving'],
    experience: '3-7 years',
    education: 'ITI/Diploma in Electrical',
    jobType: 'FULL_TIME',
    employmentType: 'ON_SITE',
    status: 'ACTIVE',
    benefits: ['Health Insurance', 'Tool Allowance', 'Performance Bonus'],
    contactInfo: {
      email: 'careers@powertech.com',
      phone: '+91-9876543211'
    },
    views: 78,
    applications: 23,
    postedAt: '2024-01-18T10:30:00Z',
    deadline: '2024-02-18T23:59:59Z'
  },
  {
    id: '3',
    title: 'Warehouse Supervisor',
    description: 'Supervise warehouse operations, manage inventory, and coordinate with logistics team. Leadership experience required.',
    employer: {
      id: '2',
      companyName: 'LogiFlow Industries',
      location: 'Bangalore, Karnataka'
    },
    location: 'Bangalore, Karnataka',
    salary: {
      min: 35000,
      max: 50000,
      currency: 'INR'
    },
    skills: ['Inventory Management', 'Team Leadership', 'Logistics', 'Safety Protocols'],
    experience: '4-8 years',
    education: 'Bachelor\'s Degree or equivalent',
    jobType: 'FULL_TIME',
    employmentType: 'ON_SITE',
    status: 'ACTIVE',
    benefits: ['Health Insurance', 'Transportation', 'Performance Bonus', 'Career Growth'],
    contactInfo: {
      email: 'hr@logiflow.com',
      phone: '+91-9876543212'
    },
    views: 92,
    applications: 18,
    postedAt: '2024-01-15T14:20:00Z',
    deadline: '2024-02-15T23:59:59Z'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  // Authentication
  async login(username: string, password: string): Promise<AuthResponse> {
    await delay(1000); // Simulate network delay
    
    const user = mockUsers.find(u => u.username === username);
    if (!user || password !== 'password123') {
      throw new Error('Invalid credentials');
    }
    
    return {
      token: `mock-jwt-token-${user.id}`,
      user
    };
  },

  async register(userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'WORKER' | 'EMPLOYER';
  }): Promise<AuthResponse> {
    await delay(1500);
    
    const existingUser = mockUsers.find(u => u.username === userData.username || u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      ...userData,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    return {
      token: `mock-jwt-token-${newUser.id}`,
      user: newUser
    };
  },

  // Jobs
  async getJobs(filters?: {
    search?: string;
    location?: string;
    jobType?: string;
    minSalary?: number;
    maxSalary?: number;
  }): Promise<Job[]> {
    await delay(800);
    
    let filteredJobs = [...mockJobs];
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    if (filters?.location) {
      const locationLower = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(locationLower)
      );
    }
    
    if (filters?.jobType) {
      filteredJobs = filteredJobs.filter(job => job.jobType === filters.jobType);
    }
    
    if (filters?.minSalary) {
      filteredJobs = filteredJobs.filter(job => job.salary.min >= filters.minSalary!);
    }
    
    if (filters?.maxSalary) {
      filteredJobs = filteredJobs.filter(job => job.salary.max <= filters.maxSalary!);
    }
    
    return filteredJobs;
  },

  async getJobById(id: string): Promise<Job> {
    await delay(500);
    
    const job = mockJobs.find(j => j.id === id);
    if (!job) {
      throw new Error('Job not found');
    }
    
    // Increment views
    job.views += 1;
    
    return job;
  },

  async applyToJob(jobId: string, userId: string): Promise<{ success: boolean; message: string }> {
    await delay(1000);
    
    const job = mockJobs.find(j => j.id === jobId);
    if (!job) {
      throw new Error('Job not found');
    }
    
    // Simulate application
    job.applications += 1;
    
    return {
      success: true,
      message: 'Application submitted successfully!'
    };
  },

  // User profile
  async getUserProfile(userId: string): Promise<User> {
    await delay(500);
    
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  },

  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    await delay(1000);
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    return mockUsers[userIndex];
  }
};

export default mockApi;
