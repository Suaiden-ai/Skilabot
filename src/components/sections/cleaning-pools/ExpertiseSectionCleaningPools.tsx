import { Users, Heart, Settings, Sparkles, TrendingUp, CheckCircle } from "lucide-react";

const ExpertiseSectionCleaningPools = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative">
            <div className="relative">
              {/* Circular Background */}
              <div className="w-96 h-96 mx-auto bg-gradient-to-br from-cyan-100 to-blue-200 rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop"
                  alt="Expert cleaning pool service"
                  className="w-80 h-80 object-cover object-center rounded-full mx-auto my-auto block"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
              {/* Floating Metric Cards */}
              {/* 97% Satisfaction */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-cyan-100 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">97%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
              {/* 85% Faster Service */}
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-green-100">
                <div className="text-xs text-gray-600 mb-2">Faster Service</div>
                <div className="text-green-600 font-semibold text-sm mb-2">+85%</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 3, 4, 6, 5, 7, 8].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-gradient-to-t from-green-400 to-cyan-400 rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              {/* 92% Job Completion */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-cyan-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">92%</div>
                    <div className="text-sm text-gray-600">Job Completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Main Title */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent w-full max-w-full block text-balance">Your Trusted Partner in Cleaning & Pool Services</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From regular maintenance to deep cleaning, our technology-driven platform is designed to deliver sparkling results and happy clients every time.
              </p>
            </div>
            {/* Feature List */}
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Expert Team Collaboration",
                  description: "Every feature is designed with cleaning and pool professionals to meet real-world needs."
                },
                {
                  title: "Listen & Engage With Clients",
                  description: "Natural conversations that feel human-like while maintaining automation efficiency."
                },
                {
                  title: "Higher Client Satisfaction",
                  description: "Tailored responses and integrations specific to cleaning and pool service requirements."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-cyan-100 hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed break-words text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Highlight Box */}
            <div className="p-4 md:p-6 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-2xl border border-cyan-200 backdrop-blur-sm w-full text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 break-words text-left">
                    You're not just hiring a service
                  </h3>
                  <p className="text-gray-700 text-xs md:text-base leading-relaxed break-words text-left">
                    You're getting a digital assistant trained with intelligence and perfected with care for your property.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSectionCleaningPools; 