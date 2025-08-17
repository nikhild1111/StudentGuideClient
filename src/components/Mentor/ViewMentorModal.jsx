import React from "react";
import { X, Building2, Calendar, User, Phone, Mail, MapPin, FileText, Briefcase } from "lucide-react";

const ViewMentorModal = ({ mentor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] p-4">
      <div className="bg-gray-900 text-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Mentor Details</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white text-xl p-1 hover:bg-gray-800 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Profile Section */}
          <div className="text-center mb-6">
            <img
              src={mentor.image || "/default-avatar.png"}
              alt="Mentor"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-gray-700"
            />
            <h3 className="text-2xl font-semibold mb-1">{mentor.name}</h3>
            <p className="text-gray-400 text-lg mb-2">{mentor.email}</p>
            {mentor.domain && mentor.domain !== "none" && (
              <p className="text-yellow-400 font-medium">{mentor.domain}</p>
            )}
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                Personal Information
              </h4>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">Phone:</span>
                  <p className="text-white">{mentor.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">Gender:</span>
                  <p className="text-white">{mentor.gender || "Prefer not to say"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">Email:</span>
                  <p className="text-white break-all">{mentor.email}</p>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                Academic Information
              </h4>
              
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">Department:</span>
                  <p className="text-white">{mentor.department || "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">Passout Year:</span>
                  <p className="text-white">{mentor.passoutYear || "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">Specialization:</span>
                  <p className="text-white">{mentor.domain && mentor.domain !== "none" ? mentor.domain : "General"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Companies Section */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2 mb-4">
              Work Experience
            </h4>
            <div className="space-y-3">
              {mentor.companies && mentor.companies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mentor.companies.map((company, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
                      <Building2 className="w-5 h-5 text-blue-400" />
                      <span className="text-white">{company}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No companies listed</p>
              )}
            </div>
          </div>

          {/* Resume Section */}
          {mentor.resume && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2 mb-4">
                Resume
              </h4>
              <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-4">
                <FileText className="w-6 h-6 text-green-400" />
                <div className="flex-1">
                  <p className="text-white font-medium">Resume Available</p>
                  <p className="text-gray-400 text-sm">Click to view or download</p>
                </div>
                <a
                  href={mentor.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  View Resume
                </a>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <span className="font-medium">Created:</span>
                <p>{mentor.createdAt ? new Date(mentor.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : "Not available"}</p>
              </div>
              <div>
                <span className="font-medium">Last Updated:</span>
                <p>{mentor.updatedAt ? new Date(mentor.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : "Not available"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMentorModal;