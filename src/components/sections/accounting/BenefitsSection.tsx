import { useState } from "react";
import { Star, FileText, Receipt, BarChart2, Users, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("invoicing");

  const tabs = [
    { id: "invoicing", label: "Invoicing", icon: Receipt },
    { id: "tax", label: "Tax Filing", icon: FileText },
    { id: "reports", label: "Reports", icon: BarChart2 },
    { id: "support", label: "Support", icon: Users }
  ];

  const tabContent = {
    invoicing: [
      {
        icon: "🧾",
        title: "Easy Invoice Management",
        description: "Create, send, and track invoices and receipts in seconds.",
        rating: 4.9,
        benefits: ["Fast invoicing", "Tracking", "Professional"]
      },
      {
        icon: "📱",
        title: "Mobile Access",
        description: "Manage your billing from anywhere, anytime.",
        rating: 4.8,
        benefits: ["Mobile", "Cloud", "Convenience"]
      },
      {
        icon: "🔗",
        title: "Payment Integrations",
        description: "Connect with Stripe, PayPal, and more for seamless payments.",
        rating: 4.7,
        benefits: ["Integrations", "Online payment", "Automation"]
      }
    ],
    tax: [
      {
        icon: "📝",
        title: "Automated Tax Calculation",
        description: "Calculate and file federal, state, and local taxes automatically.",
        rating: 4.9,
        benefits: ["Automation", "Accuracy", "Time-saving"]
      },
      {
        icon: "⏰",
        title: "Deadline Reminders",
        description: "Never miss a tax deadline with smart reminders.",
        rating: 4.8,
        benefits: ["Reminders", "No missed deadlines", "Peace of mind"]
      },
      {
        icon: "🔒",
        title: "Secure Filing",
        description: "Your data is encrypted and securely transmitted to tax authorities.",
        rating: 4.7,
        benefits: ["Security", "Compliance", "Privacy"]
      }
    ],
    reports: [
      {
        icon: "📊",
        title: "Real-Time Dashboards",
        description: "Monitor profit & loss, cash flow, and more with live dashboards.",
        rating: 4.9,
        benefits: ["Dashboards", "Insights", "Growth"]
      },
      {
        icon: "📈",
        title: "Exportable Reports",
        description: "Export your financial data to Excel or PDF for easy sharing.",
        rating: 4.8,
        benefits: ["Export", "Excel/PDF", "Shareable"]
      },
      {
        icon: "🔍",
        title: "Detailed Analytics",
        description: "Drill down into your numbers for smarter decisions.",
        rating: 4.7,
        benefits: ["Analytics", "Details", "Decisions"]
      }
    ],
    support: [
      {
        icon: "💬",
        title: "Expert Support",
        description: "Chat with certified accountants for personalized advice.",
        rating: 4.9,
        benefits: ["Expertise", "Personalized", "Fast help"]
      },
      {
        icon: "🤝",
        title: "Business Formation",
        description: "Get help with LLC/S-corp formation and compliance.",
        rating: 4.8,
        benefits: ["LLC/S-corp", "Compliance", "Guidance"]
      },
      {
        icon: "⚡",
        title: "Automation Tools",
        description: "Automate repetitive tasks and focus on what matters most.",
        rating: 4.7,
        benefits: ["Automation", "Productivity", "Focus"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-[#F8F9FA] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#23272F]">
            Benefits for Modern Accounting
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
                      ? 'bg-[#23272F] text-white shadow-lg'
                      : 'bg-[#F1F3F4] text-[#23272F] hover:bg-[#E6E6E6]'
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
              <div key={index} className="bg-white border border-[#D1D5DB] rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4 text-[#343A40]">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#23272F]">{item.title}</h3>
                <p className="mb-4 leading-relaxed text-[#343A40]">{item.description}</p>
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-[#FFD700] fill-current' : 'text-[#D1D5DB]'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[#343A40]">{item.rating}/5.0</span>
                </div>
                {/* Benefits */}
                <div className="flex flex-wrap gap-2">
                  {item.benefits.map((benefit, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#F1F3F4] text-[#23272F] text-xs font-medium rounded-full">
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