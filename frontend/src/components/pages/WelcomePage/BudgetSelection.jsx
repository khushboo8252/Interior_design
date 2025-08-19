import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BudgetSelection = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(50000); 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-white">
        <h1 className="font-bold text-lg">DesignCo</h1>
        {/* <div className="flex items-center gap-4">
          <button className="p-2 bg-gray-200 rounded-full">?</button>
          <img
            src="/avatar.jpg" // replace with actual avatar
            alt="user"
            className="w-10 h-10 rounded-full"
          />
        </div> */}
      </header>

      {/* Step Progress */}
      <div className="px-8 mt-6">
        <p className="text-sm mb-1">Step 2 of 5</p>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="bg-blue-500 h-2 rounded w-2/5"></div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold">What's your budget?</h2>
        <p className="text-gray-600 mt-2">
          This helps us match you with the right designers.
        </p>
      </div>

      {/* Slider */}
      <div className="max-w-3xl mx-auto mt-12 px-6">
        <label className="block text-gray-700 font-medium mb-4">Budget</label>
        <input
          type="range"
          min="10000"
          max="100000"
          step="5000"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>$10k</span>
          <span>$100k+</span>
        </div>
        <p className="text-center mt-4 font-medium text-gray-800">
          Selected: ${budget.toLocaleString()}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between max-w-5xl mx-auto mt-12 px-6">
        <button
          onClick={() => navigate("/rooms")}
          className="bg-gray-200 px-6 py-2 rounded-lg font-medium text-gray-700"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/style")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BudgetSelection;
