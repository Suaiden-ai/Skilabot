import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-white">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#512DA8] leading-tight">
                Automate your <span className="relative text-[#9575CD]">online course sales</span> with AI
              </h1>
              <p className="text-xl text-[#23272F] max-w-lg">
                Capture leads, nurture students, and boost your infoproduct sales 24/7 via WhatsApp using artificial intelligence!
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 text-sm text-[#23272F]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#9575CD]" />
                <span>Automated lead capture</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#9575CD]" />
                <span>Smart student onboarding</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#9575CD]" />
                <span>Personalized reminders</span>
              </div>
            </div>

            {/* CTA Try Free */}
            <div className="flex gap-4">
              <Button className="h-12 px-8 bg-[#9575CD] hover:bg-[#512DA8] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                Try Free
              </Button>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative">
              <img 
                src="Imagens/infoproducers-hero.png"
                alt="Online course platform illustration"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              {/* Floating Notifications */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg max-w-48 animate-bounce border border-[#E3E6F0]">
                <p className="text-sm text-[#512DA8] font-medium">New leads!</p>
                <p className="text-xs text-[#23272F]">12 signups today</p>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#9575CD] text-white p-4 rounded-2xl shadow-lg max-w-52 animate-bounce delay-1000 border border-[#E3E6F0]">
                <p className="text-sm">Congratulations! Course sold successfully</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 