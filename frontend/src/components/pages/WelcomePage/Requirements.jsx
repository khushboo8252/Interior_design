import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SpecialRequirements = () => {
  const [requirements, setRequirements] = useState("");
    const navigate = useNavigate();

  const handleBack = () => {
    navigate("/style");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 border-b">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">DesignCo</span>
        </div>
        {/* <nav className="hidden md:flex space-x-8 text-gray-700">
          <a href="#" className="hover:text-black">
            Overview
          </a>
          <a href="#" className="hover:text-black">
            Services
          </a>
          <a href="#" className="hover:text-black">
            Projects
          </a>
          <a href="#" className="hover:text-black">
            Team
          </a>
          <a href="#" className="hover:text-black">
            Contact
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-black">
            <span className="text-xl">❓</span>
          </button>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div> */}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-10">
        {/* Progress bar */}
        <div className="w-full max-w-3xl">
          <p className="text-sm text-gray-600 mb-2">Step 4 of 5</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full w-4/5"></div>
          </div>
        </div>

        {/* Question */}
        <h1 className="text-2xl font-semibold text-gray-800 mt-10 mb-6 text-center">
          Do you have any special requirements?
        </h1>

        {/* Textarea */}
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Please describe any special requirements you have for your project."
          className="w-full max-w-xl h-32 p-4 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />

        {/* Buttons */}
        <div className="flex justify-between items-center w-full max-w-xl mt-8">
          <button
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
            onClick={handleBack}
          >
            Back
          </button>
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default SpecialRequirements;
