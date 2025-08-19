import React, { useEffect, useState } from "react";
import { getProfile, addBook, removeBook, updateGuide, updateMentor } from "../services/operations/profileAPI";
import { toast } from "react-hot-toast";
import { User, Book, GraduationCap, UserCheck, Plus, Trash2, Edit } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile(token);
      setUser(data.user);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Personal Info */}
      <div className="p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold flex items-center gap-2"><User /> Personal Info</h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>College:</b> {user.college}</p>
        <p><b>Role:</b> {user.role}</p>
        <button className="mt-2 flex items-center gap-1 text-blue-600" onClick={() => toast.success("Edit profile clicked")}> <Edit size={16}/> Edit </button>
      </div>

      {/* Books */}
      <div className="p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Book /> Books</h2>
        {user.booksProfile.length === 0 ? <p>No books added</p> : (
          <ul className="list-disc ml-6">
            {user.booksProfile.map((book) => (
              <li key={book._id} className="flex justify-between items-center">
                {book.title}
                <button onClick={() => toast.success("Remove book clicked")}> <Trash2 size={16} className="text-red-600"/> </button>
              </li>
            ))}
          </ul>
        )}
        <button className="mt-2 flex items-center gap-1 text-green-600" onClick={() => toast.success("Add book clicked")}>
          <Plus size={16}/> Add Book
        </button>
      </div>

      {/* Guide */}
      <div className="p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold flex items-center gap-2"><GraduationCap /> Guide</h2>
        {user.guideProfile ? (
          <div className="flex justify-between items-center">
            <span>{user.guideProfile.name || "Guide details"}</span>
            <button onClick={() => toast.success("Edit guide clicked")}> <Edit size={16}/> </button>
          </div>
        ) : (
          <button onClick={() => toast.success("Add guide clicked")} className="flex items-center gap-1 text-green-600"> <Plus size={16}/> Add Guide </button>
        )}
      </div>

      {/* Mentor */}
      <div className="p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold flex items-center gap-2"><UserCheck /> Mentor</h2>
        {user.mentorProfile ? (
          <div className="flex justify-between items-center">
            <span>{user.mentorProfile.name || "Mentor details"}</span>
            <button onClick={() => toast.success("Edit mentor clicked")}> <Edit size={16}/> </button>
          </div>
        ) : (
          <button onClick={() => toast.success("Add mentor clicked")} className="flex items-center gap-1 text-green-600"> <Plus size={16}/> Add Mentor </button>
        )}
      </div>
    </div>
  );
}
