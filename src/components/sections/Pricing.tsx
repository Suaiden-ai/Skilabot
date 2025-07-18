
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "$149/mo",
      description: "Perfect for small dealerships starting with AI automation.",
      benefits: [
        "1 WhatsApp channel",
        "1 customizable AI Agent",
        "Monitor conversations via Chatwoot"
      ],
      highlight: false
    },
    {
      name: "Intermediary Plan",
      price: "$249/mo",
      description: "For growing teams needing more channels and advanced features.",
      benefits: [
        "2 WhatsApp/Instagram channels",
        "2 customizable AI Agents",
        "Monitor conversations via Chatwoot"
      ],
      highlight: false
    },
    {
      name: "Specialized Consulting",
      price: "Custom",
      description: "Custom solutions for complex operations. We develop intelligent automations and tailored integrations for large-scale operations.",
      benefits: [
        "Process Automation and Customized Solutions",
        "System Integration (CRM, ERP, APIs, databases, and others)",
        "API Consumption and Integration",
        "Advanced Chatbot and AI Agent Development",
        "Web-Based Automation and Integration Solutions",
        "Workflow Automation and RPA",
        "Email automation",
        "Integration with Instagram, Messenger, and more"
      ],
      highlight: true
    }
  ];
  const exclusiveConsultingBenefits = [
    "Process Automation and Customized Solutions",
    "System Integration (CRM, ERP, APIs, databases, and others)",
    "API Consumption and Integration",
    "Advanced Chatbot and AI Agent Development",
    "Web-Based Automation and Integration Solutions",
    "Workflow Automation and RPA",
    "Email automation",
    "Integration with Instagram, Messenger, and more"
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-pink-400 text-sm uppercase tracking-wider mb-4">Skilabot PRICING</p>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Empower your chatting
          </h2>
          <h2 className="text-5xl font-bold mb-8">
            with <span className="text-pink-500">Specialized Consulting</span>
          </h2>
          <p className="text-gray-600 mb-12">All premium plans include:</p>
        </div>

        {/* Pricing Cards - NOVOS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-10 min-w-[320px] shadow-lg flex flex-col h-full transition-all duration-300 ease-in-out
                ${plan.highlight
                  ? 'bg-gradient-to-br from-orange-400 to-pink-500 text-white border-0'
                  : 'bg-white border border-pink-200 text-gray-900'}
              `}
            >
              <h3 className={`text-2xl font-bold mb-2 text-center ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
              <div className="text-center mb-4">
                <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
              </div>
              <p className={`text-center mb-6 ${plan.highlight ? 'text-white/80' : 'text-gray-600'}`}>{plan.description}</p>
              <ul className="space-y-3 mb-4">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className={`flex items-center gap-2 ${plan.highlight ? 'text-white' : 'text-gray-700'}`}>
                    <Check className={`w-5 h-5 ${plan.highlight ? 'text-white' : 'text-pink-500'}`} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              {/* Exclusivos do Specialized Consulting */}
              {plan.name !== "Specialized Consulting" && (
                <ul className="space-y-2 mb-8">
                  {exclusiveConsultingBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                      <X className="w-4 h-4 text-gray-300" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Button
                className={`w-full py-3 rounded-full font-semibold mt-auto ${plan.highlight ? 'bg-white text-pink-500 hover:bg-gray-100' : 'bg-pink-500 hover:bg-pink-600 text-white'}`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Choose Plan'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
