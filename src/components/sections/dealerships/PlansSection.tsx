import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
      "Integration with Instagram, Messenger, WhatsApp, and more"
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

type PlansSectionProps = {
  onChoosePlan?: (plan: "basic" | "Intermediate" | "custom") => void;
};

const DealershipsPlansSection = ({ onChoosePlan }: PlansSectionProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChoosePlan = useCallback((plan: "basic" | "Intermediate" | "custom") => {
    if (onChoosePlan) return onChoosePlan(plan);
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
  }, [onChoosePlan, user, navigate]);

  return (
    <section id="plans-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Choose Your Plan
        </h2>
        {/* Carousel responsivo para todos os tamanhos */}
        {/* Mobile: stack cards em coluna */}
        <div className="flex flex-col gap-6 md:hidden mb-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 border bg-white flex flex-col h-full transition-all duration-300 ease-in-out
                ${plan.highlight ? 'border-blue-500 shadow-2xl scale-105 z-20' : 'border-gray-200 shadow-lg'}
                hover:scale-105 hover:shadow-2xl hover:z-30
              `}
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-900 text-center">{plan.name}</h3>
              <div className="text-center mb-4">
                <span className={`text-4xl font-bold ${plan.highlight ? 'text-blue-600' : 'text-gray-900'}`}>{plan.price}</span>
              </div>
              <p className="text-gray-600 text-center mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-4">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <Check className={`w-5 h-5 ${plan.highlight ? 'text-blue-500' : 'text-green-500'}`} />
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
                className={`w-full py-3 rounded-full font-semibold ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'}`}
                onClick={() => handleChoosePlan(idx === 0 ? "basic" : idx === 1 ? "Intermediate" : "custom")}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Choose Plan'}
              </Button>
            </div>
          ))}
        </div>
        {/* Desktop: Swiper carrossel */}
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="mb-8 overflow-visible hidden md:block"
        >
          {plans.map((plan, idx) => (
            <SwiperSlide key={plan.name} className="overflow-visible">
              <div
                className={`rounded-3xl p-8 border bg-white flex flex-col h-full transition-all duration-300 ease-in-out
                  ${plan.highlight ? 'border-blue-500 shadow-2xl scale-105 z-20' : 'border-gray-200 shadow-lg'}
                  hover:scale-105 hover:shadow-2xl hover:z-30
                `}
              >
                <h3 className="text-2xl font-bold mb-2 text-gray-900 text-center">{plan.name}</h3>
                <div className="text-center mb-4">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-blue-600' : 'text-gray-900'}`}>{plan.price}</span>
                </div>
                <p className="text-gray-600 text-center mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-4">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <Check className={`w-5 h-5 ${plan.highlight ? 'text-blue-500' : 'text-green-500'}`} />
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
                  className={`w-full py-3 rounded-full font-semibold ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'}`}
                  onClick={() => handleChoosePlan(idx === 0 ? "basic" : idx === 1 ? "Intermediate" : "custom")}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Choose Plan'}
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Comparison Table */}
        <div className="mt-16 max-w-5xl mx-auto hidden md:block">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Compare Plans</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow text-sm md:text-base">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b text-left text-gray-700 font-semibold">Feature</th>
                  <th className="py-3 px-4 border-b text-center text-gray-700 font-semibold">Basic</th>
                  <th className="py-3 px-4 border-b text-center text-gray-700 font-semibold bg-blue-50">Intermediary</th>
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
                  <td className="py-2 px-4 border-b">Dedicated Support & Onboarding</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center bg-blue-50">-</td>
                  <td className="py-2 px-4 border-b text-center">Yes</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Scheduling Workflows</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center bg-blue-50">-</td>
                  <td className="py-2 px-4 border-b text-center">Yes</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Sales Follow-ups</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center bg-blue-50">-</td>
                  <td className="py-2 px-4 border-b text-center">Yes</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Email Automation</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center bg-blue-50">-</td>
                  <td className="py-2 px-4 border-b text-center">Yes</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Integration with Instagram, Messenger, WhatsApp, and more</td>
                  <td className="py-2 px-4 text-center">-</td>
                  <td className="py-2 px-4 text-center bg-blue-50">-</td>
                  <td className="py-2 px-4 text-center">Yes</td>
                </tr>
              </tbody>
            </table>
            <div className="text-xs text-gray-500 mt-2">*Unlimited features available upon consulting and custom implementation.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealershipsPlansSection;
