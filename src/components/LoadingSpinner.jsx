import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
