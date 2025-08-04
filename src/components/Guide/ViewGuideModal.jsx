import React from "react";

const ViewGuideModal = ({ guide, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-gray-900 text-white rounded-lg w-full max-w-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Guide Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
        </div>

        <div className="text-center mb-4">
          <img
            src={guide.image || "/default-avatar.png"}
            alt="Guide"
            className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
          />
          <h3 className="text-lg font-semibold">{guide.name}</h3>
          <p className="text-gray-400">{guide.email}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p><span className="text-gray-400">Phone:</span> {guide.phone || "-"}</p>
          <p><span className="text-gray-400">Department:</span> {guide.department || "-"}</p>
          <p><span className="text-gray-400">Year:</span> {guide.year || "-"}</p>
          <p><span className="text-gray-400">Gender:</span> {guide.gender || "-"}</p>
          <p><span className="text-gray-400">City:</span> {guide.city || "-"}</p>
          <p><span className="text-gray-400">Taluka:</span> {guide.taluka || "-"}</p>
          <p><span className="text-gray-400">State:</span> {guide.state || "-"}</p>
          <p><span className="text-gray-400">Country:</span> {guide.country || "-"}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewGuideModal;
