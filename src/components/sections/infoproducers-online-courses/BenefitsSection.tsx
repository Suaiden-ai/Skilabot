import { useState } from "react";
import { Star, Calendar, Users, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("automation");

  const tabs = [
    { id: "automation", label: "Automation", icon: Zap },
    { id: "sales", label: "Sales", icon: BarChart },
    { id: "students", label: "Student Success", icon: Users },
    { id: "scheduling", label: "Scheduling", icon: Calendar }
  ];

  const tabContent = {
    automation: [
      {
        icon: "🤖",
        title: "Automated Lead Nurturing",
        description: "Engage and qualify leads automatically via WhatsApp, email, and chatbots.",
        rating: 4.9,
        benefits: ["24/7 engagement", "Instant responses", "Higher conversion"]
      },
      {
        icon: "🔗",
        title: "Platform Integrations",
        description: "Connect with your LMS, payment gateways, and marketing tools for seamless automation.",
        rating: 4.8,
        benefits: ["LMS sync", "Payment automation", "Unified data"]
      },
      {
        icon: "📊",
        title: "Smart Analytics",
        description: "Track every step of your funnel and student journey with real-time dashboards.",
        rating: 4.7,
        benefits: ["Funnel tracking", "Student analytics", "Actionable insights"]
      }
    ],
    sales: [
      {
        icon: "💸",
        title: "Automated Sales",
        description: "Close sales and send payment links automatically, reducing manual work.",
        rating: 4.9,
        benefits: ["Instant checkout", "Upsell automation", "More sales"]
      },
      {
        icon: "📈",
        title: "Upsell & Cross-sell",
        description: "AI recommends new courses or products to your students at the right time.",
        rating: 4.8,
        benefits: ["Personalized offers", "Increased LTV", "Smart timing"]
      },
      {
        icon: "🛒",
        title: "Cart Recovery",
        description: "Recover abandoned carts with automated WhatsApp and email reminders.",
        rating: 4.7,
        benefits: ["Cart recovery", "More revenue", "Less churn"]
      }
    ],
    students: [
      {
        icon: "🎓",
        title: "Student Onboarding",
        description: "Welcome and guide new students with personalized messages and checklists.",
        rating: 4.9,
        benefits: ["Personalized onboarding", "Higher engagement", "Fewer dropouts"]
      },
      {
        icon: "📅",
        title: "Class Reminders",
        description: "Send automatic reminders for live classes, Q&As, and deadlines.",
        rating: 4.8,
        benefits: ["No missed classes", "Better attendance", "More completions"]
      },
      {
        icon: "⭐",
        title: "Feedback Collection",
        description: "Collect feedback and testimonials automatically after course completion.",
        rating: 4.7,
        benefits: ["More testimonials", "Continuous improvement", "Student satisfaction"]
      }
    ],
    scheduling: [
      {
        icon: "⏰",
        title: "Smart Scheduling",
        description: "Let students book calls, classes, or support sessions directly via WhatsApp.",
        rating: 4.9,
        benefits: ["Easy booking", "No double-booking", "Faster support"]
      },
      {
        icon: "📆",
        title: "Event Automation",
        description: "Automate webinars, launches, and live events with reminders and follow-ups.",
        rating: 4.8,
        benefits: ["Event reminders", "Higher attendance", "More engagement"]
      },
      {
        icon: "📲",
        title: "Omnichannel Notifications",
        description: "Notify students on WhatsApp, email, and SMS for every important update.",
        rating: 4.7,
        benefits: ["Multi-channel", "No missed info", "Better communication"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Infoproduct Creators
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