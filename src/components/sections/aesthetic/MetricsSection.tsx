
import { Calendar, MessageCircle, Smile, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Calendar,
      number: "2mil",
      text: "Aesthetic clinics using it",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Calendar,
      number: "20k",
      text: "Appointments per day",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageCircle,
      number: "150k",
      text: "Client messages/day",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Clock,
      number: "200+",
      text: "Hours saved per day",
      gradient: "from-green-500 to-blue-500"
    }
  ];

  return (
    <section className="py-16 bg-white overflow-x-hidden">
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
