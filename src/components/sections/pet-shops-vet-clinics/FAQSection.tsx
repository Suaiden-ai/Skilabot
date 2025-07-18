import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the platform help schedule appointments and grooming for pets?",
      answer: "Clients can book appointments, grooming, and other services directly via WhatsApp, Instagram, or website. The system sends automatic reminders and confirmations, reducing no-shows and optimizing your clinic or pet shop's schedule."
    },
    {
      question: "Can I send vaccination and follow-up reminders?",
      answer: "Yes! The platform sends automatic reminders for vaccinations, follow-up appointments, and check-ups, ensuring pets are always up to date with their health."
    },
    {
      question: "Can I promote offers and news to my clients?",
      answer: "With just a few clicks, send promotions, news, and health tips to all your clients or segment by profile, increasing engagement and sales."
    },
    {
      question: "Is the platform secure and easy to use?",
      answer: "Yes! We designed everything to be intuitive, secure, and practical for both you and your clients."
    },
    {
      question: "How does the free trial work?",
      answer: "You can try all features free for 7 days, no commitment. After that, choose the plan that best fits your business."
    }
  ];

  return (
    <section id="faq-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#36454F]">
            Get your questions answered about our solution for pet shops and vet clinics
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-[#A7E9AF] rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-[#36454F] hover:text-[#43BFA3] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#36454F] leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-12">
          <p className="text-[#36454F] mb-6">Still have questions? Contact us!</p>
          <div className="flex gap-4 justify-center">
            <a 
              href="https://wa.me/5511999999999" 
              className="inline-flex items-center px-6 py-3 bg-[#43BFA3] text-white font-semibold rounded-lg hover:bg-[#369e85] transition-colors duration-300"
              target="_blank" 
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a 
              href="mailto:contato@seudominio.com" 
              className="inline-flex items-center px-6 py-3 border-2 border-[#43BFA3] text-[#43BFA3] font-semibold rounded-lg hover:bg-[#A7E9AF]/20 transition-colors duration-300"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 