import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Home() {
  const navigate = useNavigate(); // Initialize navigate

  const handleGetStarted = () => {
    navigate("/freelancer/onboarding"); // Navigate to /freelancer/onboarding route
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card container */}
      <div className="relative w-[90%] max-w-5xl rounded-2xl overflow-hidden shadow-lg">
        {/* Background Image */}
        <img
          src="https://assets-news.housing.com/news/wp-content/uploads/2025/02/19202105/7-trendy-interior-decor-colour-palettes-in-2025-f.jpg"
          alt="Welcome Background"
          className="w-full h-[600px] object-cover"
        />

        {/* Overlay for text */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Design Your Dream Space
          </h1>
          <p className="text-lg md:text-xl text-black mb-6">
            Tell us about your style and we’ll recommend the perfect designs.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            onClick={handleGetStarted} // Add onClick handler
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
