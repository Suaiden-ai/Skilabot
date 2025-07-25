import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 w-full max-w-md mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#7C3AED]">
                Empower Your<br />
                <span className="text-[#23272F]">Psychology or Therapy Practice</span>
              </h1>
              <p className="text-xl text-[#23272F] leading-relaxed max-w-lg">
                Simplify client communication, appointment scheduling, and follow-ups with gentle, intelligent tools designed for psychologists and therapists.
              </p>
            </div>
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#E9D8FD] rounded-full flex items-center justify-center border border-[#7C3AED]">
                  <Check className="w-4 h-4 text-[#43A047]" />
                </div>
                <span className="text-[#23272F] font-medium">Confidential Client Messaging</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#E9D8FD] rounded-full flex items-center justify-center border border-[#7C3AED]">
                  <Check className="w-4 h-4 text-[#60A5FA]" />
                </div>
                <span className="text-[#23272F] font-medium">Automated Session Reminders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#E9D8FD] rounded-full flex items-center justify-center border border-[#7C3AED]">
                  <Check className="w-4 h-4 text-[#7C3AED]" />
                </div>
                <span className="text-[#23272F] font-medium">Online Scheduling & Follow-ups</span>
              </div>
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 bg-[#7C3AED] text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 border border-[#7C3AED]">
                Try Free for 7 Days
              </Button>
            </div>
          </div>
          {/* Right Visual */}
          <div className="relative w-full max-w-md mx-auto mt-8 lg:mt-0 animate-fade-in delay-300">
            <img 
              src="Imagens/psychologists-hero.png"
              alt="Therapy Session Illustration"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
            {/* Floating Chat Bubbles */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg max-w-48 animate-bounce border border-purple-100">
              <p className="text-sm text-gray-800 font-medium">🧠 New session booked!</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-purple-500 text-white p-4 rounded-2xl shadow-lg max-w-52 animate-bounce delay-1000">
              <p className="text-sm font-medium">🔔 Reminder sent!</p>
            </div>
            <div className="absolute top-1/2 -right-8 bg-blue-500 text-white p-3 rounded-xl shadow-lg animate-bounce delay-500">
              <p className="text-xs font-medium">⭐ 99% attendance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 