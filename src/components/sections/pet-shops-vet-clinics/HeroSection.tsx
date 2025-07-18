import { Button } from "@/components/ui/button";
import { Play, Check, TrendingUp, Zap, Target } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 w-full max-w-md mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-black">
                Caring for those you love
                <br />
                <span className="block" style={{ color: '#43BFA3' }}>Smart Pet Shop & Veterinary Clinic</span>
              </h1>
              <p className="text-xl text-[#36454F] leading-relaxed max-w-lg">
                Schedule appointments, send reminders, and offer the best care for pets with smart automation and welcoming service.
              </p>
            </div>
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#43BFA3] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#36454F] font-medium">Instant scheduling</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#A7E9AF] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#36454F]" />
                </div>
                <span className="text-[#36454F] font-medium">Health & vaccine reminders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#43BFA3] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#36454F] font-medium">Personalized offers for pet owners</span>
              </div>
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 bg-[#43BFA3] hover:bg-[#369e85] text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105">
                Try it free for 7 days
              </Button>
            </div>
          </div>
          {/* Right Visual */}
          <div className="relative bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md mx-auto mt-8 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=400&fit=crop"
              alt="Pet Shop and Vet Clinic Dashboard"
              className="w-full h-60 sm:h-80 object-cover rounded-2xl"
            />
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce border border-[#A7E9AF]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#43BFA3] rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#36454F]">New appointment!</p>
                  <p className="text-sm text-[#36454F]">Check-up scheduled</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#A7E9AF]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#A7E9AF] rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#36454F]" />
                </div>
                <div>
                  <p className="font-bold text-[#36454F]">Vaccine reminder</p>
                  <p className="text-sm text-[#36454F]">Sent to pet owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 