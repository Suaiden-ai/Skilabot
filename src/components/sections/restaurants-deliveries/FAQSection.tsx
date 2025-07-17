import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does Skilabot help restaurants and delivery services?",
      answer: "Skilabot automates order notifications, customer feedback, and marketing campaigns, making operations smoother and boosting customer satisfaction."
    },
    {
      question: "Can I track orders and deliveries in real time?",
      answer: "Yes! Our platform provides real-time tracking for all orders and deliveries, keeping your team and customers updated every step of the way."
    },
    {
      question: "Does Skilabot integrate with POS and delivery platforms?",
      answer: "Absolutely. Skilabot integrates with popular POS systems and delivery platforms, and offers an API for custom connections."
    },
    {
      question: "Is customer data secure?",
      answer: "All customer data is encrypted and managed according to the highest security standards, ensuring privacy and compliance."
    },
    {
      question: "Can I send automated promotions and reminders?",
      answer: "Yes! You can schedule and send targeted promotions, reminders, and feedback requests automatically to your customers."
    },
    {
      question: "How do I analyze sales and customer feedback?",
      answer: "Our dashboard provides real-time analytics on sales, order flow, and customer feedback to help you make data-driven decisions."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Frequently Asked
            </span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our platform for restaurants and delivery businesses
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-yellow-200 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-red-600 transition-colors">
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
            className="inline-flex items-center px-6 py-3 bg-red-400 text-white font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a 
            href="mailto:contact@skilabot.com" 
            className="inline-flex items-center px-6 py-3 border-2 border-red-400 text-red-600 font-semibold rounded-lg hover:bg-yellow-50 transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 