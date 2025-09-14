export interface Job {
  id: string;
  title: string;
  description: string;
  employerId: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
  skills: string[];
  experience: string;
  education: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY';
  employmentType: 'ON_SITE' | 'REMOTE' | 'HYBRID';
  status: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
  benefits: string[];
  contactEmail: string;
  contactPhone: string;
  views: number;
  applications: number;
  postedAt: string;
  deadline: string;
}
