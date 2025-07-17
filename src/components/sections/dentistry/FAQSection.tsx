import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does AI help reduce missed dental appointments?",
      answer: "Our AI sends personalized automatic reminders via WhatsApp 24h and 2h before the appointment, confirms attendance, and manages a dynamic waiting list to fill vacant slots, reducing missed appointments by up to 40%."
    },
    {
      question: "Can I offer personalized treatment plans or promotions via AI?",
      answer: "Yes! The AI analyzes each patient's history and offers personalized promotions or treatment plans. You can configure automatic packages and the AI offers them at the ideal moment in the patient relationship."
    },
    {
      question: "Can I get reports on which procedures are most in demand?",
      answer: "Absolutely! The system generates detailed reports with specific KPIs for dental clinics: most popular procedures, revenue per treatment type, patient retention rate, peak demand hours, and much more."
    },
    {
      question: "Can the AI answer technical questions about dental procedures?",
      answer: "Yes, our knowledge base is specialized in dentistry. The AI can clarify doubts about pre and post-procedure care, necessary precautions, basic contraindications, and general guidance, always directing complex cases to the team."
    },
    {
      question: "How does integration with payment systems and inventory work?",
      answer: "The platform integrates with major payment systems and allows inventory control for dental products. The AI can suggest complementary products to performed treatments and process sales automatically through WhatsApp."
    },
    {
      question: "Is it possible to track patients' treatment progress?",
      answer: "Yes! Patients can send follow-up photos or x-rays through WhatsApp and our AI organizes these images in a visual timeline, allowing you to track treatment progress and adjust protocols as needed."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Frequently Asked
            </span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            We clarify the main questions about our platform
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
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
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a 
            href="mailto:contact@smartchat.com" 
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