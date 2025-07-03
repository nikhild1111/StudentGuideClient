import React from 'react';

const AdmissionGuide = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">DYPCOE Admission Process Guide</h1>
          <p className="mt-2">Your complete roadmap to joining DY Patil College of Engineering</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Secure Your Future at DYPCOE</h2>
          <p className="text-gray-700 mb-6">
            Our admission process is designed to help talented students like you join one of Maharashtra's premier engineering institutions. 
            With state-of-the-art facilities and industry-aligned curriculum, DYPCOE prepares you for a successful career in technology.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Key Dates for 2023-24</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-3">1</span>
                <span>Application Opens: June 1, 2023</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-3">2</span>
                <span>Last Date to Apply: July 15, 2023</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-3">3</span>
                <span>Merit List Announcement: July 25, 2023</span>
              </li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300">
              Apply Now
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md transition duration-300">
              Download Brochure
            </button>
          </div>
        </div>

        {/* Right Side - Flowchart */}
        <div className="md:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h3 className="text-xl font-semibold mb-6 text-center text-blue-800">Admission Process Flow</h3>
            
            {/* Animated Flowchart */}
            <div className="space-y-8 relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              
              {/* Step 1 */}
              <div className="flex items-start relative group">
                <div className="flex-shrink-0 bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold z-10">
                  1
                </div>
                <div className="ml-4 pt-1 animate-fade-in">
                  <h4 className="font-semibold text-gray-800">Check Eligibility</h4>
                  <p className="text-gray-600 text-sm mt-1">Minimum 50% in 10+2 with PCM</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start relative group">
                <div className="flex-shrink-0 bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold z-10">
                  2
                </div>
                <div className="ml-4 pt-1 animate-fade-in delay-100">
                  <h4 className="font-semibold text-gray-800">Submit Application</h4>
                  <p className="text-gray-600 text-sm mt-1">Online form with required documents</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start relative group">
                <div className="flex-shrink-0 bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold z-10">
                  3
                </div>
                <div className="ml-4 pt-1 animate-fade-in delay-200">
                  <h4 className="font-semibold text-gray-800">Merit List</h4>
                  <p className="text-gray-600 text-sm mt-1">Based on MHT-CET/JEE scores</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start relative group">
                <div className="flex-shrink-0 bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold z-10">
                  4
                </div>
                <div className="ml-4 pt-1 animate-fade-in delay-300">
                  <h4 className="font-semibold text-gray-800">Fee Payment</h4>
                  <p className="text-gray-600 text-sm mt-1">Confirm your seat by paying fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add this to your global CSS or Tailwind config for animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in forwards;
          opacity: 0;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AdmissionGuide;