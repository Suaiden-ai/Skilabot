import { Users, Heart, Sparkles, TrendingUp, CheckCircle, ShoppingBag } from "lucide-react";

const ExpertiseSectionOnlineFashionFootwear = () => {
  return (
    <section className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-80 sm:w-96 h-80 sm:h-96 mx-auto bg-[#F5F3EE] rounded-full flex items-center justify-center relative overflow-hidden max-w-full">
                <img 
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=600&fit=crop"
                  alt="Online Fashion illustration"
                  className="w-60 sm:w-72 h-60 sm:h-72 object-contain rounded-full mx-auto drop-shadow-lg max-w-full"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute left-0 right-auto sm:-left-8 -top-4 bg-white rounded-2xl p-4 shadow-xl border border-[#F5F3EE] animate-pulse max-w-[160px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#18181B]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#18181B]">+42%</div>
                    <div className="text-sm text-[#23272F]">Increase in conversions</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[#F5F3EE]">
                <div className="text-xs text-[#23272F] mb-2">Customer satisfaction</div>
                <div className="text-[#FFD700] font-semibold text-sm mb-2">+95%</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-[#FFD700] rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#F5F3EE]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#18181B]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#18181B]">98%</div>
                    <div className="text-sm text-[#23272F]">Automated orders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left text-[#18181B]">
                Your smarter fashion store with AI
              </h2>
              <p className="text-base md:text-lg text-[#23272F] mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From outfit recommendations to personalized service, our AI-powered platform is designed to boost sales and delight customers in fashion and footwear retail.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Smart product recommendations",
                  description: "Automatic suggestions of clothing, shoes, and accessories based on the customer's profile and history."
                },
                {
                  title: "24/7 automated service",
                  description: "Answer questions, send news, and track orders with no human effort."
                },
                {
                  title: "Personalized shopping experience",
                  description: "Each customer receives offers, promotions, and content tailored to their style."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#F5F3EE] hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-[#18181B]" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#18181B] mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-[#23272F] text-xs md:text-sm leading-relaxed break-words text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-6 bg-white rounded-2xl border border-[#F5F3EE] w-full text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFD700] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-[#18181B]" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-[#18181B] mb-2 break-words text-left">
                    More than automation, real results in fashion
                  </h3>
                  <p className="text-[#23272F] text-xs md:text-base leading-relaxed break-words text-left">
                    Our AI empowers your store to sell more, delight customers, and create unique digital experiences.
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

export default ExpertiseSectionOnlineFashionFootwear; 