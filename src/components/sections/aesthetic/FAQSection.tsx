
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does AI help reduce no-shows for aesthetic procedures?",
      answer: "Our AI sends personalized automatic reminders via WhatsApp 24h and 2h before the procedure, automatically confirms attendance, and manages a dynamic waiting list to fill vacant slots, reducing no-shows by up to 35%."
    },
    {
      question: "Can I offer personalized promotions or procedure packages via AI?",
      answer: "Yes! The AI analyzes each client's history and offers personalized promotions based on procedures already performed. You can configure automatic packages and the AI offers them at the ideal moment in the client relationship."
    },
    {
      question: "Can I get reports on which procedures sell the most?",
      answer: "Absolutely! The system generates detailed reports with specific KPIs for aesthetic clinics: most popular procedures, revenue per treatment type, client retention rate, peak demand hours, and much more."
    },
    {
      question: "Can the AI answer technical questions about procedures?",
      answer: "Yes, our knowledge base is specialized in aesthetics and beauty procedures. The AI can clarify doubts about pre and post-procedure care, necessary precautions, basic contraindications, and general guidance, always directing complex cases to the team."
    },
    {
      question: "How does integration with payment systems and inventory work?",
      answer: "The platform integrates with major payment systems and allows home care product inventory control. The AI can suggest complementary products to performed treatments and process sales automatically through WhatsApp."
    },
    {
      question: "Is it possible to track clients' treatment progress?",
      answer: "Yes! Clients can send follow-up photos through WhatsApp and our AI organizes these images in a visual timeline, allowing you to track treatment progress and adjust protocols as needed."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
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
    </section>
  );
};

export default FAQSection;
