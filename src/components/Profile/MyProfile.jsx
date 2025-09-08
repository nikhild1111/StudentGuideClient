

import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit,
  Trash2,
  User,
  GraduationCap,
  Building2,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award,
} from "lucide-react";
import { toast } from "react-hot-toast";
import EditUserProfileModal from "./EditUserProfileModal";
import EditGuideProfileModal from "./EditGuideProfileModal";
import EditMentorModal from "../Mentor/EditMentorModal";
import ConfirmModel from "../Common/ConfirmModel"; 
import { deleteMentor } from "../../services/operations/mentorAPI";
import { deleteGuide } from "../../services/operations/guideAPI";
import { deleteUserProfile } from "../../services/operations/profileAPI";

const ProfileDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
   const dispatch = useDispatch(); 
const guideData = user.guideProfile;
const mentor=user.mentorProfile;

const handleDownloadResume = (url, fileName) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName; // forces download with given name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const [showuserEditModal, setShowuserEditModal] = useState(false);
const [showguideEditModal, setShowguideEditModal] = useState(false);
const [showmentorEditModal, setShowmentorEditModal] = useState(false);
const [showUserConfirmDelete, setShowUserConfirmDelete] = useState(false);
const [showGuideConfirmDelete, setShowGuideConfirmDelete] = useState(false);
const [showMentorConfirmDelete, setShowMentorConfirmDelete] = useState(false);

// 🔹 User Delete
const confirmUserDelete = () => {
  dispatch(deleteUserProfile(navigate));
  setShowUserConfirmDelete(false);
};

const cancelUserDelete = () => {
  setShowUserConfirmDelete(false);
};

// 🔹 Guide Delete
const confirmGuideDelete = () => {
  dispatch(deleteGuide(guideData._id, () => navigate("/profile"))); 
  setShowGuideConfirmDelete(false);
};

const cancelGuideDelete = () => {
  setShowGuideConfirmDelete(false);
};

// 🔹 Mentor Delete
const confirmMentorDelete = () => {
  dispatch(deleteMentor(mentor._id, () => navigate("/profile")));
  setShowMentorConfirmDelete(false);
};

const cancelMentorDelete = () => {
  setShowMentorConfirmDelete(false);
};

  const handleuserEditSuccess = () => {
    setShowuserEditModal(false);
    // Optionally refresh user data or show success message
  };
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

  const cap = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">My Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* USER PROFILE */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-yellow-400">User Profile</h3>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-black">
              {cap(user?.role) || "User"}
            </span>
          </div>

          <div className="text-center mb-6">
            <img
              src={user?.profileImage?.url || defaultImage}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-gray-600"
            />
            <h4 className="text-xl font-semibold mb-1">{user?.name}</h4>
            <p className="text-gray-400">{user?.email}</p>
          </div>

          <div className="space-y-3 flex-1">
            {user?.college && (
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">{user?.college}</span>
              </div>
            )}
            {user?.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">{user?.phone}</span>
              </div>
            )}
            {user?.department && (
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">{user?.department}</span>
              </div>
            )}
            {user?.year && (
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Year {user?.year}</span>
              </div>
            )}
            {user?.gender && (
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">{user?.gender}</span>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 mt-6 pt-4 flex gap-2">
            <button onClick={() => setShowuserEditModal(true)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1">
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button onClick={() => setShowUserConfirmDelete(true)}  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>

          {/* Edit Modal */}
      {showuserEditModal && (
        <EditUserProfileModal
          user={user}
          onClose={() => setShowuserEditModal(false)}
          onSuccess={handleuserEditSuccess}
        />
      )}


 {/* User Confirm Delete */}
{showUserConfirmDelete && (
  <ConfirmModel
    isOpen={showUserConfirmDelete}
    onConfirm={confirmUserDelete}
    onCancel={cancelUserDelete}
    title="Delete Profile"
    message="Are you sure you want to delete your profile? This action cannot be undone."
    confirmText="Delete"
    cancelText="Cancel"
  />
)}

        </div>

        {/* MENTOR PROFILE */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-6 flex flex-col">
          {user?.mentorProfile ? (
            <>
              {/* <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-yellow-400">Mentor Profile</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-black">
                  {cap(user?.mentorProfile?.role) || "Mentor"}
                </span>

                
              </div> */}

              
  <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold text-purple-400">
                   Mentor Profile
                 </h3>
                 <span
                   className={`px-3 py-1 rounded-full text-xs font-medium ${
                     user?.mentorProfile?.isApproved
                       ? "bg-green-600"
                       : "bg-red-600"
                   } text-white`}
                 >
                   {user?.mentorProfile?.role ? user.mentorProfile.role : "Mentor"}
             </span>
               </div>



              <div className="text-center mb-6">
                <img
                  src={user?.mentorProfile?.image?.url || defaultImage}
                  alt="Mentor"
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-gray-600"
                />
                <h4 className="text-xl font-semibold mb-1">
                  {user?.mentorProfile?.name}
                </h4>
                <p className="text-gray-400">{user?.mentorProfile?.email}</p>
              </div>

              <div className="space-y-3 flex-1">
                {user?.mentorProfile?.department && (
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      {user?.mentorProfile?.department}
                    </span>
                  </div>
                )}
                {user?.mentorProfile?.domain && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      {user?.mentorProfile?.domain}
                    </span>
                  </div>
                )}
                {user?.mentorProfile?.passoutYear && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      Passout {user?.mentorProfile?.passoutYear}
                    </span>
                  </div>
                )}
                {user?.mentorProfile?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      {user?.mentorProfile?.phone}
                    </span>
                  </div>
                )}

                {/* Companies + Resume in the same row */}
                {(user?.mentorProfile?.companies?.length > 0 ||
                  user?.mentorProfile?.resume?.url) && (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <div className="flex gap-1 flex-wrap">
                        {(user?.mentorProfile?.companies || [])
                          .slice(0, 2)
                          .map((c, i) => (
                            <span
                              key={i}
                              className="bg-gray-700 text-gray-200 text-xs px-2 py-0.5 rounded"
                            >
                              {c}
                            </span>
                          ))}
                        {user?.mentorProfile?.companies?.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{user.mentorProfile.companies.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
{user?.mentorProfile?.resume?.url && (
  <button
    onClick={() => window.open(user?.mentorProfile?.resume?.url, "_blank")}
    className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded"
  >
    Resume
  </button>
)}

         </div>
                )}
              </div>

              <div className="border-t border-white/10 mt-6 pt-4 flex gap-2">
                <button onClick={() => setShowmentorEditModal(true)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button onClick={() => setShowMentorConfirmDelete(true)} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>


                 {showmentorEditModal && (
        <EditMentorModal
          mentor={mentor}
          onClose={() => setShowmentorEditModal(false)}
         onSuccess={() => setShowmentorEditModal(false)}
        />
      )}

{/* Mentor Confirm Delete */}
{showMentorConfirmDelete && (
  <ConfirmModel
    isOpen={showMentorConfirmDelete}
    onConfirm={confirmMentorDelete}
    onCancel={cancelMentorDelete}
    title="Delete Mentor"
    message="Are you sure you want to delete this mentor? This action cannot be undone."
    confirmText="Delete"
    cancelText="Cancel"
  />
)}

            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-gray-400 mb-4">No mentor profile yet</p>
              <button
                onClick={() => navigate("/mentor")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg"
              >
                Become a Mentor
              </button>
            </div>
          )}
        </div>

        {/* GUIDE PROFILE */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-6 flex flex-col">
          {user?.guideProfile ? (
            <>
              {/* <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-yellow-400">Guide Profile</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-black">
                  {cap(user?.guideProfile?.role) || "Guide"}
                </span>
              </div> */}


               <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-orange-400">
                   Guide Profile
                 </h3>
                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-600 text-white">
                   {user?.guideProfile?.role}
                 </span>
               </div>

              <div className="text-center mb-6">
                <img
                  src={user?.guideProfile?.image?.url || defaultImage}
                  alt="Guide"
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-gray-600"
                />
                <h4 className="text-xl font-semibold mb-1">
                  {user?.guideProfile?.name}
                </h4>
                <p className="text-gray-400">{user?.guideProfile?.email}</p>
              </div>

              <div className="space-y-3 flex-1">
                {user?.guideProfile?.department && (
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      {user?.guideProfile?.department}
                    </span>
                  </div>
                )}
                {user?.guideProfile?.year && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      Year {user?.guideProfile?.year}
                    </span>
                  </div>
                )}
                {(user?.guideProfile?.city || user?.guideProfile?.state) && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      {[user?.guideProfile?.city, user?.guideProfile?.state]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
                {/* {user?.guideProfile?.taluka && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      Taluka: {user?.guideProfile?.taluka}
                    </span>
                  </div>
                )} */}
                {user?.guideProfile?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      {user?.guideProfile?.phone}
                    </span>
                  </div>
                )}

                {/* Gender + Pay on the same row */}
                {(user?.guideProfile?.gender || user?.guideProfile?.pay) && (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300 text-sm">
                        {user?.guideProfile?.gender}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded bg-yellow-500 text-black text-xs font-semibold">
                      ₹{user?.guideProfile?.pay}/session
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 mt-6 pt-4 flex gap-2">
                <button onClick={() => setShowguideEditModal(true)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button onClick={() => setShowGuideConfirmDelete(true)} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>

              {showguideEditModal && (
          <EditGuideProfileModal
            guide={guideData}
            onClose={() => setShowguideEditModal(false)}
            onSuccess={() => setShowguideEditModal(false)}
          />
        )}


        {/* Guide Confirm Delete */}
{showGuideConfirmDelete && (
  <ConfirmModel
    isOpen={showGuideConfirmDelete}
    onConfirm={confirmGuideDelete}
    onCancel={cancelGuideDelete}
    title="Delete Guide"
    message="Are you sure you want to delete this guide? This action cannot be undone."
    confirmText="Delete"
    cancelText="Cancel"
  />
)}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-gray-400 mb-4">No guide profile yet</p>
              <button
                onClick={() => navigate("/guide")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg"
              >
                Become a Guide
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;







// // import React from "react";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import UserProfileCard from "./UserProfileCard";
// // import MentorProfileCard from "./MentorProfileCard";
// // import GuideProfileCard from "./GuideProfileCard";

// // const ProfileDashboard = () => {
// //   const { user } = useSelector((state) => state.auth);
// //   const navigate = useNavigate();

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white p-6">
// //       <h2 className="text-2xl font-bold mb-8">My Profile</h2>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
// //         <UserProfileCard user={user} navigate={navigate} />
// //         <MentorProfileCard mentor={user?.mentorProfile} />
// //         <GuideProfileCard guide={user?.guideProfile} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileDashboard;







// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   User,
//   GraduationCap,
//   Building2,
//   Phone,
//   MapPin,
//   Calendar,
//   Briefcase,
//   Award,
// } from "lucide-react";
// import EditUserProfileModal from "./EditUserProfileModal";
// import EditGuideProfileModal from "./EditGuideProfileModal";
// import EditMentorModal from "../Mentor/EditMentorModal";
// import ConfirmModel from "../Common/ConfirmModel";
// import ScreenBlocker from "../ScreenBlocker";
// import {
//   deleteMentor,
// } from "../../services/operations/mentorAPI"; // ✅ adjust imports as per your folder
// import {
//   deleteUserProfile,
// } from "../../services/operations/profileAPI"; // ✅ adjust imports as per your folder
// import {
//    deleteGuide,
// } from "../../services/operations/guideAPI"; // ✅ adjust imports as per your folder

// const ProfileDashboard = () => {
//   const { user } = useSelector((state) => state.auth);
//   const guideData = user?.guideProfile;
//   const mentorData = user?.mentorProfile;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Modals
//   const [showUserEdit, setShowUserEdit] = useState(false);
//   const [showGuideEdit, setShowGuideEdit] = useState(false);
//   const [showMentorEdit, setShowMentorEdit] = useState(false);

//   // Delete confirms
//   const [confirmUser, setConfirmUser] = useState(false);
//   const [confirmGuide, setConfirmGuide] = useState(false);
//   const [confirmMentor, setConfirmMentor] = useState(false);

//   // ScreenBlocker loading
//   const [loading, setLoading] = useState(false);

//   const defaultImage =
//     "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

//   const cap = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

//   // ✅ Deletion handlers
//   const handleUserDelete = async () => {
//     setLoading(true);
//     await dispatch(deleteUserProfile(navigate));
//     setLoading(false);
//     setConfirmUser(false);
//   };

//   const handleGuideDelete = async () => {
//     if (!guideData?._id) return;
//     setLoading(true);
//     await dispatch(deleteGuide(guideData._id, () => navigate("/dashboard")));
//     setLoading(false);
//     setConfirmGuide(false);
//   };

//   const handleMentorDelete = async () => {
//     if (!mentorData?._id) return;
//     setLoading(true);
//     await dispatch(deleteMentor(mentorData._id, () => navigate("/dashboard")));
//     setLoading(false);
//     setConfirmMentor(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h2 className="text-2xl font-bold mb-8">My Profile</h2>

//       {/* Global ScreenBlocker */}
//       <ScreenBlocker visible={loading} message="Processing deletion..." />

//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {/* ================= USER PROFILE ================= */}
//         <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-6 flex flex-col">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-yellow-400">User Profile</h3>
//             <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-black">
//               {cap(user?.role) || "User"}
//             </span>
//           </div>

//           <div className="text-center mb-6">
//             <img
//               src={user?.profileImage?.url || defaultImage}
//               alt="Profile"
//               className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-gray-600"
//             />
//             <h4 className="text-xl font-semibold mb-1">{user?.name}</h4>
//             <p className="text-gray-400">{user?.email}</p>
//           </div>

//           <div className="space-y-3 flex-1">
//             {user?.college && (
//               <div className="flex items-center gap-3">
//                 <Building2 className="w-4 h-4 text-yellow-400" />
//                 <span className="text-gray-300 text-sm">{user?.college}</span>
//               </div>
//             )}
//             {user?.phone && (
//               <div className="flex items-center gap-3">
//                 <Phone className="w-4 h-4 text-yellow-400" />
//                 <span className="text-gray-300 text-sm">{user?.phone}</span>
//               </div>
//             )}
//           </div>

//           <div className="border-t border-white/10 mt-6 pt-4 flex gap-2">
//             <button
//               onClick={() => setShowUserEdit(true)}
//               className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium py-2 rounded flex items-center justify-center gap-1"
//             >
//               <Edit className="w-4 h-4" /> Edit
//             </button>
//             <button
//               onClick={() => setConfirmUser(true)}
//               className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded flex items-center justify-center gap-1"
//             >
//               <Trash2 className="w-4 h-4" /> Delete
//             </button>
//           </div>

//           {showUserEdit && (
//             <EditUserProfileModal
//               user={user}
//               onClose={() => setShowUserEdit(false)}
//               onSuccess={() => setShowUserEdit(false)}
//             />
//           )}
//           {confirmUser && (
//             <ConfirmModel
//               isOpen={confirmUser}
//               onConfirm={handleUserDelete}
//               onCancel={() => setConfirmUser(false)}
//               title="Delete Profile"
//               message="Are you sure you want to delete your profile? This action cannot be undone."
//               confirmText="Delete"
//               cancelText="Cancel"
//             />
//           )}
//         </div>

//         {/* ================= MENTOR PROFILE ================= */}
//         <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-6 flex flex-col">
//           {mentorData ? (
//             <>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-purple-400">
//                   Mentor Profile
//                 </h3>
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-medium ${
//                     mentorData?.isApproved ? "bg-green-600" : "bg-red-600"
//                   } text-white`}
//                 >
//                   Mentor
//                 </span>
//               </div>

//               <div className="text-center mb-6">
//                 <img
//                   src={mentorData?.image?.url || defaultImage}
//                   alt="Mentor"
//                   className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-gray-600"
//                 />
//                 <h4 className="text-xl font-semibold mb-1">
//                   {mentorData?.name}
//                 </h4>
//                 <p className="text-gray-400">{mentorData?.email}</p>
//               </div>

//               <div className="space-y-3 flex-1">
//                 {mentorData?.department && (
//                   <div className="flex items-center gap-3">
//                     <GraduationCap className="w-4 h-4 text-yellow-400" />
//                     <span className="text-gray-300 text-sm">
//                       {mentorData?.department}
//                     </span>
//                   </div>
//                 )}
//                 {mentorData?.domain && (
//                   <div className="flex items-center gap-3">
//                     <Briefcase className="w-4 h-4 text-yellow-400" />
//                     <span className="text-gray-300 text-sm">
//                       {mentorData?.domain}
//                     </span>
//                   </div>
//                 )}
//                 {mentorData?.companies?.length > 0 && (
//                   <div className="flex items-center gap-3">
//                     <Award className="w-4 h-4 text-yellow-400" />
//                     <span className="text-gray-300 text-sm">
//                       {mentorData.companies.join(", ")}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <div className="border-t border-white/10 mt-6 pt-4 flex gap-2">
//                 <button
//                   onClick={() => setShowMentorEdit(true)}
//                   className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium py-2 rounded flex items-center justify-center gap-1"
//                 >
//                   <Edit className="w-4 h-4" /> Edit
//                 </button>
//                 <button
//                   onClick={() => setConfirmMentor(true)}
//                   className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded flex items-center justify-center gap-1"
//                 >
//                   <Trash2 className="w-4 h-4" /> Delete
//                 </button>
//               </div>

//               {showMentorEdit && (
//                 <EditMentorModal
//                   mentor={mentorData}
//                   onClose={() => setShowMentorEdit(false)}
//                   onSuccess={() => setShowMentorEdit(false)}
//                 />
//               )}
//               {confirmMentor && (
//                 <ConfirmModel
//                   isOpen={confirmMentor}
//                   onConfirm={handleMentorDelete}
//                   onCancel={() => setConfirmMentor(false)}
//                   title="Delete Mentor"
//                   message="Are you sure you want to delete your mentor profile?"
//                   confirmText="Delete"
//                   cancelText="Cancel"
//                 />
//               )}
//             </>
//           ) : (
//             <div className="flex-1 flex flex-col items-center justify-center text-center">
//               <p className="text-gray-400 mb-4">No mentor profile yet</p>
//               <button
//                 onClick={() => navigate("/mentor")}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg"
//               >
//                 Become a Mentor
//               </button>
//             </div>
//           )}
//         </div>

//         {/* ================= GUIDE PROFILE ================= */}
//         <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-6 flex flex-col">
//           {guideData ? (
//             <>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-orange-400">
//                   Guide Profile
//                 </h3>
//                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-600 text-white">
//                   Guide
//                 </span>
//               </div>

//               <div className="text-center mb-6">
//                 <img
//                   src={guideData?.image?.url || defaultImage}
//                   alt="Guide"
//                   className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-gray-600"
//                 />
//                 <h4 className="text-xl font-semibold mb-1">
//                   {guideData?.name}
//                 </h4>
//                 <p className="text-gray-400">{guideData?.email}</p>
//               </div>

//               <div className="space-y-3 flex-1">
//                 {guideData?.department && (
//                   <div className="flex items-center gap-3">
//                     <GraduationCap className="w-4 h-4 text-yellow-400" />
//                     <span className="text-gray-300 text-sm">
//                       {guideData?.department}
//                     </span>
//                   </div>
//                 )}
//                 {guideData?.year && (
//                   <div className="flex items-center gap-3">
//                     <Calendar className="w-4 h-4 text-yellow-400" />
//                     <span className="text-gray-300 text-sm">
//                       Year {guideData?.year}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <div className="border-t border-white/10 mt-6 pt-4 flex gap-2">
//                 <button
//                   onClick={() => setShowGuideEdit(true)}
//                   className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium py-2 rounded flex items-center justify-center gap-1"
//                 >
//                   <Edit className="w-4 h-4" /> Edit
//                 </button>
//                 <button
//                   onClick={() => setConfirmGuide(true)}
//                   className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded flex items-center justify-center gap-1"
//                 >
//                   <Trash2 className="w-4 h-4" /> Delete
//                 </button>
//               </div>

//               {showGuideEdit && (
//                 <EditGuideProfileModal
//                   guide={guideData}
//                   onClose={() => setShowGuideEdit(false)}
//                   onSuccess={() => setShowGuideEdit(false)}
//                 />
//               )}
//               {confirmGuide && (
//                 <ConfirmModel
//                   isOpen={confirmGuide}
//                   onConfirm={handleGuideDelete}
//                   onCancel={() => setConfirmGuide(false)}
//                   title="Delete Guide"
//                   message="Are you sure you want to delete your guide profile?"
//                   confirmText="Delete"
//                   cancelText="Cancel"
//                 />
//               )}
//             </>
//           ) : (
//             <div className="flex-1 flex flex-col items-center justify-center text-center">
//               <p className="text-gray-400 mb-4">No guide profile yet</p>
//               <button
//                 onClick={() => navigate("/guide")}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg"
//               >
//                 Become a Guide
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;
