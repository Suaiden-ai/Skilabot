import { Users, Heart, Dumbbell, Sparkles, TrendingUp, CheckCircle, CalendarCheck2 } from "lucide-react";

const ExpertiseSectionGym = () => {
  return (
    <section className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              {/* Removido o gradiente de fundo */}
              <div className="w-96 sm:w-[32rem] h-96 sm:h-[32rem] mx-auto flex items-center justify-center relative overflow-visible max-w-full">
                <img 
                  src="Imagens/gym-expertisesection.png"
                  alt="Fitness illustration"
                  className="w-96 sm:w-[32rem] h-96 sm:h-[32rem] object-contain mx-auto drop-shadow-lg max-w-full"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute left-0 right-auto sm:-left-8 -top-4 bg-white rounded-2xl p-4 shadow-xl border border-green-100 animate-pulse max-w-[160px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">92%</div>
                    <div className="text-sm text-gray-600">Retention</div>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 left-auto sm:-right-4 -top-8 bg-white rounded-2xl p-4 shadow-xl border border-blue-100 max-w-[140px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                <div className="text-xs text-gray-600 mb-2">Class Attendance</div>
                <div className="text-blue-600 font-semibold text-sm mb-2">+78%</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-gradient-to-t from-blue-400 to-green-500 rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute left-0 right-auto sm:-left-4 -bottom-4 bg-white rounded-2xl p-4 shadow-xl border border-green-100 animate-pulse max-w-[160px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">85%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8 w-full max-w-md mx-auto">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left">
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent w-full max-w-full block text-balance">Your Fitness Partner in AI for Gyms & Personal Trainers</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From personalized training to member retention, our AI-driven platform is designed to boost results and engagement in the fitness industry.
              </p>
            </div>
            <div className="space-y-4 w-full px-0 sm:px-2">
              {[
                {
                  title: "Personalized Training Automation",
                  description: "Create and manage custom workout plans for each member, automatically adjusted by AI."
                },
                {
                  title: "Member Retention & Motivation",
                  description: "Automated reminders, motivational messages and progress tracking to keep members engaged."
                },
                {
                  title: "Class & Appointment Scheduling",
                  description: "Seamless scheduling and reminders for classes, PT sessions and assessments."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 py-3 px-2 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300 w-full max-w-xs sm:max-w-md mx-auto">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
            <div className="py-4 px-2 sm:p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl border border-green-200 backdrop-blur-sm w-full max-w-xs sm:max-w-md mx-auto mt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 break-words text-left">
                    You're not just hiring an AI
                  </h3>
                  <p className="text-gray-700 text-xs md:text-base leading-relaxed break-words text-left">
                    You're getting a digital assistant that motivates, organizes and helps your members achieve their best results.
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

export default ExpertiseSectionGym; 