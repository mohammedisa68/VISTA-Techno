/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'Admin' | 'Staff' | 'Student' | 'Customer';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
  avatarUrl?: string;
  activities?: Array<{ id: string; action: string; timestamp: string }>;
  password?: string;
  emailVerified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'computers' | 'laptops' | 'printers' | 'cctv' | 'networking' | 'accessories' | 'office';
  image: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  stockCount: number;
  specifications: string[];
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  outcomes: string[];
  price: number;
  category: 'basic' | 'design' | 'coding' | 'development' | 'literacy' | 'workshop';
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'websites' | 'graphic_design' | 'branding' | 'printing' | 'success_stories';
  image: string;
  client?: string;
  completionDate?: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Technology' | 'Coding' | 'Graphics' | 'Entrepreneurship' | 'Digital Transformation' | 'Career';
  image: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

export interface Inquiry {
  id: string;
  type: 'contact' | 'course_registration';
  name: string;
  email: string;
  phone?: string;
  message?: string;
  courseId?: string; // For course registration
  status: 'Pending' | 'Contacted' | 'Enrolled' | 'Declined';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
