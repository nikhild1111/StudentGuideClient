

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchMentors,
  sortMentors,
  searchMentors,
  deleteMentor,
} from "../../services/operations/mentorAPI";

import SearchAndFilterBar from "./Parts/Searchfillter";
import ConfirmModel from "../Common/ConfirmModel";
import Pagination from "../Mentor/Paganation";
import ViewMentorModal from "../Mentor/ViewMentorModal";
import EditMentorModal from "../Mentor/EditMentorModal";

import { Plus, Eye, Edit, Trash2, RefreshCcw, Users } from "lucide-react";

const AdminMentorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mentors, loading, error, pagination } = useSelector(
    (state) => state.mentor
  );

  const [currentPage, setCurrentPage] = useState(1);
  const mentorsPerPage = 6;

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ department: "" ,company:"",year:"",domain:"",});
  const [showFilters, setShowFilters] = useState(false);

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteMentorId, setDeleteMentorId] = useState(null);

  // Fetch data
const fetchData = useCallback(() => {
  dispatch(
    searchMentors({
      page: currentPage,
      limit: mentorsPerPage,
      search: searchTerm.trim(),
      ...filters, // include all filters
    })
  );
}, [dispatch, currentPage, mentorsPerPage, searchTerm, filters]);

  // Debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchData();
    }, 400);
    return () => clearTimeout(delay);
  }, [fetchData]);

  // Reset filters
  const handleResetFilters = () => {
 setFilters({ department: "", company: "", year: "", domain: "" });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setDeleteMentorId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    if (!deleteMentorId) return;
    dispatch(
      deleteMentor(deleteMentorId, () => {
        toast.success("Mentor deleted successfully");
        setShowConfirmDelete(false);
        setDeleteMentorId(null);
        fetchData();
      })
    );
  };

  const ActionButton = ({ onClick, className, icon: Icon, title }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded transition-colors ${className}`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
   {/* Header */}
<div className="flex flex-col gap-4 mb-8">
  {/* Title + Button */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">Admin Mentor Management</h1>
      <p className="text-gray-400 mt-1">Manage mentors and their information</p>
    </div>
    <button
      onClick={() => navigate("/ApplyMentorForm")}
      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-lg text-black font-medium transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <Plus className="w-5 h-5" />
      <span>Add Mentor</span>
    </button>
  </div>

  {/* Mentor count + divider */}
  <div>
    <h2 className="text-lg font-semibold">
      Mentors{" "}
      <span className="text-yellow-400">({pagination?.total || 0})</span>
    </h2>
    <div className="border-b border-gray-700 mt-2"></div>
  </div>
</div>

        {/* Search & Filters */}
        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          handleResetFilters={handleResetFilters}
     filterKeys={["department", "company", "year", "domain"]}
options={{
  department: ["Agricultural Engineering", "Chemical Engineering", "Marine Engineering", "Mechanical Engineering", "Information Technology","Robotics Engineering","Industrial Engineering"],
  company: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"], // example data
  year: ["2017","2018","2019","2020","2021","2022","2023", "2024", "2025", "2026"],
  domain: ["Web Development", "AI/ML", "Cybersecurity", "Data Science", "IoT","Cloud Computing","Industrial Robotics","Maritime Operations"]
}}

        />

        {/* Error */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin max-w-full">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-700">
                <tr>
                  {["Mentor", "Contact", "Academic & Experience", "Companies", "Actions"].map((header) => (
                    <th key={header} className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCcw className="w-5 h-5 animate-spin" />
                        <span>Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : mentors.length > 0 ? (
                  mentors.map((mentor) => (
                    <tr key={mentor._id} className="hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={mentor.image || "/default-avatar.png"}
                            alt={mentor.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{mentor.name}</p>
                            <p className="text-sm text-gray-400">{mentor.email}</p>
                            <p className="text-xs text-gray-500">{mentor.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{mentor.phone || "N/A"}</p>
                        <p className="text-sm text-gray-400">{mentor.domain || "General"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{mentor.department}</p>
                        <p className="text-sm text-gray-400">Passout: {mentor.passoutYear}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {mentor.companies?.length ? (
                            mentor.companies.slice(0, 2).map((c, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs bg-blue-600 rounded">
                                {c}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm">No companies</span>
                          )}
                          {mentor.companies?.length > 2 && (
                            <span className="px-2 py-1 text-xs bg-gray-600 rounded">
                              +{mentor.companies.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <ActionButton
                            onClick={() => { setSelectedMentor(mentor); setViewMode(true); }}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            icon={Eye}
                            title="View"
                          />
                          <ActionButton
                            onClick={() => { setSelectedMentor(mentor); setEditMode(true); }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black"
                            icon={Edit}
                            title="Edit"
                          />
                          <ActionButton
                            onClick={() => handleDelete(mentor._id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                            icon={Trash2}
                            title="Delete"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      <Users className="w-12 h-12 text-gray-600 mb-2" />
                      <p>No mentors found</p>
                      <p className="text-sm">Try adjusting your filters or search terms</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pagination?.totalPages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {/* Modals */}
      {selectedMentor && viewMode && (
        <ViewMentorModal
          mentor={selectedMentor}
          onClose={() => { setSelectedMentor(null); setViewMode(false); }}
        />
      )}

      {selectedMentor && editMode && (
        <EditMentorModal
          mentor={selectedMentor}
          onClose={() => { setSelectedMentor(null); setEditMode(false); }}
          onSuccess={fetchData}
        />
      )}

      {showConfirmDelete && (
        <ConfirmModel
          isOpen={showConfirmDelete}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDelete(false)}
          title="Delete Mentor"
          message="Are you sure you want to delete this mentor? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default AdminMentorPage;
