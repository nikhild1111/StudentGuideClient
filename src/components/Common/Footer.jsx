import React from "react";

const Footer = () => {
  return (
    <footer className="bg-richblack-900 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 border-t border-richblack-700">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
       

    
        {/* Bottom Section */}
       
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright Text */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                Copyright © {new Date().getFullYear()} -{" "}
                <span className="text-white font-semibold">Student Guide</span> |{" "}
                <span className="text-yellow-400">Your Academic Journey Partner</span> | 
                All Rights Reserved.
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <a 
                href="/privacy" 
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a 
                href="/contact" 
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Powered by Section */}
          <div className="mt-4 pt-4 border-t border-richblack-700 text-center">
            <p className="text-gray-500 text-xs">
              Powered by <span className="text-blue-400">React</span> &{" "}
              <span className="text-green-400">Node.js</span> | 
              Designed with ❤️ for Students by{" "}
              <span className="text-yellow-400">Student Guide Team</span>
            </p>
          </div>
        </div>
      
    </footer>
  );
};

export default Footer;