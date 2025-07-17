
import { Button } from "@/components/ui/button";
import { Check, Play } from "lucide-react";
import { useRef } from "react";

const scrollToPlans = () => {
  const el = document.getElementById("plans-section");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Serve and Negotiate with Your Customers on WhatsApp{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    using AI
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-300 opacity-30 rounded-full"></div>
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Meet the complete system that speeds up lead follow-up, schedules test drives and accelerates negotiations, all automated and personalized!
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Schedule Test Drives in Seconds",
                "Follow-Up Automation",
                "24/7 Customer Service"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <Button
              className="h-14 px-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105"
              onClick={scrollToPlans}
            >
              Try Free
            </Button>
            {/* Botão Watch Video removido */}
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-2xl">
              <img 
                src="/lovable-uploads/314f3aa9-779d-407f-b32e-e30fc554bbaa.png"
                alt="Professional car salesperson"
                className="w-full h-80 object-cover rounded-2xl"
                style={{ objectPosition: 'center top' }}
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg animate-bounce">
                <p className="text-sm font-bold text-gray-900">New leads arriving</p>
                <p className="text-xs text-gray-600">🚗 3 interested now</p>
              </div>
              
              <div className="absolute -bottom-4 left-4 bg-green-500 text-white p-4 rounded-xl shadow-lg">
                <p className="text-sm font-bold">Congratulations! Test drive successfully scheduled</p>
                <p className="text-xs">🗓️ Monday at 2pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
