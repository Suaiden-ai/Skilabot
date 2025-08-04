import { Users, Heart, Sparkles, TrendingUp, CheckCircle, CalendarCheck2 } from "lucide-react";

const ExpertiseSectionDentistry = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-xs sm:max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-56 sm:w-80 md:w-96 h-56 sm:h-80 md:h-96 mx-auto bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center relative overflow-hidden max-w-full">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop"
                  alt="Dental Clinic illustration"
                  className="w-40 sm:w-60 md:w-72 h-40 sm:h-60 md:h-72 object-contain rounded-full mx-auto drop-shadow-lg max-w-full"
                />
              </div>
              {/* Floating Metric Cards - só no desktop */}
              <div className="hidden sm:block">
                <div className="absolute left-0 right-auto sm:-left-8 -top-4 bg-white rounded-2xl p-2 sm:p-4 shadow-xl border border-blue-100 animate-pulse max-w-[120px] sm:max-w-[160px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">+35%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Fewer Missed Appointments</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-2 sm:p-4 shadow-xl border border-green-100">
                  <div className="text-xs text-gray-600 mb-1 sm:mb-2">Patient Satisfaction</div>
                  <div className="text-green-600 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">+97%</div>
                  <div className="flex items-end gap-0.5 sm:gap-1 h-6 sm:h-8">
                    {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                      <div 
                        key={index}
                        className="w-1.5 sm:w-2 bg-gradient-to-t from-green-400 to-blue-500 rounded-sm"
                        style={{ height: `${height * 2.5}px` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-2 sm:p-4 shadow-xl border border-blue-100">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">99%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Automated Reminders</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 break-words leading-tight w-full max-w-full text-left">
                <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Your AI Partner for Dental Clinics</span>
              </h2>
              <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From reducing missed appointments to automating patient follow-up, our AI-driven platform is designed to optimize results and satisfaction for dental clinics.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-4 w-full text-left">
              {[
                {
                  title: "Automated Appointment Reminders",
                  description: "Reduce missed appointments with personalized WhatsApp reminders and dynamic waiting lists."
                },
                {
                  title: "Integration with Dental Records",
                  description: "Centralize patient data, treatments, and history for more efficient care."
                },
                {
                  title: "Treatment Progress Tracking",
                  description: "Patients send follow-up photos and the AI organizes them in a visual timeline for better results."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-3 md:gap-4 py-3 sm:py-3 md:p-4 px-2 sm:px-2 md:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 w-full max-w-xs sm:max-w-md mx-auto">
                  <div className="w-7 h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-lg font-semibold text-gray-900 mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base md:text-sm leading-relaxed break-words text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-3 sm:py-4 px-2 sm:px-2 md:p-6 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-2xl border border-blue-200 backdrop-blur-sm w-full max-w-xs sm:max-w-md mx-auto mt-2 sm:mt-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 break-words text-left">
                    More than automation, real results
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words text-left">
                    Our AI empowers your dental clinic to deliver better experiences, optimize processes, and increase patient loyalty.
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

export default ExpertiseSectionDentistry; 