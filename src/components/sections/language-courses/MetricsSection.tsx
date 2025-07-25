import { Calendar, MessageCircle, BookOpen, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: BookOpen,
      number: "2k",
      text: "Language schools using it",
      gradient: "from-blue-500 to-green-500"
    },
    {
      icon: Calendar,
      number: "15k",
      text: "Classes scheduled per day",
      gradient: "from-green-500 to-blue-400"
    },
    {
      icon: MessageCircle,
      number: "120k",
      text: "Student messages/day",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: Clock,
      number: "250+",
      text: "Hours saved per day",
      gradient: "from-green-400 to-blue-500"
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
                <div className="w-20 h-20 rounded-2xl bg-[#E3E6F0] flex items-center justify-center mb-4 mx-auto border-2 border-[#1976D2]">
                  <IconComponent className="w-10 h-10 text-[#1A237E]" />
                </div>
                <div className="text-4xl font-bold text-black mb-2">{metric.number}</div>
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