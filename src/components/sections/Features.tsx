
import { Button } from "@/components/ui/button";

const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">
              Unleash the Potential of Intelligent Conversations
            </h3>
            <div className="bg-gray-800 rounded-lg p-6 h-64 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop"
                alt="Desktop Chat Interface"
                className="rounded-lg w-full object-cover"
              />
            </div>
          </div>

          {/* Right Card */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Connect, chat, and explore with Skilabot
            </h3>
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center h-80">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop"
                alt="Mobile App Interface"
                className="rounded-xl shadow-2xl max-h-72"
              />
            </div>
            <Button className="w-full h-12 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105">
              Download the App!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
