import { useState } from "react";
import { Star, ShoppingCart, Users, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("customers");

  const tabs = [
    { id: "customers", label: "Customers", icon: Users },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    customers: [
      {
        icon: "🍽️",
        title: "Personalized Experience",
        description: "Offer tailored recommendations and promotions to boost customer loyalty and repeat orders.",
        rating: 4.9,
        benefits: ["Loyalty", "Personalization", "Repeat business"]
      },
      {
        icon: "📱",
        title: "Multi-Channel Support",
        description: "Engage customers via WhatsApp, SMS, and email for seamless communication and support.",
        rating: 4.8,
        benefits: ["WhatsApp/SMS/email", "Quick support", "Customer engagement"]
      },
      {
        icon: "⭐",
        title: "Real-Time Feedback",
        description: "Collect instant feedback after each order to improve service and satisfaction.",
        rating: 4.7,
        benefits: ["Feedback", "Service improvement", "Satisfaction"]
      }
    ],
    orders: [
      {
        icon: "🛵",
        title: "Fast Delivery",
        description: "Optimize delivery routes and times for faster, more reliable service.",
        rating: 4.9,
        benefits: ["Optimized routes", "Speed", "Reliability"]
      },
      {
        icon: "🧾",
        title: "Order Accuracy",
        description: "Reduce errors with automated order tracking and confirmation.",
        rating: 4.8,
        benefits: ["Accuracy", "Automation", "Fewer errors"]
      },
      {
        icon: "🔔",
        title: "Order Notifications",
        description: "Keep customers updated with real-time order status notifications.",
        rating: 4.7,
        benefits: ["Real-time updates", "Transparency", "Customer trust"]
      }
    ],
    management: [
      {
        icon: "📊",
        title: "Sales Analytics",
        description: "Track sales, popular dishes, and peak hours to make data-driven decisions.",
        rating: 4.9,
        benefits: ["Analytics", "Insights", "Growth"]
      },
      {
        icon: "📅",
        title: "Shift Scheduling",
        description: "Easily manage staff schedules and reduce conflicts.",
        rating: 4.8,
        benefits: ["Staff management", "Efficiency", "Organization"]
      },
      {
        icon: "💼",
        title: "Inventory Management",
        description: "Monitor stock levels and automate reordering to avoid shortages.",
        rating: 4.7,
        benefits: ["Stock control", "Automation", "No shortages"]
      }
    ],
    automation: [
      {
        icon: "🤖",
        title: "Automated Marketing",
        description: "Send targeted promotions and reminders automatically to boost sales.",
        rating: 4.9,
        benefits: ["Promotions", "Reminders", "Sales boost"]
      },
      {
        icon: "🔗",
        title: "POS Integration",
        description: "Seamlessly connect with POS systems for real-time order and payment syncing.",
        rating: 4.8,
        benefits: ["POS sync", "Real-time", "Seamless"]
      },
      {
        icon: "📱",
        title: "API & Integrations",
        description: "Robust API for custom integrations with delivery platforms and apps.",
        rating: 4.7,
        benefits: ["API", "Custom integrations", "Delivery apps"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#C62828' }}>
          Benefits for Restaurants & Deliveries
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
                    ? 'bg-[#C62828] text-white shadow-lg'
                    : 'bg-[#FFECB3] text-[#C62828] hover:bg-[#FFF5E1]'
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
            <div key={index} className="bg-white border border-[#FFECB3] rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#C62828' }}>{item.title}</h3>
              <p className="mb-4 leading-relaxed" style={{ color: '#23272F' }}>{item.description}</p>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-[#FFECB3] fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: '#23272F' }}>{item.rating}/5.0</span>
              </div>
              {/* Benefits */}
              <div className="flex flex-wrap gap-2">
                {item.benefits.map((benefit, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#FFECB3] text-[#C62828] text-xs font-medium rounded-full">
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