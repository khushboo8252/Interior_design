import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ServicesForm = () => {
  const [services, setServices] = useState([{ service: "", price: "" }]);
   const navigate = useNavigate();

  const handleBack = () => {
    navigate("/onboardingS2");
  };

  const handleNext = () => {
    navigate("/onboardingProfile");
  };

  const handleChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };


  const addService = () => {
    setServices([...services, { service: "", price: "" }]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-2">Step 3 of 4</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full w-3/4"></div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          What services do you offer?
        </h1>
        <p className="text-gray-500 mb-6">
          Add the services you offer and their prices. You can edit these later.
        </p>

        {/* Service Fields */}
        <div className="space-y-4">
          {services.map((item, index) => (
            <div key={index} className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Service
                </label>
                <input
                  type="text"
                  placeholder="Enter service"
                  value={item.service}
                  onChange={(e) =>
                    handleChange(index, "service", e.target.value)
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  placeholder="Enter price"
                  value={item.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add Service Button */}
        <button
          type="button"
          onClick={addService}
          className="mt-4 text-sm px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
        >
          Add Service
        </button>

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
    </div>
  );
};

export default ServicesForm;
