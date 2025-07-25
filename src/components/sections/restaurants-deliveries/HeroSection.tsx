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
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#C62828]">
                <span className="text-[#FFECB3]">Boost Your</span>
                <br />
                <span className="text-[#23272F]">Restaurant or Delivery Business</span>
              </h1>
              <p className="text-xl text-[#23272F] leading-relaxed max-w-lg">
                Automate orders, engage customers, and increase your sales with smart tools designed for restaurants and delivery services.
              </p>
            </div>
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#C62828] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#23272F] font-medium">Instant Order Notifications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#FFECB3] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#C62828]" />
                </div>
                <span className="text-[#23272F] font-medium">Automated Customer Follow-ups</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#43A047] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#23272F] font-medium">Online Reservations & Delivery Tracking</span>
              </div>
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 bg-[#C62828] hover:bg-[#A31515] text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 border border-[#C62828]">
                Try Free for 7 Days
              </Button>
            </div>
          </div>
          {/* Right Visual */}
          <div className="relative w-full max-w-md mx-auto mt-8 lg:mt-0 animate-fade-in delay-300">
            <img 
              src="Imagens/restaurants-hero.png"
              alt="Restaurant Delivery Illustration"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
            {/* Floating Chat Bubbles */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg max-w-48 animate-bounce border border-red-100">
              <p className="text-sm text-gray-800 font-medium">🍔 New order received!</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-red-500 text-white p-4 rounded-2xl shadow-lg max-w-52 animate-bounce delay-1000">
              <p className="text-sm font-medium">🚚 Delivery sent!</p>
            </div>
            <div className="absolute top-1/2 -right-8 bg-yellow-500 text-white p-3 rounded-xl shadow-lg animate-bounce delay-500">
              <p className="text-xs font-medium">⭐ 98% on-time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 