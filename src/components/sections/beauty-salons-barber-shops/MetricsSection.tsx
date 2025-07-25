import { CalendarCheck2, Smile, Scissors, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: CalendarCheck2,
      number: "3,200+",
      text: "Appointments booked monthly",
      bg: "#343A40"
    },
    {
      icon: Smile,
      number: "97%",
      text: "Client satisfaction rate",
      bg: "#FFD700"
    },
    {
      icon: Scissors,
      number: "92%",
      text: "Client retention",
      bg: "#F1F3F4"
    },
    {
      icon: Clock,
      number: "4h/day",
      text: "Saved on admin tasks",
      bg: "#18181B"
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
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto" style={{ background: metric.bg }}>
                  <IconComponent className={`w-10 h-10 ${metric.bg === '#F1F3F4' ? 'text-[#343A40]' : 'text-white'}`} />
                </div>
                <div className="text-4xl font-bold" style={{ color: '#343A40' }}>{metric.number}</div>
                <div className="font-medium" style={{ color: '#18181B' }}>{metric.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection; 