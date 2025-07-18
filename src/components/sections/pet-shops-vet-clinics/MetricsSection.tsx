import { TrendingUp, PawPrint, Smile, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: PawPrint,
      number: "1.2k",
      text: "Pets served per month",
      gradient: "from-green-500 to-orange-400"
    },
    {
      icon: TrendingUp,
      number: "95%",
      text: "Appointment attendance rate",
      gradient: "from-orange-400 to-green-400"
    },
    {
      icon: Smile,
      number: "98%",
      text: "Client satisfaction",
      gradient: "from-blue-400 to-green-400"
    },
    {
      icon: Clock,
      number: "4h/day",
      text: "Saved on manual follow-up",
      gradient: "from-green-300 to-blue-200"
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
                <div className={`w-20 h-20 rounded-2xl bg-[#43BFA3] flex items-center justify-center mb-4 mx-auto`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-black mb-2">{metric.number}</div>
                <div className="text-black font-medium">{metric.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection; 