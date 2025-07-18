import { useState } from "react";
import { Star, CalendarCheck2, Briefcase, BarChart2, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const tabs = [
    { id: "clients", label: "Clients", icon: Briefcase },
    { id: "appointments", label: "Appointments", icon: CalendarCheck2 },
    { id: "management", label: "Management", icon: BarChart2 },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    clients: [
      {
        icon: "🤝",
        title: "Personalized Client Service",
        description: "Deliver tailored support and communication to build lasting client relationships.",
        rating: 4.9,
        benefits: ["Personalization", "Trust", "Client loyalty"]
      },
      {
        icon: "📱",
        title: "Multi-Channel Communication",
        description: "Engage clients via WhatsApp, SMS, and email for seamless updates and support.",
        rating: 4.8,
        benefits: ["WhatsApp/SMS/email", "Reminders", "Client engagement"]
      },
      {
        icon: "⭐",
        title: "Real-Time Feedback",
        description: "Collect instant feedback to improve your professional services.",
        rating: 4.7,
        benefits: ["Feedback", "Service improvement", "Satisfaction"]
      }
    ],
    appointments: [
      {
        icon: "📅",
        title: "Online Booking",
        description: "Let clients book appointments online 24/7, reducing no-shows and scheduling hassle.",
        rating: 4.9,
        benefits: ["24/7 booking", "Fewer no-shows", "Convenience"]
      },
      {
        icon: "⏰",
        title: "Automated Reminders",
        description: "Send reminders via WhatsApp, SMS, or email so clients never miss a meeting.",
        rating: 4.8,
        benefits: ["Reminders", "No missed meetings", "Automation"]
      },
      {
        icon: "🔄",
        title: "Easy Rescheduling",
        description: "Allow clients to reschedule or cancel easily, supporting their flexibility.",
        rating: 4.7,
        benefits: ["Self-service", "Flexible", "Client-friendly"]
      }
    ],
    management: [
      {
        icon: "📊",
        title: "Business Analytics",
        description: "Track projects, client base, and performance to make data-driven decisions.",
        rating: 4.9,
        benefits: ["Analytics", "Insights", "Growth"]
      },
      {
        icon: "👥",
        title: "Client Management",
        description: "Easily manage all clients, documents, and deadlines in one place.",
        rating: 4.8,
        benefits: ["Organization", "Efficiency", "Centralization"]
      },
      {
        icon: "💼",
        title: "Document Storage",
        description: "Securely store and access all client documents and contracts digitally.",
        rating: 4.7,
        benefits: ["Security", "Easy access", "Digital storage"]
      }
    ],
    automation: [
      {
        icon: "🤖",
        title: "Automated Workflows",
        description: "Automate repetitive tasks, reminders, and follow-ups to boost productivity.",
        rating: 4.9,
        benefits: ["Automation", "Reminders", "Productivity"]
      },
      {
        icon: "🔗",
        title: "System Integrations",
        description: "Connect with business and productivity tools for seamless data syncing.",
        rating: 4.8,
        benefits: ["Integrations", "Real-time", "Seamless"]
      },
      {
        icon: "📱",
        title: "API & Integrations",
        description: "Robust API for custom integrations with professional and business platforms.",
        rating: 4.7,
        benefits: ["API", "Custom integrations", "Business apps"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Benefits for Professional Services
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
                      ? "bg-gradient-to-r from-blue-900 via-green-400 to-gray-400 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100"
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
              <div key={index} className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
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
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection; 