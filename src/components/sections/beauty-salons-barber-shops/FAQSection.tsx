import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does Skilabot help beauty salons and barber shops?",
      answer: "Skilabot automates appointment reminders, client feedback, and marketing campaigns, making your business more efficient and your clients happier."
    },
    {
      question: "Can I manage appointments and staff schedules easily?",
      answer: "Yes! Our platform provides real-time scheduling, staff management, and automated reminders for both clients and staff."
    },
    {
      question: "Does Skilabot integrate with POS and booking platforms?",
      answer: "Absolutely. Skilabot integrates with popular POS and booking systems, and offers an API for custom connections."
    },
    {
      question: "Is client data secure?",
      answer: "All client data is encrypted and managed according to the highest security standards, ensuring privacy and compliance."
    },
    {
      question: "Can I send automated promotions and loyalty rewards?",
      answer: "Yes! You can schedule and send targeted promotions, reminders, and loyalty rewards automatically to your clients."
    },
    {
      question: "How do I analyze sales and client feedback?",
      answer: "Our dashboard provides real-time analytics on sales, appointment flow, and client feedback to help you make data-driven decisions."
    }
  ];

  return (
    <section id="faq-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Frequently Asked
            </span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our platform for beauty salons and barber shops
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-pink-200 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-pink-600 transition-colors">
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
            className="inline-flex items-center px-6 py-3 bg-pink-400 text-white font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a 
            href="mailto:contact@skilabot.com" 
            className="inline-flex items-center px-6 py-3 border-2 border-pink-400 text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 