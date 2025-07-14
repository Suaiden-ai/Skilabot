
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does AI help qualify leads automatically?",
      answer: "Our AI analyzes lead behavior, responses, and engagement patterns to score leads in real-time. It asks qualifying questions naturally through WhatsApp conversations and categorizes leads based on budget, timeline, decision-making authority, and specific needs, ensuring your team focuses on the most promising prospects."
    },
    {
      question: "Can I create personalized campaigns for different client segments?",
      answer: "Absolutely! The platform allows you to create multiple campaign workflows tailored to different industries, client sizes, or service types. Our AI personalizes messages based on lead data, previous interactions, and behavioral patterns to maximize engagement and conversion rates."
    },
    {
      question: "How does the multi-channel integration work?",
      answer: "Our system connects WhatsApp, Instagram, Facebook Messenger, and email into one unified platform. Leads from different channels are automatically synchronized, and you can orchestrate cross-channel campaigns while maintaining conversation context across all touchpoints."
    },
    {
      question: "Can I track ROI for each client and campaign?",
      answer: "Yes! Our dashboard provides detailed analytics including cost per lead, conversion rates, client lifetime value, and ROI per campaign. You can generate white-label reports to share with clients, showing exactly how your marketing efforts are performing across all channels."
    },
    {
      question: "Does the system integrate with existing CRM and marketing tools?",
      answer: "We offer native integrations with popular CRMs like HubSpot, Salesforce, and Pipedrive, as well as marketing tools like Google Ads, Facebook Ads Manager, and email platforms. Our API also allows custom integrations with proprietary systems."
    },
    {
      question: "How does the AI handle different languages and time zones for global campaigns?",
      answer: "Our AI supports multiple languages and can automatically detect the lead's preferred language. For global campaigns, it respects time zones for optimal message delivery and can adapt cultural communication nuances based on geographic location."
    },
    {
      question: "Can I set up automated follow-up sequences?",
      answer: "Definitely! Create sophisticated drip campaigns with conditional logic based on lead responses, engagement levels, and behavior. The AI can pause, accelerate, or redirect sequences based on real-time interactions, ensuring relevant and timely communication."
    },
    {
      question: "What kind of analytics and reporting do you provide?",
      answer: "Comprehensive analytics including lead sources, conversion funnels, response times, engagement rates, campaign performance, and revenue attribution. All reports can be white-labeled and customized for client presentations, with real-time dashboards for campaign monitoring."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Frequently Asked
            </span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our marketing automation platform
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
