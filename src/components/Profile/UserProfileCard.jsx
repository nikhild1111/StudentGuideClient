// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Edit, Trash2, User, GraduationCap, Building2, Phone, Calendar } from "lucide-react";
// import EditUserProfileModal from "./EditUserProfileModal";
// import ConfirmModel from "../../components/Common/ConfirmModel";
// import { deleteUserProfile } from "../../services/operations/profileAPI";

// const UserProfileCard = ({ user, navigate }) => {
//   const dispatch = useDispatch();
//   const [showEdit, setShowEdit] = useState(false);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);

//   const confirmDelete = () => {
//     dispatch(deleteUserProfile(navigate));
//     setShowConfirmDelete(false);
//   };

//   return (
//     <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-6 flex flex-col">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-yellow-400">User Profile</h3>
//         <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-black">
//           {user?.role || "User"}
//         </span>
//       </div>

//       <div className="text-center mb-6">
//         <img
//           src={user?.profileImage?.url || "/default-avatar.png"}
//           alt="Profile"
//           className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-gray-600"
//         />
//         <h4 className="text-xl font-semibold mb-1">{user?.name}</h4>
//         <p className="text-gray-400">{user?.email}</p>
//       </div>

//       <div className="space-y-3 flex-1">
//         {user?.college && (
//           <div className="flex items-center gap-3">
//             <Building2 className="w-4 h-4 text-yellow-400" />
//             <span className="text-gray-300 text-sm">{user?.college}</span>
//           </div>
//         )}
//         {user?.phone && (
//           <div className="flex items-center gap-3">
//             <Phone className="w-4 h-4 text-yellow-400" />
//             <span className="text-gray-300 text-sm">{user?.phone}</span>
//           </div>
//         )}
//         {user?.department && (
//           <div className="flex items-center gap-3">
//             <GraduationCap className="w-4 h-4 text-yellow-400" />
//             <span className="text-gray-300 text-sm">{user?.department}</span>
//           </div>
//         )}
//         {user?.year && (
//           <div className="flex items-center gap-3">
//             <Calendar className="w-4 h-4 text-yellow-400" />
//             <span className="text-gray-300 text-sm">Year {user?.year}</span>
//           </div>
//         )}
//         {user?.gender && (
//           <div className="flex items-center gap-3">
//             <User className="w-4 h-4 text-yellow-400" />
//             <span className="text-gray-300 text-sm">{user?.gender}</span>
//           </div>
//         )}
//       </div>

//       <div className="border-t border-white/10 mt-6 pt-4 flex gap-2">
//         <button
//           onClick={() => setShowEdit(true)}
//           className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1"
//         >
//           <Edit className="w-4 h-4" /> Edit
//         </button>
//         <button
//           onClick={() => setShowConfirmDelete(true)}
//           className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1"
//         >
//           <Trash2 className="w-4 h-4" /> Delete
//         </button>
//       </div>

//       {showEdit && (
//         <EditUserProfileModal user={user} onClose={() => setShowEdit(false)} />
//       )}

//       {showConfirmDelete && (
//         <ConfirmModel
//           isOpen={showConfirmDelete}
//           onConfirm={confirmDelete}
//           onCancel={() => setShowConfirmDelete(false)}
//           title="Delete Profile"
//           message="Are you sure you want to delete your profile? This action cannot be undone."
//           confirmText="Delete"
//           cancelText="Cancel"
//         />
//       )}
//     </div>
//   );
// };

// export default UserProfileCard;


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import ConfirmModel from "../../components/Common/ConfirmModel"; // ✅ add confirm modal
import { deleteUserProfile } from "../../services/operations/profileAPI"; // ✅ import your service

const ProfileDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showuserEditModal, setShowuserEditModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // ✅ delete modal state

  const handleuserEditSuccess = () => {
    setShowuserEditModal(false);
  };

  const confirmDelete = () => {
    dispatch(deleteUserProfile(navigate)); // ✅ hit API
    setShowConfirmDelete(false);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
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
            <button
              onClick={() => setShowuserEditModal(true)}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => setShowConfirmDelete(true)} // ✅ open delete confirm
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1"
            >
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

          {/* Delete Confirm Modal */}
          {showConfirmDelete && (
            <ConfirmModel
              isOpen={showConfirmDelete}
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
              title="Delete Profile"
              message="Are you sure you want to delete your profile? This action cannot be undone."
              confirmText="Delete"
              cancelText="Cancel"
            />
          )}
        </div>

        {/* MENTOR PROFILE (unchanged) */}
        {/* GUIDE PROFILE (unchanged) */}
      </div>
    </div>
  );
};

export default ProfileDashboard;
