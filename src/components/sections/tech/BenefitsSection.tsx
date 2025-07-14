
import { useState } from "react";
import { Calendar, Rocket, Target } from "lucide-react";

const planTabs = [
  { id: "basic", label: "Basic Plan", icon: Calendar },
  { id: "medio", label: "Medium Plan", icon: Rocket },
  { id: "consultoria", label: "Specialized Consulting", icon: Target },
];

const planBenefits = {
  basic: [
    {
      icon: "💬",
      title: "SUPPORT CHANNEL",
      description: "Get an exclusive channel for automated and human support via WhatsApp.",
      benefits: [],
    },
    {
      icon: "🤖",
      title: "CUSTOMIZABLE AI AGENT",
      description: "Have a customizable AI Agent to serve your customers via WhatsApp. You can set:",
      benefits: [
        "Agent Name",
        "Company Name",
        "Agent Type",
        "Personality",
        "Custom Prompt (optional)",
      ],
    },
    {
      icon: "👀",
      title: "MONITOR CONVERSATIONS",
      description: "Monitor all WhatsApp conversations in real time through the omnichannel platform Chatwoot.",
      benefits: [],
    },
  ],
  medio: [
    {
      icon: "💬",
      title: "SUPPORT CHANNELS",
      description: "Get two exclusive channels for automated and human support via WhatsApp and Instagram.",
      benefits: [],
    },
    {
      icon: "🤖",
      title: "CUSTOMIZABLE AI AGENTS",
      description: "Have two customizable AI Agents to serve your customers via WhatsApp and Instagram. You can set:",
      benefits: [
        "Agent Name",
        "Company Name",
        "Agent Type",
        "Personality",
        "Custom Prompt (optional)",
      ],
    },
    {
      icon: "👀",
      title: "MONITOR CONVERSATIONS",
      description: "Monitor all WhatsApp and Instagram conversations in real time through the omnichannel platform Chatwoot.",
      benefits: [],
    },
  ],
  consultoria: [
    {
      icon: "🎯",
      title: "Soluções sob medida para grandes operações",
      description:
        "Automações customizadas, integração total com sistemas legados, treinamento e suporte dedicado.",
      benefits: [
        "Projetos personalizados",
        "Automação avançada",
        "Integração com sistemas legados",
        "Treinamento e suporte dedicado",
      ],
    },
  ],
};

const BenefitsSection = () => {
  const [activePlan, setActivePlan] = useState("basic");

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Support Plan Benefits
        </h2>

        {/* Plan Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {planTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePlan(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activePlan === tab.id
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

        {/* Plan Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planBenefits[activePlan].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
              <ul className="list-disc pl-5 text-gray-700 mb-2">
                {item.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
