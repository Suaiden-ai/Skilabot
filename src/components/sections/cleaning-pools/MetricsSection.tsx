import { Sparkles, CalendarCheck, ThumbsUp, Droplets } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Droplets,
      number: "3,800+",
      text: "Pools & spaces cleaned monthly",
      gradient: "from-cyan-400 to-blue-300"
    },
    {
      icon: CalendarCheck,
      number: "99%",
      text: "On-time service rate",
      gradient: "from-blue-400 to-green-200"
    },
    {
      icon: ThumbsUp,
      number: "4.9/5",
      text: "Average customer satisfaction",
      gradient: "from-green-300 to-cyan-200"
    },
    {
      icon: Sparkles,
      number: "2x",
      text: "Faster cleaning turnaround",
      gradient: "from-cyan-200 to-blue-100"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
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