
import { useState } from "react";
import { Star, Calendar, Megaphone, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("leads");

  const tabs = [
    { id: "leads", label: "Leads", icon: Calendar },
    { id: "campaigns", label: "Campaigns", icon: Megaphone },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    leads: [
      {
        icon: "🎯",
        title: "Automatic Qualification",
        description: "AI qualifies leads in real time based on behavior and demonstrated interest",
        rating: 4.9,
        benefits: ["AI qualification", "Real time", "Accurate score"]
      },
      {
        icon: "💬",
        title: "Smart Nurturing",
        description: "Personalized message sequences based on lead profile and stage",
        rating: 4.8,
        benefits: ["Personalized sequences", "Profile-based", "Perfect timing"]
      },
      {
        icon: "📊",
        title: "Advanced Lead Scoring",
        description: "Scoring system that considers engagement, fit and purchase moment",
        rating: 4.7,
        benefits: ["Advanced scoring", "Multiple factors", "Ideal moment"]
      }
    ],
    campaigns: [
      {
        icon: "🚀",
        title: "Multi-channel Campaigns",
        description: "Orchestrates simultaneous campaigns on WhatsApp, Instagram, Facebook and email",
        rating: 4.9,
        benefits: ["Multi-channel", "Orchestration", "Synchronization"]
      },
      {
        icon: "📈",
        title: "Automatic A/B Testing",
        description: "Automatically tests different approaches and optimizes for better performance",
        rating: 4.8,
        benefits: ["Auto A/B", "Continuous optimization", "Maximum performance"]
      },
      {
        icon: "🎨",
        title: "Dynamic Templates",
        description: "Creates message variations automatically based on target audience",
        rating: 4.7,
        benefits: ["Dynamic templates", "Auto variations", "Specific audience"]
      }
    ],
    management: [
      {
        icon: "📋",
        title: "Unified Dashboard",
        description: "360° view of all clients and campaigns in a single interface",
        rating: 4.9,
        benefits: ["Unified view", "All clients", "Single interface"]
      },
      {
        icon: "💰",
        title: "ROI per Client",
        description: "Automatically calculates return on investment per client and campaign",
        rating: 4.8,
        benefits: ["Auto ROI", "Per client", "Per campaign"]
      },
      {
        icon: "📊",
        title: "Executive Reports",
        description: "Automatic reports with actionable insights to present to clients",
        rating: 4.7,
        benefits: ["Auto reports", "Actionable insights", "Client presentation"]
      }
    ],
    automation: [
      {
        icon: "🔗",
        title: "CRM/ERP Integration",
        description: "Connects with main CRMs and ERPs for unified data and automated workflows",
        rating: 4.9,
        benefits: ["CRM/ERP integrated", "Unified data", "Auto workflows"]
      },
      {
        icon: "🤖",
        title: "Smart Workflows",
        description: "Creates complex automations with dynamic conditions and personalized actions",
        rating: 4.8,
        benefits: ["Complex workflows", "Dynamic conditions", "Personalized actions"]
      },
      {
        icon: "📱",
        title: "Complete API",
        description: "Robust API for custom integrations and unique solution development",
        rating: 4.7,
        benefits: ["Robust API", "Custom integrations", "Unique solutions"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Marketing Agencies
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
