import { Users, Megaphone, TrendingUp, CheckCircle, Heart } from "lucide-react";

const ExpertiseSectionPolitical = () => {
  return (
    <section className="py-8 sm:py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full flex justify-center overflow-visible">
            <div className="w-[26rem] sm:w-[40rem] h-[26rem] sm:h-[40rem] flex items-center justify-center relative overflow-visible ml-[-2rem] sm:ml-[-6rem]">
              <img 
                src="Imagens/political-expertisesection.png"
                alt="Political Campaign illustration"
                className="w-[26rem] sm:w-[38rem] h-[26rem] sm:h-[38rem] object-contain mx-auto drop-shadow-lg"
              />
              {/* Floating Metric Cards - só no desktop */}
              <div className="hidden sm:block">
                <div className="absolute left-0 right-auto sm:left-24 top-20 bg-white rounded-2xl p-2 shadow-xl border border-[#183153] animate-pulse max-w-[110px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C62828] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-black">+300%</div>
                      <div className="text-sm text-black">More Engagement</div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 right-auto sm:left-[34rem] top-12 bg-white rounded-2xl p-2 shadow-xl border border-[#C62828] max-w-[110px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                  <div className="text-xs text-black mb-2">Voter Satisfaction</div>
                  <div className="text-[#C62828] font-semibold text-sm mb-2">+95%</div>
                  <div className="flex items-end gap-1 h-8">
                    {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                      <div 
                        key={index}
                        className="w-2 bg-[#C62828] rounded-sm"
                        style={{ height: `${height * 4}px` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute left-0 right-auto sm:left-40 -bottom-2 bg-white rounded-2xl p-2 shadow-xl border border-[#183153] animate-pulse max-w-[110px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#183153] rounded-lg flex items-center justify-center">
                      <Megaphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-black">99%</div>
                      <div className="text-sm text-black">Automated Replies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-6 sm:space-y-8 w-full max-w-xs sm:max-w-md mx-auto">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-5xl font-bold mb-4 sm:mb-6 break-words leading-tight w-full max-w-full text-left text-black">
                Your AI Partner for Political Agents
              </h2>
              <p className="text-base sm:text-base md:text-lg text-black mb-4 sm:mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From voter engagement to demand management, our AI-driven platform is designed to boost results and satisfaction for political agents and their teams.
              </p>
            </div>
            <div className="space-y-2 sm:space-y-4 w-full text-left">
              {[
                {
                  title: "Automated Voter Replies",
                  description: "Respond to voters instantly and empathetically, 24/7, on WhatsApp, Instagram and Facebook."
                },
                {
                  title: "Demand & Suggestion Management",
                  description: "Organize, categorize and prioritize suggestions, complaints and compliments from your base."
                },
                {
                  title: "Personalized Communication",
                  description: "Send segmented messages and keep your audience informed with relevant updates."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 bg-white rounded-xl border border-[#183153] hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-[#C62828] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-base md:text-lg font-semibold text-black mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-sm md:text-base text-black leading-relaxed break-words text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 sm:p-4 md:p-6 bg-white rounded-2xl border border-[#C62828] w-full text-left">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#183153] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-base md:text-xl font-bold text-black mb-2 break-words text-left">
                    More than automation, real results
                  </h3>
                  <p className="text-sm sm:text-base md:text-base text-black leading-relaxed break-words text-left">
                    Our AI empowers your team to deliver better service, optimize processes, and increase voter loyalty.
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

export default ExpertiseSectionPolitical; 