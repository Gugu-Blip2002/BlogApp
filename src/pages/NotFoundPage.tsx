import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <FileQuestion className="h-24 w-24 text-indigo-500 mb-6" />
      
      <h1 className="text-4xl font-bold font-serif text-gray-800 mb-4">
        Page Not Found
      </h1>
      
      <p className="text-gray-600 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link
        to="/"
        className="inline-flex items-center px-5 py-2.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;