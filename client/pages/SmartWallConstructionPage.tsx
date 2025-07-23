import React from 'react';
import { ArrowLeft, Home, Settings, Info } from 'lucide-react';
import SmartWallBuilder from '../components/smart-wall-builder/SmartWallBuilder';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface SmartWallConstructionPageProps {
  onNavigateBack?: () => void;
  onNavigateHome?: () => void;
}

const SmartWallConstructionPage: React.FC<SmartWallConstructionPageProps> = ({
  onNavigateBack,
  onNavigateHome
}) => {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Global Header */}
      {/* <Navigation /> */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Controls Header */}
      <div className="w-full bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Navigation */}
          <div className="flex items-center space-x-4">
            {onNavigateBack && (
              <button
                onClick={onNavigateBack}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            )}
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>
            )}
          </div>

          {/* Center - Title */}
          <div className="flex-1 text-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Smart Wall Construction
            </h1>
            <p className="text-sm text-gray-600">
              Design your modular smart wall system
            </p>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
              <Info className="w-4 h-4 mr-2" />
              Help
            </button>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <Home className="w-4 h-4 mr-2" />
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                  Products
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  Smart Wall Construction
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Page Content */}
      
        <div className="w-full bg-white border border-gray-200 rounded shadow-sm p-4">
          <SmartWallBuilder />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default SmartWallConstructionPage;
