
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

  const handleViewPlans = () => {
    const section = document.getElementById('pricing');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
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
            <div className="flex justify-start mt-6 gap-4">
              <Button 
                onClick={handleStartFreeTrial}
                className="h-12 px-8 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg text-lg transition-all duration-300 hover:scale-105"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline"
                className="h-12 px-5 border border-gray-200 font-semibold rounded-lg text-lg flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 shadow-md"
                onClick={handleViewPlans}
              >
                 <span className="text-black">View plans</span>
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <defs>
                     <linearGradient id="heart-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                       <stop stopColor="#ec4899" />
                       <stop offset="1" stopColor="#f59e42" />
                     </linearGradient>
                   </defs>
                   <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#heart-gradient)"/>
                 </svg>
              </Button>
            </div>
          </div>

          {/* Right Content - Robot Illustration */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative">
              <img 
                src="test.png"
                alt="Skilabot Hero"
                className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-1xl drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.18))',
                borderRadius: '40px'}}
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
        {/* Cards Estatísticos */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <span className="text-[#343A40] mb-2">AI resolves up to</span>
            <span className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">93%</span>
            <span className="text-[#343A40] mt-2">of customer inquiries</span>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <span className="text-[#343A40] mb-2">AI increases up to</span>
            <span className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">35%</span>
            <span className="text-[#343A40] mt-2">conversion rates</span>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <span className="text-[#343A40] mb-2">AI saves up to</span>
            <span className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">72%</span>
            <span className="text-[#343A40] mt-2">in operational costs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
