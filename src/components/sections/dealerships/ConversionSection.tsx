
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const scrollToPlans = () => {
  const el = document.getElementById("plans-section");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const ConversionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Video Thumbnail */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop"
                alt="WhatsApp AI Tutorial Video for Dealerships"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-xl shadow-lg">
              <p className="text-sm font-bold text-gray-800">Learn ARTIFICIAL INTELLIGENCE ON WHATSAPP</p>
              <p className="text-xs text-gray-600">15 min of exclusive content</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Convert More Leads Now!
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Try for <strong>7 days free</strong> and see how Artificial Intelligence can revolutionize customer service and vehicle negotiation at your dealership. Turn every lead into a concrete sales opportunity.
            </p>
            <div className="space-y-4">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Setup in less than 5 minutes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Dedicated support during trial</span>
                </li>
              </ul>
            </div>
            <Button
              className="h-14 px-8 bg-white text-purple-700 font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 border-0"
              onClick={scrollToPlans}
            >
              Try Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionSection;
