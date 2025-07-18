import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does Skilabot help condominium administrators?",
      answer: "Skilabot automates resident communications, maintenance requests, and payment reminders, making condominium management more efficient and transparent."
    },
    {
      question: "Can I manage maintenance and service requests easily?",
      answer: "Yes! Our platform provides real-time tracking and management of maintenance and service requests, ensuring quick resolution and resident satisfaction."
    },
    {
      question: "Does Skilabot integrate with accounting and payment systems?",
      answer: "Absolutely. Skilabot integrates with popular accounting and payment platforms, and offers an API for custom integrations."
    },
    {
      question: "Is resident data secure?",
      answer: "All resident data is encrypted and managed according to the highest security standards, ensuring privacy and compliance."
    },
    {
      question: "Can I send automated announcements and alerts?",
      answer: "Yes! You can schedule and send targeted announcements, alerts, and reminders automatically to all residents."
    },
    {
      question: "How do I analyze payments and resident feedback?",
      answer: "Our dashboard provides real-time analytics on payments, maintenance flow, and resident feedback to help you make data-driven decisions."
    }
  ];

  return (
    <section id="faq-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-gray-400 bg-clip-text text-transparent">
              Frequently Asked
            </span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our platform for condominium administrators
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-green-200 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-6">Still have questions? Contact us!</p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://wa.me/5511999999999" 
            className="inline-flex items-center px-6 py-3 bg-green-400 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a 
            href="mailto:contact@skilabot.com" 
            className="inline-flex items-center px-6 py-3 border-2 border-green-400 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 