import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import { getBlogById, deleteBlog } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Blog } from '../types';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const blogData = await getBlogById(id);
        setBlog(blogData);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load the blog. It may have been deleted or does not exist.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);
  
  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setIsDeleting(true);
      await deleteBlog(id);
      navigate('/');
    } catch (err) {
      console.error('Error deleting blog:', err);
      setError('Failed to delete the blog. Please try again.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };
  
  const isAuthor = user && blog && user.id === blog.author_id;
  
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
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {error || 'Blog not found'}
            </p>
            <div className="mt-4">
              <Link
                to="/"
                className="text-sm font-medium text-red-700 hover:text-red-600"
              >
                &larr; Return to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <article className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-gray-800 mb-4">
            {blog.title}
          </h1>
          
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <span>
              {blog.author_email ? `By ${blog.author_email}` : 'Anonymous'}
            </span>
            <span className="mx-2">•</span>
            <time dateTime={blog.created_at}>
              {format(new Date(blog.created_at), 'MMMM d, yyyy')}
            </time>
            {blog.updated_at && (
              <>
                <span className="mx-2">•</span>
                <span>
                  Updated {format(new Date(blog.updated_at), 'MMMM d, yyyy')}
                </span>
              </>
            )}
          </div>
          
          <div className="prose max-w-none">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {isAuthor && (
            <div className="mt-8 flex space-x-4">
              <Link
                to={`/blogs/${blog.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
              
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </article>
      
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          &larr; Back to all blogs
        </Link>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Delete Blog Post
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete this blog post? This action cannot be undone.
              </p>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                    isDeleting 
                      ? 'bg-red-400 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;