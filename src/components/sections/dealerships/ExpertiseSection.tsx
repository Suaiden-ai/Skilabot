import { Users, Heart, Settings, Sparkles, TrendingUp, CheckCircle } from "lucide-react";

const ExpertiseSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      {/* Background Effects */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(251,146,60,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.1),transparent_50%)]"></div> */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Badge */}
        {/* <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 mb-6">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">ABOUT</span>
          </div>
        </div> */}

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full flex justify-center overflow-visible">
            <img 
              src="Imagens/dealerships-expertisesection.png"
              alt="Industry expert working with automotive dealership technology"
              className="w-[38rem] h-[38rem] object-contain mx-auto drop-shadow-lg"
            />
            {/* Floating Metric Cards */}
            <div className="absolute left-0 right-auto sm:-left-4 top-40 bg-white rounded-2xl p-2 shadow-xl border border-[#22306e] animate-pulse max-w-[110px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#22306e] rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#23272F]">95%</div>
                  <div className="text-sm text-[#343A40]">Engagement</div>
                </div>
              </div>
            </div>
            <div className="absolute left-0 right-auto sm:left-[28rem] top-12 bg-white rounded-2xl p-2 shadow-xl border border-[#FFC107] max-w-[110px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
              <div className="text-xs text-[#343A40] mb-2">Increase Sales</div>
              <div className="text-[#FFC107] font-semibold text-sm mb-2">+65.4%</div>
              <div className="flex items-end gap-1 h-8">
                {[2, 3, 4, 6, 5, 7, 8].map((height, index) => (
                  <div 
                    key={index}
                    className="w-2 bg-[#22306e] rounded-sm"
                    style={{ height: `${height * 4}px` }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute left-0 right-auto sm:left-20 -bottom-2 bg-white rounded-2xl p-2 shadow-xl border border-[#22306e] animate-pulse max-w-[110px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#22306e] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#23272F]">87%</div>
                  <div className="text-sm text-[#343A40]">Sales Growth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Main Title */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left text-[#23272F]">
                Your Trusted Partner in Automotive AI for Over 15 Years
              </h2>
              <p className="text-base md:text-lg text-[#343A40] mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From lead generation to customer engagement, our AI-driven platform is designed to accelerate your success in the automotive industry.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Human Expert Collaboration",
                  description: "Every feature designed with industry professionals who understand real business needs"
                },
                {
                  title: "Listen & Engage With Customers",
                  description: "Natural conversations that feel human-like while maintaining automation efficiency"
                },
                {
                  title: "Higher Customer Satisfaction",
                  description: "Tailored responses and integrations specific to automotive business requirements"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#E3E6F0] hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#22306e] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#23272F] mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-[#343A40] text-xs md:text-sm leading-relaxed break-words text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-6 bg-white rounded-2xl border border-[#E3E6F0] w-full text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#22306e] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-[#23272F] mb-2 break-words text-left">
                    You're not just hiring an AI
                  </h3>
                  <p className="text-[#343A40] text-xs md:text-base leading-relaxed break-words text-left">
                    You're getting a digital assistant trained with intelligence and perfected with humanity.
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

export default ExpertiseSection;
