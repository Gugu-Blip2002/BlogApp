import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Blog } from '../types';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const timeAgo = formatDistanceToNow(new Date(blog.created_at), { addSuffix: true });
  const excerpt = blog.content.length > 150 
    ? `${blog.content.substring(0, 150)}...` 
    : blog.content;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:translate-y-[-2px]">
      <div className="p-6">
        <Link to={`/blogs/${blog.id}`}>
          <h2 className="text-xl font-serif font-bold text-gray-800 hover:text-indigo-600 transition-colors mb-2">
            {blog.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            {blog.author_email ? `By ${blog.author_email}` : 'Anonymous'}
          </span>
          <span className="text-gray-400">
            {timeAgo}
          </span>
        </div>
        
        <Link 
          to={`/blogs/${blog.id}`}
          className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;