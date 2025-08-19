import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingStep1 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    skills: "",
    bio: "",
    photo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here if needed
    navigate("/onboardingS2");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Tell us about yourself
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="flex-1 space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium">Full name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium">Location</label>
              <input
                type="text"
                name="location"
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-gray-700 font-medium">Skills</label>
              <input
                type="text"
                name="skills"
                placeholder="Designing, Development"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-700 font-medium">Bio</label>
              <textarea
                name="bio"
                placeholder="Tell us about your design style and experience"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 resize-none"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Right Section (Photo Upload) */}
          <div className="flex flex-col items-center justify-center flex-1">
            <label
              htmlFor="photo"
              className="w-40 h-40 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer text-gray-500 text-sm"
            >
              {formData.photo ? (
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                "Upload your photo"
              )}
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </form>

        {/* Next Button */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-8 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;