import { Users, Heart, Sparkles, TrendingUp, CheckCircle, PawPrint } from "lucide-react";

const ExpertiseSectionPetShopsVetClinics = () => {
  return (
    <section className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image with Floating Elements */}
          <div className="relative w-full max-w-md mx-auto overflow-visible">
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-[#F5F5F5] rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=600&fit=crop"
                  alt="Pet Shop and Vet Clinic illustration"
                  className="w-72 h-72 object-contain rounded-full mx-auto drop-shadow-lg"
                />
              </div>
              {/* Floating Metric Cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-[#A7E9AF] animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#43BFA3] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#36454F]">+80%</div>
                    <div className="text-sm text-[#36454F]">Client retention</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[#A7E9AF]">
                <div className="text-xs text-[#36454F] mb-2">Comparecimento em consultas</div>
                <div className="text-[#43BFA3] font-semibold text-sm mb-2">+95%</div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 5, 7, 6, 8, 9].map((height, index) => (
                    <div 
                      key={index}
                      className="w-2 bg-[#43BFA3] rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#A7E9AF]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#A7E9AF] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#36454F]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#36454F]">99%</div>
                    <div className="text-sm text-[#36454F]">Automated reminders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words leading-tight w-full max-w-full overflow-hidden text-left text-black">
                Your technology partner for <span style={{ color: '#43BFA3' }}>Pet Shops & Veterinary Clinics</span>
              </h2>
              <p className="text-base md:text-lg text-[#36454F] mb-6 md:mb-8 break-words w-full max-w-full text-left">
                From appointment reminders to health tracking, our platform is designed to boost loyalty and efficiency for your pet business.
              </p>
            </div>
            <div className="space-y-4 w-full text-left">
              {[
                {
                  title: "Automated appointment reminders",
                  description: "Reduce no-shows with personalized reminders for each pet and owner."
                },
                {
                  title: "Health tracking",
                  description: "Centralize vaccines, grooming, and health history for more efficient care."
                },
                {
                  title: "Personalized offers & tips",
                  description: "Send promotions and health tips based on each pet's profile and history."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-[#A7E9AF] hover:shadow-lg transition-all duration-300 w-full break-words">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#43BFA3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#36454F] mb-1 break-words text-left">
                      {feature.title}
                    </h3>
                    <p className="text-[#36454F] text-xs md:text-sm leading-relaxed break-words text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-6 bg-[#F5F5F5] rounded-2xl border border-[#A7E9AF] backdrop-blur-sm w-full text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#A7E9AF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-[#36454F]" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-black mb-2 break-words text-left">
                    More than automation, real care for pets
                  </h3>
                  <p className="text-[#36454F] text-xs md:text-base leading-relaxed break-words text-left">
                    Our technology helps your business care for pets, optimize processes, and build client loyalty.
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

export default ExpertiseSectionPetShopsVetClinics; 