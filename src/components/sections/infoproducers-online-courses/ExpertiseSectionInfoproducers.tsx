import { Users, BarChart, Sparkles, TrendingUp, CheckCircle, Zap } from "lucide-react";

const ExpertiseSectionInfoproducers = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-80 sm:w-96 h-80 sm:h-96 mx-auto bg-[#E3E6F0] rounded-full flex items-center justify-center relative overflow-hidden max-w-full">
                <img 
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&h=600&fit=crop&crop=center"
                  alt="Online course illustration"
                  className="w-60 sm:w-72 h-60 sm:h-72 object-contain rounded-full mx-auto drop-shadow-lg max-w-full"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute left-0 right-auto sm:-left-8 -top-4 bg-white rounded-2xl p-4 shadow-xl border border-[#E3E6F0] animate-pulse max-w-[160px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#9575CD] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#512DA8]">+50%</div>
                    <div className="text-sm text-[#23272F]">More sales conversion</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[#E3E6F0]">
                <div className="text-xs text-[#23272F] mb-2">Student Satisfaction</div>
                <div className="text-[#FFC107] font-semibold text-sm mb-2">+96%</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-[#9575CD] rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#E3E6F0]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#9575CD] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#512DA8]">99%</div>
                    <div className="text-sm text-[#23272F]">Automated follow-up</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left text-[#512DA8]">
                AI for Infoproducts: More Sales, More Engagement
              </h2>
              <p className="text-base md:text-lg text-[#23272F] mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From automating lead nurturing to boosting student engagement, our AI-driven platform is designed to maximize results for online course creators and infoproducers.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Automated Sales Funnels",
                  description: "Convert more leads with AI-powered follow-ups and personalized offers."
                },
                {
                  title: "Integration with LMS & Payments",
                  description: "Centralize student data, sales, and course progress for efficient management."
                },
                {
                  title: "Student Engagement Tracking",
                  description: "Monitor student activity and satisfaction with real-time analytics."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#E3E6F0] hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#9575CD] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#512DA8] mb-1 break-words text-left">
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
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#9575CD] rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-[#512DA8] mb-2 break-words text-left">
                    More than automation, real results
                  </h3>
                  <p className="text-[#23272F] text-xs md:text-base leading-relaxed break-words text-left">
                    Our AI empowers your business to deliver better experiences, optimize processes, and increase sales and student retention.
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

export default ExpertiseSectionInfoproducers; 