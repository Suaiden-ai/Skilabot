import { useState } from "react";
import { Star, Calendar, Heart, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const tabs = [
    { id: "clients", label: "Clients", icon: Calendar },
    { id: "services", label: "Services", icon: Heart },
    { id: "management", label: "Management", icon: BarChart },
    { id: "automation", label: "Automation", icon: Zap }
  ];

  const tabContent = {
    clients: [
      {
        icon: "🐾",
        title: "Pet Owner Engagement",
        description: "Send personalized reminders for vaccinations, grooming, and check-ups via WhatsApp.",
        rating: 4.9,
        benefits: ["Personalized reminders", "Higher loyalty", "Better pet care"]
      },
      {
        icon: "📅",
        title: "Instant Appointment Booking",
        description: "Clients book appointments online or via WhatsApp in seconds, with automatic confirmations.",
        rating: 4.8,
        benefits: ["Easy booking", "No double-booking", "Fewer no-shows"]
      },
      {
        icon: "🎁",
        title: "Targeted Promotions",
        description: "Send offers and discounts based on pet type, age, and service history.",
        rating: 4.7,
        benefits: ["Segmented offers", "Increased sales", "Customer retention"]
      }
    ],
    services: [
      {
        icon: "💉",
        title: "Vaccination & Health Tracking",
        description: "Track vaccination schedules, send reminders, and keep digital health records for every pet.",
        rating: 4.9,
        benefits: ["Health records", "On-time vaccines", "Pet safety"]
      },
      {
        icon: "✂️",
        title: "Grooming Scheduling",
        description: "Automate grooming appointments and send reminders for regular care.",
        rating: 4.8,
        benefits: ["Regular care", "Automated reminders", "Happy pets"]
      },
      {
        icon: "🩺",
        title: "Vet Consultations",
        description: "Enable online and in-person vet consultations with easy scheduling and follow-up.",
        rating: 4.7,
        benefits: ["Easy consults", "Follow-up care", "Pet wellness"]
      }
    ],
    management: [
      {
        icon: "📈",
        title: "Business Dashboard",
        description: "Monitor appointments, revenue, and client satisfaction in real time.",
        rating: 4.9,
        benefits: ["360º view", "Key metrics", "Easy management"]
      },
      {
        icon: "📦",
        title: "Inventory Management",
        description: "Track pet food, medicine, and product stock with automatic alerts for low inventory.",
        rating: 4.8,
        benefits: ["Stock alerts", "No shortages", "Efficient supply"]
      },
      {
        icon: "👥",
        title: "Client CRM",
        description: "Keep a complete history of pets, owners, and services for personalized marketing.",
        rating: 4.7,
        benefits: ["Full history", "Personalized offers", "Better service"]
      }
    ],
    automation: [
      {
        icon: "🤖",
        title: "Skilabot Chatbot",
        description: "Answer questions, book appointments, and send reminders automatically.",
        rating: 4.9,
        benefits: ["24/7 service", "No manual work", "Quick responses"]
      },
      {
        icon: "📲",
        title: "Automatic Notifications",
        description: "Send order status, appointment reminders, and health tips directly to pet owners.",
        rating: 4.8,
        benefits: ["Real-time updates", "Engaged clients", "Pet wellness"]
      },
      {
        icon: "🔄",
        title: "Marketplace Integration",
        description: "Manage sales of pet products and services across multiple channels in one place.",
        rating: 4.7,
        benefits: ["Multichannel", "Centralized sales", "More reach"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-black mb-12">
          Benefits for Pet Shops & Vet Clinics
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id ? "bg-[#43BFA3] text-white shadow-lg" : "bg-[#A7E9AF] text-[#36454F] hover:bg-[#43BFA3]/20"}`}
              >
                <IconComponent className="w-5 h-5 text-[#43BFA3]" />
                {tab.label === 'clients' ? 'Clients' : tab.label === 'services' ? 'Services' : tab.label === 'management' ? 'Management' : 'Automation'}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tabContent[activeTab].map((item, index) => (
            <div key={index} className="bg-white border border-[#A7E9AF] rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#43BFA3] mb-3">{item.title}</h3>
              <p className="text-[#36454F] mb-4 leading-relaxed">{item.description}</p>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-[#43BFA3] fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#36454F]">{item.rating}/5.0</span>
              </div>
              {/* Benefits */}
              <div className="flex flex-wrap gap-2">
                {item.benefits.map((benefit, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#A7E9AF] text-[#36454F] text-xs font-medium rounded-full">
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