
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
    <section className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 w-full max-w-md mx-auto">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#23272F] leading-tight">
                Serve and Negotiate with Your Customers on WhatsApp{" "}
                <span className="relative">
                  <span className="text-[#22306e]">
                    using AI
                  </span>
                </span>
              </h1>
              <p className="text-xl text-[#23272F] leading-relaxed">
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
                  <div className="w-6 h-6 bg-[#22306e] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#23272F] font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <Button
              className="h-14 px-8 bg-[#22306e] hover:bg-[#1A237E] text-white font-bold text-lg rounded-lg transition-all duration-300"
              onClick={scrollToPlans}
            >
              Try Free
            </Button>
            {/* Botão Watch Video removido */}
          </div>

          {/* Right Visual */}
          <div className="relative flex justify-center items-center">
            <img 
              src="/lovable-uploads/314f3aa9-779d-407f-b32e-e30fc554bbaa.png"
              alt="Professional car salesperson"
              className="rounded-2xl shadow-2xl w-full max-w-sm object-cover"
              style={{ objectPosition: 'center top' }}
            />
            {/* Floating Cards - padronizado */}
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#E3E6F0] flex items-center gap-2">
              <span className="text-[#22306e] text-lg">🚗</span>
              <div>
                <p className="font-bold text-[#23272F]">New lead converted!</p>
                <p className="text-sm text-[#343A40]">Ready for follow-up</p>
              </div>
            </div>
            <div className="absolute top-1/2 -right-8 bg-[#22306e] text-white p-3 rounded-xl shadow-lg flex items-center gap-2">
              <span className="text-lg">💬</span>
              <span>50 new signups</span>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FFC107] text-[#23272F] p-4 rounded-2xl shadow-xl flex items-center gap-2">
              <Check className="w-5 h-5 text-[#22306e]" />
              <span>Test drive scheduled!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
