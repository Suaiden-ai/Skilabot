
import { Zap, BarChart, Globe, TrendingUp, Users, BookOpen } from "lucide-react";

const DetailedFeatures = () => {
  const features = [
    { 
      icon: Zap, 
      title: "API Integration", 
      description: "Ability to integrate with various platforms and services for seamless user experience." 
    },
    { 
      icon: BarChart, 
      title: "Customer Insights", 
      description: "Leverage AI to glean valuable insights into customer preferences, ensuring an engaging support experience every time." 
    },
    { 
      icon: Globe, 
      title: "Multilingual Support", 
      description: "Engage with users worldwide using auto-translated messages, ensuring fluid conversations in multiple languages." 
    },
    { 
      icon: TrendingUp, 
      title: "Data Analytics", 
      description: "Provides insights into user behaviors and preferences, helping businesses make data-driven decisions." 
    },
    { 
      icon: Users, 
      title: "Team Collaboration", 
      description: "Enabling agents to work together seamlessly within the dashboard for smooth customer support management." 
    },
    { 
      icon: BookOpen, 
      title: "AI Training Center", 
      description: "Continuously improve your chatbot's intelligence, dedicated space to train responses for better interactions." 
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-pink-400 text-sm uppercase tracking-wider mb-4">••• FEATURES</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enhanced Customer Experience
          </h2>
          <h2 className="text-4xl font-bold">
            with <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Innovative Features</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left Features */}
          <div className="space-y-12">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Center - Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=500&fit=crop"
                alt="Mobile Settings Interface"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Right Features */}
          <div className="space-y-12">
            {features.slice(3, 6).map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;
