

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = ["Modern", "Classic", "Minimal", "Industrial"];

const StyleSelection = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleStyle = (style) => {
    if (selected.includes(style)) {
      setSelected(selected.filter((s) => s !== style));
    } else {
      setSelected([...selected, style]);
    }
  };

  const handleNext = () => {
    if (selected.length > 0) {
      navigate("/requirements");
    }
  };

  const handleBack = () => {
    navigate("/budget");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-white">
        <h1 className="font-bold text-lg">DesignCo</h1>
        <button className="px-4 py-2 bg-gray-200 rounded-lg">Help</button>
      </header>

      {/* Step Progress */}
      <div className="px-8 mt-6">
        <p className="text-sm mb-1">Step 3 of 5</p>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="bg-blue-500 h-2 rounded w-3/5"></div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold">What's your style?</h2>
        <p className="text-gray-600 mt-2">
          Select the style that best represents your vision for the space. You
          can choose multiple styles if you're drawn to more than one.
        </p>
      </div>

      {/* Style Options */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 px-6">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => toggleStyle(style)}
            className={`px-6 py-2 rounded-lg border text-sm font-medium transition ${
              selected.includes(style)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between max-w-5xl mx-auto mt-12 px-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 rounded-lg font-medium bg-gray-200 text-gray-700"
        >
          Back
        </button>
        <button
          disabled={selected.length === 0}
          onClick={handleNext}
          className={`px-6 py-2 rounded-lg font-medium text-white ${
            selected.length > 0
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StyleSelection;