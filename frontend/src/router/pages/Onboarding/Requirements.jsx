import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Upload, Plus, Minus, Clock, RefreshCcw } from 'lucide-react';

const Requirements = () => {
  const [currentStep, setCurrentStep] = useState(2); // Start on budget step for testing
  const [selectedRooms, setSelectedRooms] = useState({});
  const [budgetRange, setBudgetRange] = useState({ min: 20, max: 80 });
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

  // Improved Two-Pointer Range Slider Component
  const SmoothRangeSlider = ({ min, max, values, onChange, step = 1, formatValue = (v) => v }) => {
    const [isDragging, setIsDragging] = useState({ min: false, max: false });
    const sliderRef = useRef(null);

    const getPercentage = (value) => ((value - min) / (max - min)) * 100;

    const handleMouseDown = (type) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(prev => ({ ...prev, [type]: true }));
    };

    const handleTouchStart = (type) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(prev => ({ ...prev, [type]: true }));
    };

    const getValueFromPosition = useCallback((clientX) => {
      if (!sliderRef.current) return values[0];
      
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const rawValue = min + (percentage / 100) * (max - min);
      return Math.round(rawValue / step) * step;
    }, [min, max, step, values]);

    const handleMove = useCallback((clientX) => {
      if (!isDragging.min && !isDragging.max) return;
      
      const newValue = getValueFromPosition(clientX);

      if (isDragging.min) {
        const newMin = Math.max(min, Math.min(newValue, values[1] - step));
        onChange([newMin, values[1]]);
      } else if (isDragging.max) {
        const newMax = Math.min(max, Math.max(newValue, values[0] + step));
        onChange([values[0], newMax]);
      }
    }, [isDragging, getValueFromPosition, min, max, step, values, onChange]);

    const handleMouseMove = useCallback((e) => {
      handleMove(e.clientX);
    }, [handleMove]);

    const handleTouchMove = useCallback((e) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    }, [handleMove]);

    const handleEnd = useCallback(() => {
      setIsDragging({ min: false, max: false });
    }, []);

    React.useEffect(() => {
      if (isDragging.min || isDragging.max) {
        const handleMouseMoveGlobal = (e) => handleMouseMove(e);
        const handleTouchMoveGlobal = (e) => handleTouchMove(e);
        const handleMouseUpGlobal = () => handleEnd();
        const handleTouchEndGlobal = () => handleEnd();

        document.addEventListener('mousemove', handleMouseMoveGlobal);
        document.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
        document.addEventListener('mouseup', handleMouseUpGlobal);
        document.addEventListener('touchend', handleTouchEndGlobal);

        return () => {
          document.removeEventListener('mousemove', handleMouseMoveGlobal);
          document.removeEventListener('touchmove', handleTouchMoveGlobal);
          document.removeEventListener('mouseup', handleMouseUpGlobal);
          document.removeEventListener('touchend', handleTouchEndGlobal);
        };
      }
    }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

    const handleTrackClick = (e) => {
      if (isDragging.min || isDragging.max) return;
      
      const newValue = getValueFromPosition(e.clientX);
      const midpoint = (values[0] + values[1]) / 2;
      
      if (newValue < midpoint) {
        const newMin = Math.max(min, Math.min(newValue, values[1] - step));
        onChange([newMin, values[1]]);
      } else {
        const newMax = Math.min(max, Math.max(newValue, values[0] + step));
        onChange([values[0], newMax]);
      }
    };

    return (
      <div className="relative w-full py-4">
        {/* Track */}
        <div 
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-lg cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* Active range */}
          <div
            className="absolute h-2 bg-blue-500 rounded-lg transition-all duration-150 ease-out"
            style={{
              left: `${getPercentage(values[0])}%`,
              width: `${getPercentage(values[1]) - getPercentage(values[0])}%`,
            }}
          />
          
          {/* Min thumb */}
          <div
            className={`absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-y-2 transition-all duration-150 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isDragging.min ? 'scale-125 shadow-xl border-blue-600' : ''
            }`}
            style={{
              left: `calc(${getPercentage(values[0])}% - 12px)`,
              zIndex: isDragging.min ? 10 : 5
            }}
            onMouseDown={handleMouseDown('min')}
            onTouchStart={handleTouchStart('min')}
            tabIndex={0}
            role="slider"
            aria-valuenow={values[0]}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label="Minimum budget"
          />
          
          {/* Max thumb */}
          <div
            className={`absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-y-2 transition-all duration-150 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isDragging.max ? 'scale-125 shadow-xl border-blue-600' : ''
            }`}
            style={{
              left: `calc(${getPercentage(values[1])}% - 12px)`,
              zIndex: isDragging.max ? 10 : 5
            }}
            onMouseDown={handleMouseDown('max')}
            onTouchStart={handleTouchStart('max')}
            tabIndex={0}
            role="slider"
            aria-valuenow={values[1]}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label="Maximum budget"
          />
        </div>

        {/* Value labels */}
        <div className="flex justify-between mt-6 text-sm text-gray-500">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>

        {/* Current values tooltip-style display */}
        <div className="flex justify-center mt-4 space-x-6">
          <div className="text-center">
            <div 
              className={`inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium transition-all duration-200 ${
                isDragging.min ? 'bg-blue-200 scale-105' : ''
              }`}
            >
              {formatValue(values[0])}
            </div>
          </div>
          <div className="text-center">
            <div 
              className={`inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium transition-all duration-200 ${
                isDragging.max ? 'bg-blue-200 scale-105' : ''
              }`}
            >
              {formatValue(values[1])}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBudgetSelection = () => (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">What's your budget range?</h2>
      <p className="text-gray-600 mb-8">This helps us match you with the right designers within your budget.</p>
      
      <div className="mb-8 bg-gray-50 p-8 rounded-2xl">
        {/* Improved Range Slider */}
        <div className="mb-8">
          <SmoothRangeSlider
            min={10}
            max={100}
            values={[budgetRange.min, budgetRange.max]}
            onChange={([min, max]) => setBudgetRange({ min, max })}
            step={5}
            formatValue={(value) => `$${value}k${value >= 100 ? '+' : ''}`}
          />
        </div>

        {/* Budget Values Display */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-1">Minimum</div>
            <div className="text-2xl font-bold text-blue-600">
              ${budgetRange.min}k{budgetRange.min >= 100 ? '+' : ''}
            </div>
          </div>
          <div className="text-gray-400 text-xl">-</div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-1">Maximum</div>
            <div className="text-2xl font-bold text-blue-600">
              ${budgetRange.max}k{budgetRange.max >= 100 ? '+' : ''}
            </div>
          </div>
        </div>

        {/* Budget Range Summary */}
        <div className="p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Budget Range</h3>
          <div className="text-2xl font-bold text-blue-600">
            ${budgetRange.min}k - ${budgetRange.max}k{budgetRange.max >= 100 ? '+' : ''}
          </div>
          <p className="text-gray-600 mt-2">
            We'll match you with designers who can work within this range.
          </p>
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