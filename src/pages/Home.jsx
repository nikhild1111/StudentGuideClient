
// import React, { useState, useEffect } from 'react';
// import {
//   Menu,
//   X,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import {
//   FaHome,
//   FaUniversity,
//   FaBed,
//   FaUtensils,
//   FaBook,
//   FaShoppingCart,
//   FaQuestionCircle,
//   FaUserFriends,
//   FaSignInAlt,
//   FaUserPlus,
//   FaArrowRight,
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const sliderImages = [
//     '/assets/dyphostel/hostel1.png',
//     '/assets/dyphostel/hostel2.png',
//     '/assets/dyphostel/hostel3.png',
//     '/assets/dyphostel/hostel4.png',
//     '/assets/dyphostel/hostel5.png',
//     '/assets/dyphostel/hostel6.png',
//   ];

//   const isLoggedIn = false;

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//   document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
//   return () => {
//     document.body.style.overflow = 'auto';
//   };
// }, [isMobileMenuOpen]);


//     const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   return (
//     <div className="min-h-screen bg-richblack-900">
//       {/* Navigation */}
//       <nav className="bg-slate-900/95 backdrop-blur-sm shadow-2xl border-b-[0.5px]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex items-center space-x-3">
//               <div className="bg-white text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl">
//                 S
//               </div>
//               <div className="text-xl font-bold text-white m-[6px]">StudentGuide</div>
//             </div>

//             {/* Desktop Navigation (only on ≥1100px) */}
//             <div className="hidden custom-lg:flex items-center space-x-8">
//               {['Home', 'Admission', 'Hostels', 'Food', 'Books', 'Grocery', 'Guide', 'Mentor'].map((item) => (
//                 <a
//                   key={item}
//                   href="#"
//                   className="text-gray-300 hover:text-yellow-400 font-medium transition-all duration-300 relative group"
//                 >
//                   {item}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//               ))}
//             </div>

//             {/* Auth Buttons - Desktop */}
//             <div className="hidden custom-lg:flex items-center space-x-4">
//               <button className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
//                 Log in
//               </button>
//               <button className="bg-gray-700 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors">
//                 Sign up
//               </button>
//             </div>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="custom-lg:hidden text-gray-300 hover:text-yellow-400"
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>


         
//         </div>
//       </nav>


//  {isMobileMenuOpen ? 
 
//  (

// <div className={`fixed inset-0 z-50 bg-richblack-900 px-6 py-6 overflow-y-auto transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//   {/* Header with logo and close button */}
//   <div className="flex items-center justify-between mb-6">
//     <div className="flex items-center space-x-2">
//       <div className="bg-white text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl">
//         S
//       </div>
//       <div className="text-xl font-bold text-white">StudentGuide</div>
//     </div>
//     <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
//       <X size={24} />
//     </button>
//   </div>

//   {/* Navigation Items */}
//   <div className="space-y-4">
//     {[
//       { name: 'Home', icon: <FaHome /> },
//       { name: 'Admission', icon: <FaUniversity /> },
//       { name: 'Hostels', icon: <FaBed /> },
//       { name: 'Food', icon: <FaUtensils /> },
//       { name: 'Books', icon: <FaBook /> },
//       { name: 'Grocery', icon: <FaShoppingCart /> },
//       { name: 'Guide', icon: <FaQuestionCircle /> },
//       { name: 'Mentor', icon: <FaUserFriends /> },
//     ].map(({ name, icon }) => (
//       <a
//         key={name}
//         href="#"
//         className="flex items-center gap-4 text-richblack-100 hover:text-yellow-400 px-2 py-2 rounded-md transition duration-200"
//       >
//         <div className="text-2xl">{icon}</div>
//         <div className="text-xl">{name}</div>
//       </a>
//     ))}

//     <hr className="border-richblack-700 my-4" />

//     {[{ name: 'Log in', icon: <FaSignInAlt /> }, { name: 'Sign up', icon: <FaUserPlus /> }].map(({ name, icon }) => (
//       <a
//         key={name}
//         href="#"
//         className="flex items-center gap-4 text-richblack-100 hover:text-yellow-400 px-2 py-2 rounded-md transition duration-200"
//       >
//         <span className="text-xl">{icon}</span>
//         <span className="text-xl">{name}</span>
//       </a>
//     ))}
//   </div>
// </div>

//  )
 
//  : ( 
    
//     <>
    
//     {/* Main Content */}
//       <div className="relative min-h-screen">
//         {/* Become a Mentor Button */}
//         <Link to="/">
//           <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
//             <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
//               <p>Become an Mentor</p>
//               <FaArrowRight />
//             </div>
//           </div>
//         </Link>

//         {/* Hero Section */}
//         <div className="text-center px-4 sm:px-6 lg:px-8 py-16">
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
//             Empower Your Future with{' '}
//             <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
//               Student Guide
//             </span>
//           </h1>

//           <p className="text-gray-400 text-lg sm:text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
//             Navigate your academic journey with confidence. Our comprehensive platform helps freshers with admissions,
//             hostel bookings, food options, books, groceries, and connects you with experienced mentors for personalized guidance.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105">
//               Learn More
//             </button>
//             <button className="bg-transparent border-2 border-gray-600 hover:border-yellow-400 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105">
//               Book a Demo
//             </button>
//           </div>
//         </div>

//         {/* Image Slider */}
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
//           <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
//             {sliderImages.map((image, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
//               >
//                 <img src={image} alt={`Campus ${index + 1}`} className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//               </div>
//             ))}

//             <button
//               onClick={() => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <button
//               onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
//             >
//               <ChevronRight size={20} />
//             </button>

//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//               {sliderImages.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       </>
//     )};
//     </div>
//   );
// };

// export default LandingPage;






// // LandingPage.jsx
// import React, { useState, useEffect } from 'react';
//  // Change this to handle actual login state
// import {
//   Menu,
//   X,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import {
//   FaHome,
//   FaUniversity,
//   FaBed,
//   FaUtensils,
//   FaBook,
//   FaShoppingCart,
//   FaQuestionCircle,
//   FaUserFriends,
//   FaSignInAlt,
//   FaUserPlus,
//   FaArrowRight,
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);
// const [isLoggedIn, setIsLoggedIn] = useState(false);


//   // Auto Slide
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);

//   // Handle body scroll + Escape key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === 'Escape') setIsMobileMenuOpen(false);
//     };

//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//       window.addEventListener('keydown', handleEsc);
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto';
//       window.removeEventListener('keydown', handleEsc);
//     };
//   }, [isMobileMenuOpen]);






//   const sliderImages = [
//     '/assets/dyphostel/hostel1.png',
//     '/assets/dyphostel/hostel2.png',
//     '/assets/dyphostel/hostel3.png',
//     '/assets/dyphostel/hostel4.png',
//     '/assets/dyphostel/hostel5.png',
//     '/assets/dyphostel/hostel6.png',
//   ];

//     const menuItems = [
//       { name: 'Home', icon: <FaHome /> },
//       { name: 'Admission', icon: <FaUniversity /> },
//       { name: 'Hostels', icon: <FaBed /> },
//       { name: 'Food', icon: <FaUtensils /> },
//       { name: 'Books', icon: <FaBook /> },
//       { name: 'Grocery', icon: <FaShoppingCart /> },
//       { name: 'Guide', icon: <FaQuestionCircle /> },
//       { name: 'Mentor', icon: <FaUserFriends /> },
//     ];
//  const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(!isLoggedIn);
//     setIsMobileMenuOpen(false);
//   };

//   return (
// <div className="bg-richblack-900 min-h-screen w-full overflow-x-hidden">

//       {/* Navbar */}
//       <nav className="bg-slate-900/95 backdrop-blur-sm shadow-2xl border-b-[0.5px]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex items-center space-x-3">
//               <div className="bg-white text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl">S</div>
//               <div className="text-xl font-bold text-white m-[6px]">StudentGuide</div>
//             </div>

//             {/* Desktop Nav */}
//             <div className="hidden custom-lg:flex items-center space-x-8">
//               {['Home', 'Admission', 'Hostels', 'Food', 'Books', 'Grocery', 'Guide', 'Mentor'].map((item) => (
//                 <a
//                   key={item}
//                   href="#"
//                   className="text-gray-300 hover:text-yellow-400 font-medium transition-all duration-300 relative group"
//                 >
//                   {item}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//               ))}
//             </div>

//             {/* Auth Buttons */}
//             <div className="hidden custom-lg:flex items-center space-x-4">
//               <button className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">Log in</button>
//               <button className="bg-gray-700 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors">Sign up</button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="custom-lg:hidden text-gray-300 hover:text-yellow-400">
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </nav>


//   {/* Mobile Menu Overlay */}
//       <div 
//         className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 custom-lg:hidden ${
//           isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//         }`}
//         onClick={toggleMobileMenu}
//       />


//       {/* Mobile Menu */}
//   <div 
//   className={`fixed top-0 right-0 h-full w-1/2 bg-slate-900 shadow-2xl z-50 transition-transform duration-300 ease-in-out transform ${
//     isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
//   }`}
// >

//         <div className="flex flex-col h-full">
//           {/* Menu Header */}
//           <div className="flex items-center justify-between p-6 border-b border-slate-700">
//             <div className="flex items-center space-x-2">
//             </div>
//             <button
//               onClick={toggleMobileMenu}
//               className="text-gray-300 hover:text-yellow-400 transition-colors"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* Menu Items */}
//           <div className="flex-1 py-4">
//             {menuItems.map((item, index) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="flex items-center space-x-3 px-6 py-4 text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-all duration-200 border-b border-richblack-700"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 <span className="text-richblack-100 hover:text-yellow-400 text-xl">{item.icon}</span>
//                 <span className="text-xl">{item.name}</span>
//               </a>
//             ))}

//            <div className="flex flex-col px-1 py-4 text-richblack-100 border-b border-richblack-700">
//   {isLoggedIn ? (
//     <button
//       onClick={handleLogin}
//       className="fflex items-center space-x-3 px-6 py-4 text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-all duration-200 border-b border-richblack-700"
//     >
//       <FaSignInAlt className="text-xl" />
//       <span className="text-xl">Log out</span>
//     </button>
//   ) : (
//     <>
//       <Link
//         to="/"
//         className="flex items-center space-x-3 px-6 py-4 text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-all duration-200 border-b border-richblack-700"
//       >
//         <FaSignInAlt className="text-xl" />
//         <span className="text-xl">Log in</span>
//       </Link>

//       <Link
//         to="/"
//         className="flex items-center space-x-3 px-6 py-4 text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-all duration-200 border-b border-richblack-700"
//       >
//         <FaUserPlus className="text-xl" />
//         <span className="text-xl">Sign up</span>
//       </Link>
//     </>
//   )}
// </div>



//           </div>

//           {/* Auth Section */}
           
//         </div>
//       </div>


//       {/* Main Content */}
//       <div className="relative">
//         {/* CTA Button */}
//         <Link to="/">
//           <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
//             <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
//               <p>Become a Mentor</p>
//               <FaArrowRight />
//             </div>
//           </div>
//         </Link>

//         {/* Hero Section */}
//         <div className="text-center px-4 sm:px-6 lg:px-8 py-16">
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
//             Empower Your Future with{' '}
//             <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Student Guide</span>
//           </h1>
//           <p className="text-gray-400 text-lg sm:text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
//             Navigate your academic journey with confidence. Our comprehensive platform helps freshers with admissions,
//             hostel bookings, food options, books, groceries, and connects you with experienced mentors for personalized guidance.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105">
//               Learn More
//             </button>
//             <button className="bg-transparent border-2 border-gray-600 hover:border-yellow-400 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105">
//               Book a Demo
//             </button>
//           </div>
//         </div>

//         {/* Image Slider */}
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
//           <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
//             {sliderImages.map((image, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
//               >
//                 <img src={image} alt={`Campus ${index + 1}`} className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//               </div>
//             ))}

//             <button
//               onClick={() => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <button
//               onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
//             >
//               <ChevronRight size={20} />
//             </button>

//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//               {sliderImages.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;







// LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HighlightText from '../components/core/HomePage/HighlightText'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import CTAButton from "../components/core/HomePage/Button"
import hostel1 from '../assets/dyphostel/hostel1.png';
import hostel2 from '../assets/dyphostel/hostel2.png';
import hostel3 from '../assets/dyphostel/hostel3.png';
import hostel4 from '../assets/dyphostel/hostel4.png';
import hostel5 from '../assets/dyphostel/hostel5.png';
import hostel6 from '../assets/dyphostel/hostel6.png';
import ND from '../assets/Images/ND.jpg';
import bookshare from '../assets/Images/bookshare.png';
import food from '../assets/Images/food.png';
import room from '../assets/Images/room.png';
import { useSelector } from 'react-redux';

const LandingPage = () => {

 const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
    const token = useSelector((state) => state.auth.token);

const sliderImages = [hostel1, hostel2, hostel3, hostel4, hostel5, hostel6];
  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);


 const buttonRoutes = {
    Admission: "/admission",
    Food: "/food",
    Books: "/books",
    Hostels: "/hostels",
    Mentors: "/mentor",
  };

  return (
    <div className="bg-richblack-900 min-h-screen w-full overflow-x-hidden">

      {/* CTA Button */}
      <Link to="/mentor">
        <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-700 p-1 font-bold text-richblack-100 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
          <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
            <p>Become a Mentor</p>
            <FaArrowRight />
          </div>
        </div>
      </Link>

      {/* Hero Section */}
      <div className="text-center px-4 sm:px-6 lg:px-8 py-8 text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Empower Your Future with{' '}
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Student Guide</span>

          {/* <HighlightText text={"Student Guide"} /> */}
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
          Navigate your academic journey with confidence. Our comprehensive platform helps freshers with admissions,
          hostel bookings, food options, books, groceries, and connects you with experienced mentors for personalized guidance.
        </p>

        {/* <div className="flex flex-row gap-6 justify-center">
          <button onClick={navigate("/")} className=" cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-7 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105">
            Learn More
          </button>
          <button onClick={navigate("/")} className="curser-pointer bg-richblack-800 border-2 border-gray-600 hover:border-yellow-400 text-white px-7 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105">
            Book a Room
          </button>
        </div> */}

           <div className="mt-8 flex flex-row gap-7 justify-center">
            <CTAButton active={true} linkto={"/"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/"}>
              Book a Demo
            </CTAButton>
          </div>
      </div>

      {/* Image Slider */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={image} alt={`Campus ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          ))}

          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
         

         {/* DYPCOE Admission Flow - Modern Layout */}
<div className="w-full bg-richblack-900 text-white py-16 px-4 sm:px-8 lg:px-20">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
    
    {/* Left Text Content */}
    <div className="flex-1">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-snug">
        Start your journey at{' '}
        {/* <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          DYPCOE
        </span> */}

        <HighlightText text={"DYPCOE"} />
        
        {' '}
        with our admission guidance.
      </h2>
      <p className="text-gray-400 text-lg mb-8 max-w-xl">
        Applying for college shouldn’t be complicated. We’ve simplified the process to help you get started with confidence. Let Student Guide walk you through every step.
      </p>
      
      


           <div className="mt-8 flex flex-row gap-7">
            <CTAButton active={true} linkto={"/"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/"}>
             Apply Now
            </CTAButton>
          </div>

    </div>

    {/* Right Animated Step Flow */}
    <div className="flex-1 w-full max-w-md animate-fade-in-down">
      <ol className="relative border-l-4 border-blue-600 pl-6 space-y-8 flex-col items-center">
        {[
          {
            title: 'Check Eligibility',
            description: 'Minimum 50% in 10+2 with PCM',
          },
          {
            title: 'Submit Application',
            description: 'Online form with required documents',
          },
          {
            title: 'Merit List',
            description: 'Based on MHT-CET/JEE scores',
          },
          {
            title: 'Fee Payment',
            description: 'Confirm your seat by paying fees',
          },
        ].map((step, index) => (
          <li key={index} className="relative">
            <span className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-semibold">
              {index + 1}
            </span>
            <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
            <p className="text-sm text-gray-400">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </div>
</div>


{/* Book Exchange Section */}
<div className="w-full bg-richblack-900 text-white py-16 px-4 sm:px-8 lg:px-20">
  <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
    
    {/* Left - Book Image */}
    <div className="flex-1 w-full">
      <div className="bg-gradient-to-tr from-blue-900/50 to-blue-700/20 rounded-lg overflow-hidden shadow-lg">
        <img
          src={bookshare}
          alt="Student Book Exchange"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>

    {/* Right - Content */}
    <div className="flex-1">
      <h2 className="text-3xl sm:text-4xl font-bold leading-snug mb-6">
        Share or Get <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Books Easily</span> with Student Guide
      </h2>
      <p className="text-gray-400 text-lg mb-8 max-w-xl">
        Seniors can list their used textbooks, reference materials, and study notes. Juniors can easily browse and connect to buy them affordably.
        <br />
        A smart way to recycle knowledge and help your peers.
      </p>

     <div className="mt-8 flex flex-row gap-7">
            <CTAButton active={true} linkto={"/"}>
              Explore Book
            </CTAButton>
            <CTAButton active={false} linkto={"/"}>
              List Your Books
            </CTAButton>
          </div>
    </div>
  </div>
</div>



{/* Food & Mess Section */}
<div className="w-full bg-richblack-900 text-white py-16 px-4 sm:px-8 lg:px-20">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

    {/* Left - Content */}
    <div className="flex-1">
      <h2 className="text-3xl sm:text-4xl font-bold leading-snug mb-6">
        Find 
        {/* <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Mess & Tiffin</span> */}

 <HighlightText text={"Mess & Tiffin"} /> services around you
      </h2>
      <p className="text-gray-400 text-lg mb-8 max-w-xl">
        Discover hygienic and budget-friendly messes near DYPCOE. Choose from veg, non-veg, or Jain options with reviews and meal photos. Connect with tiffin providers and manage subscriptions easily on Student Guide.
      </p>
 <div className="mt-8 flex flex-row gap-7">
            <CTAButton active={true} linkto={"/food"}>
             Find Tiffin Near You
            </CTAButton>
            <CTAButton active={false} linkto={"/mentor"}>
             Talk to Seniors
            </CTAButton>
          </div>

    </div>

    {/* Right - Food Image */}
    <div className="flex-1 w-full max-w-md">
      <div className="bg-gradient-to-tr from-yellow-900/40 to-yellow-700/20 rounded-lg overflow-hidden shadow-xl">
        <img
          src={food}
          alt="Nearby Mess Options"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  </div>
</div>
<div className="bg-richblack-900 text-white py-16 px-4 sm:px-6 lg:px-20 flex flex-col-reverse md:flex-row items-center gap-10">
  {/* Left Image (on desktop), goes below on mobile */}
  <div className="flex-1 max-w-lg">
    <img
      src={room}
      alt="Hostels near DYP"
      className="w-full h-72 object-cover rounded-lg shadow-xl"
    />
  </div>

  {/* Right Text Content (on desktop), goes above on mobile */}
  <div className="flex-1">
    <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
      Find <span className="text-yellow-400">hostels near DYP</span> with ease
    </h2>
    <p className="text-lg text-gray-400 mb-8 max-w-xl">
      Browse affordable hostel options from low to high pricing near DYP campus. Easily compare facilities and contact seniors who’ve stayed there to get real experiences. Let Student Guide help you book the right one.
    </p>

 <div className="mt-8 flex flex-row gap-7">
            <CTAButton active={true} linkto={"/hostels"}>
             Explore Hostels
            </CTAButton>
            <CTAButton active={false} linkto={"/mentor"}>
            Talk to Seniors
            </CTAButton>
          </div>

  </div>
</div>



<div className="w-full bg-richblack-900 text-white py-20 px-4">
  <div className="max-w-7xl mx-auto text-center">
    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
      Unlock the{" "}
      {/* <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Power of Student Guide
      </span> */}

       <HighlightText text={"Power of Student Guide"} />
    </h2>
    <p className="text-gray-400 text-lg mt-3">
      Everything you need to settle in college with ease
    </p>

    {/* Tabs */}
    <div className="mt-10 bg-richblack-800/60 backdrop-blur-md shadow-[0_0_40px_-5px_rgba(0,0,0,0.7)] flex flex-wrap justify-center gap-3 sm:gap-6 px-4 py-3 rounded-full w-full max-w-4xl mx-auto">
      {Object.keys(buttonRoutes).map((label, idx) => (
        <button
          key={idx}
          onClick={() => navigate(buttonRoutes[label])}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            idx === 0
              ? "bg-richblack-900 text-white border border-yellow-400"
              : "text-gray-300 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
</div>



<div className="bg-white py-16 px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-10">
  {/* Left Timeline Content */}
  <div className="flex-1">
    <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-richblack-900">
      Get the
      <HighlightText text={"essentials for college life"} />
      
       {/* <span className="text-blue-500">essentials for college life</span> */}
    </h2>
    <p className="text-lg text-gray-700 mb-10 max-w-xl">
      From admission to books, food, hostels, and a smart student mart — we guide you through every step. Designed with care to ensure every DYP student thrives.
    </p>

    <div className="flex flex-col gap-6 relative">
      {/* Timeline vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-yellow-300 rounded-full"></div>

      {[
        { icon: "🎓", title: "Admission Help" },
        { icon: "🍱", title: "Nearby Food Mess" },
        { icon: "📚", title: "Books & Study Material" },
        { icon: "🏠", title: "Hostel Guide" },
        { icon: "🛒", title: "Student Mart" },
      ].map((step, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="relative z-10 w-10 h-10 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center text-xl shadow-md">
            {step.icon}
          </div>
          <p className="text-gray-800 text-lg font-medium">{step.title}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Right Image or Visual */}
  <div className="flex-1 max-w-xl">
    <img
      src="/assets/books/college-life-guide.png"
      alt="Student Essentials Flow"
      className="w-full h-auto rounded-xl shadow-2xl"
    />
  </div>
</div>

{/* Become‑a‑Guide – dark theme, image left, text right */}
<div className="bg-richblack-900 text-white py-20 px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
  {/* ───── Left Image ───── */}
  <div className="flex-1 max-w-xl relative">
    {/* subtle cyan glow */}
    <div className="absolute inset-0 -z-10 rounded-xl bg-cyan-400/10 blur-2xl" />
    <img
     src={ND}   // put your guide image here
      alt="Become a Guide"
      className="w-full h-auto rounded-xl shadow-2xl"
    />
  </div>

  {/* ───── Right Content ───── */}
  <div className="flex-1">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
      Become a&nbsp;
      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Guide&nbsp;for&nbsp;Juniors
      </span>
    </h2>

    <p className="text-lg text-gray-300 mb-8 max-w-xl">
      You’ve mastered the DYPCOE journey — from admissions to hostels and mess
      hunts. Share your experience, help freshers start strong, and earn money
      for every student you guide.
    </p>

  

   


              {token ? (
                          <div className="mt-8 flex flex-row gap-7">
            <CTAButton active={true} linkto={"/guideapplication"}>
            Start Guiding Today
            </CTAButton>
         
          </div>
                        ) : (
                          <>
                              <div className="mt-8 flex flex-row gap-7">
            <CTAButton active={true} linkto={"/login"}>
            Start Guiding Today
            </CTAButton>
          </div>
          
                  </>
                        )}
  </div>
</div>



<footer className="bg-richblack-900 text-gray-300 py-10 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
    {/* Column 1: Logo & Description */}
    <div>
      <h2 className="text-yellow-400 text-2xl font-bold mb-3">StudentGuide</h2>
      <p className="text-sm text-gray-400">
        One-stop platform to ease your college journey — from admission to books, hostels, food and more.
      </p>
    </div>

    {/* Column 2: Quick Links */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-yellow-400 transition-colors">Admission Help</a></li>
        <li><a href="#" className="hover:text-yellow-400 transition-colors">Hostels Nearby</a></li>
        <li><a href="#" className="hover:text-yellow-400 transition-colors">Book Exchange</a></li>
        <li><a href="#" className="hover:text-yellow-400 transition-colors">Food/Mess Info</a></li>
        <li><a href="#" className="hover:text-yellow-400 transition-colors">Become a Guide</a></li>
      </ul>
    </div>

    {/* Column 3: Contact & Social */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
      <p className="text-sm text-gray-400">📍 DYP Campus, Pune</p>
      <p className="text-sm text-gray-400">📧 support@studentguide.in</p>

      <div className="flex space-x-4 mt-4">
        <a href="#" className="hover:text-yellow-400"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-yellow-400"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-yellow-400"><i className="fab fa-linkedin"></i></a>
      </div>
    </div>
  </div>

  <div className="border-t border-richblack-700 mt-10 pt-6 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} StudentGuide. All rights reserved.
  </div>
</footer>


    </div>
  );
};

export default LandingPage;





























// /*  College‑Life Flow Section  */
// import {
//   PiStudentDuotone,
//   PiBedDuotone,
//   PiForkKnifeDuotone,
//   PiBookBookmarkDuotone,
//   PiShoppingCartSimpleDuotone,
// } from "react-icons/pi";

// export default function CollegeLifeFlow() {
//   const STEPS = [
//     {
//       title: "Admission",
//       desc: "Apply, track & confirm your seat.",
//       Icon: PiStudentDuotone,
//       color: "text-sky-500",
//     },
//     {
//       title: "Hostels",
//       desc: "Compare rooms from budget to premium.",
//       Icon: PiBedDuotone,
//       color: "text-rose-500",
//     },
//     {
//       title: "Food",
//       desc: "Find hygienic mess & tiffin services.",
//       Icon: PiForkKnifeDuotone,
//       color: "text-emerald-500",
//     },
//     {
//       title: "Books",
//       desc: "Buy or borrow from seniors easily.",
//       Icon: PiBookBookmarkDuotone,
//       color: "text-yellow-500",
//     },
//     {
//       title: "Mart",
//       desc: "Groceries & essentials delivered fast.",
//       Icon: PiShoppingCartSimpleDuotone,
//       color: "text-indigo-500",
//     },
//   ];

//   return (
//     <section className="bg-white text-richblack-900 py-20 px-4">
//       <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-14">
//         {/* ----- Left column: text + flow ----- */}
//         <div className="flex-1">
//           {/* Heading / subheading / CTA */}
//           <h2 className="text-3xl sm:text-4xl font-extrabold leading-snug">
//             Get the support you need for a&nbsp;
//             <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//               smooth college life
//             </span>
//             .
//           </h2>
//           <p className="mt-4 text-gray-600 max-w-lg">
//             Student Guide bundles every must‑have service for DYPCOE students in
//             one place — from admissions to meals.
//           </p>
//           <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-md font-semibold shadow-md transition-transform duration-200 hover:scale-105">
//             Learn More
//           </button>

//           {/* Flow list */}
//           <ol className="mt-14 relative">
//             {/* vertical dotted line */}
//             <span className="absolute left-4 top-0 h-full border-l-2 border-dashed border-gray-300" />
//             {STEPS.map(({ title, desc, Icon, color }, idx) => (
//               <li key={title} className="mb-10 flex items-start">
//                 {/* circular icon */}
//                 <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-white">
//                   <Icon
//                     className={`h-6 w-6 ${color}`}
//                     aria-hidden="true"
//                   />
//                 </span>
//                 {/* text block */}
//                 <div className="ml-6">
//                   <h3 className="font-semibold">{title}</h3>
//                   <p className="text-sm text-gray-500">{desc}</p>
//                 </div>
//               </li>
//             ))}
//           </ol>
//         </div>

//         {/* ----- Right column: image ----- */}
//         <div className="flex-1 flex justify-center lg:justify-end">
//           <div className="relative w-full max-w-md rounded-lg overflow-hidden">
//             {/* teal glow */}
//             <div className="absolute inset-0 -z-10 rounded-[inherit] bg-cyan-400/10 blur-2xl" />
//             <img
//               src="/assets/illustrations/study-desk.jpg"
//               alt="Student working at a desk"
//               className="w-full h-full object-cover rounded-[inherit] shadow-2xl"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
