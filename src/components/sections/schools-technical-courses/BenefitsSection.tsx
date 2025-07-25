import { useState } from "react";
import { Star, Calendar, Users, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("scheduling");

  const tabs = [
    { id: "scheduling", label: "Scheduling", icon: Calendar },
    { id: "students", label: "Student Management", icon: Users },
    { id: "performance", label: "Performance", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    scheduling: [
      {
        icon: "\u23F0",
        title: "Automated Class Scheduling",
        description: "Students can schedule and confirm classes via WhatsApp, with instant confirmation and reminders.",
        rating: 4.9,
        benefits: ["Easy scheduling", "Automatic reminders", "Fewer absences"]
      },
      {
        icon: "\uD83D\uDCC5",
        title: "Dynamic Timetable",
        description: "The system optimizes class schedules based on teacher availability and classroom resources.",
        rating: 4.8,
        benefits: ["Optimized agenda", "Resource management", "Efficient allocation"]
      },
      {
        icon: "\uD83D\uDCF1",
        title: "WhatsApp Notifications",
        description: "Automatic reminders and updates for students and teachers, reducing no-shows.",
        rating: 4.7,
        benefits: ["Real-time updates", "Easy rescheduling", "Higher attendance"]
      }
    ],
    students: [
      {
        icon: "\uD83D\uDCDA",
        title: "Student Progress Tracking",
        description: "Monitor student performance, attendance, and engagement in real time.",
        rating: 4.9,
        benefits: ["Performance insights", "Attendance tracking", "Engagement metrics"]
      },
      {
        icon: "\uD83D\uDC65",
        title: "Personalized Communication",
        description: "Send personalized messages, reminders, and feedback to each student.",
        rating: 4.8,
        benefits: ["Personalized feedback", "Motivation", "Retention"]
      },
      {
        icon: "\uD83D\uDCC8",
        title: "Classroom Analytics",
        description: "Get detailed reports on class participation and student satisfaction.",
        rating: 4.7,
        benefits: ["Participation data", "Satisfaction reports", "Continuous improvement"]
      }
    ],
    performance: [
      {
        icon: "\uD83D\uDCCA",
        title: "Performance Dashboards",
        description: "Visualize key metrics for classes, teachers, and students in one place.",
        rating: 4.9,
        benefits: ["360° view", "Key metrics", "Quick decisions"]
      },
      {
        icon: "\uD83D\uDCB0",
        title: "Financial Management",
        description: "Control payments, plans, and promotions with automatic reports.",
        rating: 4.8,
        benefits: ["Financial control", "Managed plans", "Automatic reports"]
      },
      {
        icon: "\uD83D\uDCDA",
        title: "Course Catalog Integration",
        description: "Showcase available courses, schedules, and requirements via chatbot.",
        rating: 4.7,
        benefits: ["Course info", "Easy enrollment", "Transparency"]
      }
    ],
    automation: [
      {
        icon: "\uD83D\uDD17",
        title: "System Integrations",
        description: "Connects with EdTech platforms and school management systems for seamless data flow.",
        rating: 4.9,
        benefits: ["Integrated systems", "Automatic sync", "Accurate data"]
      },
      {
        icon: "\uD83D\uDCE6",
        title: "Document Automation",
        description: "Organizes certificates, grade reports, and student files automatically.",
        rating: 4.8,
        benefits: ["Automatic organization", "Easy access", "Secure storage"]
      },
      {
        icon: "\uD83D\uDD14",
        title: "Smart Follow-up",
        description: "Automated follow-up for student satisfaction and course completion.",
        rating: 4.7,
        benefits: ["Automatic follow-up", "Measured satisfaction", "Continuous improvement"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#1A237E] mb-12">
          Benefits for Technical Schools
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
              <h3 className="text-xl font-bold text-[#1A237E] mb-3">{item.title}</h3>
              <p className="text-[#23272F] mb-4 leading-relaxed">{item.description}</p>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-[#FFC107] fill-current' : 'text-[#E3E6F0]'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#23272F]">{item.rating}/5.0</span>
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