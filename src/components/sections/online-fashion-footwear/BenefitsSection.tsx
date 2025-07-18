import { useState } from "react";
import { Star, Calendar, Heart, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("catalog");

  const tabs = [
    { id: "catalog", label: "Catalog", icon: Calendar },
    { id: "sales", label: "Sales", icon: Heart },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    catalog: [
      {
        icon: "👗",
        title: "Interactive Catalog",
        description: "Showcase collections, new arrivals, and promotions with photos, videos, and a virtual fitting room via chatbot.",
        rating: 4.9,
        benefits: ["Modern visuals", "Smart filters", "Virtual fitting room"]
      },
      {
        icon: "👟",
        title: "Style & Size Search",
        description: "Customers find products by style, color, size, and occasion in seconds.",
        rating: 4.8,
        benefits: ["Fast search", "Advanced filters", "Personalized experience"]
      },
      {
        icon: "👜",
        title: "Outfit Suggestions",
        description: "AI recommends outfit combinations and accessories based on the customer's profile.",
        rating: 4.7,
        benefits: ["Ready-to-wear looks", "Suggested accessories", "Personalization"]
      }
    ],
    sales: [
      {
        icon: "💬",
        title: "24/7 WhatsApp Service",
        description: "Answer questions, send offers, and close sales automatically at any time.",
        rating: 4.9,
        benefits: ["Instant responses", "Automated sales", "Continuous support"]
      },
      {
        icon: "🛒",
        title: "Cart Recovery",
        description: "Increase conversion with automatic reminders for customers who abandoned their cart.",
        rating: 4.8,
        benefits: ["More sales", "Easy recovery", "Smart automation"]
      },
      {
        icon: "🎁",
        title: "Personalized Promotions",
        description: "Offers and coupons sent according to customer behavior and interests.",
        rating: 4.7,
        benefits: ["Automatic coupons", "Segmented promotions", "Loyalty"]
      }
    ],
    management: [
      {
        icon: "📈",
        title: "Sales Dashboard",
        description: "Track orders, revenue, and best-selling products in real time.",
        rating: 4.9,
        benefits: ["360º view", "Key indicators", "Easy management"]
      },
      {
        icon: "📦",
        title: "Inventory Management",
        description: "Automatic stock control, restock alerts, and supplier integration.",
        rating: 4.8,
        benefits: ["Automatic restock", "Updated inventory", "Integration"]
      },
      {
        icon: "👥",
        title: "Customer CRM",
        description: "Purchase history, preferences, and segmentation for marketing campaigns.",
        rating: 4.7,
        benefits: ["Segmentation", "Complete history", "Effective campaigns"]
      }
    ],
    automation: [
      {
        icon: "��",
        title: "Skilabot Chatbot",
        description: "Answers questions, suggests products, and tracks orders automatically.",
        rating: 4.9,
        benefits: ["Agile service", "Automatic suggestions", "Order tracking"]
      },
      {
        icon: "📲",
        title: "Automatic Notifications",
        description: "Send order status, promotions, and news directly on WhatsApp.",
        rating: 4.8,
        benefits: ["Real-time status", "Automatic promotions", "Engagement"]
      },
      {
        icon: "🔄",
        title: "Marketplace Integration",
        description: "Manage sales across multiple channels (Shopee, Mercado Livre, etc) in one place.",
        rating: 4.7,
        benefits: ["Multichannel", "Centralization", "More reach"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Online Fashion & Footwear
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
                    ? "bg-green-500 text-white shadow-lg"
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