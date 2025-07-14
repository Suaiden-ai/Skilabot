
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();
  
  const benefits = [
    "Productivity boost",
    "Creative collaboration", 
    "Learning and exploration",
    "Personalized interactions"
  ];

  const handleLetsChatClick = () => {
    navigate("/register");
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-pink-400 via-pink-500 to-orange-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-white">
            <div>
              <p className="text-white/80 text-sm uppercase tracking-wider mb-4">••• ABOUT US</p>
              <h2 className="text-4xl font-bold mb-8">
                Discover Our AI Chatbot<br />
                Assistant - Smart Chat
              </h2>
            </div>
            
            <div>
              <p className="text-lg text-white/90 leading-relaxed mb-4">
                <strong>Truly automate.</strong> Sell every day, anytime.
              </p>
              <p className="text-lg text-white/90 leading-relaxed mb-4">
                No more rigid bots. Our AI-powered chatbot talks like a real person, understands complex questions, and delivers natural, human-like responses — on WhatsApp, Instagram, and Facebook.
              </p>
              <p className="text-lg text-white/90 leading-relaxed mb-4">
                While you sleep, it books appointments, replies instantly, closes sales, and keeps your business running 24/7.
                <br />
                All with simple integration — <strong>no coding required</strong>.
              </p>
              <ul className="list-disc list-inside text-lg text-white/90 leading-relaxed mb-4">
                <li>Faster support</li>
                <li>More conversions</li>
                <li>More time for what really matters</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleLetsChatClick}
                className="bg-white text-pink-500 hover:bg-gray-100 font-semibold px-8"
              >
                Let's Chat
              </Button>
            </div>
          </div>

          {/* Right Content - Mobile Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=350&h=600&fit=crop"
                alt="Mobile Chat Interface"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
