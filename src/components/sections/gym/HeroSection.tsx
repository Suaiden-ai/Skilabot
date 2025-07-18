
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Play } from "lucide-react";

const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleStartFreeTrial = () => {
    console.log("Starting free trial with email:", email);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 bg-gradient-to-br from-white to-gray-50 overflow-x-hidden">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in w-full max-w-md mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Attract, Engage and{" "}
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  Retain Your Members
                </span>
                {" "}on WhatsApp with AI
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Discover the complete solution that automates lead follow-up, organizes workout plans and keeps your members motivated, all with Artificial Intelligence!
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="font-medium">Lead Conversion</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="font-medium">Member Retention</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="font-medium">Reminder Automation</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <Button 
                onClick={handleStartFreeTrial}
                className="h-14 px-8 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:scale-105"
              >
                Try Free
              </Button>
            </div>

            {/* Email Signup */}
          </div>

          {/* Right Content */}
          <div className="relative w-full max-w-md mx-auto mt-8 lg:mt-0 animate-fade-in delay-300">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop"
                alt="Personal Trainer with Smartphone"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating Chat Bubbles */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg max-w-48 animate-bounce border border-green-100">
                <p className="text-sm text-gray-800 font-medium">🎯 New lead converted!</p>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-4 rounded-2xl shadow-lg max-w-52 animate-bounce delay-1000">
                <p className="text-sm font-medium">✅ Workout scheduled successfully!</p>
              </div>

              <div className="absolute top-1/2 -right-8 bg-blue-500 text-white p-3 rounded-xl shadow-lg animate-bounce delay-500">
                <p className="text-xs font-medium">💪 50 new signups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
