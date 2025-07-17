import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const ConversionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-green-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Video Thumbnail */}
          <div className="relative">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=400&fit=crop"
                alt="Online fashion store demo"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Play className="w-8 h-8 text-blue-600 ml-1" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 bg-white p-4 rounded-xl shadow-lg">
              <p className="text-sm font-bold text-gray-900">See how to sell more with AI</p>
              <p className="text-xs text-gray-600">Exclusive 10-min demo</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className="text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Start now!
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Try <strong>7 days free</strong> and discover how Artificial Intelligence can boost your sales, automate service, and delight customers in your fashion and footwear store.
            </p>
            <div className="space-y-4">
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>No credit card required</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Setup in less than 5 minutes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Dedicated support during the trial</span>
                </li>
              </ul>
            </div>
            <Button className="h-14 px-8 bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 border-2 border-white">
              Try for free now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionSection; 