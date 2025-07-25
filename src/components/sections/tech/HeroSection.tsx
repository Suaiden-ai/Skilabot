
import { Button } from "@/components/ui/button";
import { Play, Check, Settings, MessageCircle, Share2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 w-full max-w-md mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Manage and Update
                </span>
                <br />
                your clients via WhatsApp with AI
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover the system that automates customer service, sends repair status updates, and organizes conversations in one place.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Automatic Status Updates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">24/7 FAQ Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Social Media Integration</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105">
                Try Free for 7 Days
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative w-full max-w-md mx-auto mt-8 lg:mt-0 animate-fade-in delay-300">
            <img 
              src="/Imagens/techsupport-hero.png"
              alt="Technician with AI"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
            {/* Floating Chat Bubbles */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg max-w-48 animate-bounce border border-blue-100">
              <p className="text-sm text-gray-800 font-medium">🔧 Order completed!</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white p-4 rounded-2xl shadow-lg max-w-52 animate-bounce delay-1000">
              <p className="text-sm font-medium">💬 24/7 AI Support</p>
            </div>
            <div className="absolute top-1/2 -right-8 bg-purple-500 text-white p-3 rounded-xl shadow-lg animate-bounce delay-500">
              <p className="text-xs font-medium">⚡ Fast repair updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
