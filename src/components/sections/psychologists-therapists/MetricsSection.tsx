import { TrendingUp, Smile, Clock, CalendarCheck2 } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: TrendingUp,
      number: "1,800+",
      text: "Sessions booked monthly",
      gradient: "from-purple-400 to-blue-300"
    },
    {
      icon: CalendarCheck2,
      number: "97%",
      text: "Attendance rate",
      gradient: "from-blue-400 to-green-300"
    },
    {
      icon: Smile,
      number: "99%",
      text: "Client satisfaction",
      gradient: "from-purple-300 to-green-200"
    },
    {
      icon: Clock,
      number: "3h/day",
      text: "Saved on admin tasks",
      gradient: "from-green-200 to-blue-200"
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
                <div className="w-20 h-20 rounded-2xl bg-[#E9D8FD] flex items-center justify-center mb-4 mx-auto border-2 border-[#7C3AED]">
                  <IconComponent className="w-10 h-10 text-[#7C3AED]" />
                </div>
                <div className="text-4xl font-bold text-[#7C3AED] mb-2">{metric.number}</div>
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