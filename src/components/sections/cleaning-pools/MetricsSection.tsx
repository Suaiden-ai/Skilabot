import { Sparkles, CalendarCheck, ThumbsUp, Droplets } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Droplets,
      number: "3,800+",
      text: "Pools & spaces cleaned monthly",
      bg: "bg-[#BBDEFB]",
      iconColor: "text-[#2196F3]"
    },
    {
      icon: CalendarCheck,
      number: "99%",
      text: "On-time service rate",
      bg: "bg-[#BBDEFB]",
      iconColor: "text-[#43A047]"
    },
    {
      icon: ThumbsUp,
      number: "4.9/5",
      text: "Average customer satisfaction",
      bg: "bg-[#BBDEFB]",
      iconColor: "text-[#1565C0]"
    },
    {
      icon: Sparkles,
      number: "2x",
      text: "Faster cleaning turnaround",
      bg: "bg-[#BBDEFB]",
      iconColor: "text-[#2196F3]"
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
                <div className={`w-20 h-20 rounded-2xl ${metric.bg} flex items-center justify-center mb-4 mx-auto`}>
                  <IconComponent className={`w-10 h-10 ${metric.iconColor}`} />
                </div>
                <div className="text-4xl font-bold text-[#23272F] mb-2">{metric.number}</div>
                <div className="text-[#2196F3] font-medium">{metric.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection; 