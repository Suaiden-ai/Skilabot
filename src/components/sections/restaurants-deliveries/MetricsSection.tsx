import { Pizza, ShoppingBag, Clock, Star } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Pizza,
      number: "5,200+",
      text: "Orders delivered monthly",
      gradient: "from-red-400 to-yellow-300"
    },
    {
      icon: ShoppingBag,
      number: "98%",
      text: "On-time delivery rate",
      gradient: "from-orange-400 to-yellow-200"
    },
    {
      icon: Star,
      number: "4.9/5",
      text: "Average customer rating",
      gradient: "from-yellow-300 to-orange-200"
    },
    {
      icon: Clock,
      number: "2x",
      text: "Faster order processing",
      gradient: "from-red-200 to-orange-100"
    }
  ];

  return (
    <section className="py-16 bg-yellow-50 overflow-x-hidden">
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