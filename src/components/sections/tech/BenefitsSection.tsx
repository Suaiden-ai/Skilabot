
import { useState } from "react";
import { Star, Bell, Wrench, MonitorSmartphone, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("notifications");

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "triage", label: "Triage", icon: Wrench },
    { id: "management", label: "Management", icon: MonitorSmartphone },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    notifications: [
      {
        icon: "📢",
        title: "Automated Status Updates",
        description: "Keep your customers informed in real time with automatic WhatsApp notifications at every stage.",
        rating: 4.9,
        benefits: ["Real-time updates", "WhatsApp integration", "Customer transparency"]
      },
      {
        icon: "⏰",
        title: "24/7 Support Availability",
        description: "AI handles customer inquiries and organizes calls even outside business hours.",
        rating: 4.8,
        benefits: ["24/7 AI", "No missed calls", "Always available"]
      }
    ],
    triage: [
      {
        icon: "🖼️",
        title: "Smart Triage & Diagnosis",
        description: "AI analyzes photos, videos, and messages to help diagnose issues before the customer arrives.",
        rating: 4.9,
        benefits: ["Photo/video analysis", "Faster diagnosis", "Pre-arrival insights"]
      },
      {
        icon: "🔍",
        title: "Intelligent Prioritization",
        description: "AI suggests optimal order for service based on urgency, SLA, and parts availability.",
        rating: 4.8,
        benefits: ["SLA-based", "Urgency aware", "Parts check"]
      }
    ],
    management: [
      {
        icon: "📋",
        title: "Unified Dashboard",
        description: "360° view of all service orders and customer interactions in a single interface.",
        rating: 4.9,
        benefits: ["Unified view", "All orders", "Single interface"]
      },
      {
        icon: "🔗",
        title: "System Integration",
        description: "Integrate with your current service order and inventory systems for a unified workflow.",
        rating: 4.8,
        benefits: ["API integration", "Inventory sync", "Workflow automation"]
      }
    ],
    automation: [
      {
        icon: "🤖",
        title: "Customizable AI Agent",
        description: "Have a customizable AI Agent to serve your customers via WhatsApp. Set name, personality, and more.",
        rating: 4.9,
        benefits: ["Custom agent", "WhatsApp support", "Personalized flows"]
      },
      {
        icon: "⚡",
        title: "Smart Workflows",
        description: "Create complex automations with dynamic conditions and personalized actions for support routines.",
        rating: 4.8,
        benefits: ["Dynamic workflows", "Personalized actions", "Routine automation"]
      }
    ]
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Tech Support
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
