import { Star, ThumbsUp, ThumbsDown, User, Leaf, Sofa } from 'lucide-react';
import React from 'react';
export default function InteriorDesignerPortfolio() {
  const portfolioItems = [
  { 
    id: 1, 
    title: "Living Room", 
    image: "https://api.photon.aremedia.net.au/wp-content/uploads/sites/2/2023/09/Contemporary-Scandi-renovated-living-room.jpg?resize=1920%2C1440" 
  },
  { 
    id: 2, 
    title: "Bedroom", 
    image: "https://www.thespruce.com/thmb/YvYVWaG2oehCOF3CF2kq46Qv6OE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mindygayerlanedittoebedroomaccentwall-794746f31e2a4d41933f8e8f43359627.jpeg" 
  },
  { 
    id: 3, 
    title: "Office", 
    image: "https://media.istockphoto.com/id/1166245900/photo/work-from-home-office-with-twin-monitors-tablet-mouse-computor-hard-drives-on-white-painted.jpg?s=612x612&w=0&k=20&c=TqmE20FPmmSlH8c3npyhIxj6jOv4yHRY61uSO_3hycY=" 
  },
  { 
    id: 4, 
    title: "Dining Room", 
    image: "https://www.thespruce.com/thmb/ZqfUoFjPOAqtJBpzjDw-sxRdiNQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-dining-room-ideas-4147451-hero-d6333998f8b34620adfd4d99ac732586.jpg" 
  },
  { 
    id: 5, 
    title: "Kitchen", 
    image: "https://www.snimayhome.com/uploads/image/20200403/16/biarritz-kitchen-room.jpg" 
  },
  { 
    id: 6, 
    title: "Bathroom", 
    image: "https://www.bhg.com/thmb/ZkJd7GwTx9Nzv59jojOO2nb_uTo=/3002x0/filters:no_upscale():strip_icc()/Modern-gray-bathroom-Sch31478_Mid7007959_Bath_Overall_Alt_A_044_F99WsfKYKESB5ePvsgZbnt-c657786eec9e4c1bad575c6c558d6486.jpg" 
  }
];


  const reviews = [
    {
      id: 1,
      name: "Emma Carter",
      timeAgo: "1 month ago",
      rating: 5,
      text: "Sophia transformed my living room into a stunning and functional space. Her attention to detail and design expertise are unmatched.",
      likes: 2
    },
    {
      id: 2,
      name: "Ethan Miller",
      timeAgo: "2 months ago",
      rating: 4,
      text: "Sophia provided excellent design ideas and was very responsive to feedback. I'm thrilled with the final result.",
      likes: 1
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-blue-500 text-blue-500' : 'text-gray-300'}`}
      />
    ));
  };

  const ratingDistribution = [
    { stars: 5, percentage: 90 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-start space-x-4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/038/962/461/non_2x/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg"
            alt="Sophia Carter"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sophia Carter</h1>
            <p className="text-gray-600">Interior Designer</p>
            <p className="text-gray-500 text-sm">San Francisco, CA</p>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {renderStars(5)}
                <span className="ml-2 text-sm font-medium">4.8</span>
                <span className="ml-1 text-sm text-gray-500">(25 reviews)</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              $100/hr • 2 revisions, 4-week timeline
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Hire Designer
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Contact me
          </button>
        </div>
      </div>

      {/* Style Tags */}
      <div className="flex space-x-2 mb-8">
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Modern</span>
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Minimalist</span>
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Scandinavian</span>
      </div>

      {/* Portfolio Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <div key={item.id} className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-900">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
        <p className="text-gray-600 leading-relaxed">
          I'm a San Francisco-based interior designer specializing in modern and minimalist styles. With over 10 years of experience, I've helped clients create beautiful and functional spaces that reflect their unique personalities and lifestyles.
        </p>
      </div>

      {/* Services & Pricing Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Services & Pricing</h2>
        
        <div className="space-y-6">
          {/* Space Planning */}
          <div className="flex items-start space-x-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Space Planning</h3>
              <p className="text-gray-700 mb-2">Optimizing your space for functionality and flow</p>
              <p className="text-sm text-gray-600">
                Fixed fee starting at $1,000 | Estimated timeline: 2-4 weeks |<br />
                Revisions: 2
              </p>
            </div>
            <div className="w-64 h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Furniture Selection */}
          <div className="flex items-start space-x-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Furniture Selection</h3>
              <p className="text-gray-700 mb-2">Curated furniture pieces to match your style</p>
              <p className="text-sm text-gray-600">
                Hourly rate at $150/hour | Estimated timeline: 1-3 weeks |<br />
                Revisions: 1
              </p>
            </div>
            <div className="w-64 h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <Sofa className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
        
        {/* Rating Overview */}
        <div className="flex items-start space-x-8 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">4.8</div>
            <div className="flex items-center justify-center mt-1">
              {renderStars(5)}
            </div>
            <div className="text-sm text-gray-500 mt-1">25 reviews</div>
          </div>
          
          <div className="flex-1 space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 w-4">{item.stars}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{review.name}</span>
                    <span className="text-sm text-gray-500">{review.timeAgo}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 mb-3">{review.text}</p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}