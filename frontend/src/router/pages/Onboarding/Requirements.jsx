import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Upload, Plus, Minus, Clock, RefreshCcw } from 'lucide-react';

const Requirements = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState({});
  const [budget, setBudget] = useState(50);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [activeStyleTab, setActiveStyleTab] = useState('modern');
  const [projectBrief, setProjectBrief] = useState('');

  const rooms = [
    { id: 'bedroom', name: 'Bedroom', image: 'https://www.thespruce.com/thmb/YvYVWaG2oehCOF3CF2kq46Qv6OE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mindygayerlanedittoebedroomaccentwall-794746f31e2a4d41933f8e8f43359627.jpeg' },
    { id: 'living', name: 'Living Room', image: 'https://api.photon.aremedia.net.au/wp-content/uploads/sites/2/2023/09/Contemporary-Scandi-renovated-living-room.jpg?resize=1920%2C1440' },
    { id: 'kitchen', name: 'Kitchen', image: 'https://www.snimayhome.com/uploads/image/20200403/16/biarritz-kitchen-room.jpg' },
    { id: 'office', name: 'Office', image: 'https://media.istockphoto.com/id/1166245900/photo/work-from-home-office-with-twin-monitors-tablet-mouse-computor-hard-drives-on-white-painted.jpg?s=612x612&w=0&k=20&c=TqmE20FPmmSlH8c3npyhIxj6jOv4yHRY61uSO_3hycY=' },
    { id: 'dining', name: 'Dining Room', image: 'https://www.thespruce.com/thmb/ZqfUoFjPOAqtJBpzjDw-sxRdiNQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-dining-room-ideas-4147451-hero-d6333998f8b34620adfd4d99ac732586.jpg' },
    { id: 'entryway', name: 'Entryway', image: 'https://hips.hearstapps.com/hmg-prod/images/salway-new-york-farmhouse-entry-67786d2c17293.jpg?crop=1.00xw:0.958xh;0,0.0352xh&resize=980:*' },
    { id: 'outdoor', name: 'Outdoor Space', image: 'https://eastwood.nyc3.cdn.digitaloceanspaces.com/blogs/EWH%20-%20Outdoor%20Living%20Space%20Image%201.jpeg' },
    { id: 'bathroom', name: 'Bathroom', image: 'https://www.bhg.com/thmb/ZkJd7GwTx9Nzv59jojOO2nb_uTo=/3002x0/filters:no_upscale():strip_icc()/Modern-gray-bathroom-Sch31478_Mid7007959_Bath_Overall_Alt_A_044_F99WsfKYKESB5ePvsgZbnt-c657786eec9e4c1bad575c6c558d6486.jpg' }
  ];

  const styleOptions = [
  { id: 'modern', name: 'Modern', image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVkcm9vbSUyMGludGVyaW9yfGVufDB8fDB8fHww' },
  { id: 'luxury', name: 'Luxury', image: 'https://media.designcafe.com/wp-content/uploads/2019/12/17054511/small-bedroom-design-ideas.jpg' },
  { id: 'minimal', name: 'Minimal', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGmkx2Umg4LvSkn2y12K_ClQgk6W_F02SzhA&s' },
  { id: 'classic', name: 'Classic', image: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2024/07/Expert-decorating-for-a-small-living-room-by-Decorilla-scaled.jpg' },
  { id: 'industrial', name: 'Industrial', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi99CET2SA2Q6sLsTEs2VnGqZflaIhtcujAA&s' },
  { id: 'traditional', name: 'Traditional', image: 'https://eastwood.nyc3.cdn.digitaloceanspaces.com/blogs/EWH%20-%20Outdoor%20Living%20Space%20Image%201.jpeg' },
];

  const styles = [
    { 
      id: 'modern', 
      name: 'Modern',
      samples: [
        { id: 1, description: 'Modern Living Room with Clean Lines' },
        { id: 2, description: 'Contemporary Kitchen Design' },
        { id: 3, description: 'Sleek Modern Bedroom' },
        { id: 4, description: 'Minimalist Modern Office' },
        { id: 5, description: 'Open Concept Modern Space' },
        { id: 6, description: 'Modern Dining Area' }
      ]
    },
    { 
      id: 'classic', 
      name: 'Classic',
      samples: [
        { id: 1, description: 'Traditional Living Room' },
        { id: 2, description: 'Classic Elegant Bedroom' },
        { id: 3, description: 'Timeless Kitchen Design' },
        { id: 4, description: 'Classic Study Room' },
        { id: 5, description: 'Traditional Dining Room' },
        { id: 6, description: 'Classic Bathroom Design' }
      ]
    },
    { 
      id: 'minimal', 
      name: 'Minimal',
      samples: [
        { id: 1, description: 'Minimal Living Space' },
        { id: 2, description: 'Clean Minimal Kitchen' },
        { id: 3, description: 'Serene Minimal Bedroom' },
        { id: 4, description: 'Minimal Work Space' },
        { id: 5, description: 'Minimal Dining Area' },
        { id: 6, description: 'Zen Minimal Bathroom' }
      ]
    },
    { 
      id: 'industrial', 
      name: 'Industrial',
      samples: [
        { id: 1, description: 'Industrial Loft Living' },
        { id: 2, description: 'Industrial Kitchen Design' },
        { id: 3, description: 'Industrial Bedroom Style' },
        { id: 4, description: 'Industrial Office Space' },
        { id: 5, description: 'Industrial Dining Room' },
        { id: 6, description: 'Industrial Bathroom' }
      ]
    }
  ];

  const updateRoomCount = (roomId, delta) => {
    setSelectedRooms(prev => ({
      ...prev,
      [roomId]: Math.max(0, (prev[roomId] || 0) + delta)
    }));
  };

  const toggleStyle = (styleId) => {
    setSelectedStyles(prev => 
      prev.includes(styleId) 
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const isStyleSelected = (styleId) => {
    return selectedStyles.includes(styleId);
  };

  const getActiveStyle = () => {
    return styles.find(style => style.id === activeStyleTab);
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Step {currentStep > 5 ? 5 : currentStep} of 5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(Math.min(currentStep, 5) / 5) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderRoomSelection = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">What room are we designing?</h2>
      <p className="text-gray-600 mb-8">Select the room you'd like to redesign. You can always add more later.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square overflow-hidden">
              <img 
                src={room.image} 
                alt={room.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{room.name}</h3>
              <div className="flex items-center justify-center space-x-3">
                <button 
                  onClick={() => updateRoomCount(room.id, -1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-medium">{selectedRooms[room.id] || 0}</span>
                <button 
                  onClick={() => updateRoomCount(room.id, 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBudgetSelection = () => (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">What's your budget?</h2>
      <p className="text-gray-600 mb-8">This helps us match you with the right designers.</p>
      
      <div className="mb-8">
        <label className="block text-left text-gray-700 font-medium mb-4">Budget</label>
        <div className="relative">
          <input
            type="range"
            min="10"
            max="100"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>$10k</span>
            <span>$100k+</span>
          </div>
        </div>
        <div className="mt-4 text-2xl font-bold text-blue-600">
          ${budget}k{budget >= 100 ? '+' : ''}
        </div>
      </div>
    </div>
  );

 const renderStyleSelection = () => (
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">What's your style?</h2>
    <p className="text-gray-600 mb-8">
      Select the style that best represents your vision for the space. 
      You can choose multiple styles if you're drawn to more than one.
    </p>

    {/* Grid of Style Options */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {styleOptions.map((style) => (
        <div
          key={style.id}
          className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group transition-all ${
            isStyleSelected(style.id) ? 'ring-4 ring-blue-500' : 'hover:shadow-xl'
          }`}
          onClick={() => toggleStyle(style.id)}
        >
          {/* Style Image */}
          <div className="aspect-[4/3] w-full h-full overflow-hidden">
            <img
              src={style.image}
              alt={style.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Overlay when selected */}
          {isStyleSelected(style.id) && (
            <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex items-center justify-center">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                ✓
              </div>
            </div>
          )}

          {/* Removed style name label */}
        </div>
      ))}
    </div>

    {/* Selected Styles Summary - Simplified */}
    {selectedStyles.length > 0 && (
      <div className="mt-8 p-4">
        <p className="text-gray-600">
          {selectedStyles.length} style{selectedStyles.length !== 1 ? 's' : ''} selected
        </p>
      </div>
    )}
  </div>
);

  const renderProjectBrief = () => (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Please provide us with your project brief</h2>
      
      <div className="mb-8">
        <textarea
          value={projectBrief}
          onChange={(e) => setProjectBrief(e.target.value)}
          placeholder="Please describe any special requirements you have for your project."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag and drop your images here</h3>
        <p className="text-gray-600 mb-4">Or click to browse</p>
        <button className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium text-gray-700 transition-colors">
          Upload
        </button>
      </div>
    </div>
  );

  const designersData = [
    {
      id: 1,
      name: "Sophia Carter",
      location: "San Francisco, CA",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      description: "Specializes in modern and minimalist designs.",
      revisions: 2,
      delivery: "3-4 Days",
      rate: 100,
      portfolio: [
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      ],
    },
    {
      id: 2,
      name: "Liam Carter",
      location: "Los Angeles, CA",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      description: "Known for luxury and contemporary styles.",
      revisions: 3,
      delivery: "5-6 Days",
      rate: 150,
      portfolio: [
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      ],
    },
  ];

  const [currentImage, setCurrentImage] = useState({});

  const handleNext = (id, length) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? 1 : (prev[id] + 1) % length,
    }));
  };

  const handlePrev = (id, length) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? length - 1 : (prev[id] - 1 + length) % length,
    }));
  };

  const renderDesignerRecommendations = () => (
    <div className="max-w-7xl mx-auto ">
      <h1 className="text-3xl font-semibold mb-6">
        Your Personalized Designer for your dream's
      </h1>

      {/* Designers List */}
      <div className="space-y-8">
        {designersData.map((designer) => {
          const index = currentImage[designer.id] || 0;
          return (
            <div
              key={designer.id}
              className="grid md:grid-cols-2 gap-8 border rounded-xl shadow-md p-6 bg-white"
            >
              {/* Designer Info */}
              <div className="flex flex-col items-center md:items-start bg-gray-50 p-6 rounded-xl shadow-sm w-full md:w-[320px] space-y-4">
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="w-28 h-28 rounded-full object-cover"
                />
                <div className="text-center md:text-left space-y-1">
                  <h2 className="text-xl font-semibold">{designer.name}</h2>
                  <p className="text-sm text-gray-500">{designer.location}</p>
                  <p className="text-sm text-gray-700">{designer.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <RefreshCcw size={16} /> {designer.revisions} revisions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} /> {designer.delivery}
                  </span>
                </div>

                <p className="font-semibold text-gray-800">
                  Starting at ${designer.rate}/hr
                </p>

                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100">
                    View Portfolio
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700">
                    Hire Designer
                  </button>
                  <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100">
                    Contact
                  </button>
                </div>
              </div>

              {/* Portfolio Slider */}
              <div className="relative flex flex-col space-y-4">
                <div className="relative">
                  <img
                    src={designer.portfolio[index]}
                    alt="portfolio"
                    className="rounded-lg w-full h-80 object-cover"
                  />
                  <button
                    onClick={() => handlePrev(designer.id, designer.portfolio.length)}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={() => handleNext(designer.id, designer.portfolio.length)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                  >
                    <ChevronRight />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto">
                  {designer.portfolio.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="thumb"
                      onClick={() =>
                        setCurrentImage((prev) => ({ ...prev, [designer.id]: i }))
                      }
                      className={`w-20 h-16 object-cover rounded cursor-pointer ${
                        i === index
                          ? "ring-2 ring-purple-500"
                          : "hover:ring-1 hover:ring-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch(currentStep) {
      case 1: return renderRoomSelection();
      case 2: return renderBudgetSelection();
      case 3: return renderStyleSelection();
      case 4: return renderProjectBrief();
      case 5: return renderDesignerRecommendations();
      default: return renderRoomSelection();
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">{renderStepContent()}</div>
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          
          {currentStep < 5 && (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 bg-blue-500 text-white hover:bg-blue-600"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          )}
          
          {currentStep === 5 && (
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 bg-blue-500 text-white hover:bg-blue-700"
            >
              <span>Start New Search</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requirements;