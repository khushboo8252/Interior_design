import React from "react";
import { Star, StarHalf } from "lucide-react";

const FreelancerProfile = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white text-gray-800">
      {/* Header Section */}
      <div className="flex items-center gap-6 border-b pb-6">
        <img
          src="https://i.pravatar.cc/150?img=47"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-semibold">Sophia Carter</h1>
          <p className="text-gray-600">Product Designer</p>
          <p className="text-sm text-blue-500 cursor-pointer">
            Based in San Francisco
          </p>
          <button className="mt-3 px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Start a project
          </button>
        </div>
      </div>

      {/* About */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-gray-600">
          Sophia Carter is a product designer with over 5 years of experience in
          creating user-centered designs. She specializes in UI/UX design for
          web and mobile applications, focusing on usability and aesthetics. Her
          portfolio showcases a range of projects from e-commerce platforms to
          innovative mobile apps.
        </p>
      </section>

      {/* Services */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Services</h2>
        <div className="flex gap-2 flex-wrap">
          {[
            "UI/UX Design",
            "Mobile App Design",
            "Web Design",
            "User Research",
            "Prototyping",
          ].map((service) => (
            <span
              key={service}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
            >
              {service}
            </span>
          ))}
        </div>
      </section>

      {/* Style Specialties */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Style Specialties</h2>
        <div className="flex gap-2 flex-wrap">
          {["Minimalist", "Modern", "Material Design", "Flat Design"].map(
            (style) => (
              <span
                key={style}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {style}
              </span>
            )
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Reviews</h2>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold">4.8</p>
            <div className="flex justify-center text-yellow-500">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={18} fill="gold" stroke="gold" />
              ))}
              <StarHalf size={18} fill="gold" stroke="gold" />
            </div>
            <p className="text-sm text-gray-500">25 reviews</p>
          </div>

          {/* Rating bars */}
          <div className="flex-1">
            {[
              { stars: 5, percent: 70 },
              { stars: 4, percent: 20 },
              { stars: 3, percent: 5 },
              { stars: 2, percent: 3 },
              { stars: 1, percent: 2 },
            ].map((r) => (
              <div key={r.stars} className="flex items-center gap-2 mb-2">
                <span className="text-sm w-3">{r.stars}</span>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${r.percent}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{r.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="mt-6 space-y-4">
          <div className="flex gap-3">
            <img
              src="https://i.pravatar.cc/40?img=32"
              alt="Reviewer"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Ethan Harper</p>
              <p className="text-sm text-gray-500">1 month ago</p>
              <p className="mt-1">
                Sophia is an exceptional designer. Her attention to detail and
                understanding of user needs resulted in a product that exceeded
                our expectations. Highly recommend!
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                <span>👍 5</span>
                <span>💬 1</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <img
              src="https://i.pravatar.cc/40?img=36"
              alt="Reviewer"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Olivia Bennett</p>
              <p className="text-sm text-gray-500">2 months ago</p>
              <p className="mt-1">
                Sophia delivered a great design for our mobile app. She was
                responsive to feedback and incorporated our ideas seamlessly. A
                pleasure to work with.
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                <span>👍 3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Portfolio</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((img) => (
            <div
              key={img}
              className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={`https://placehold.co/400x300?text=Work+${img}`}
                alt={`Portfolio ${img}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FreelancerProfile;
