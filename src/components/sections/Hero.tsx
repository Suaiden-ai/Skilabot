
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
                <span>Free 7-day trial</span>
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
                src="test.png"
                alt="Skilabot Hero"
                className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-1xl drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.18))' }}  
              />
              
              {/* Card 1: Learn from best instructors */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 bg-white rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center max-w-xs border border-gray-100" style={{ marginTop: '-40px' }}>
                <span className="text-lg font-semibold text-gray-900 text-center leading-tight">Learn from best <span className="text-pink-500 font-bold">instructors</span> around the globe</span>
                <div className="flex mt-4 -space-x-2">
                  <img src="/public/Imagens/test.png" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white shadow" />
                  <img src="/public/Imagens/test.png" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white shadow" />
                  <img src="/public/Imagens/test.png" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white shadow" />
                  <img src="/public/Imagens/test.png" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white shadow" />
                </div>
              </div>
              {/* Card 2: 15k Amazing students */}
              <div className="absolute bottom-0 right-0 mb-8 mr-8 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4 border border-gray-100">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-orange-500 font-bold text-2xl">15k</span>
                  <span className="text-orange-400 text-xl">🧑‍🎓</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">Amazing<br/>students around<br/>the globe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
