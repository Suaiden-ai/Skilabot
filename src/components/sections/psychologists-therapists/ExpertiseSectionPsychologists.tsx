import { CheckCircle } from "lucide-react";

const ExpertiseSectionPsychologists = () => {
  return (
    <section className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-[#E9D8FD] rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=600&fit=crop"
                  alt="Therapy illustration"
                  className="w-72 h-72 object-contain rounded-full mx-auto drop-shadow-lg"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-[#E9D8FD] animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#60A5FA] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#7C3AED]">+99%</div>
                    <div className="text-sm text-[#23272F]">Client Confidentiality</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[#E9D8FD]">
                <div className="text-xs text-[#23272F] mb-2">Session Attendance</div>
                <div className="text-[#43A047] font-semibold text-sm mb-2">+95%</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-[#43A047] rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#E9D8FD]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#60A5FA] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#7C3AED]">98%</div>
                    <div className="text-sm text-[#23272F]">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left text-[#7C3AED]">
                Expertise for Psychologists & Therapists
              </h2>
              <p className="text-base md:text-lg text-[#23272F] mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From confidential communication to progress tracking, our platform is designed to support mental health professionals in delivering compassionate, effective care.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Confidential Client Messaging",
                  description: "Communicate securely with clients, ensuring privacy and trust in every interaction."
                },
                {
                  title: "Personalized Self-Care Guidance",
                  description: "Share tailored self-care tips and resources to support each client’s unique journey."
                },
                {
                  title: "Progress & Engagement Analytics",
                  description: "Monitor client progress, attendance, and engagement with real-time insights."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#E9D8FD] hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#7C3AED] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#7C3AED] mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-[#23272F] text-xs md:text-sm leading-relaxed break-words text-left">
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

export default ExpertiseSectionPsychologists; 