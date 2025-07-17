import { Briefcase, ShieldCheck, BarChart2, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Briefcase,
      number: "3,000+",
      text: "Projects managed",
      gradient: "from-blue-900 to-green-200"
    },
    {
      icon: ShieldCheck,
      number: "98%",
      text: "Client satisfaction",
      gradient: "from-green-400 to-blue-200"
    },
    {
      icon: BarChart2,
      number: "95%",
      text: "Client retention",
      gradient: "from-blue-300 to-gray-100"
    },
    {
      icon: Clock,
      number: "6h/week",
      text: "Saved on admin tasks",
      gradient: "from-green-200 to-blue-100"
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