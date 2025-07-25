import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 w-full max-w-md mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-[#2196F3]">
                  Refresh Your
                </span>
                <br />
                <span className="text-[#23272F]">Cleaning & Pool Service Business</span>
              </h1>
              <p className="text-xl text-[#23272F] leading-relaxed max-w-lg">
                Automate scheduling, send service reminders, and track quality with smart tools designed for cleaning and pool maintenance companies.
              </p>
            </div>
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#2196F3] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#23272F] font-medium">Automated Scheduling</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#43A047] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#23272F] font-medium">Service Reminders & Notifications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#BBDEFB] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#2196F3]" />
                </div>
                <span className="text-[#23272F] font-medium">Quality Tracking & Feedback</span>
              </div>
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 bg-[#2196F3] hover:bg-[#1565C0] text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105">
                Try Free for 7 Days
              </Button>
            </div>
          </div>
          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-[#FFFFFF] rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop"
                alt="Cleaning & Pool Service Illustration"
                className="w-full h-80 object-cover rounded-2xl"
              />
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#23272F]">Job Scheduled!</p>
                    <p className="text-sm text-[#2196F3]">Ready for service</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#43A047] rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#23272F]">Sparkling Clean</p>
                    <p className="text-sm text-[#2196F3]">98% satisfaction rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 