import { CheckCircle } from "lucide-react";

const ExpertiseSectionBeauty = () => {
  return (
    <section className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-80 sm:w-96 h-80 sm:h-96 mx-auto bg-[#F1F3F4] rounded-full flex items-center justify-center relative overflow-hidden max-w-full">
                <img 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=600&fit=crop"
                  alt="Beauty salon illustration"
                  className="w-60 sm:w-72 h-60 sm:h-72 object-contain rounded-full mx-auto drop-shadow-lg max-w-full"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute left-0 right-auto sm:-left-8 -top-4 bg-white rounded-2xl p-4 shadow-xl border border-[#343A40] animate-pulse max-w-[160px] w-full sm:w-auto" style={{maxWidth:'90vw'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#343A40] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold" style={{ color: '#343A40' }}>+97%</div>
                    <div className="text-sm" style={{ color: '#18181B' }}>Client Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[#FFD700]">
                <div className="text-xs mb-2" style={{ color: '#18181B' }}>Appointments Filled</div>
                <div className="font-semibold text-sm mb-2" style={{ color: '#FFD700' }}>+95%</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 rounded-sm"
                      style={{ height: `${height * 4}px`, background: '#FFD700' }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#18181B]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#18181B] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold" style={{ color: '#18181B' }}>4.9/5</div>
                    <div className="text-sm" style={{ color: '#343A40' }}>Service Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left" style={{ color: '#343A40' }}>
                Expertise for Beauty Salons & Barber Shops
              </h2>
              <p className="text-base md:text-lg mb-6 md:mb-8 break-words w-full max-w-full text-left" style={{ color: '#18181B' }}>
                From personalized client care to seamless appointment management, our platform empowers beauty professionals to deliver exceptional experiences and grow their business.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Seamless Appointment Scheduling",
                  description: "Manage bookings, cancellations, and reminders effortlessly with real-time updates."
                },
                {
                  title: "Client Loyalty & Feedback",
                  description: "Boost retention with loyalty programs and collect feedback to improve your services."
                },
                {
                  title: "Business Insights & Automation",
                  description: "Track performance, automate marketing, and optimize staff schedules for maximum efficiency."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-pink-100 hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#343A40] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
            <div className="p-4 md:p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-pink-100 w-full text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#343A40] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75A5.25 5.25 0 0121.75 9c0 7.25-9.25 11.25-9.25 11.25S3.25 16.25 3.25 9A5.25 5.25 0 0116.5 3.75z" /></svg>
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 break-words text-left">
                    More than automation, real results
                  </h3>
                  <p className="text-gray-600 text-xs md:text-base leading-relaxed break-words text-left">
                    Our AI empowers your beauty business to deliver better experiences, optimize processes, and increase client loyalty.
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

export default ExpertiseSectionBeauty; 