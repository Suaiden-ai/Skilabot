
import { useState } from "react";
import { Star, Calendar, Heart, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("agendamento");

  const tabs = [
    { id: "agendamento", label: "Scheduling", icon: Calendar },
    { id: "tratamentos", label: "Treatments", icon: Heart },
    { id: "gestao", label: "Management", icon: BarChart },
    { id: "automacao", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    agendamento: [
      {
        icon: "��",
        title: "Smart Scheduling",
        description: "Clients schedule consultations and treatments directly via WhatsApp with automatic confirmation",
        rating: 4.9,
        benefits: ["Easy scheduling", "Automatic confirmation", "Reminders"]
      },
      {
        icon: "⏰",
        title: "Queue Management",
        description: "System optimizes the agenda considering procedure time and availability",
        rating: 4.8,
        benefits: ["Automatic optimization", "Precise timing", "Maximum efficiency"]
      },
      {
        icon: "📱",
        title: "WhatsApp Confirmation",
        description: "Automatic reminders with option for instant confirmation or rescheduling",
        rating: 4.7,
        benefits: ["Automatic reminders", "Easy rescheduling", "Attendance rate"]
      }
    ],
    tratamentos: [
      {
        icon: "✨",
        title: "Interactive Catalog",
        description: "Showcases treatments with before/after, prices and durations via chatbot",
        rating: 4.9,
        benefits: ["Before/after", "Clear prices", "Complete information"]
      },
      {
        icon: "📊",
        title: "Treatment History",
        description: "Tracks client progress with photos, dates and achieved results",
        rating: 4.8,
        benefits: ["Visual progress", "Complete history", "Measured results"]
      },
      {
        icon: "🎯",
        title: "Personalized Recommendations",
        description: "AI suggests treatments based on client profile, history and goals",
        rating: 4.7,
        benefits: ["Personalized AI", "Accurate suggestions", "Clear goals"]
      }
    ],
    gestao: [
      {
        icon: "📋",
        title: "Aesthetic Dashboard",
        description: "Complete view of appointments, revenue and client satisfaction",
        rating: 4.9,
        benefits: ["360° view", "Key metrics", "Measured satisfaction"]
      },
      {
        icon: "💰",
        title: "Financial Management",
        description: "Control payments, packages and promotions with automatic reports",
        rating: 4.8,
        benefits: ["Financial control", "Managed packages", "Automatic reports"]
      },
      {
        icon: "👥",
        title: "Specialized CRM",
        description: "Detailed profile with preferences, allergies and complete history",
        rating: 4.7,
        benefits: ["Detailed profiles", "Registered allergies", "Complete history"]
      }
    ],
    automacao: [
      {
        icon: "🔗",
        title: "Equipment Integration",
        description: "Connects with aesthetic equipment for automatic session records",
        rating: 4.9,
        benefits: ["Integrated equipment", "Automatic records", "Accurate data"]
      },
      {
        icon: "📸",
        title: "Automatic Photo Documentation",
        description: "Organizes before/after photos automatically by client and treatment",
        rating: 4.8,
        benefits: ["Automatic organization", "Before/after", "Visual portfolio"]
      },
      {
        icon: "🔔",
        title: "Smart Follow-up",
        description: "Post-treatment follow-up with automatic satisfaction surveys",
        rating: 4.7,
        benefits: ["Automatic follow-up", "Measured satisfaction", "Continuous care"]
      }
    ]
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Aesthetic Clinics
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
