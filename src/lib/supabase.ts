import { createClient } from '@supabase/supabase-js';

// These environment variables will be injected by Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please connect to Supabase first.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

export const getBlogs = async (page = 1, pageSize = 6) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // First get count for pagination
  const { count } = await supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true });

  // Then get actual data
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      profiles:author_id (email)
    `)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  // Transform the data to match our Blog interface
  const blogs = data.map(blog => ({
    ...blog,
    author_email: blog.profiles?.email
  }));

  return { blogs, total: count || 0 };
};

export const getBlogById = async (id: string) => {
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      profiles:author_id (email)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;

  return {
    ...data,
    author_email: data.profiles?.email
  };
};

export const createBlog = async (title: string, content: string) => {
  const user = supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('blogs')
    .insert([
      { title, content, author_id: (await user).data.user?.id }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateBlog = async (id: string, title: string, content: string) => {
  const { data, error } = await supabase
    .from('blogs')
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBlog = async (id: string) => {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};