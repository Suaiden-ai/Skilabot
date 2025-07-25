import { Users, BarChart2, Sparkles, TrendingUp, CheckCircle, CalendarCheck2, ShieldCheck } from "lucide-react";

const ExpertiseSectionHealthcare = () => {
  return (
    <section className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-[#90CAF9] rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd23?w=600&h=600&fit=crop"
                  alt="Healthcare illustration"
                  className="w-72 h-72 object-contain rounded-full mx-auto drop-shadow-lg"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-[#90CAF9] animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#43A047] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1565C0]">+98%</div>
                    <div className="text-sm text-[#23272F]">Patient Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[#90CAF9]">
                <div className="text-xs text-[#23272F] mb-2">Appointment Booking</div>
                <div className="text-[#43A047] font-semibold text-sm mb-2">+75%</div>
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
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#90CAF9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#43A047] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1565C0]">99%</div>
                    <div className="text-sm text-[#23272F]">Data Security</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left text-[#1565C0]">
                Your AI Partner for Healthcare Professionals
              </h2>
              <p className="text-base md:text-lg text-[#23272F] mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From patient engagement to secure data management, our AI-driven platform is designed to optimize workflows and elevate care for healthcare professionals.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Automated Patient Communication",
                  description: "Send appointment reminders, follow-ups, and health tips automatically to keep patients engaged."
                },
                {
                  title: "Secure Data & Compliance",
                  description: "All patient data is encrypted and managed according to healthcare regulations (HIPAA, LGPD, GDPR)."
                },
                {
                  title: "Real-Time Analytics & Insights",
                  description: "Track patient flow, satisfaction, and operational efficiency with real-time dashboards."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#90CAF9] hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#43A047] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#1565C0] mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-[#23272F] text-xs md:text-sm leading-relaxed break-words text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Bloco de destaque */}
            <div className="p-4 md:p-6 bg-white rounded-2xl border border-[#90CAF9] w-full text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#43A047] rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-[#1565C0] mb-2 break-words text-left">
                    More than automation, real patient care
                  </h3>
                  <p className="text-[#23272F] text-xs md:text-base leading-relaxed break-words text-left">
                    Our AI empowers your practice to deliver better care, streamline operations, and improve patient outcomes with measurable results.
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

export default ExpertiseSectionHealthcare; 