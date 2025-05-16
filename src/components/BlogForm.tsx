import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormMode } from '../types';

interface BlogFormProps {
  defaultValues?: {
    title: string;
    content: string;
  };
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
  mode: FormMode;
  isSubmitting: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ 
  defaultValues = { title: '', content: '' },
  onSubmit,
  mode,
  isSubmitting
}) => {
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });
  
  const onSubmitHandler = async (data: { title: string; content: string }) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Blog Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'Title is required' })}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your blog title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Blog Content
        </label>
        <textarea
          id="content"
          rows={12}
          {...register('content', { required: 'Content is required' })}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Write your blog content here..."
        ></textarea>
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSubmitting 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'create' ? 'Creating...' : 'Updating...'}
            </span>
          ) : (
            <>{mode === 'create' ? 'Create Blog' : 'Update Blog'}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;