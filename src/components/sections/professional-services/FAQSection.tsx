import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does Skilabot help professional service providers?",
      answer: "Skilabot automates scheduling, client communication, and document management, making your workflow more efficient and your clients happier."
    },
    {
      question: "Can I manage all my appointments and clients in one place?",
      answer: "Yes! Our platform lets you schedule, track, and manage all appointments, clients, and documents from a single dashboard."
    },
    {
      question: "Does Skilabot integrate with business and productivity tools?",
      answer: "Absolutely. Skilabot integrates with popular business tools and offers an API for custom connections."
    },
    {
      question: "Is my data secure?",
      answer: "All your data is encrypted and managed according to the highest security standards, ensuring privacy and compliance."
    },
    {
      question: "Can I get automated reminders for meetings and deadlines?",
      answer: "Yes! You can schedule and receive reminders for all important meetings, deadlines, and tasks automatically."
    },
    {
      question: "How do I analyze my business performance?",
      answer: "Our dashboard provides real-time analytics on projects, client engagement, and business growth to help you make informed decisions."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-900 via-green-400 to-gray-400 bg-clip-text text-transparent">
              Frequently Asked
            </span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our platform for professional services
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-blue-200 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-900 transition-colors">
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
            className="inline-flex items-center px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-green-400 transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a 
            href="mailto:contact@skilabot.com" 
            className="inline-flex items-center px-6 py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 