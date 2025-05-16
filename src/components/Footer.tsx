import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold font-serif">InsightfulBlogs</h2>
            <p className="text-gray-400 mt-1">Share your thoughts with the world.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center md:text-left text-gray-400 text-sm">
          <p>&copy; {year} InsightfulBlogs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;