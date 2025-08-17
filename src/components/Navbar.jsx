import React, { useEffect, useRef, useState } from "react";

// import { logout } from "../../services/operations/authAPI";

// import useUserRole from '../components/Commonhooks/UseUseRole'
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import {logoutauth} from "../services/operations/authAPI";
import ProfileDropdown from "./Profile/Profiledropdown";
import {
  FaHome,
  FaUniversity,
  FaBed,
  FaUtensils,
  FaBook,
  FaShoppingCart,
  FaQuestionCircle,
  FaUserFriends,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate();
const dispatch=useDispatch();
const user = useSelector((state) => state.auth.user);
console.log(user);

//  const { role, loading } = useUserRole();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlelogout = () => {
        dispatch(logoutauth(navigate));
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { name: 'Home', icon: <FaHome />, path: '/home' },
    // { name: 'Admission', icon: <FaUniversity />, path: '/admission' },
    { name: 'Hostels', icon: <FaBed />, path: '/hostels' },
    { name: 'Food', icon: <FaUtensils />, path: '/food' },
    { name: 'Books', icon: <FaBook />, path: '/books' },
    { name: 'Grocery', icon: <FaShoppingCart />, path: '/grocery' },
    { name: 'Guide', icon: <FaQuestionCircle />, path: '/guide' },
    { name: 'Mentor', icon: <FaUserFriends />, path: '/mentor' },
  ];

  if (user?.role === 'admin') {
    menuItems.push({
      name: 'Admin',
      icon: <FaUserFriends />,
      path: '/admin',
    });
  }


  
  // Escape key + scroll lock
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-richblack-900 backdrop-blur-sm shadow-2xl border-b-[0.5px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
       <div className="flex items-center space-x-3">
  <Link to="/home" className="flex items-center space-x-3">
    <div className="bg-yellow-600 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl">S</div>
    <div className="text-xl font-bold text-white m-[6px]">StudentGuide</div>
  </Link>
</div>

            {/* Desktop Menu */}
        <div className="hidden custom-lg:flex items-center space-x-8">
  {menuItems.map((item) => (
    <Link
      key={item.name}
      to={item.path}
      className="text-gray-300 hover:text-yellow-400 font-medium transition-all duration-300 relative group"
    >
      {item.name}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  ))}

  
</div>

<div className="hidden custom-lg:flex">
  <ProfileDropdown />
</div>



          
  {/* Mobile Button */}
            <button className="custom-lg:hidden text-gray-300 hover:text-yellow-400">
              {isMobileMenuOpen ? ( <><X size={24} onClick={toggleMobileMenu} /></>) : (<> <div className="flex flex-row space-x-3"><ProfileDropdown/> <Menu size={24} onClick={toggleMobileMenu}/></div></>)}
            </button>
          </div>
        </div>
      </nav>


      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-slate-900 shadow-2xl z-50 transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700 text-white font-medium text-xl">
            Menu
            <div />
            <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-yellow-400 transition-colors">
              <X size={20} />
            </button>
          </div>

      <div className="flex-1 py-1">

    
  {menuItems.map((item, index) => (
    <Link
      key={item.name}
      to={item.path}
      onClick={() => setIsMobileMenuOpen(false)}
      className="flex items-center space-x-3 px-6 py-3 text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-all duration-200 border-b border-richblack-700"
    >
      <span className="text-xl">{item.icon}</span>
      <span className="text-xl">{item.name}</span>
    </Link>
  ))}

        </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;



// ✅ What this line does:

// if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//   setOpen(false);
// }
// 🔍 Explanation
// dropdownRef.current

// This refers to the actual DOM node you assigned via ref={dropdownRef}.

// It only becomes non-null after the component mounts.

// .contains(event.target)

// This checks if the clicked element (i.e., event.target) is inside the dropdown area.

// If the click is outside, contains returns false.

// The condition:

// if (dropdownRef.current && !dropdownRef.current.contains(event.target))

// This ensures:

// The ref is valid (mounted).

// The click was outside the dropdown.

// ✅ If true, that means the user clicked outside, so we run setOpen(false) to close it.

// 🧠 Your understanding is mostly correct!
// ✔ Correct points you said:
// ✅ Yes, useRef returns an object ({ current: ... }).

// ✅ dropdownRef.current gives direct access to that specific DOM element.

// ✅ We use .contains(event.target) to check if the click was inside or outside.

// ✅ We close the dropdown (setOpen(false)) if it's an outside click.

