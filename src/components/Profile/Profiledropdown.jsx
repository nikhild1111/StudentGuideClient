import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutauth } from '../../services/operations/authAPI';

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutauth(navigate));
    setIsProfileDropdownOpen(false);
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.trim().split(' ');
    return nameParts.length === 1
      ? nameParts[0][0].toUpperCase()
      : nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-[999]" ref={dropdownRef}>
      <button
        onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
        className="flex items-center gap-x-2"
      >
        {user?.image ? (
          <img
            src={user.image}
            alt={`profile-${user?.name}`}
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
        ) : (
          <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-tr from-green-400 to-blue-500 text-white flex items-center justify-center font-bold text-sm">
            {getUserInitials()}
          </div>
        )}
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </button>

      {isProfileDropdownOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[120%] right-0 w-[130px] rounded-md border border-richblack-400 bg-richblack-800 shadow-xl divide-y divide-richblack-400 overflow-hidden text-center"
        >
          {token ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <div className="flex items-center gap-x-2 py-2 px-3 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-white transition-colors">
                  <VscDashboard className="text-lg" />
                  Dashboard
                </div>
              </Link>
              <div
                onClick={handleLogout}
                className="flex items-center gap-x-2 py-2 px-3 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-white cursor-pointer transition-colors"
              >
                <VscSignOut className="text-lg" />
                Logout
              </div>
            </>
          ) : (

            <>
              <Link
                to="/login"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <div className="flex items-center gap-x-2 py-2 px-3 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-white transition-colors">
                  <FaSignInAlt className="text-base" />
                  Login
                </div>
              </Link>

              <div>
              <Link
                to="/signup"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <div className="flex items-center gap-x-2 py-2 px-3 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-white transition-colors">
                  <FaUserPlus className="text-base" />
                  Signup
                </div>
              </Link>
        </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
