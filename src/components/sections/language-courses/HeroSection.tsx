import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 w-full max-w-md mx-auto animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                Automate your{" "}
                <span className="relative">
                  <span className="text-[#1976D2]">
                    language school
                  </span>
                </span>{" "}
                with AI
              </h1>
              <p className="text-xl text-black max-w-lg">
                Schedule classes, manage students, and promote your courses via WhatsApp 24/7 using artificial intelligence!
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 text-sm text-black">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Reduce missed classes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Smart scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Personalized student reminders</span>
              </div>
            </div>

            {/* CTA Try Free */}
            <div className="flex gap-4">
              <Button className="h-12 px-8 bg-[#1976D2] hover:bg-[#1565C0] text-white font-semibold rounded-lg transition-all duration-300">
                Try Free
              </Button>
            </div>

          </div>

          {/* Right Content - Visual */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative">
              <img 
                src="Imagens/language-hero.png"
                alt="Modern language classroom"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              {/* Floating Notifications */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg max-w-48 animate-bounce">
                <p className="text-sm text-[#1976D2] font-medium">New students!</p>
                <p className="text-xs text-[#343A40]">8 classes today</p>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#1976D2] text-white p-4 rounded-2xl shadow-lg max-w-52 animate-bounce delay-1000">
                <p className="text-sm">Congratulations! Class scheduled successfully</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 