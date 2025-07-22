
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const ConversionSection = () => {
  return (
    <section className="py-20 bg-green-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Dashboard Image */}
          <div className="relative">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/Imagens/test.png"
                alt="Dashboard Skilabot para academias"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Start now!
            </h2>
            <p className="text-xl text-green-100 leading-relaxed">
              Try for <strong>7 days free</strong> and see how Artificial Intelligence can help your gym or fitness consultancy attract new members and retain those who already train with you.
            </p>
            
            <div className="space-y-4">
              <ul className="space-y-3 text-green-100">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Setup in less than 5 minutes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Dedicated support during trial</span>
                </li>
              </ul>
            </div>

            <Button className="h-14 px-8 bg-white text-green-600 hover:bg-gray-100 font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 border-2 border-white">
              Try Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionSection;
