import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does Skilabot help improve patient engagement?",
      answer: "Skilabot automates appointment reminders, follow-ups, and health tips, keeping patients informed and reducing no-shows."
    },
    {
      question: "Is patient data secure and compliant?",
      answer: "Yes, all patient data is encrypted and managed according to healthcare regulations (HIPAA, LGPD, GDPR)."
    },
    {
      question: "Can patients book or reschedule appointments online?",
      answer: "Absolutely! Patients can book, reschedule, or cancel appointments online 24/7, reducing phone calls and missed appointments."
    },
    {
      question: "Does Skilabot integrate with EHR/EMR systems?",
      answer: "Skilabot offers integrations with popular EHR/EMR platforms and provides an API for custom connections."
    },
    {
      question: "Can I send automated health campaigns or surveys?",
      answer: "Yes! You can send personalized health campaigns, satisfaction surveys, and collect feedback automatically."
    },
    {
      question: "How do I track patient satisfaction and clinic performance?",
      answer: "Our dashboard provides real-time analytics on patient engagement, appointment flow, and satisfaction scores."
    }
  ];

  return (
    <section id="faq-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Frequently Asked
            </span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our healthcare automation platform
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors">
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
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a 
            href="mailto:contact@skilabot.com" 
            className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 