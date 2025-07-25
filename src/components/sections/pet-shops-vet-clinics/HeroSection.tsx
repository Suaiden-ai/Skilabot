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
          <div className="relative w-full max-w-md mx-auto mt-8 lg:mt-0 animate-fade-in delay-300">
            <img 
              src="Imagens/petshop-hero.png"
              alt="Pet Shop and Vet Clinic Dashboard"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
            {/* Floating Chat Bubbles */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg max-w-48 animate-bounce border border-green-100">
              <p className="text-sm text-gray-800 font-medium">🐾 New appointment booked!</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-4 rounded-2xl shadow-lg max-w-52 animate-bounce delay-1000">
              <p className="text-sm font-medium">💉 Vaccine reminder sent!</p>
            </div>
            <div className="absolute top-1/2 -right-8 bg-yellow-500 text-white p-3 rounded-xl shadow-lg animate-bounce delay-500">
              <p className="text-xs font-medium">⭐ 98% client satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 