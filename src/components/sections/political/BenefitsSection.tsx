import { useState } from "react";
import { Star, MessageCircle, Users, Megaphone, BarChart3 } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("engagement");

  const tabs = [
    { id: "engagement", label: "Engagement", icon: MessageCircle },
    { id: "audience", label: "Audience", icon: Users },
    { id: "communication", label: "Communication", icon: Megaphone },
    { id: "analytics", label: "Analytics", icon: BarChart3 }
  ];

  const tabContent = {
    engagement: [
      {
        icon: "💬",
        title: "24/7 Voter Response",
        description: "Instantly answer voters' questions and collect feedback at any time, building trust and credibility.",
        rating: 4.9,
        benefits: ["Always available", "Personalized answers", "Faster response"]
      },
      {
        icon: "🤝",
        title: "Relationship Building",
        description: "Strengthen your connection with the electorate through empathetic and consistent communication.",
        rating: 4.8,
        benefits: ["Empathy", "Consistency", "Trust"]
      },
      {
        icon: "📈",
        title: "Engagement Growth",
        description: "Boost participation in campaigns and events with interactive messages and gamification.",
        rating: 4.7,
        benefits: ["More participation", "Interactive messages", "Gamification"]
      }
    ],
    audience: [
      {
        icon: "📍",
        title: "Audience Segmentation",
        description: "Segment voters by location, interests, or engagement level for targeted communication.",
        rating: 4.8,
        benefits: ["Location filters", "Interest groups", "Personalization"]
      },
      {
        icon: "📢",
        title: "Targeted Campaigns",
        description: "Send messages and updates to specific groups, maximizing campaign effectiveness.",
        rating: 4.7,
        benefits: ["Custom groups", "Relevant updates", "Higher engagement"]
      },
      {
        icon: "🧑‍🤝‍🧑",
        title: "Community Insights",
        description: "Discover trends and preferences within your audience to refine your strategies.",
        rating: 4.7,
        benefits: ["Trend discovery", "Preference analysis", "Better targeting"]
      }
    ],
    communication: [
      {
        icon: "📲",
        title: "Multi-Channel Integration",
        description: "Centralize conversations from WhatsApp, Instagram, and Facebook in one dashboard.",
        rating: 4.9,
        benefits: ["All-in-one dashboard", "Social media integration", "Easy management"]
      },
      {
        icon: "🔔",
        title: "Automated Reminders",
        description: "Automatically remind your base about events, meetings, and important dates.",
        rating: 4.8,
        benefits: ["Event reminders", "Meeting notifications", "No-shows reduced"]
      },
      {
        icon: "🗨️",
        title: "Instant Broadcasts",
        description: "Send urgent communications to your entire base instantly, ensuring everyone is informed.",
        rating: 4.7,
        benefits: ["Urgent alerts", "Mass communication", "Quick reach"]
      }
    ],
    analytics: [
      {
        icon: "📊",
        title: "Engagement Reports",
        description: "Track the most discussed topics, engagement rates, and suggestions received.",
        rating: 4.8,
        benefits: ["Topic tracking", "Engagement metrics", "Data-driven decisions"]
      },
      {
        icon: "🗂️",
        title: "Demand Management",
        description: "Organize and analyze all suggestions, complaints, and compliments from voters.",
        rating: 4.7,
        benefits: ["Centralized demands", "Easy analysis", "Better service"]
      },
      {
        icon: "📉",
        title: "Sentiment Analysis",
        description: "Analyze voter sentiment and feedback to improve communication and campaign strategies.",
        rating: 4.7,
        benefits: ["Sentiment tracking", "Feedback analysis", "Strategy improvement"]
      }
    ]
  };

  return (
    <section id="benefits-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Political Agents
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
                    ? "bg-pink-600 text-white shadow-lg"
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