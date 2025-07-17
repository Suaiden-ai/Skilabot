import { Button } from "@/components/ui/button";
import { Play, Check, TrendingUp, Zap, Target } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                  Boost Your
                </span>
                <br />
                Pet Shop or Vet Clinic with AI
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Automate appointment scheduling, engage pet owners, and deliver exceptional care with intelligent WhatsApp automation designed for pet businesses.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Instant Appointment Booking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Pet Health Reminders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Personalized Offers for Pet Owners</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105">
                Try Free for 7 Days
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-green-400 to-orange-300 rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=400&fit=crop"
                alt="Pet Shop and Vet Clinic Dashboard"
                className="w-full h-80 object-cover rounded-2xl"
              />
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-orange-400 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">New Appointment!</p>
                    <p className="text-sm text-gray-600">Pet check-up scheduled</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-orange-400 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Vaccination Reminder</p>
                    <p className="text-sm text-gray-600">Sent to pet owner</p>
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