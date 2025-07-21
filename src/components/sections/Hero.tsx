
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Star } from "lucide-react";

const Hero = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleStartFreeTrial = () => {
    if (email.trim()) {
      navigate(`/auth?email=${encodeURIComponent(email)}`);
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Unleash the Power of{" "}
                <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  AI Chatbot
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Transform your customer experience with intelligent conversations powered by advanced AI technology.
              </p>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Sign up for free</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Free 14-day trial</span>
              </div>
            </div>

            {/* Start Free Trial Button */}
            <div className="flex justify-start mt-6">
              <Button 
                onClick={handleStartFreeTrial}
                className="h-12 px-8 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg text-lg transition-all duration-300 hover:scale-105"
              >
                Start Free Trial
              </Button>
            </div>
          </div>

          {/* Right Content - Robot Illustration */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=600&fit=crop&crop=center"
                alt="AI Robot"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              
              {/* Chat Bubbles */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg max-w-48 animate-bounce">
                <p className="text-sm text-gray-800">Hi! How can I help you?</p>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white p-4 rounded-2xl shadow-lg max-w-52 animate-bounce delay-1000">
                <p className="text-sm">Hi Skilabot! I need your help.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
