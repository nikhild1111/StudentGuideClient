import React from 'react';
import { MapPin, User, GraduationCap, Phone, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MentorCard = ({ mentor }) => {
  const defaultImage = "https://via.placeholder.com/150x150?text=Mentor";
  const imageUrl = mentor.image?.startsWith("/uploads/")
    ? `${import.meta.env.VITE_BACKEND_URL}${mentor.image}`
    : mentor.image || defaultImage;

  const handleDownloadResume = () => {
    if (!mentor.resume) {
      toast.error("Resume not available");
      return;
    }
  //    const resumeUrl = `${import.meta.env.VITE_BACKEND_URL}${mentor.resume}`;

  // // 1. Trigger download
  // const link = document.createElement('a');
  // link.href = resumeUrl;
  // link.download = `${mentor.name}_Resume.pdf`;
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);

  // // 2. Open in new tab (view)
  // window.open(resumeUrl, '_blank');

  // toast.success("Downloading and opening resume");


   const resumeUrl = `${import.meta.env.VITE_BACKEND_URL}${mentor.resume}`;
  window.open(resumeUrl, '_blank'); // opens in new tab
  toast.success("Opening Resume");
  };

  return (
    <div className="bg-[#1A1B1F] border border-gray-400 rounded-xl shadow-md hover:shadow-yellow-400/20 transition-all duration-300 mb-6">

      {/* Image and Role Tag */}
      <div className="relative w-full h-[220px] overflow-hidden rounded-t-xl bg-black">
        <img
          src={imageUrl}
          alt={mentor.name}
          className="w-full h-full object-contain object-top"
        />
        <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-semibold">
          Mentor
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 bg-gray-900">
        {/* Name */}
        <h3 className="text-center text-white font-bold text-lg">{mentor.name}</h3>

        {/* Domain */}
        <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
          <FileText className="w-4 h-4 text-yellow-400" />
          <span>{mentor.domain}</span>
        </div>

        {/* Department */}
        <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
          <GraduationCap className="w-4 h-4 text-yellow-400" />
          <span>{mentor.department}</span>
        </div>

        {/* Passout Year */}
        <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
          <span className="w-4 h-4 text-yellow-400 font-bold">🎓</span>
          <span>Passout Year {mentor.passoutYear}</span>
        </div>

        {/* Email */}
        <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
          <span className="w-4 h-4 text-yellow-400 font-bold">📧</span>
          <span>{mentor.email}</span>
        </div>

        {/* Companies */}
        <div className="flex flex-col items-center justify-center text-sm text-gray-300 gap-1">
          <span className="text-yellow-400">Companies:</span>
          <ul className="list-disc text-center">
            {mentor.companies.map((company, index) => (
              <li key={index}>{company}</li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-3">
          {/* Resume Button */}
          <button
            onClick={handleDownloadResume}
            className="text-sm font-semibold bg-yellow-400 text-black px-4 py-1 rounded-md hover:bg-yellow-300 transition"
          >
            Resume
          </button>

          {/* Contact */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-700 p-1.5 rounded-full">
              <Phone className="w-3 h-3 text-yellow-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Contact</div>
              <div className="text-xs text-white">{mentor.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;