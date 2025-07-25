
import { Car, Calendar, MessageCircle, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Car,
      number: "1mil",
      text: "Dealerships using it",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Calendar,
      number: "40k",
      text: "Test drives scheduled/month",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: MessageCircle,
      number: "250k",
      text: "Automated messages",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      number: "200+",
      text: "Hours saved/month",
      gradient: "from-orange-500 to-orange-600"
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
                <div className="w-20 h-20 rounded-2xl bg-[#E3E6F0] flex items-center justify-center mb-4 mx-auto border-2 border-[#22306e]">
                  <IconComponent className="w-10 h-10 text-[#22306e]" />
                </div>
                <div className="text-4xl font-bold text-[#23272F] mb-2">{metric.number}</div>
                <div className="text-[#343A40] font-medium">{metric.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
