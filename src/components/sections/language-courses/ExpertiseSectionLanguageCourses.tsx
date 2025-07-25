import { Users, BookOpen, Sparkles, TrendingUp, CheckCircle, CalendarCheck2 } from "lucide-react";

const ExpertiseSectionLanguageCourses = () => {
  return (
    <section className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-[#E3E6F0] rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&h=600&fit=crop"
                  alt="Language School illustration"
                  className="w-72 h-72 object-contain rounded-full mx-auto drop-shadow-lg"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-4 shadow-xl animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1976D2] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-black">+30%</div>
                    <div className="text-sm text-[#343A40]">Fewer Missed Classes</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="text-xs text-[#343A40] mb-2">Student Satisfaction</div>
                <div className="text-[#1976D2] font-semibold text-sm mb-2">+96%</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-[#1976D2] rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1976D2] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-black">98%</div>
                    <div className="text-sm text-[#343A40]">Automated Reminders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left text-black">
                Your AI Partner for Language Schools
              </h2>
              <p className="text-base md:text-lg text-[#343A40] mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From reducing missed classes to automating student follow-up, our AI-driven platform is designed to optimize results and satisfaction for language schools.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Automated Class Reminders",
                  description: "Reduce missed classes with personalized WhatsApp reminders and dynamic waiting lists."
                },
                {
                  title: "Integration with EdTech Platforms",
                  description: "Centralize student data, courses, and progress for more efficient management."
                },
                {
                  title: "Progress Tracking",
                  description: "Students and teachers can track progress and feedback in a visual timeline."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#1A237E] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-black mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-[#343A40] text-xs md:text-sm leading-relaxed break-words text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-6 bg-white rounded-2xl shadow w-full text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1A237E] rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-black mb-2 break-words text-left">
                    More than automation, real results
                  </h3>
                  <p className="text-[#343A40] text-xs md:text-base leading-relaxed break-words text-left">
                    Our AI empowers your language school to deliver better experiences, optimize processes, and increase student loyalty.
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

export default ExpertiseSectionLanguageCourses; 