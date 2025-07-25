import { Briefcase, ShieldCheck, BarChart2, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Briefcase,
      number: "3,000+",
      text: "Projects managed",
      bg: "#0D47A1"
    },
    {
      icon: ShieldCheck,
      number: "98%",
      text: "Client satisfaction",
      bg: "#43A047"
    },
    {
      icon: BarChart2,
      number: "95%",
      text: "Client retention",
      bg: "#F1F3F4"
    },
    {
      icon: Clock,
      number: "6h/week",
      text: "Saved on admin tasks",
      bg: "#23272F"
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
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto" style={{ background: metric.bg }}>
                  <IconComponent className={`w-10 h-10 ${metric.bg === '#F1F3F4' ? 'text-[#0D47A1]' : 'text-white'}`} />
                </div>
                <div className="text-4xl font-bold" style={{ color: '#0D47A1' }}>{metric.number}</div>
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