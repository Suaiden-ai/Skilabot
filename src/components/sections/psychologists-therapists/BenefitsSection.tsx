import { useState } from "react";
import { Star, Calendar, Smile, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const tabs = [
    { id: "clients", label: "Clients", icon: Smile },
    { id: "sessions", label: "Sessions", icon: Calendar },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    clients: [
      {
        icon: "💬",
        title: "Confidential Communication",
        description: "Send secure, private messages and resources to clients, ensuring confidentiality and trust.",
        rating: 4.9,
        benefits: ["Confidentiality", "Trust", "Secure chat"]
      },
      {
        icon: "🌱",
        title: "Personalized Care",
        description: "Share personalized self-care tips, reminders, and encouragement to support client well-being.",
        rating: 4.8,
        benefits: ["Self-care", "Personal touch", "Support"]
      },
      {
        icon: "📈",
        title: "Progress Tracking",
        description: "Track client progress and feedback to continuously improve your therapy outcomes.",
        rating: 4.7,
        benefits: ["Progress", "Feedback", "Better outcomes"]
      }
    ],
    sessions: [
      {
        icon: "📅",
        title: "Online Scheduling",
        description: "Let clients book sessions online 24/7, reducing back-and-forth and missed appointments.",
        rating: 4.9,
        benefits: ["24/7 booking", "Fewer no-shows", "Convenience"]
      },
      {
        icon: "⏰",
        title: "Automated Reminders",
        description: "Send gentle reminders via WhatsApp, SMS, or email so clients never miss a session.",
        rating: 4.8,
        benefits: ["WhatsApp/SMS/email", "No missed sessions", "Gentle reminders"]
      },
      {
        icon: "🔄",
        title: "Easy Rescheduling",
        description: "Allow clients to reschedule or cancel easily, supporting their well-being and your schedule.",
        rating: 4.7,
        benefits: ["Self-service", "Flexible", "Client-friendly"]
      }
    ],
    management: [
      {
        icon: "📋",
        title: "Unified Calendar",
        description: "See all sessions, client notes, and reminders in one organized place.",
        rating: 4.9,
        benefits: ["All-in-one view", "Organized", "Easy access"]
      },
      {
        icon: "🗂️",
        title: "Digital Notes & Records",
        description: "Keep secure, organized digital notes and session records for every client.",
        rating: 4.8,
        benefits: ["Secure notes", "Organized records", "Confidential"]
      },
      {
        icon: "📊",
        title: "Insights & Analytics",
        description: "Get actionable insights on client progress, attendance, and engagement.",
        rating: 4.7,
        benefits: ["Insights", "Progress tracking", "Engagement"]
      }
    ],
    automation: [
      {
        icon: "🔗",
        title: "Practice Management Integration",
        description: "Connect with practice management tools for seamless scheduling and reminders.",
        rating: 4.9,
        benefits: ["Integrated tools", "Seamless scheduling", "Reminders"]
      },
      {
        icon: "🤖",
        title: "Smart Workflows",
        description: "Automate reminders, follow-ups, and routine tasks with intelligent workflows.",
        rating: 4.8,
        benefits: ["Reminders", "Follow-ups", "Routine automation"]
      },
      {
        icon: "📱",
        title: "API & Integrations",
        description: "Robust API for custom integrations with other mental health solutions.",
        rating: 4.7,
        benefits: ["Robust API", "Custom integrations", "Mental health apps"]
      }
    ],
    // Outras abas virão a seguir
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Psychologists & Therapists
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
                    ? "bg-purple-400 text-white shadow-lg"
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
                  <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
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