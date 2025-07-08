import React from 'react';

const NoResults = ({ loading, hostelsLength }) => {
  if (loading || hostelsLength > 0) return null;

  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-lg mb-2">No hostels found</div>
      <p className="text-gray-500">Try adjusting your filters or search terms</p>
    </div>
  );
};

export default NoResults;