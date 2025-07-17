import { GraduationCap, Users, MessageCircle, Clock } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: GraduationCap,
      number: "2.3k",
      text: "Technical schools automated",
      gradient: "from-blue-500 to-green-500"
    },
    {
      icon: Users,
      number: "35k",
      text: "Students managed daily",
      gradient: "from-green-500 to-blue-400"
    },
    {
      icon: MessageCircle,
      number: "120k",
      text: "Messages sent per day",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: Clock,
      number: "200+",
      text: "Hours saved monthly",
      gradient: "from-green-400 to-blue-500"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
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