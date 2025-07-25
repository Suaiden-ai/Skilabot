import { Users, MessageCircle, Megaphone, BarChart3 } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Users,
      number: "5k+",
      text: "Political agents using it",
      gradient: "from-indigo-500 to-pink-500"
    },
    {
      icon: MessageCircle,
      number: "100k+",
      text: "Voter messages per day",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      icon: Megaphone,
      number: "1M+",
      text: "Campaigns delivered",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: BarChart3,
      number: "300+",
      text: "Reports generated daily",
      gradient: "from-green-500 to-blue-500"
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
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-4 mx-auto border-2 border-[#C62828]">
                  <IconComponent className="w-10 h-10 text-[#183153]" />
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