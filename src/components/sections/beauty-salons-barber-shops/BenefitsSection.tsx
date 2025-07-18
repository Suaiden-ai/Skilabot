import { useState } from "react";
import { Star, CalendarCheck2, Smile, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const tabs = [
    { id: "clients", label: "Clients", icon: Smile },
    { id: "appointments", label: "Appointments", icon: CalendarCheck2 },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    clients: [
      {
        icon: "💖",
        title: "Personalized Service",
        description: "Offer tailored treatments and recommendations to delight every client.",
        rating: 4.9,
        benefits: ["Personalization", "Loyalty", "Client delight"]
      },
      {
        icon: "📱",
        title: "Multi-Channel Communication",
        description: "Engage clients via WhatsApp, SMS, and email for seamless support and reminders.",
        rating: 4.8,
        benefits: ["WhatsApp/SMS/email", "Reminders", "Client engagement"]
      },
      {
        icon: "⭐",
        title: "Real-Time Feedback",
        description: "Collect instant feedback after each visit to improve your services.",
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
        description: "Send reminders via WhatsApp, SMS, or email so clients never miss an appointment.",
        rating: 4.8,
        benefits: ["Reminders", "No missed appointments", "Automation"]
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
        description: "Track sales, popular services, and peak hours to make data-driven decisions.",
        rating: 4.9,
        benefits: ["Analytics", "Insights", "Growth"]
      },
      {
        icon: "👥",
        title: "Staff Scheduling",
        description: "Easily manage staff schedules and reduce conflicts.",
        rating: 4.8,
        benefits: ["Staff management", "Efficiency", "Organization"]
      },
      {
        icon: "💼",
        title: "Inventory Management",
        description: "Monitor product stock and automate reordering to avoid shortages.",
        rating: 4.7,
        benefits: ["Stock control", "Automation", "No shortages"]
      }
    ],
    automation: [
      {
        icon: "🤖",
        title: "Automated Marketing",
        description: "Send targeted promotions and reminders automatically to boost bookings.",
        rating: 4.9,
        benefits: ["Promotions", "Reminders", "Sales boost"]
      },
      {
        icon: "🔗",
        title: "POS Integration",
        description: "Seamlessly connect with POS systems for real-time sales and payment syncing.",
        rating: 4.8,
        benefits: ["POS sync", "Real-time", "Seamless"]
      },
      {
        icon: "📱",
        title: "API & Integrations",
        description: "Robust API for custom integrations with beauty and scheduling platforms.",
        rating: 4.7,
        benefits: ["API", "Custom integrations", "Beauty apps"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-pink-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Beauty Salons & Barber Shops
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
                    ? "bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-pink-100"
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
            <div key={index} className="bg-white border border-pink-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
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
                  <span key={idx} className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-medium rounded-full">
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