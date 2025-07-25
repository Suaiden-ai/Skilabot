import { useState } from "react";
import { Star, Calendar, BookOpen, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("scheduling");

  const tabs = [
    { id: "scheduling", label: "Scheduling", icon: Calendar },
    { id: "classes", label: "Classes", icon: BookOpen },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    scheduling: [
      {
        icon: "📅",
        title: "Smart Scheduling",
        description: "Students schedule classes directly via WhatsApp with automatic confirmation and reminders.",
        rating: 4.9,
        benefits: ["Easy scheduling", "Automatic reminders", "No-shows reduced"]
      },
      {
        icon: "⏰",
        title: "Queue Management",
        description: "System optimizes the agenda considering class duration and teacher availability.",
        rating: 4.8,
        benefits: ["Optimized agenda", "Precise timing", "Maximum efficiency"]
      },
      {
        icon: "📱",
        title: "WhatsApp Confirmation",
        description: "Automatic reminders with option for instant confirmation or rescheduling.",
        rating: 4.7,
        benefits: ["Automatic reminders", "Easy rescheduling", "Attendance rate"]
      }
    ],
    classes: [
      {
        icon: "🗣️",
        title: "Interactive Course Catalog",
        description: "Showcase language courses with levels, prices and durations via chatbot.",
        rating: 4.9,
        benefits: ["All levels", "Clear prices", "Complete information"]
      },
      {
        icon: "📊",
        title: "Progress Tracking",
        description: "Track student progress with attendance, grades and completed modules.",
        rating: 4.8,
        benefits: ["Visual progress", "Complete history", "Measured results"]
      },
      {
        icon: "🎯",
        title: "Personalized Recommendations",
        description: "AI suggests classes or materials based on student profile, history and goals.",
        rating: 4.7,
        benefits: ["Personalized AI", "Accurate suggestions", "Clear goals"]
      }
    ],
    management: [
      {
        icon: "📋",
        title: "School Dashboard",
        description: "Complete view of classes, revenue and student satisfaction.",
        rating: 4.9,
        benefits: ["360° view", "Key metrics", "Measured satisfaction"]
      },
      {
        icon: "💰",
        title: "Financial Management",
        description: "Control payments, plans and promotions with automatic reports.",
        rating: 4.8,
        benefits: ["Financial control", "Managed plans", "Automatic reports"]
      },
      {
        icon: "👥",
        title: "Specialized CRM",
        description: "Detailed student profile with course history, preferences and complete records.",
        rating: 4.7,
        benefits: ["Detailed profiles", "Registered preferences", "Complete history"]
      }
    ],
    automation: [
      {
        icon: "🔗",
        title: "Integration with EdTech Tools",
        description: "Connects with educational platforms for automatic attendance and grade records.",
        rating: 4.9,
        benefits: ["Integrated tools", "Automatic records", "Accurate data"]
      },
      {
        icon: "📸",
        title: "Automatic Documentation",
        description: "Organizes attendance and certificates automatically by student and course.",
        rating: 4.8,
        benefits: ["Automatic organization", "Attendance", "Certificates"]
      },
      {
        icon: "🔔",
        title: "Smart Follow-up",
        description: "Post-class follow-up with automatic satisfaction surveys and feedback requests.",
        rating: 4.7,
        benefits: ["Automatic follow-up", "Measured satisfaction", "Continuous improvement"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-black mb-12">
          Benefits for Language Schools
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
                    ? "bg-[#1976D2] text-white shadow-lg"
                    : "bg-white text-[#1976D2] border border-[#1976D2] hover:bg-[#E3E6F0]"
                }`}
              >
                <IconComponent className="w-5 h-5 text-[#1A237E]" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tabContent[activeTab].map((item, index) => (
            <div key={index} className="bg-white border border-[#E3E6F0] rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
              <p className="text-[#343A40] mb-4 leading-relaxed">{item.description}</p>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-[#FFC107] fill-current' : 'text-[#E3E6F0]'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-black">{item.rating}/5.0</span>
              </div>
              {/* Benefits */}
              <div className="flex flex-wrap gap-2">
                {item.benefits.map((benefit, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#E3E6F0] text-[#1976D2] text-xs font-medium rounded-full">
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