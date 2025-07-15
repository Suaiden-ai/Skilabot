
import { Youtube, MessageCircle, Facebook, Slack, Instagram, Mail, Twitter, Archive } from "lucide-react";

const Integrations = () => {
  const integrations = [
    { name: "YouTube", icon: Youtube, color: "text-red-500" },
    { name: "Dropbox", icon: Archive, color: "text-blue-500" },
    { name: "Slack", icon: Slack, color: "text-purple-500" },
    { name: "WhatsApp", icon: MessageCircle, color: "text-green-500" },
    { name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { name: "Instagram", icon: Instagram, color: "text-pink-500" },
    { name: "Gmail", icon: Mail, color: "text-red-500" },
    { name: "Twitter", icon: Twitter, color: "text-sky-500" }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="text-orange-400 text-sm uppercase tracking-wider ml-2">INTEGRATION</span>
          </div>
        </div>

        <div className="flex justify-between items-start mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Conversational <span className="text-pink-400">Chatbot</span>
          </h2>
          <div className="max-w-md">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Large Background Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-bold text-gray-200 select-none">
              Skilabot
            </span>
          </div>

          {/* Integration Icons */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border flex items-center justify-center h-24 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <integration.icon className={`w-6 h-6 ${integration.color}`} />
                  <span className="font-semibold text-gray-800">{integration.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
