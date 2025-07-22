
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, MessageCircle } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();
  
  const benefits = [
    "Productivity boost",
    "Creative collaboration", 
    "Learning and exploration",
    "Personalized interactions"
  ];

  const handleLetsChatClick = () => {
    navigate("/auth");
  };

  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-br from-pink-400 via-pink-500 to-orange-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-sm">
              <p className="text-white/80 text-sm uppercase tracking-wider mb-4 drop-shadow">••• ABOUT US</p>
              <h2 className="text-4xl font-bold mb-8 text-white drop-shadow-lg">
                Discover Our AI Chatbot<br />
                Assistant - Skilabot
              </h2>
              <p className="text-lg text-white/90 leading-relaxed mb-4 font-semibold drop-shadow">Truly automate. <span className="font-normal">Sell every day, anytime.</span></p>
              <p className="text-lg text-white/90 leading-relaxed mb-4 drop-shadow">No more rigid bots. Our AI-powered chatbot talks like a real person, understands complex questions, and delivers natural, human-like responses — on WhatsApp, Instagram, and Facebook.</p>
              <p className="text-lg text-white/90 leading-relaxed mb-4 drop-shadow">While you sleep, it books appointments, replies instantly, closes sales, and keeps your business running 24/7.<br />All with simple integration — <span className="font-bold bg-white/20 px-2 py-1 rounded text-pink-100">no coding required</span>.</p>
              <ul className="list-disc list-inside text-lg text-white/90 leading-relaxed mb-4 drop-shadow">
                <li>Faster support</li>
                <li>More conversions</li>
                <li>More time for what really matters</li>
              </ul>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 transition-transform hover:scale-105 hover:bg-white/10 rounded px-2 py-1">
                    <Check className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-white drop-shadow">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Button 
                  onClick={handleLetsChatClick}
                  className="bg-gradient-to-r from-pink-400 to-orange-400 text-white shadow-lg hover:scale-105 transition font-semibold px-8 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Let's Chat
                </Button>
              </div>
            </div>
          </div>
          {/* Right Content - Mobile Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="/Imagens/about.png"
                alt="Sobre nós Skilabot"
                className="rounded-2xl shadow-2xl border-4 border-white/30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
