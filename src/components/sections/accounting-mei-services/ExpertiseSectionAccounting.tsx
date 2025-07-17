import { CheckCircle } from "lucide-react";

const ExpertiseSectionAccounting = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative">
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-gradient-to-br from-blue-100 via-green-100 to-gray-100 rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?w=600&h=600&fit=crop"
                  alt="Accounting illustration"
                  className="w-72 h-72 object-contain rounded-full mx-auto drop-shadow-lg"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-blue-100 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">99.5%</div>
                    <div className="text-sm text-gray-600">Compliance Rate</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-green-100">
                <div className="text-xs text-gray-600 mb-2">Tax Filings Automated</div>
                <div className="text-green-600 font-semibold text-sm mb-2">1,200+</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-gradient-to-t from-green-400 to-blue-400 rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-blue-400 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">Service Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left">
                <span className="bg-gradient-to-r from-blue-400 via-green-400 to-gray-400 bg-clip-text text-transparent w-full max-w-full block text-balance">Expertise for MEI Accounting Services</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From automated tax filings to real-time compliance tracking, our platform empowers accountants and MEI entrepreneurs to simplify processes and focus on business growth.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Automated Tax Compliance",
                  description: "Generate, file, and track all MEI tax obligations with ease and accuracy."
                },
                {
                  title: "Personalized Client Support",
                  description: "Deliver proactive guidance, reminders, and feedback collection for every client."
                },
                {
                  title: "Business Insights & Automation",
                  description: "Monitor compliance, automate repetitive tasks, and access analytics for smarter decisions."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 via-green-400 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSectionAccounting; 