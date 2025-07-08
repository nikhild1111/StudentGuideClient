import React from 'react';

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
        {error}
      </div>
    </div>
  );
};

export default ErrorMessage;