import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Edit, Trash2, Award, Briefcase } from "lucide-react";
import EditMentorModal from "../Mentor/EditMentorModal";
import ConfirmModel from "../../components/Common/ConfirmModel";
import { deleteMentor } from "../../services/operations/mentorAPI";

const MentorProfileCard = ({ mentor }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const confirmDelete = () => {
    dispatch(deleteMentor(mentor?._id, () => setShowConfirmDelete(false)));
  };

  if (!mentor) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-6 flex flex-col">
      <h3 className="text-lg font-semibold text-blue-400 mb-4">Mentor Profile</h3>

      <div className="text-center mb-6">
        <img
          src={mentor?.profileImage?.url || "/default-avatar.png"}
          alt="Mentor"
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-gray-600"
        />
        <h4 className="text-xl font-semibold mb-1">{mentor?.name}</h4>
        <p className="text-gray-400">{mentor?.email}</p>
      </div>

      <div className="space-y-3 flex-1">
        {mentor?.expertise && (
          <div className="flex items-center gap-3">
            <Award className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm">{mentor?.expertise}</span>
          </div>
        )}
        {mentor?.experience && (
          <div className="flex items-center gap-3">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm">
              {mentor?.experience} years
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 mt-6 pt-4 flex gap-2">
        <button
          onClick={() => setShowEdit(true)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-black text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1"
        >
          <Edit className="w-4 h-4" /> Edit
        </button>
        <button
          onClick={() => setShowConfirmDelete(true)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      {showEdit && (
        <EditMentorProfileModal mentor={mentor} onClose={() => setShowEdit(false)} />
      )}

      {showConfirmDelete && (
        <ConfirmModel
          isOpen={showConfirmDelete}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDelete(false)}
          title="Delete Mentor"
          message="Are you sure you want to delete this mentor profile?"
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default MentorProfileCard;
