import { Receipt, FileText, BarChart2, Briefcase, Users, Heart } from "lucide-react";

const ExpertiseSectionAccounting = () => {
  return (
    <section className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-[#F1F3F4] rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?w=600&h=600&fit=crop"
                  alt="Accounting illustration"
                  className="w-72 h-72 object-contain rounded-full mx-auto drop-shadow-lg"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-[#D1D5DB] animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#23272F] rounded-lg flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#23272F]">99.5%</div>
                    <div className="text-sm text-[#343A40]">Accuracy Rate</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[#D1D5DB]">
                <div className="text-xs text-[#343A40] mb-2">Tax Filings Processed</div>
                <div className="font-semibold text-sm mb-2 text-[#23272F]">2,500+</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-[#23272F] rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#D1D5DB]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#343A40] rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#343A40]">4.9/5</div>
                    <div className="text-sm text-[#23272F]">Client Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left" style={{ color: '#1565C0' }}>
                Digital Accounting for Small Businesses
              </h2>
              <p className="text-base md:text-lg mb-6 md:mb-8 break-words w-full max-w-full text-left" style={{ color: '#23272F' }}>
                Automate your tax filings, get clear financial reports, and count on expert support to grow your business with confidence. Our platform simplifies accounting so you can focus on what matters most.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {/* Cards */}
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#D1D5DB] hover:shadow-lg transition-all duration-300 w-full break-words">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-[#23272F] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#23272F] mb-1 break-words text-left">
                    Invoice & Receipt Management
                  </h3>
                  <p className="text-[#343A40] text-xs md:text-sm leading-relaxed break-words text-left">
                    Easily generate, send, and track invoices and receipts for your clients.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#D1D5DB] hover:shadow-lg transition-all duration-300 w-full break-words">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-[#343A40] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#23272F] mb-1 break-words text-left">
                    Automated Tax Calculation & Filing
                  </h3>
                  <p className="text-[#343A40] text-xs md:text-sm leading-relaxed break-words text-left">
                    Calculate and file federal, state, and local taxes automatically, reducing errors and saving time.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#D1D5DB] hover:shadow-lg transition-all duration-300 w-full break-words">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-[#23272F] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <BarChart2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#23272F] mb-1 break-words text-left">
                    Financial Reports & Dashboards
                  </h3>
                  <p className="text-[#343A40] text-xs md:text-sm leading-relaxed break-words text-left">
                    Access real-time profit & loss, balance sheet, and cash flow reports with export options.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#D1D5DB] hover:shadow-lg transition-all duration-300 w-full break-words">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-[#343A40] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#23272F] mb-1 break-words text-left">
                    Expert Accounting Support
                  </h3>
                  <p className="text-[#343A40] text-xs md:text-sm leading-relaxed break-words text-left">
                    Chat with certified accountants for personalized advice and support.
                  </p>
                </div>
              </div>
              <div className="p-4 md:p-6 bg-white rounded-2xl border border-[#D1D5DB] w-full text-left">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#23272F] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-[#23272F] mb-2 break-words text-left">
                      More than automation, real partnership
                    </h3>
                    <p className="text-[#343A40] text-xs md:text-base leading-relaxed break-words text-left">
                      Our digital accounting helps you make smarter decisions and grow your business securely.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSectionAccounting; 