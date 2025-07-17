import { useState } from "react";
import { Star, Users, CalendarCheck, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const tabs = [
    { id: "clients", label: "Clients", icon: Users },
    { id: "services", label: "Services", icon: CalendarCheck },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    clients: [
      {
        icon: "💧",
        title: "Personalized Service",
        description: "Offer tailored cleaning and pool care plans to boost client loyalty and satisfaction.",
        rating: 4.9,
        benefits: ["Loyalty", "Personalization", "Repeat business"]
      },
      {
        icon: "📱",
        title: "Multi-Channel Support",
        description: "Engage clients via WhatsApp, SMS, and email for seamless communication and support.",
        rating: 4.8,
        benefits: ["WhatsApp/SMS/email", "Quick support", "Client engagement"]
      },
      {
        icon: "⭐",
        title: "Real-Time Feedback",
        description: "Collect instant feedback after each service to improve quality and satisfaction.",
        rating: 4.7,
        benefits: ["Feedback", "Service improvement", "Satisfaction"]
      }
    ],
    services: [
      {
        icon: "🧼",
        title: "Thorough Cleaning",
        description: "Ensure every job is completed to the highest standard with detailed checklists.",
        rating: 4.9,
        benefits: ["Checklists", "Quality", "Reliability"]
      },
      {
        icon: "⏰",
        title: "On-Time Visits",
        description: "Automated scheduling and reminders keep your team and clients on track.",
        rating: 4.8,
        benefits: ["Punctuality", "Reminders", "No missed jobs"]
      },
      {
        icon: "🔔",
        title: "Service Notifications",
        description: "Keep clients updated with real-time service status notifications.",
        rating: 4.7,
        benefits: ["Real-time updates", "Transparency", "Client trust"]
      }
    ],
    management: [
      {
        icon: "📊",
        title: "Service Analytics",
        description: "Track completed jobs, satisfaction, and team performance to make data-driven decisions.",
        rating: 4.9,
        benefits: ["Analytics", "Insights", "Growth"]
      },
      {
        icon: "📅",
        title: "Team Scheduling",
        description: "Easily manage staff schedules and reduce conflicts.",
        rating: 4.8,
        benefits: ["Staff management", "Efficiency", "Organization"]
      },
      {
        icon: "💼",
        title: "Supply Management",
        description: "Monitor supply levels and automate reordering to avoid shortages.",
        rating: 4.7,
        benefits: ["Stock control", "Automation", "No shortages"]
      }
    ],
    automation: [
      {
        icon: "🤖",
        title: "Automated Reminders",
        description: "Send service reminders and follow-ups automatically to boost retention.",
        rating: 4.9,
        benefits: ["Reminders", "Follow-ups", "Retention"]
      },
      {
        icon: "🔗",
        title: "System Integration",
        description: "Seamlessly connect with payment and scheduling systems for real-time syncing.",
        rating: 4.8,
        benefits: ["Integration", "Real-time", "Seamless"]
      },
      {
        icon: "📱",
        title: "API & Integrations",
        description: "Robust API for custom integrations with property management and pool monitoring apps.",
        rating: 4.7,
        benefits: ["API", "Custom integrations", "Property apps"]
      }
    ]
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Cleaning & Pools
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
                    ? "bg-gradient-to-r from-cyan-400 to-green-300 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-cyan-100"
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
            <div key={index} className="bg-white border border-cyan-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-green-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.rating}/5.0</span>
              </div>
              {/* Benefits */}
              <div className="flex flex-wrap gap-2">
                {item.benefits.map((benefit, idx) => (
                  <span key={idx} className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded-full">
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