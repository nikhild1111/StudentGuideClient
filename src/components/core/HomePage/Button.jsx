// import React from 'react'
// import {Link} from "react-router-dom"

// const Button = ({ children, active, linkto }) => {
//   return (
//     <Link to={linkto}>
//       <div
//         className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
//           active ? "bg-yellow-400 text-black " : "bg-richblack-800"
//         } hover:shadow-none hover:scale-95 transition-all duration-200 `}
//       >
//         {children}
//       </div>
//     </Link>
//   );
// };

// export default Button


import React from 'react';
import { Link } from 'react-router-dom';

const CTAButton = ({ children, active, linkto = "/" }) => {
  const isExternal = typeof linkto === "string" && linkto.startsWith("http");

  const classes = `text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
    active ? "bg-yellow-400 text-black " : "bg-richblack-800"
  } hover:shadow-none hover:scale-95 transition-all duration-200`;

  return isExternal ? (
    <a href={linkto} target="_blank" rel="noopener noreferrer">
      <div className={classes}>{children}</div>
    </a>
  ) : (
    <Link to={linkto}>
      <div className={classes}>{children}</div>
    </Link>
  );
};

export default CTAButton;
