import { TrendingUp, HeartPulse, Smile, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: TrendingUp,
      number: "2,500+",
      text: "Appointments booked monthly",
      gradient: "from-blue-500 to-green-400"
    },
    {
      icon: HeartPulse,
      number: "92%",
      text: "Patient engagement rate",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Smile,
      number: "99%",
      text: "Patient satisfaction",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      icon: Clock,
      number: "4h/day",
      text: "Saved on admin tasks",
      gradient: "from-teal-400 to-blue-500"
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
                <div className="w-20 h-20 rounded-2xl bg-[#90CAF9] flex items-center justify-center mb-4 mx-auto border-2 border-[#1565C0]">
                  <IconComponent className="w-10 h-10 text-[#1565C0]" />
                </div>
                <div className="text-4xl font-bold text-[#1565C0] mb-2">{metric.number}</div>
                <div className="text-[#23272F] font-medium">{metric.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection; 