import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../lib/supabase';
import BlogForm from '../components/BlogForm';

const CreateBlogPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      setIsSubmitting(true);
      const newBlog = await createBlog(data.title, data.content);
      navigate(`/blogs/${newBlog.id}`);
    } catch (err) {
      console.error('Error creating blog:', err);
      setIsSubmitting(false);
      throw err;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-serif text-gray-800 mb-2">
          Create a New Blog Post
        </h1>
        <p className="text-gray-600">
          Share your thoughts, ideas, and insights with the community.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <BlogForm
          onSubmit={handleSubmit}
          mode="create"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CreateBlogPage;