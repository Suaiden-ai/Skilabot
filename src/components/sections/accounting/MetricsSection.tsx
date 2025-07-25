import { BarChart2, FileText, Users, ShieldCheck } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: BarChart2,
      number: "2,500+",
      text: "Tax Filings Processed",
      bg: "bg-[#F1F3F4]",
      iconColor: "text-[#23272F]"
    },
    {
      icon: FileText,
      number: "99.5%",
      text: "Accuracy Rate",
      bg: "bg-[#F1F3F4]",
      iconColor: "text-[#23272F]"
    },
    {
      icon: Users,
      number: "1,200+",
      text: "Active Clients",
      bg: "bg-[#F1F3F4]",
      iconColor: "text-[#23272F]"
    },
    {
      icon: ShieldCheck,
      number: "100%",
      text: "Data Security",
      bg: "bg-[#F1F3F4]",
      iconColor: "text-[#23272F]"
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