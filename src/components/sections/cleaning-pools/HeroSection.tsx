import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 w-full max-w-md mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-500 via-blue-400 to-green-400 bg-clip-text text-transparent">
                  Refresh Your
                </span>
                <br />
                Cleaning & Pool Service Business
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Automate scheduling, send service reminders, and track quality with smart tools designed for cleaning and pool maintenance companies.
              </p>
            </div>
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Automated Scheduling</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Service Reminders & Notifications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Quality Tracking & Feedback</span>
              </div>
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 hover:from-cyan-500 hover:to-green-500 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105">
                Try Free for 7 Days
              </Button>
            </div>
          </div>
          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-green-100 via-blue-100 to-cyan-100 rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop"
                alt="Cleaning & Pool Service Illustration"
                className="w-full h-80 object-cover rounded-2xl"
              />
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Job Scheduled!</p>
                    <p className="text-sm text-gray-600">Ready for service</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Sparkling Clean</p>
                    <p className="text-sm text-gray-600">98% satisfaction rate</p>
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