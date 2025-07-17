import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does Skilabot help improve client engagement?",
      answer: "Skilabot automates session reminders, follow-ups, and self-care tips, keeping clients engaged and supported between sessions."
    },
    {
      question: "Is client data secure and confidential?",
      answer: "Yes, all client data is encrypted and managed according to privacy regulations and ethical standards for mental health professionals."
    },
    {
      question: "Can clients book or reschedule sessions online?",
      answer: "Absolutely! Clients can book, reschedule, or cancel sessions online 24/7, making therapy more accessible and flexible."
    },
    {
      question: "Does Skilabot integrate with practice management tools?",
      answer: "Skilabot offers integrations with popular practice management platforms and provides an API for custom connections."
    },
    {
      question: "Can I send automated self-care campaigns or surveys?",
      answer: "Yes! You can send personalized self-care campaigns, satisfaction surveys, and collect feedback automatically."
    },
    {
      question: "How do I track client progress and session attendance?",
      answer: "Our dashboard provides real-time analytics on client engagement, session flow, and progress tracking."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Frequently Asked
            </span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our platform for psychologists and therapists
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
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-6">Still have questions? Contact us!</p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://wa.me/5511999999999" 
            className="inline-flex items-center px-6 py-3 bg-purple-400 text-white font-semibold rounded-lg hover:bg-purple-500 transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a 
            href="mailto:contact@skilabot.com" 
            className="inline-flex items-center px-6 py-3 border-2 border-purple-400 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 