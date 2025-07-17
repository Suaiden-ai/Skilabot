import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
                  Elevate Your
                </span>
                <br />
                Online Fashion & Footwear Store
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Automate inventory, personalize shopping experiences, and boost your sales with smart tools designed for online fashion and footwear businesses.
              </p>
            </div>
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Smart Inventory Management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Personalized Shopping Journeys</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Automated Promotions & Campaigns</span>
              </div>
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 hover:from-pink-500 hover:to-yellow-500 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105">
                Try Free for 7 Days
              </Button>
            </div>
          </div>
          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=400&fit=crop"
                alt="Fashion & Footwear Illustration"
                className="w-full h-80 object-cover rounded-2xl"
              />
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">New Order!</p>
                    <p className="text-sm text-gray-600">Ready to ship</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Fast Delivery</p>
                    <p className="text-sm text-gray-600">99% on-time rate</p>
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