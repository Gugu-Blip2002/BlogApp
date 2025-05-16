import React, { useEffect, useState } from 'react';
import { getBlogs } from '../lib/supabase';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';
import { Blog, Pagination as PaginationType } from '../types';

const ITEMS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    pageSize: ITEMS_PER_PAGE,
    total: 0
  });

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { blogs, total } = await getBlogs(pagination.page, pagination.pageSize);
        setBlogs(blogs);
        setPagination(prev => ({ ...prev, total }));
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [pagination.page, pagination.pageSize]);

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 mb-4">
          Welcome to InsightfulBlogs
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover thoughtful articles on various topics from writers around the world. 
          Create an account to share your own insights with our community.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
          <p className="text-gray-500">Be the first to create a blog post!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HomePage;