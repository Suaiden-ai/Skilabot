import { Users, GraduationCap, Sparkles, TrendingUp, CheckCircle, CalendarCheck2 } from "lucide-react";

const ExpertiseSectionSchoolsTechnicalCourses = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative">
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-[#E3E6F0] rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&h=600&fit=crop&crop=center"
                  alt="Technical School illustration"
                  className="w-72 h-72 object-contain rounded-full mx-auto drop-shadow-lg"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-[#E3E6F0] animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1976D2] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1A237E]">+40%</div>
                    <div className="text-sm text-[#23272F]">Higher Student Engagement</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[#E3E6F0]">
                <div className="text-xs text-[#23272F] mb-2">Course Completion Rate</div>
                <div className="text-[#FFC107] font-semibold text-sm mb-2">+95%</div>
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
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#E3E6F0]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1976D2] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1A237E]">98%</div>
                    <div className="text-sm text-[#23272F]">Automated Reminders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left text-[#1A237E]">
                AI for Technical Schools: More Efficiency, More Results
              </h2>
              <p className="text-base md:text-lg text-[#23272F] mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From automating class scheduling to tracking student progress, our AI-driven platform is designed to optimize operations and boost student success in technical and professional schools.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Automated Class Reminders",
                  description: "Reduce absences with personalized WhatsApp reminders and dynamic class lists."
                },
                {
                  title: "Integration with EdTech Platforms",
                  description: "Centralize student data, grades, and attendance for more efficient management."
                },
                {
                  title: "Student Progress Tracking",
                  description: "Monitor student performance and engagement with real-time analytics."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#E3E6F0] hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#1976D2] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#1A237E] mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-[#23272F] text-xs md:text-sm leading-relaxed break-words text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-6 bg-white rounded-2xl border border-[#E3E6F0] w-full text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1976D2] rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-[#1A237E] mb-2 break-words text-left">
                    More than automation, real student success
                  </h3>
                  <p className="text-[#23272F] text-xs md:text-base leading-relaxed break-words text-left">
                    Our AI empowers your school to deliver better experiences, optimize processes, and increase student retention and graduation rates.
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

export default ExpertiseSectionSchoolsTechnicalCourses; 