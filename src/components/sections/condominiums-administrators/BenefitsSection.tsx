import { useState } from "react";
import { Star, CalendarCheck2, Users, BarChart2, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("residents");

  const tabs = [
    { id: "residents", label: "Residents", icon: Users },
    { id: "bookings", label: "Bookings", icon: CalendarCheck2 },
    { id: "management", label: "Management", icon: BarChart2 },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    residents: [
      {
        icon: "🏢",
        title: "Centralized Communication",
        description: "Send announcements, updates, and alerts to all residents instantly.",
        rating: 4.9,
        benefits: ["Communication", "Transparency", "Community"]
      },
      {
        icon: "📱",
        title: "Multi-Channel Support",
        description: "Engage residents via WhatsApp, SMS, and email for seamless support.",
        rating: 4.8,
        benefits: ["WhatsApp/SMS/email", "Quick support", "Resident engagement"]
      },
      {
        icon: "⭐",
        title: "Real-Time Feedback",
        description: "Collect instant feedback to improve services and resident satisfaction.",
        rating: 4.7,
        benefits: ["Feedback", "Service improvement", "Satisfaction"]
      }
    ],
    bookings: [
      {
        icon: "📅",
        title: "Facility Booking",
        description: "Allow residents to book common areas and amenities online 24/7.",
        rating: 4.9,
        benefits: ["24/7 booking", "Convenience", "No double-booking"]
      },
      {
        icon: "⏰",
        title: "Automated Reminders",
        description: "Send reminders for bookings, meetings, and maintenance schedules.",
        rating: 4.8,
        benefits: ["Reminders", "No missed events", "Automation"]
      },
      {
        icon: "🔄",
        title: "Easy Rescheduling",
        description: "Allow residents to reschedule or cancel bookings easily.",
        rating: 4.7,
        benefits: ["Self-service", "Flexible", "Resident-friendly"]
      }
    ],
    management: [
      {
        icon: "📊",
        title: "Building Analytics",
        description: "Track occupancy, maintenance, and resident engagement for better decisions.",
        rating: 4.9,
        benefits: ["Analytics", "Insights", "Efficiency"]
      },
      {
        icon: "👥",
        title: "Resident Management",
        description: "Easily manage all residents, documents, and payments in one place.",
        rating: 4.8,
        benefits: ["Organization", "Efficiency", "Centralization"]
      },
      {
        icon: "💼",
        title: "Document Storage",
        description: "Securely store and access all building documents and records digitally.",
        rating: 4.7,
        benefits: ["Security", "Easy access", "Digital storage"]
      }
    ],
    automation: [
      {
        icon: "🤖",
        title: "Automated Workflows",
        description: "Automate routine tasks, reminders, and follow-ups to boost productivity.",
        rating: 4.9,
        benefits: ["Automation", "Reminders", "Productivity"]
      },
      {
        icon: "🔗",
        title: "System Integrations",
        description: "Connect with payment and management systems for seamless data syncing.",
        rating: 4.8,
        benefits: ["Integrations", "Real-time", "Seamless"]
      },
      {
        icon: "📱",
        title: "API & Integrations",
        description: "Robust API for custom integrations with property and management platforms.",
        rating: 4.7,
        benefits: ["API", "Custom integrations", "Property apps"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Condominium Administrators
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
                    ? "bg-gradient-to-r from-green-500 via-blue-400 to-gray-400 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100"
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
            <div key={index} className="bg-white border border-green-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-blue-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.rating}/5.0</span>
              </div>
              {/* Benefits */}
              <div className="flex flex-wrap gap-2">
                {item.benefits.map((benefit, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
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