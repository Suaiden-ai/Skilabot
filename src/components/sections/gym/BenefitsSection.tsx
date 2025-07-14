
import { useState } from "react";
import { Star, Calendar, Dumbbell, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("scheduling");

  const tabs = [
    { id: "scheduling", label: "Scheduling", icon: Calendar },
    { id: "workouts", label: "Workouts", icon: Dumbbell },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    scheduling: [
      {
        icon: "💪",
        title: "Workout Scheduling",
        description: "Clients schedule workouts and classes directly through WhatsApp with automatic confirmation",
        rating: 4.9,
        benefits: ["Easy scheduling", "Auto confirmation", "Reminders"]
      },
      {
        icon: "⏰",
        title: "Smart Waiting List",
        description: "System manages cancellations and automatically repositions members in the queue",
        rating: 4.8,
        benefits: ["Auto management", "Repositioning", "Slot optimization"]
      },
      {
        icon: "📅",
        title: "Personalized Calendar",
        description: "Each member views their personalized schedule with workouts and assessments",
        rating: 4.7,
        benefits: ["Personal agenda", "Clear visualization", "Planning"]
      }
    ],
    workouts: [
      {
        icon: "🏋️",
        title: "AI Workout Plans",
        description: "AI creates personalized plans based on each student's goals and history",
        rating: 4.9,
        benefits: ["Personalization", "Advanced AI", "Clear goals"]
      },
      {
        icon: "📊",
        title: "Progress Tracking",
        description: "Automatic evolution metrics with personalized graphs and reports",
        rating: 4.8,
        benefits: ["Auto metrics", "Visual graphs", "Clear evolution"]
      },
      {
        icon: "🎯",
        title: "Goals and Challenges",
        description: "Gamification system with daily goals and challenges to engage members",
        rating: 4.7,
        benefits: ["Gamification", "Daily goals", "Engagement"]
      }
    ],
    management: [
      {
        icon: "📋",
        title: "Complete Dashboard",
        description: "360° view of the gym: attendance, revenue, occupancy and satisfaction",
        rating: 4.9,
        benefits: ["Complete view", "Important metrics", "Real time"]
      },
      {
        icon: "💰",
        title: "Financial Management",
        description: "Control of memberships, delinquency and automatic revenue projections",
        rating: 4.8,
        benefits: ["Financial control", "Delinquency", "Projections"]
      },
      {
        icon: "👥",
        title: "Member Management",
        description: "Complete profile of each member with history, preferences and plans",
        rating: 4.7,
        benefits: ["Complete profiles", "Detailed history", "Preferences"]
      }
    ],
    automation: [
      {
        icon: "🔗",
        title: "Equipment Integration",
        description: "Connects with smart equipment for automatic workout recording",
        rating: 4.9,
        benefits: ["Smart equipment", "Auto recording", "Accurate data"]
      },
      {
        icon: "📱",
        title: "Integrated Native App",
        description: "Mobile app synchronized with chatbot for complete experience",
        rating: 4.8,
        benefits: ["Native app", "Synchronization", "Complete experience"]
      },
      {
        icon: "🔔",
        title: "Smart Notifications",
        description: "Personalized reminders based on user behavior patterns",
        rating: 4.7,
        benefits: ["Smart reminders", "Behavioral patterns", "Personalization"]
      }
    ]
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Gyms and Personal Trainers
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tabContent[activeTab].map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.rating}/5.0</span>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-2">
                {item.benefits.map((benefit, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
