import { Building2, Users, ShieldCheck, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Building2,
      number: "1,500+",
      text: "Units managed",
      gradient: "from-green-500 to-blue-200"
    },
    {
      icon: Users,
      number: "97%",
      text: "Resident satisfaction",
      gradient: "from-blue-400 to-green-200"
    },
    {
      icon: ShieldCheck,
      number: "94%",
      text: "Retention rate",
      gradient: "from-green-300 to-gray-100"
    },
    {
      icon: Clock,
      number: "8h/week",
      text: "Saved on admin tasks",
      gradient: "from-blue-100 to-green-100"
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