import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PortfolioUpload = () => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBack = () => {
    navigate("/onboardingS1");
  };

  const handleNext = () => {
    navigate("/onboardingS3");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      {/* Step Progress */}
      <div className="w-full max-w-4xl mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step 2 of 4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-blue-500 h-1.5 rounded-full w-1/2"></div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Upload your portfolio</h2>
        <p className="text-gray-600 mt-2">
          Showcase your best work to attract clients. Drag and drop images or click to upload.
        </p>
      </div>

      {/* Upload Box */}
      <div
        className="w-full max-w-4xl border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center bg-white hover:border-blue-400 transition"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="font-medium text-gray-800">Drag and drop images here</p>
        <p className="text-gray-500 text-sm mb-4">Or click to browse</p>
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <button
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
          onClick={handleUploadClick}
          type="button"
        >
          Upload
        </button>
      </div>

      {/* Uploaded Images */}
      {images.length > 0 && (
        <div className="w-full max-w-4xl mt-8">
          <h3 className="text-lg font-medium mb-4 text-gray-800">Uploaded Images</h3>
          <div className="grid grid-cols-3 gap-6">
            {images.map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow">
                <img
                  src={img}
                  alt={`uploaded-${index}`}
                  className="w-full h-56 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-4xl mt-12">
        <button
          className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="px-8 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PortfolioUpload;