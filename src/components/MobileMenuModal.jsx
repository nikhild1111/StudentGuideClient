import React, { useEffect } from "react";
import {
  FaHome, FaUniversity, FaBed, FaUtensils, FaBook,
  FaShoppingCart, FaQuestionCircle, FaUserFriends,
  FaSignInAlt, FaUserPlus
} from "react-icons/fa";

const MobileMenu = ({ setIsMobileMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target.id === "mobile-backdrop") {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        id="mobile-backdrop"
        onClick={handleBackdropClick}
        className="fixed inset-0 z-40 bg-black/40"
      />

      {/* Modal */}
      <div className="custom-lg:hidden fixed inset-0 z-50 bg-richblack-900 p-6 overflow-y-auto">
        {/* Close Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-2xl hover:text-yellow-400"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <div className="space-y-4 text-white">
          {[
            { name: "Home", icon: <FaHome /> },
            { name: "Admission", icon: <FaUniversity /> },
            { name: "Hostels", icon: <FaBed /> },
            { name: "Food", icon: <FaUtensils /> },
            { name: "Books", icon: <FaBook /> },
            { name: "Grocery", icon: <FaShoppingCart /> },
            { name: "Guide", icon: <FaQuestionCircle /> },
            { name: "Mentor", icon: <FaUserFriends /> },
          ].map(({ name, icon }) => (
            <a
              key={name}
              href="#"
              className="flex items-center gap-4 text-xl hover:text-yellow-400 transition"
            >
              <div className="text-2xl">{icon}</div>
              <div>{name}</div>
            </a>
          ))}

          <hr className="my-4 border-richblack-700" />

          {[
            { name: "Log in", icon: <FaSignInAlt /> },
            { name: "Sign up", icon: <FaUserPlus /> },
          ].map(({ name, icon }) => (
            <a
              key={name}
              href="#"
              className="flex items-center gap-4 text-xl hover:text-yellow-400 transition"
            >
              <div className="text-2xl">{icon}</div>
              <div>{name}</div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
