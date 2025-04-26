import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, SearchX } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center">
            <SearchX size={48} className="text-primary-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-3">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Link to="/" className="btn btn-primary flex items-center justify-center">
            <ChevronLeft size={18} className="mr-1" />
            Back to Home
          </Link>
          <Link to="/services" className="btn btn-outline">
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;