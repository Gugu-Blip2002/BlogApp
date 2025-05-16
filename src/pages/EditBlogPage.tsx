import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, updateBlog } from '../lib/supabase';
import BlogForm from '../components/BlogForm';
import { useAuth } from '../contexts/AuthContext';
import { Blog } from '../types';

const EditBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const blogData = await getBlogById(id);
        setBlog(blogData);
        
        // Check if the user is the author
        if (user?.id !== blogData.author_id) {
          navigate('/blogs/' + id);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load the blog. It may have been deleted or does not exist.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id, user, navigate]);
  
  const handleSubmit = async (data: { title: string; content: string }) => {
    if (!id) return;
    
    try {
      setIsSubmitting(true);
      await updateBlog(id, data.title, data.content);
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error('Error updating blog:', err);
      setIsSubmitting(false);
      throw err;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (error || !blog) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">{error || 'Blog not found'}</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-serif text-gray-800 mb-2">
          Edit Blog Post
        </h1>
        <p className="text-gray-600">
          Update your blog post content.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <BlogForm
          defaultValues={{
            title: blog.title,
            content: blog.content
          }}
          onSubmit={handleSubmit}
          mode="edit"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditBlogPage;