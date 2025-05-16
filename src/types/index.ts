export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string | null;
  author_id: string;
  author_email?: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export type FormMode = 'create' | 'edit';