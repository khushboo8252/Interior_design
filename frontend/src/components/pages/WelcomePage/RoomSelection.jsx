

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const rooms = [
  { id: 1, name: "Bedroom", img: "https://media.designcafe.com/wp-content/uploads/2023/09/11183952/modern-luxury-bedroom-design.jpg" },
  { id: 2, name: "Living Room", img: "https://media.designcafe.com/wp-content/uploads/2019/12/17055334/minimalistic-living-room-interior.jpg" },
  { id: 3, name: "Kitchen", img: "https://media.designcafe.com/wp-content/uploads/2020/10/30144224/contemporary-classic-kitchen-cabinets.jpg" },
  { id: 4, name: "Office", img: "https://4878716.fs1.hubspotusercontent-na1.net/hubfs/4878716/modern-office.png" },
];

const RoomSelection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleBack = () => {
    navigate("/");
  };

  const handleNext = () => {
    if (selected) {
      navigate("/budget");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-white">
        <h1 className="font-bold text-lg">DesignCo</h1>
      </header>

      {/* Step Progress */}
      <div className="px-8 mt-6">
        <p className="text-sm mb-1">Step 1 of 5</p>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="bg-blue-500 h-2 rounded w-1/5"></div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold">What room are we designing?</h2>
        <p className="text-gray-600 mt-2">
          Select the room you’d like to redesign. You can always add more later.
        </p>
      </div>

      {/* Room Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-10 px-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => setSelected(room.id)}
            className={`cursor-pointer rounded-xl shadow-md overflow-hidden border-2 ${
              selected === room.id ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img
              src={room.img}
              alt={room.name}
              className="w-full h-48 object-cover"
            />
            <p className="text-center py-3 font-medium">{room.name}</p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between max-w-5xl mx-auto mt-12 px-6">
        <button
          onClick={handleBack}
          className="bg-gray-200 px-6 py-2 rounded-lg font-medium text-gray-700"
        >
          Back
        </button>
        <button
          disabled={!selected}
          onClick={handleNext}
          className={`px-6 py-2 rounded-lg font-medium text-white ${
            selected
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

export default RoomSelection;
