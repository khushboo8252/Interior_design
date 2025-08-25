import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, User } from 'lucide-react';

const DesignerRecommendations = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const designers = [
    {
      id: 1,
      name: "Sophia Carter",
      location: "San Francisco, CA",
      specialization: "Specializes in modern and minimalist designs.",
      rating: 5,
      reviews: 2,
      duration: "3-4 Days",
      price: "$100/hr",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
      portfolio: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=100&fit=crop",
        "https://images.unsplash.com/photo-1560440021-33f9b867899d?w=150&h=100&fit=crop",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=150&h=100&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=100&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Liam Carter",
      location: "New York, NY",
      specialization: "Known for luxury and contemporary styles.",
      rating: 4.8,
      reviews: 3,
      duration: "5-6 Days",
      price: "$120/hr",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      portfolio: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560440021-33f9b867899d?w=150&h=100&fit=crop",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=150&h=100&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=100&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=100&fit=crop"
      ]
    }
  ];

  const nextImage = (designerId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [designerId]: ((prev[designerId] || 0) + 1) % designers.find(d => d.id === designerId).portfolio.length
    }));
  };

  const prevImage = (designerId) => {
    const designer = designers.find(d => d.id === designerId);
    setCurrentImageIndex(prev => ({
      ...prev,
      [designerId]: ((prev[designerId] || 0) - 1 + designer.portfolio.length) % designer.portfolio.length
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Your Personalized Designer for your dream's
        </h1>
        
        {/* Filter Tags */}
        <div className="flex gap-3 mb-6">
          <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm">
            Style: All
          </span>
          <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm">
            Budget: All
          </span>
          <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm">
            Room Type: All
          </span>
        </div>
      </div>

      {/* Designer Cards */}
      <div className="space-y-6">
        {designers.map((designer) => {
          const currentIndex = currentImageIndex[designer.id] || 0;
          const currentImage = designer.portfolio[currentIndex];
          
          return (
            <div key={designer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Designer Profile Section */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Avatar and Basic Info */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <img 
                        src={designer.avatar} 
                        alt={designer.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <a href="#" className="text-blue-600 text-sm hover:underline">
                        View Full Portfolio
                      </a>
                      <button className="bg-purple-600 text-white px-4 py-1 rounded text-sm hover:bg-purple-700 transition-colors">
                        Hire Designer
                      </button>
                    </div>
                  </div>

                  {/* Designer Details */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">{designer.name}</h3>
                    <p className="text-gray-600 text-sm">{designer.specialization}</p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span>{designer.reviews} reviews</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{designer.duration}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="text-lg font-semibold text-gray-900">
                      Starting at {designer.price}
                    </div>

                    {/* Contact Button */}
                    <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors">
                      Contact me
                    </button>
                  </div>
                </div>

                {/* Portfolio Section */}
                <div className="lg:col-span-3 space-y-4">
                  {/* Main Image */}
                  <div className="relative group">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={currentImage}
                        alt="Portfolio showcase"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={() => prevImage(designer.id)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() => nextImage(designer.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="flex gap-3">
                    {designer.portfolio.slice(1, 5).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(prev => ({ ...prev, [designer.id]: index + 1 }))}
                        className={`flex-1 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          currentIndex === index + 1 ? 'border-purple-500' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    
                    {/* More Photos Indicator */}
                    <div className="flex-1 aspect-video rounded-lg bg-gray-100 border-2 border-gray-200 flex flex-col items-center justify-center text-gray-500 text-xs">
                      <span className="font-semibold">10+</span>
                      <span>Photos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesignerRecommendations;