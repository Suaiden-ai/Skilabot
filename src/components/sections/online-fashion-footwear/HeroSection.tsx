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
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#18181B]">
                Elevate Your<br />
                <span className="text-[#23272F]">Online Fashion & Footwear Store</span>
              </h1>
              <p className="text-xl text-[#23272F] leading-relaxed max-w-lg">
                Automate inventory, personalize shopping experiences, and boost your sales with smart tools designed for online fashion and footwear businesses.
              </p>
            </div>
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#F5F3EE] rounded-full flex items-center justify-center border border-[#E6C200]">
                  <Check className="w-4 h-4 text-[#E6C200]" />
                </div>
                <span className="text-[#23272F] font-medium">Smart Inventory Management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#F5F3EE] rounded-full flex items-center justify-center border border-[#E6C200]">
                  <Check className="w-4 h-4 text-[#E6C200]" />
                </div>
                <span className="text-[#23272F] font-medium">Personalized Shopping Journeys</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#F5F3EE] rounded-full flex items-center justify-center border border-[#E6C200]">
                  <Check className="w-4 h-4 text-[#E6C200]" />
                </div>
                <span className="text-[#23272F] font-medium">Automated Promotions & Campaigns</span>
              </div>
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 bg-[#18181B] text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 border border-[#18181B]">
                Try Free for 7 Days
              </Button>
            </div>
          </div>
          {/* Right Visual */}
          <div className="relative w-full max-w-md mx-auto mt-8 lg:mt-0 animate-fade-in delay-300">
            <img 
              src="Imagens/fashion-hero.png"
              alt="Fashion & Footwear Illustration"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
            {/* Floating Chat Bubbles */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg max-w-48 animate-bounce border border-yellow-100">
              <p className="text-sm text-gray-800 font-medium">🛒 New order placed!</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-white p-4 rounded-2xl shadow-lg max-w-52 animate-bounce delay-1000">
              <p className="text-sm font-medium">🚚 Fast delivery!</p>
            </div>
            <div className="absolute top-1/2 -right-8 bg-pink-500 text-white p-3 rounded-xl shadow-lg animate-bounce delay-500">
              <p className="text-xs font-medium">⭐ 99% satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 