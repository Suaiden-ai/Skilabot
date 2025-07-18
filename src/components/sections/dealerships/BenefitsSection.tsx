
import { useState } from "react";
import { Star, Calendar, Car, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("scheduling");

  const tabs = [
    { id: "scheduling", label: "Scheduling", icon: Calendar },
    { id: "sales", label: "Sales", icon: Car },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    scheduling: [
      {
        icon: "🚗",
        title: "1-Click Test Drive",
        description: "Customer schedules test drive directly through chat, choosing available date and time",
        rating: 4.9,
        benefits: ["No friction", "Calendar integration", "Auto confirmation"]
      },
      {
        icon: "⏰",
        title: "Automatic Waiting List",
        description: "System automatically manages cancellations and repositions customers in the queue",
        rating: 4.8,
        benefits: ["Zero waste", "Total optimization", "Auto notifications"]
      },
      {
        icon: "📊",
        title: "Comparative Model Calendar",
        description: "For undecided leads between models, schedules sequential test drives for comparison",
        rating: 4.7,
        benefits: ["Easier decision", "Unique experience", "Accelerated sales"]
      }
    ],
    sales: [
      {
        icon: "🤖",
        title: "AI-Assisted Negotiation",
        description: "AI suggests sales arguments based on customer profile and history",
        rating: 4.9,
        benefits: ["Precise arguments", "Personalization", "Closing rate"]
      },
      {
        icon: "📄",
        title: "Instant PDF Proposal",
        description: "Generates and sends personalized commercial proposals in seconds via WhatsApp",
        rating: 4.8,
        benefits: ["Total agility", "Professionalism", "Digital signature"]
      },
      {
        icon: "🔄",
        title: "Automatic Follow-Up",
        description: "Message sequence to nurture leads after visit, maintaining engagement",
        rating: 4.7,
        benefits: ["Persistence", "Perfect timing", "High conversion"]
      }
    ],
    management: [
      {
        icon: "📋",
        title: "Negotiation Kanban",
        description: "Visualize all leads in a funnel: interested → test drive → proposal → closing",
        rating: 4.9,
        benefits: ["Complete view", "Visible bottlenecks", "Effective management"]
      },
      {
        icon: "📈",
        title: "Conversion Reports",
        description: "Detailed conversion metrics by salesperson, model and source channel",
        rating: 4.8,
        benefits: ["Accurate data", "Optimization", "Clear ROI"]
      },
      {
        icon: "🔔",
        title: "Warm Lead Alert",
        description: "Identifies leads that have cooled down and triggers automatic re-engagement campaigns",
        rating: 4.7,
        benefits: ["Lead recovery", "Opportunities", "Extra revenue"]
      }
    ],
    automation: [
      {
        icon: "🔗",
        title: "CRM & DMS Integration",
        description: "Connects with dealership management systems for unified data",
        rating: 4.9,
        benefits: ["Centralized data", "Single workflow", "Maximum efficiency"]
      },
      {
        icon: "🚙",
        title: "Model and Accessories Database",
        description: "Complete catalog with technical sheets, prices and real-time availability",
        rating: 4.8,
        benefits: ["Updated info", "Accuracy", "Informed sales"]
      },
      {
        icon: "💰",
        title: "Instant Financing Quote",
        description: "Simulates financing with multiple banks and automatically presents best option",
        rating: 4.7,
        benefits: ["Quick decision", "Best rates", "Easy closing"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Dealerships and Vehicle Resellers
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
