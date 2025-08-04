
// // LandingPage.jsx
// import React, { useState, useEffect } from 'react';
// import { FaArrowRight } from 'react-icons/fa';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import HighlightText from '../components/core/HomePage/HighlightText'
// import { Link } from 'react-router-dom';

// import Footer from "../components/Common/Footer"
// import { useNavigate } from 'react-router-dom';

// import CTAButton from "../components/core/HomePage/Button"
// import hostel1 from '../assets/dyphostel/hostel1.png';
// import hostel2 from '../assets/dyphostel/hostel2.png';
// import hostel3 from '../assets/dyphostel/hostel3.png';
// import hostel4 from '../assets/dyphostel/hostel4.png';
// import hostel5 from '../assets/dyphostel/hostel5.png';
// import hostel6 from '../assets/dyphostel/hostel6.png';
// import ND from '../assets/Images/ND.jpg';
// import bookshare from '../assets/Images/bookshare.png';
// import food from '../assets/Images/food.png';
// import room from '../assets/Images/room.png';
// import { useSelector } from 'react-redux';

// const LandingPage = () => {

//  const navigate = useNavigate();
//   const [currentSlide, setCurrentSlide] = useState(0);
//     const token = useSelector((state) => state.auth.token);

// const sliderImages = [hostel1, hostel2, hostel3, hostel4, hostel5, hostel6];
//   // Auto Slide
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);


//  const buttonRoutes = {
//     Admission: "/admission",
//     Food: "/food",
//     Books: "/books",
//     Hostels: "/hostels",
//     Mentors: "/mentor",
//   };

//   return (
//     <div className="bg-richblack-900 min-h-screen w-full overflow-x-hidden">

//       {/* CTA Button */}
// {token ? (
//   <>
  
  
  
//   <Link to="/mentor">
//         <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-700 p-1 font-bold text-richblack-100 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
//           <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
//             <p>Become a Mentor</p>
//             <FaArrowRight />
//           </div>
//         </div>
//       </Link>
      
//   </>
//       ):(  
//         <>
        
        
       
//         <Link to="/login">
//         <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-700 p-1 font-bold text-richblack-100 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
//           <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
//             <p>Become a Mentor</p>
//             <FaArrowRight />
//           </div>
//         </div>
//       </Link>
//      </>
//     )
// }


//       {/* Hero Section */}
//       <div className="text-center px-4 sm:px-6 lg:px-8 py-8 text-white">
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
//           Empower Your Future with{' '}
//           <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Student Guide</span>

//           {/* <HighlightText text={"Student Guide"} /> */}
//         </h1>
//         <p className="text-gray-400 text-lg sm:text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
//           Navigate your academic journey with confidence. Our comprehensive platform helps freshers with admissions,
//           hostel bookings, food options, books, groceries, and connects you with experienced mentors for personalized guidance.
//         </p>


//            <div className="mt-8 flex flex-row gap-7 justify-center">
//             <CTAButton active={true} linkto={"https://www.dypiu.ac.in/gallery"}>
//               Learn More
//             </CTAButton>
//             <CTAButton active={false} linkto={"https://www.dypiu.ac.in/gallery"}>
//               Book a Demo
//             </CTAButton>
//           </div>
//       </div>

//       {/* Image Slider */}
//       <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
//         <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
//           {sliderImages.map((image, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
//             >
//               <img src={image} alt={`Campus ${index + 1}`} className="w-full h-full object-cover" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//             </div>
//           ))}

//           <button
//             onClick={() => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
//           >
//             <ChevronRight size={20} />
//           </button>

//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//             {sliderImages.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
         

//          {/* DYPCOE Admission Flow - Modern Layout */}
// <div className="w-full bg-richblack-900 text-white py-16 px-4 sm:px-8 lg:px-20">
//   <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
    
//     {/* Left Text Content */}
//     <div className="flex-1">
//       <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-snug">
//         Start your journey at{' '}
//         {/* <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
//           DYPCOE
//         </span> */}

//         <HighlightText text={"DYPCOE"} />
        
//         {' '}
//         with our admission guidance.
//       </h2>
//       <p className="text-gray-400 text-lg mb-8 max-w-xl">
//         Applying for college shouldn’t be complicated. We’ve simplified the process to help you get started with confidence. Let Student Guide walk you through every step.
//       </p>
      
      


//            <div className="mt-8 flex flex-row gap-7">
//             <CTAButton active={true} linkto={"/"}>
//               Learn More
//             </CTAButton>
//             <CTAButton active={false} linkto={"/"}>
//              Apply Now
//             </CTAButton>
//           </div>

//     </div>

//     {/* Right Animated Step Flow */}
//     <div className="flex-1 w-full max-w-md animate-fade-in-down">
//       <ol className="relative border-l-4 border-blue-600 pl-6 space-y-8 flex-col items-center">
//         {[
//           {
//             title: 'Check Eligibility',
//             description: 'Minimum 50% in 10+2 with PCM',
//           },
//           {
//             title: 'Submit Application',
//             description: 'Online form with required documents',
//           },
//           {
//             title: 'Merit List',
//             description: 'Based on MHT-CET/JEE scores',
//           },
//           {
//             title: 'Fee Payment',
//             description: 'Confirm your seat by paying fees',
//           },
//         ].map((step, index) => (
//           <li key={index} className="relative">
//             <span className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-semibold">
//               {index + 1}
//             </span>
//             <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
//             <p className="text-sm text-gray-400">{step.description}</p>
//           </li>
//         ))}
//       </ol>
//     </div>
//   </div>
// </div>


// {/* Book Exchange Section */}
// <div className="w-full bg-richblack-900 text-white py-16 px-4 sm:px-8 lg:px-20">
//   <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
    
 
//     <div className="flex-1 w-full">
//       <div className="bg-gradient-to-tr from-blue-900/50 to-blue-700/20 rounded-lg overflow-hidden shadow-lg">
//         <img
//           src={bookshare}
//           alt="Student Book Exchange"
//           className="w-full h-auto object-cover"
//         />
//       </div>
//     </div>

  
//     <div className="flex-1">
//       <h2 className="text-3xl sm:text-4xl font-bold leading-snug mb-6">
//         Share or Get <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Books Easily</span> with Student Guide
//       </h2>
//       <p className="text-gray-400 text-lg mb-8 max-w-xl">
//         Seniors can list their used textbooks, reference materials, and study notes. Juniors can easily browse and connect to buy them affordably.
//         <br />
//         A smart way to recycle knowledge and help your peers.
//       </p>

//      <div className="mt-8 flex flex-row gap-7">
//             <CTAButton active={true} linkto={"/"}>
//               Explore Book
//             </CTAButton>
//             <CTAButton active={false} linkto={"/"}>
//               List Your Books
//             </CTAButton>
//           </div>
//     </div>
//   </div>
// </div>




// <div className="w-full bg-richblack-900 text-white py-16 px-4 sm:px-8 lg:px-20">
//   <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">


//     <div className="flex-1">
//       <h2 className="text-3xl sm:text-4xl font-bold leading-snug mb-6">
//         Find 


//  <HighlightText text={"Mess & Tiffin"} /> services around you
//       </h2>
//       <p className="text-gray-400 text-lg mb-8 max-w-xl">
//         Discover hygienic and budget-friendly messes near DYPCOE. Choose from veg, non-veg, or Jain options with reviews and meal photos. Connect with tiffin providers and manage subscriptions easily on Student Guide.
//       </p>
//  <div className="mt-8 flex flex-row gap-7">
//             <CTAButton active={true} linkto={"/food"}>
//              Find Tiffin Near You
//             </CTAButton>
//             <CTAButton active={false} linkto={"/mentor"}>
//              Talk to Seniors
//             </CTAButton>
//           </div>

//     </div>


//     <div className="flex-1 w-full max-w-md">
//       <div className="bg-gradient-to-tr from-yellow-900/40 to-yellow-700/20 rounded-lg overflow-hidden shadow-xl">
//         <img
//           src={food}
//           alt="Nearby Mess Options"
//           className="w-full h-auto object-cover"
//         />
//       </div>
//     </div>
//   </div>
// </div>
// <div className="bg-richblack-900 text-white py-16 px-4 sm:px-6 lg:px-20 flex flex-col-reverse md:flex-row items-center gap-10">

//   <div className="flex-1 max-w-lg">
//     <img
//       src={room}
//       alt="Hostels near DYP"
//       className="w-full h-72 object-cover rounded-lg shadow-xl"
//     />
//   </div>


//   <div className="flex-1">
//     <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
//       Find <span className="text-yellow-400">hostels near DYP</span> with ease
//     </h2>
//     <p className="text-lg text-gray-400 mb-8 max-w-xl">
//       Browse affordable hostel options from low to high pricing near DYP campus. Easily compare facilities and contact seniors who’ve stayed there to get real experiences. Let Student Guide help you book the right one.
//     </p>

//  <div className="mt-8 flex flex-row gap-7">
//             <CTAButton active={true} linkto={"/hostels"}>
//              Explore Hostels
//             </CTAButton>
//             <CTAButton active={false} linkto={"/mentor"}>
//             Talk to Seniors
//             </CTAButton>
//           </div>

//   </div>
// </div>



// <div className="w-full bg-richblack-900 text-white py-20 px-4">
//   <div className="max-w-7xl mx-auto text-center">
//     {/* Heading */}
//     <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
//       Unlock the{" "}
//       {/* <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//         Power of Student Guide
//       </span> */}

//        <HighlightText text={"Power of Student Guide"} />
//     </h2>
//     <p className="text-gray-400 text-lg mt-3">
//       Everything you need to settle in college with ease
//     </p>

//     {/* Tabs */}
//     <div className="mt-10 bg-richblack-800/60 backdrop-blur-md shadow-[0_0_40px_-5px_rgba(0,0,0,0.7)] flex flex-wrap justify-center gap-3 sm:gap-6 px-4 py-3 rounded-full w-full max-w-4xl mx-auto">
//       {Object.keys(buttonRoutes).map((label, idx) => (
//         <button
//           key={idx}
//           onClick={() => navigate(buttonRoutes[label])}
//           className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
//             idx === 0
//               ? "bg-richblack-900 text-white border border-yellow-400"
//               : "text-gray-300 hover:text-white"
//           }`}
//         >
//           {label}
//         </button>
//       ))}
//     </div>
//   </div>
// </div>



// <div className="bg-white py-16 px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-10">
//   {/* Left Timeline Content */}
//   <div className="flex-1">
//     <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-richblack-900">
//       Get the
//       <HighlightText text={"essentials for college life"} />
      
//        {/* <span className="text-blue-500">essentials for college life</span> */}
//     </h2>
//     <p className="text-lg text-gray-700 mb-10 max-w-xl">
//       From admission to books, food, hostels, and a smart student mart — we guide you through every step. Designed with care to ensure every DYP student thrives.
//     </p>

//     <div className="flex flex-col gap-6 relative">
//       {/* Timeline vertical line */}
//       <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-yellow-300 rounded-full"></div>

//       {[
//         { icon: "🎓", title: "Admission Help" },
//         { icon: "🍱", title: "Nearby Food Mess" },
//         { icon: "📚", title: "Books & Study Material" },
//         { icon: "🏠", title: "Hostel Guide" },
//         { icon: "🛒", title: "Student Mart" },
//       ].map((step, index) => (
//         <div key={index} className="flex items-center gap-4">
//           <div className="relative z-10 w-10 h-10 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center text-xl shadow-md">
//             {step.icon}
//           </div>
//           <p className="text-gray-800 text-lg font-medium">{step.title}</p>
//         </div>
//       ))}
//     </div>
//   </div>

//   {/* Right Image or Visual */}
//   <div className="flex-1 max-w-xl">
//     <img
//       src={ND}
//       alt="Student Essentials Flow"
//       className="w-full h-auto rounded-xl shadow-2xl"
//     />
//   </div>
// </div>

// {/* Become‑a‑Guide – dark theme, image left, text right */}
// <div className="bg-richblack-900 text-white py-20 px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
//   {/* ───── Left Image ───── */}
//   <div className="flex-1 max-w-xl relative">
//     {/* subtle cyan glow */}
//     <div className="absolute inset-0 -z-10 rounded-xl bg-cyan-400/10 blur-2xl" />
//     <img
//      src={ND}   // put your guide image here
//       alt="Become a Guide"
//       className="w-full h-auto rounded-xl shadow-2xl"
//     />
//   </div>

//   {/* ───── Right Content ───── */}
//   <div className="flex-1">
//     <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
//       Become a&nbsp;
//       <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//         Guide&nbsp;for&nbsp;Juniors
//       </span>
//     </h2>

//     <p className="text-lg text-gray-300 mb-8 max-w-xl">
//       You’ve mastered the DYPCOE journey — from admissions to hostels and mess
//       hunts. Share your experience, help freshers start strong, and earn money
//       for every student you guide.
//     </p>

  

   


//               {token ? (
//                           <div className="mt-8 flex flex-row gap-7">
//             <CTAButton active={true} linkto={"/guideapplication"}>
//             Start Guiding Today
//             </CTAButton>
         
//           </div>
//                         ) : (
//                           <>
//                               <div className="mt-8 flex flex-row gap-7">
//             <CTAButton active={true} linkto={"/login"}>
//             Start Guiding Today
//             </CTAButton>
//           </div>
          
//                   </>
//                         )}
//   </div>
// </div>

// <Footer/>


//     </div>
//   );
// };

// export default LandingPage;

























import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Users, BookOpen, UtensilsCrossed, Home, ShoppingCart } from 'lucide-react';
import CTAButton from "../components/core/HomePage/Button"
import HighlightText from '../components/core/HomePage/HighlightText';
import { FaArrowRight } from 'react-icons/fa';
import hostel1 from '../assets/dyphostel/hostel1.png';
import hostel2 from '../assets/dyphostel/hostel2.png';
import hostel3 from '../assets/dyphostel/hostel3.png';
import hostel4 from '../assets/dyphostel/hostel4.png';
import hostel5 from '../assets/dyphostel/hostel5.png';
import hostel6 from '../assets/dyphostel/hostel6.png';
import { useNavigate } from 'react-router-dom';
import bookshare from '../assets/Images/bookshare.png';
import food from '../assets/Images/food.png';
import room from '../assets/Images/room.png';
import  college from '../assets/Images/college.png';
import ND from '../assets/Images/ND.jpg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from "../components/Common/Footer"
const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
   const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
 const [activeLabel, setActiveLabel] = useState("Admission"); // default tab
 const token = useSelector((state) => state.auth.token);


  // Mock hostel images - replace with your actual images
  const sliderImages = [
hostel1, hostel2, hostel3, hostel4, hostel5, hostel6
  ];

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

 const buttonRoutes = {
    // Admission: "/admission",
    Food: "/food",
    Books: "/books",
    Hostels: "/hostels",
    Mentors: "/mentor",
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full overflow-x-hidden">
      
      {/* CTA Button */}
{/* {token ? (
  <>
  <Link to="/mentor">
        <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-700 p-1 font-bold text-richblack-100 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
          <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
            <p>Become a Mentor</p>
            <FaArrowRight />
          </div>
        </div>
      </Link>
      
  </>
      ):(  
        <>
       <Link to="/login">
        <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-700 p-1 font-bold text-richblack-100 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
          <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
            <p>Become a Mentor</p>
            <FaArrowRight />
          </div>
        </div>
      </Link>
     </>
    )
} */}


 <div className="pt-8 sm:pt-16 px-4">
        <div className="group mx-auto w-fit rounded-full bg-gray-800 p-1 font-bold text-gray-100 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
          <div className="flex flex-row items-center gap-2 rounded-full px-6 sm:px-10 py-2 sm:py-[5px] transition-all duration-200 group-hover:bg-gray-900">
            <p className="text-sm sm:text-base">
           <button onClick={() => navigate(token ? '/mentor' : '/login')}>
  Become a Mentor
</button>
            </p>
            <ArrowRight size={16} className="sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-8 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          Empower Your Future with{' '}
          <HighlightText text="Student Guide" />
        </h1>
        <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
          Navigate your academic journey with confidence. Our comprehensive platform helps freshers with admissions,
          hostel bookings, food options, books, groceries, and connects you with experienced mentors for personalized guidance.
        </p>

        <div className="flex flex-row gap-4 sm:gap-7 justify-center items-center">
           <CTAButton active={true} linkto={"https://www.dypiu.ac.in/gallery"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"https://www.dypiu.ac.in/gallery"}>
              Book a Demo
            </CTAButton>
          
        </div>
      </div>

      {/* Image Slider */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-16">
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
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
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all"
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all"
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5" />
          </button>

          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* DYPCOE Admission Flow */}
      <div className="w-full bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          
          {/* Left Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-snug">
              Start your journey at{' '}
              <HighlightText text="DYPCOE" />
              {' '}with our admission guidance.
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Applying for college shouldn't be complicated. We've simplified the process to help you get started with confidence.
            </p>
            
            <div className="flex flex-row gap-4 sm:gap-7 justify-center lg:justify-start">
             <CTAButton active={true} linkto={"https://www.dypcoeakurdi.ac.in/"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"https://www.dypcoeakurdi.ac.in/"}>
             Apply Now
            </CTAButton>
            </div>
          </div>

          {/* Right Step Flow */}
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
            <ol className="relative border-l-4 border-blue-600 pl-4 sm:pl-6 space-y-6 sm:space-y-8">
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
                  <span className="absolute -left-6 sm:-left-7 top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white text-xs sm:text-sm flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Book Exchange Section */}
      <div className="w-full bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12">
          
          {/* Left Image */}
          <div className="flex-1 w-full">
            <div className="bg-gradient-to-tr from-blue-900/50 to-blue-700/20 rounded-lg overflow-hidden shadow-lg">
              <img
 src={bookshare}
                alt="Student Book Exchange"
                className="w-full h-48 sm:h-64 lg:h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-4 sm:mb-6">
              Share or Get <HighlightText text="Books Easily" /> with Student Guide
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Seniors can list their used textbooks, reference materials, and study notes. Juniors can easily browse and connect to buy them affordably.
            </p>

            <div className="flex flex-row gap-4 sm:gap-7 justify-center lg:justify-start">
            <CTAButton active={true} linkto={"/books"}>
              Explore Book
            </CTAButton>
            <CTAButton active={false} linkto={"/books"}>
              List Your Books
            </CTAButton>
            </div>
          </div>
        </div>
      </div>

      {/* Food Section */}
      <div className="w-full bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">

          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-4 sm:mb-6">
              Find <HighlightText text="Mess & Tiffin" /> services around you
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Discover hygienic and budget-friendly messes near DYPCOE. Choose from veg, non-veg, or Jain options with reviews and meal photos.
            </p>
            
            <div className="flex flex-row gap-4 sm:gap-7 justify-center lg:justify-start">
                 <CTAButton active={true} linkto={"/food"}>
             Find Tiffin Near You
            </CTAButton>
            <CTAButton active={false} linkto={"/mentor"}>
             Talk to Seniors
            </CTAButton>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-gradient-to-tr from-yellow-900/40 to-yellow-700/20 rounded-lg overflow-hidden shadow-xl">
              <img
                src={food}
                alt="Nearby Mess Options"
                className="w-full h-48 sm:h-64 lg:h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hostel Section */}
      <div className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-20 flex flex-col-reverse md:flex-row items-center gap-8 sm:gap-10">

        {/* Left Image */}
        <div className="flex-1 max-w-lg mx-auto md:mx-0">
          <img
            src={room}
            alt="Hostels near DYP"
            className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Right Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
            Find <span className="text-yellow-400">hostels near DYP</span> with ease
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">
            Browse affordable hostel options from low to high pricing near DYP campus. Compare facilities and contact seniors for real experiences.
          </p>

          <div className="flex flex-row gap-4 sm:gap-7 justify-center md:justify-start">
            <CTAButton active={true} linkto={"/hostels"}>
             Explore Hostels
            </CTAButton>
            <CTAButton active={false} linkto={"/mentor"}>
            Talk to Seniors
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Power of Student Guide Section */}
      <div className="w-full bg-gray-900 text-white py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Unlock the <HighlightText text="Power of Student Guide" />
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10">
            Everything you need to settle in college with ease
          </p>

          {/* Tabs */}
      <div className="bg-gray-800/60 backdrop-blur-md shadow-[0_0_40px_-5px_rgba(0,0,0,0.7)] flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-6 px-3 sm:px-4 py-3 rounded-full w-full max-w-4xl mx-auto">
      {Object.keys(buttonRoutes).map((label) => (
        <button
          key={label}
          onClick={() => {
            setActiveLabel(label);
            navigate(buttonRoutes[label]);
          }}
          className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
            activeLabel === label
              ? "bg-gray-900 text-white border border-yellow-400"
              : "text-gray-300 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
        </div>
      </div>

      {/* College Essentials Section */}
      <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-8 sm:gap-10">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-gray-900">
            Get the <HighlightText text="essentials for college life" />
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0">
            From admission to books, food, hostels, and a smart student mart — we guide you through every step.
          </p>

          <div className="flex flex-col gap-4 sm:gap-6 relative max-w-md mx-auto lg:mx-0">
            {/* Timeline vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-yellow-300 rounded-full hidden sm:block"></div>

            {[
              { icon: "🎓", title: "Admission Help" },
              { icon: "🍱", title: "Nearby Food Mess" },
              { icon: "📚", title: "Books & Study Material" },
              { icon: "🏠", title: "Hostel Guide" },
              { icon: "🛒", title: "Student Mart" },
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center text-lg sm:text-xl shadow-md">
                  {step.icon}
                </div>
                <p className="text-gray-800 text-base sm:text-lg font-medium">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 max-w-xl">
          <img
            src={college}
            alt="Student Essentials Flow"
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </div>
      </div>

      {/* Become a Guide Section */}
   <div className="bg-gray-900 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">

  {/* Left Image */}
  <div className="flex-1 w-full max-w-lg relative">
    <div className="absolute inset-0 -z-10 rounded-xl bg-cyan-400/10 blur-2xl" />
    <img
      src={ND}
      alt="Become a Guide"
      className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-cover rounded-xl shadow-2xl"
    />
  </div>

  {/* Right Content */}
  <div className="flex-1 w-full text-center lg:text-left max-w-xl">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
      Become a{" "}
      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Guide for Juniors
      </span>
    </h2>

    <p className="text-base sm:text-lg text-gray-300 mb-8">
      You've mastered the DYPCOE journey — from admissions to hostels and mess hunts.
      Share your experience, help freshers start strong, and earn money for every student you guide.
    </p>

    <div className="flex flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
      <CTAButton active={true} linkto={token ? "/guideapplication" : "/login"}>
        Start Guiding Today
      </CTAButton>
    </div>
  </div>
</div>

      {/* Footer */}
   <Footer/>

    </div>
  );
};

export default LandingPage;