import { Building2, Users, ShieldCheck, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Building2,
      number: "1,500+",
      text: "Units managed",
      bg: "bg-[#F1F3F4]",
      iconColor: "text-[#388E3C]"
    },
    {
      icon: Users,
      number: "97%",
      text: "Resident satisfaction",
      bg: "bg-[#F1F3F4]",
      iconColor: "text-[#1565C0]"
    },
    {
      icon: ShieldCheck,
      number: "94%",
      text: "Retention rate",
      bg: "bg-[#F1F3F4]",
      iconColor: "text-[#FFD700]"
    },
    {
      icon: Clock,
      number: "8h/week",
      text: "Saved on admin tasks",
      bg: "bg-[#F1F3F4]",
      iconColor: "text-[#23272F]"
    }
  ];

  return (
    <section className="py-16 bg-[#F8F9FA] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`w-20 h-20 rounded-2xl bg-[#F1F3F4] flex items-center justify-center mb-4 mx-auto`}>
                  <IconComponent className="w-10 h-10 text-[#343A40]" />
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