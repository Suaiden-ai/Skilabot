import { CheckCircle } from "lucide-react";

const ExpertiseSectionProfessional = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative">
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-[#F1F3F4] rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop"
                  alt="Professional services illustration"
                  className="w-72 h-72 object-contain rounded-full mx-auto drop-shadow-lg"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-[#0D47A1] animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0D47A1] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold" style={{ color: '#0D47A1' }}>98%</div>
                    <div className="text-sm" style={{ color: '#23272F' }}>Client Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[#43A047]">
                <div className="text-xs mb-2" style={{ color: '#23272F' }}>Projects Managed</div>
                <div className="font-semibold text-sm mb-2" style={{ color: '#43A047' }}>3,000+</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 rounded-sm"
                      style={{ height: `${height * 4}px`, background: '#43A047' }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#23272F]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#23272F] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold" style={{ color: '#23272F' }}>4.9/5</div>
                    <div className="text-sm" style={{ color: '#0D47A1' }}>Service Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left" style={{ color: '#0D47A1' }}>
                Expertise for Professional Services
              </h2>
              <p className="text-base md:text-lg mb-6 md:mb-8 break-words w-full max-w-full text-left" style={{ color: '#23272F' }}>
                From secure document management to automated scheduling and analytics, our platform empowers professionals to deliver exceptional service and grow their business.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Seamless Scheduling & Reminders",
                  description: "Manage appointments, meetings, and deadlines effortlessly with real-time updates."
                },
                {
                  title: "Secure Document Management",
                  description: "Store, share, and access contracts and files securely from anywhere."
                },
                {
                  title: "Business Insights & Automation",
                  description: "Track performance, automate workflows, and access analytics for smarter decisions."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-900 via-green-400 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSectionProfessional; 