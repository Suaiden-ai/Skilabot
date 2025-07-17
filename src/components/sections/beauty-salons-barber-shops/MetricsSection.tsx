import { CalendarCheck2, Smile, Scissors, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: CalendarCheck2,
      number: "3,200+",
      text: "Appointments booked monthly",
      gradient: "from-pink-400 to-yellow-200"
    },
    {
      icon: Smile,
      number: "97%",
      text: "Client satisfaction rate",
      gradient: "from-purple-400 to-pink-200"
    },
    {
      icon: Scissors,
      number: "92%",
      text: "Client retention",
      gradient: "from-yellow-300 to-pink-100"
    },
    {
      icon: Clock,
      number: "4h/day",
      text: "Saved on admin tasks",
      gradient: "from-pink-200 to-purple-100"
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