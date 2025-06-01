export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  bookId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  genre: string;
  targetAudience: string;
  chapters?: Chapter[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  status?: 'draft' | 'published' | 'archived';
}
