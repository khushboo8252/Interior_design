import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    skills: "",
    bio: "",
    photo: null,
  });
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([{ 
    service: "", 
    description: "",
    pricingModel: "",
    priceRange: "",
    revisions: "",
    images: []
  }]);
  const fileInputRef = useRef(null);
  const portfolioInputRef = useRef(null);
  const serviceImageRefs = useRef([]);

  const nav = useNavigate(); // Initialize navigate

  // Step 1 handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  // Step 2 handlers
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
    if (portfolioInputRef.current) {
      portfolioInputRef.current.click();
    }
  };

  // Step 3 handlers
  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, { 
      service: "", 
      description: "",
      pricingModel: "",
      priceRange: "",
      revisions: "",
      images: []
    }]);
    // Add new ref for the new service
    serviceImageRefs.current.push(React.createRef());
  };

  const handleServiceImageUpload = (serviceIndex, e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    const newServices = [...services];
    newServices[serviceIndex].images = [...newServices[serviceIndex].images, ...newImages];
    setServices(newServices);
  };

  const triggerServiceImageUpload = (serviceIndex) => {
    if (serviceImageRefs.current[serviceIndex]?.current) {
      serviceImageRefs.current[serviceIndex].current.click();
    }
  };

  // Navigation
  const nextStep = () => {
    if (currentStep === 3 ) {
      nav("/freelancer/profile")
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Tell us about yourself";
      case 2:
        return "Upload your portfolio";
      case 3:
        return "What services do you offer?";
      default:
        return "";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 2:
        return "Showcase your best work to attract clients. Drag and drop images or click to upload.";
      case 3:
        return "Add the services you offer and their prices. You can edit these later.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Titles */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">{getStepTitle()}</h2>
          {getStepSubtitle() && (
            <p className="text-gray-600 mt-2">{getStepSubtitle()}</p>
          )}
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Section */}
              <div className="flex-1 space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-3 text-gray-800"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-3 text-gray-800"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="Designing, Development"
                    value={formData.skills}
                    onChange={handleFormChange}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-3 text-gray-800"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    placeholder="Tell us about your design style and experience"
                    value={formData.bio}
                    onChange={handleFormChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:border-blue-500 resize-none"
                    rows="4"
                  ></textarea>
                </div>
              </div>

              {/* Right Section (Photo Upload) */}
              <div className="flex flex-col items-center justify-center flex-1">
                <label
                  htmlFor="photo"
                  className="w-48 h-48 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer text-gray-500 text-sm hover:border-blue-400 transition-colors"
                >
                  {formData.photo ? (
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Uploaded"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-2">📷</div>
                      <div>Upload your photo</div>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
              </div>
            </div>
          )}

          {/* Step 2: Portfolio Upload */}
          {currentStep === 2 && (
            <div>
              {/* Upload Box */}
              <div
                className="w-full border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleUploadClick}
              >
                <div className="text-6xl mb-4">🎨</div>
                <p className="font-medium text-gray-800 text-lg mb-2">Drag and drop images here</p>
                <p className="text-gray-500 text-sm mb-4">Or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  ref={portfolioInputRef}
                  onChange={handleFileUpload}
                />
                <button
                  className="px-6 py-3 bg-white hover:bg-gray-100 rounded-lg font-medium border-2 border-gray-200 transition-colors"
                  type="button"
                >
                  Choose Files
                </button>
              </div>

              {/* Uploaded Images */}
              {images.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Uploaded Images ({images.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <img
                          src={img}
                          alt={`uploaded-${index}`}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Services */}
          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto">
              {services.map((item, serviceIndex) => {
                // Ensure we have a ref for this service
                if (!serviceImageRefs.current[serviceIndex]) {
                  serviceImageRefs.current[serviceIndex] = React.createRef();
                }
                
                return (
                  <div key={serviceIndex} className="mb-8">
                    <div className="space-y-6">
                      {/* Service Dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service
                        </label>
                        <div className="relative">
                          <select
                            value={item.service}
                            onChange={(e) =>
                              handleServiceChange(serviceIndex, "service", e.target.value)
                            }
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white"
                          >
                            <option value="">Select a service</option>
                            <option value="logo-design">Logo Design</option>
                            <option value="web-design">Web Design</option>
                            <option value="branding">Branding Package</option>
                            <option value="ui-ux">UI/UX Design</option>
                            <option value="print-design">Print Design</option>
                            <option value="illustration">Illustration</option>
                            <option value="photography">Photography</option>
                            <option value="video-editing">Video Editing</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          placeholder="Describe a service"
                          value={item.description}
                          onChange={(e) =>
                            handleServiceChange(serviceIndex, "description", e.target.value)
                          }
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                          rows="4"
                        />
                      </div>

                      {/* Pricing Model */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pricing Model
                        </label>
                        <div className="relative">
                          <select
                            value={item.pricingModel}
                            onChange={(e) =>
                              handleServiceChange(serviceIndex, "pricingModel", e.target.value)
                            }
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white"
                          >
                            <option value="">Select pricing model</option>
                            <option value="fixed">Fixed Price</option>
                            <option value="hourly">Hourly Rate</option>
                            <option value="package">Package Deal</option>
                            <option value="custom">Custom Quote</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price Range
                        </label>
                        <input
                          type="text"
                          placeholder="Enter price range"
                          value={item.priceRange}
                          onChange={(e) =>
                            handleServiceChange(serviceIndex, "priceRange", e.target.value)
                          }
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                      </div>

                      {/* Number of Revisions */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Revisions
                        </label>
                        <input
                          type="text"
                          placeholder="Enter number of revisions"
                          value={item.revisions}
                          onChange={(e) =>
                            handleServiceChange(serviceIndex, "revisions", e.target.value)
                          }
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                      </div>

                      {/* Add Images Section */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Add Images</h3>
                        <p className="text-gray-600 text-sm mb-4">Showcase your work related to this service</p>
                        
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          ref={serviceImageRefs.current[serviceIndex]}
                          onChange={(e) => handleServiceImageUpload(serviceIndex, e)}
                          className="hidden"
                        />
                        
                        <button
                          type="button"
                          onClick={() => triggerServiceImageUpload(serviceIndex)}
                          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
                        >
                          Upload Images
                        </button>

                        {/* Display uploaded images for this service */}
                        {item.images.length > 0 && (
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            {item.images.map((img, imgIndex) => (
                              <img
                                key={imgIndex}
                                src={img}
                                alt={`service-${serviceIndex}-img-${imgIndex}`}
                                className="w-full h-20 object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add Service Button - only show after the last service */}
                    {serviceIndex === services.length - 1 && (
                      <button
                        type="button"
                        onClick={addService}
                        className="mt-6 w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center"
                      >
                        Add Service
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Back
          </button>
          
          <button
            className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
            onClick={nextStep}
          >
            {currentStep === 3 ? "Complete" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;