export type ProjectCategory = string;

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  images: string[];
  featured: boolean;
  createdAt: string;
}

export interface IService {
  _id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  order: number;
}

export interface IMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin';
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ProjectFormData {
  title: string;
  category: ProjectCategory;
  description: string;
  images: string[];
  featured: boolean;
}

export interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  image?: string;
  order: number;
}
