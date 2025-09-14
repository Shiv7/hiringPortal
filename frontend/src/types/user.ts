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
