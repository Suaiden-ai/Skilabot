import { Pizza, ShoppingBag, Clock, Star } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Pizza,
      number: "5,200+",
      text: "Orders delivered monthly",
      bg: "#C62828"
    },
    {
      icon: ShoppingBag,
      number: "98%",
      text: "On-time delivery rate",
      bg: "#43A047"
    },
    {
      icon: Star,
      number: "4.9/5",
      text: "Average customer rating",
      bg: "#FFECB3"
    },
    {
      icon: Clock,
      number: "2x",
      text: "Faster order processing",
      bg: "#23272F"
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
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto" style={{ background: metric.bg }}>
                  <IconComponent className={`w-10 h-10 ${metric.bg === '#FFECB3' ? 'text-[#C62828]' : 'text-white'}`} />
                </div>
                <div className="text-4xl font-bold" style={{ color: '#C62828' }}>{metric.number}</div>
                <div className="font-medium" style={{ color: '#23272F' }}>{metric.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection; 