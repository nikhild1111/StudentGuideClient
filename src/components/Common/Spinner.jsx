    import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-20 bg-gray-900">
      <div className="text-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-red-500 mx-auto mb-4 shadow-lg"></div>

        {/* Warning Text */}
        <p className="text-red-400 text-lg font-semibold tracking-wide">
          Losing your data...
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Please wait a moment
        </p>
      </div>
    </div>
  );
};

export default Spinner;
