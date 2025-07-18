
import { Settings, MessageCircle, Smile, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Settings,
      number: "2mil",
      text: "Service orders per day",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      number: "10k",
      text: "Daily automated messages",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Smile,
      number: "98%",
      text: "Satisfied customers",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      number: "4h/day",
      text: "Saved by the team",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${metric.gradient} flex items-center justify-center mb-4 mx-auto`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{metric.number}</div>
                <div className="text-gray-600 font-medium">{metric.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
