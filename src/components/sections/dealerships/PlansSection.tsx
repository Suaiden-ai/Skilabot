import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
    name: "Medium Plan",
    price: "$249/mo",
    description: "For growing teams needing more channels and advanced features.",
    benefits: [
      "2 WhatsApp/Instagram channels",
      "2 customizable AI Agents",
      "Monitor conversations via Chatwoot"
    ],
    highlight: true
  },
  {
    name: "Specialized Consulting",
    price: "Custom",
    description: "Tailored solutions for large operations and unique needs.",
    benefits: [
      "Custom automations",
      "Legacy system integration",
      "Dedicated support & training",
      "Personalized onboarding"
    ],
    highlight: false
  }
];

const DealershipsPlansSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChoosePlan = (plan: "basic" | "medium" | "custom") => {
    if (plan === "custom") {
      navigate("/contact-sales");
      return;
    }
    localStorage.setItem("pendingPlan", plan);
    if (!user) {
      navigate("/auth?redirect=/confirm-plan");
    } else {
      navigate("/confirm-plan");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Choose Your Plan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 shadow-lg border transition-all duration-300 bg-white flex flex-col ${plan.highlight ? 'border-blue-500 scale-105 z-10' : 'border-gray-200'}`}
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-900 text-center">{plan.name}</h3>
              <div className="text-center mb-4">
                <span className={`text-4xl font-bold ${plan.highlight ? 'text-blue-600' : 'text-gray-900'}`}>{plan.price}</span>
              </div>
              <p className="text-gray-600 text-center mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <Check className={`w-5 h-5 ${plan.highlight ? 'text-blue-500' : 'text-green-500'}`} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full py-3 rounded-full font-semibold ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'}`}
                onClick={() => handleChoosePlan(idx === 0 ? "basic" : idx === 1 ? "medium" : "custom")}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Choose Plan'}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Comparison Table */}
      <div className="mt-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Compare Plans</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Feature</th>
                <th className="py-3 px-4 border-b text-center text-gray-700 font-semibold">Basic</th>
                <th className="py-3 px-4 border-b text-center text-gray-700 font-semibold bg-blue-50">Medium</th>
                <th className="py-3 px-4 border-b text-center text-gray-700 font-semibold">Specialized Consulting</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">WhatsApp Channels</td>
                <td className="py-2 px-4 border-b text-center">1</td>
                <td className="py-2 px-4 border-b text-center bg-blue-50">2</td>
                <td className="py-2 px-4 border-b text-center">Unlimited*</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Instagram Channels</td>
                <td className="py-2 px-4 border-b text-center">-</td>
                <td className="py-2 px-4 border-b text-center bg-blue-50">2</td>
                <td className="py-2 px-4 border-b text-center">Unlimited*</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Customizable AI Agents</td>
                <td className="py-2 px-4 border-b text-center">1</td>
                <td className="py-2 px-4 border-b text-center bg-blue-50">2</td>
                <td className="py-2 px-4 border-b text-center">Unlimited*</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Chatwoot Integration</td>
                <td className="py-2 px-4 border-b text-center">Yes</td>
                <td className="py-2 px-4 border-b text-center bg-blue-50">Yes</td>
                <td className="py-2 px-4 border-b text-center">Yes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Advanced Analytics</td>
                <td className="py-2 px-4 border-b text-center">-</td>
                <td className="py-2 px-4 border-b text-center bg-blue-50">Yes</td>
                <td className="py-2 px-4 border-b text-center">Yes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Custom Automations</td>
                <td className="py-2 px-4 border-b text-center">-</td>
                <td className="py-2 px-4 border-b text-center bg-blue-50">-</td>
                <td className="py-2 px-4 border-b text-center">Yes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Dedicated Support</td>
                <td className="py-2 px-4 border-b text-center">-</td>
                <td className="py-2 px-4 border-b text-center bg-blue-50">-</td>
                <td className="py-2 px-4 border-b text-center">Yes</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Personalized Onboarding</td>
                <td className="py-2 px-4 text-center">-</td>
                <td className="py-2 px-4 text-center bg-blue-50">-</td>
                <td className="py-2 px-4 text-center">Yes</td>
              </tr>
              {/* Specialized Consulting Features */}
              

            </tbody>
          </table>
          <div className="text-xs text-gray-500 mt-2">*Unlimited features available upon consulting and custom implementation.</div>
        </div>
      </div>
    </section>
  );
};

export default DealershipsPlansSection;
