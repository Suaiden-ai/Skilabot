import { CheckCircle } from "lucide-react";

const ExpertiseSectionCondominiums = () => {
  return (
    <section className="py-24 bg-[#F8F9FA] relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-[#F1F3F4] rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop"
                  alt="Condominium management illustration"
                  className="w-72 h-72 object-contain rounded-full mx-auto drop-shadow-lg"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-[#D1D5DB] animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#343A40] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#23272F]">97%</div>
                    <div className="text-sm text-[#23272F]">Resident Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[#D1D5DB]">
                <div className="text-xs text-[#343A40] mb-2">Units Managed</div>
                <div className="text-[#343A40] font-semibold text-sm mb-2">1,500+</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-[#343A40] rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#D1D5DB]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D1D5DB] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#23272F]">4.9/5</div>
                    <div className="text-sm text-[#23272F]">Service Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left">
                <span className="text-[#343A40] w-full max-w-full block text-balance">Expertise for Condominium Administrators</span>
              </h2>
              <p className="text-base md:text-lg text-[#343A40] mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From centralized communication to automated bookings and analytics, our platform empowers administrators to deliver efficient, transparent, and resident-focused management.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Seamless Facility Booking",
                  description: "Manage bookings for common areas, amenities, and meetings with real-time updates."
                },
                {
                  title: "Resident Engagement & Support",
                  description: "Boost satisfaction with instant communication, feedback collection, and multi-channel support."
                },
                {
                  title: "Building Insights & Automation",
                  description: "Track occupancy, automate tasks, and access analytics for smarter decisions."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-[#F1F3F4] rounded-xl border border-[#343A40] hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#343A40] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#23272F] mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-[#343A40] text-xs md:text-sm leading-relaxed break-words text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSectionCondominiums; 