import { useState } from "react";
import { Star, Calendar, Stethoscope, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("patients");

  const tabs = [
    { id: "patients", label: "Patients", icon: Stethoscope },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    patients: [
      {
        icon: "🩺",
        title: "Patient Engagement",
        description: "Send personalized messages, reminders, and health tips to keep patients engaged and informed.",
        rating: 4.9,
        benefits: ["Personalized care", "Health tips", "Reminders"]
      },
      {
        icon: "💬",
        title: "Secure Messaging",
        description: "Communicate securely with patients and ensure privacy for sensitive information.",
        rating: 4.8,
        benefits: ["Secure chat", "Privacy", "HIPAA-ready"]
      },
      {
        icon: "📈",
        title: "Patient Feedback",
        description: "Collect feedback and satisfaction surveys to improve your healthcare services.",
        rating: 4.7,
        benefits: ["Feedback", "Surveys", "Service improvement"]
      }
    ],
    appointments: [
      {
        icon: "📅",
        title: "Online Scheduling",
        description: "Let patients book appointments online 24/7, reducing phone calls and no-shows.",
        rating: 4.9,
        benefits: ["24/7 booking", "Fewer no-shows", "Less phone time"]
      },
      {
        icon: "⏰",
        title: "Automated Reminders",
        description: "Send automatic reminders via WhatsApp, SMS, or email to ensure patients never miss an appointment.",
        rating: 4.8,
        benefits: ["WhatsApp/SMS/email", "No missed appointments", "Automation"]
      },
      {
        icon: "🔄",
        title: "Easy Rescheduling",
        description: "Allow patients to reschedule or cancel easily, freeing up your team’s time.",
        rating: 4.7,
        benefits: ["Self-service", "Frees staff", "Flexible"]
      }
    ],
    management: [
      {
        icon: "📋",
        title: "Unified Dashboard",
        description: "See all appointments, patient info, and messages in one secure place.",
        rating: 4.9,
        benefits: ["All-in-one view", "Secure", "Easy access"]
      },
      {
        icon: "💰",
        title: "Billing & Payments",
        description: "Track payments, send invoices, and manage billing with ease.",
        rating: 4.8,
        benefits: ["Easy billing", "Invoices", "Payment tracking"]
      },
      {
        icon: "📊",
        title: "Reports & Analytics",
        description: "Get actionable insights on patient flow, revenue, and satisfaction.",
        rating: 4.7,
        benefits: ["Insights", "Patient flow", "Revenue tracking"]
      }
    ],
    automation: [
      {
        icon: "🔗",
        title: "EHR/EMR Integration",
        description: "Connect with electronic health records for seamless data and workflow automation.",
        rating: 4.9,
        benefits: ["EHR/EMR integrated", "Unified data", "Auto workflows"]
      },
      {
        icon: "🤖",
        title: "Smart Workflows",
        description: "Automate patient reminders, follow-ups, and routine tasks with intelligent workflows.",
        rating: 4.8,
        benefits: ["Reminders", "Follow-ups", "Routine automation"]
      },
      {
        icon: "📱",
        title: "API & Integrations",
        description: "Robust API for custom integrations with other healthcare solutions.",
        rating: 4.7,
        benefits: ["Robust API", "Custom integrations", "Healthcare apps"]
      }
    ],
    // Outras abas virão a seguir
  };

  return (
    <section id="benefits-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Healthcare Professionals
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