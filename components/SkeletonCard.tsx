
import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 animate-pulse">
      <div className="w-full h-48 bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-gray-700 rounded w-1/3"></div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-700/50">
            <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-700 rounded w-1/4"></div>
                <div className="h-10 bg-gray-700 rounded-md w-1/3"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
