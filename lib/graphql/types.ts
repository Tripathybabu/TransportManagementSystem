export type Role = 'admin' | 'employee';

export type Employee = {
  id: string;
  email: string;
  role: Role;
  name: string;
  age?: number | null;
  class?: string | null;
  subjects?: string[];
  attendance?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Shipment = {
  id: string;
  reference: string;
  status: string;
  origin: string;
  destination: string;
  scheduledAt?: string | null;
  assignedTo?: Employee | null;
  createdAt: string;
  updatedAt: string;
};
