import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does AI help reduce missed classes?",
      answer: "Our AI sends personalized automatic reminders via WhatsApp 24h and 2h before the class, confirms attendance, and manages a dynamic waiting list to fill vacant slots, reducing missed classes by up to 30%."
    },
    {
      question: "Can I offer personalized course packages or promotions via AI?",
      answer: "Yes! The AI analyzes each student's history and offers personalized promotions or course packages. You can configure automatic offers and the AI presents them at the ideal moment in the student relationship."
    },
    {
      question: "Can I get reports on which courses are most in demand?",
      answer: "Absolutely! The system generates detailed reports with specific KPIs for language schools: most popular courses, revenue per course, student retention rate, peak demand hours, and much more."
    },
    {
      question: "Can the AI answer technical questions about language learning?",
      answer: "Yes, our knowledge base is specialized in language education. The AI can clarify doubts about class content, study tips, and general guidance, always directing complex cases to the team."
    },
    {
      question: "How does integration with payment systems and EdTech platforms work?",
      answer: "The platform integrates with major payment systems and educational tools. The AI can suggest complementary materials and process sales or enrollments automatically through WhatsApp."
    },
    {
      question: "Is it possible to track students' progress?",
      answer: "Yes! Students and teachers can send feedback, attendance, and progress updates through WhatsApp and our AI organizes these in a visual timeline, allowing you to track learning and adjust classes as needed."
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