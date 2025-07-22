
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Play } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 bg-gradient-to-br from-rose-50 to-pink-50 overflow-x-hidden">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in w-full max-w-md mx-auto">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Automate your{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    aesthetic clinic
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-300 opacity-30 rounded-full"></div>
                </span>{" "}
                with AI
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Schedule procedures, offer packages and promote advanced beauty via WhatsApp 24/7 using artificial intelligence!
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Reduce No-shows</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Dynamic Scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Personalized Promotions</span>
              </div>
            </div>

            {/* CTA Try Free */}
            <div className="flex gap-4">
              <Button className="h-12 px-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                Try Free
              </Button>
            </div>

          </div>

          {/* Right Content - Visual */}
          <div className="relative w-full max-w-md mx-auto mt-8 lg:mt-0 animate-fade-in delay-300">
            <div className="relative">
              <img 
                src="/Imagens/aesthetic-hero.png"
                alt="Aesthetic professional with technology"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating Notifications */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg max-w-48 animate-bounce">
                <p className="text-sm text-gray-800 font-medium">New clients!</p>
                <p className="text-xs text-gray-600">3 appointments today</p>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-2xl shadow-lg max-w-52 animate-bounce delay-1000">
                <p className="text-sm">Congratulations! Procedure scheduled successfully</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
