import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenLine, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <Link 
          to="/" 
          className="text-2xl font-bold text-indigo-600 flex items-center group"
        >
          <PenLine className="mr-2 transition-transform group-hover:rotate-12" />
          <span className="font-serif">InsightfulBlogs</span>
        </Link>
        
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link 
                to="/" 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Home
              </Link>
            </li>
            
            {user ? (
              <>
                <li>
                  <Link 
                    to="/blogs/create" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <span className="mr-1">New Post</span>
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-red-600 transition-colors flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/signup" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;