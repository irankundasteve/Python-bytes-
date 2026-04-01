import { Timestamp } from 'firebase/firestore';

export type UserRole = 'admin' | 'user';

export interface UserProfile {
  uid: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  role: UserRole;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  authorId: string;
  authorName?: string;
  authorPhoto?: string;
  tags?: string[];
  category: string;
  videoUrl?: string;
  featuredImage?: string;
  isPublished: boolean;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface Tutorial {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: Timestamp;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: Timestamp;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}
