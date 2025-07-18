import { Users, Heart, Sparkles, TrendingUp, CheckCircle, CalendarCheck2 } from "lucide-react";

const ExpertiseSectionAesthetic = () => {
  return (
    <section className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-80 sm:w-96 h-80 sm:h-96 mx-auto bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center relative overflow-hidden max-w-full">
                <img 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=600&fit=crop"
                  alt="Aesthetic Clinic illustration"
                  className="w-60 sm:w-72 h-60 sm:h-72 object-contain rounded-full mx-auto drop-shadow-lg max-w-full"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute left-0 right-auto sm:-left-8 -top-4 bg-white rounded-2xl p-4 shadow-xl border border-pink-100 animate-pulse max-w-[160px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">+40%</div>
                    <div className="text-sm text-gray-600">Fewer No-Shows</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-rose-100">
                <div className="text-xs text-gray-600 mb-2">Client Satisfaction</div>
                <div className="text-rose-600 font-semibold text-sm mb-2">+95%</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-gradient-to-t from-rose-400 to-pink-500 rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-pink-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Automated Reminders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left">
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent w-full max-w-full block text-balance">Your AI Partner for Aesthetic Clinics</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From reducing no-shows to personalized promotions, our AI-driven platform is designed to boost results and client satisfaction for aesthetic clinics.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Automated Appointment Reminders",
                  description: "Reduce no-shows with personalized WhatsApp reminders and dynamic waiting lists."
                },
                {
                  title: "Personalized Promotions & Packages",
                  description: "AI analyzes client history and offers the right promotions and packages at the ideal moment."
                },
                {
                  title: "Treatment Progress Tracking",
                  description: "Clients send follow-up photos and the AI organizes them in a visual timeline for better results."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-pink-100 hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
            <div className="p-4 md:p-6 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-2xl border border-pink-200 backdrop-blur-sm w-full text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 break-words text-left">
                    More than automation, real results
                  </h3>
                  <p className="text-gray-700 text-xs md:text-base leading-relaxed break-words text-left">
                    Our AI empowers your clinic to deliver better experiences, optimize processes, and increase client loyalty.
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

export default ExpertiseSectionAesthetic; 