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
      answer: "Our AI sends personalized automatic reminders via WhatsApp before each class, confirms attendance, and manages a dynamic waiting list to fill vacant spots, reducing absences by up to 40%."
    },
    {
      question: "Can I track student progress and attendance?",
      answer: "Yes! The platform provides real-time dashboards with attendance, grades, and engagement metrics for each student, making it easy to monitor and support their development."
    },
    {
      question: "Does the system integrate with other EdTech platforms?",
      answer: "Absolutely! Our solution integrates with major EdTech and school management systems, ensuring seamless data flow and centralized information."
    },
    {
      question: "Can students and parents receive personalized messages?",
      answer: "Yes, the AI can send personalized reminders, feedback, and important updates to students and parents, improving communication and engagement."
    },
    {
      question: "Is it possible to automate document management (certificates, reports)?",
      answer: "Yes! The platform automatically organizes certificates, grade reports, and student files, making them easily accessible and securely stored."
    },
    {
      question: "How fast can I set up the platform for my school?",
      answer: "You can get started in less than 5 minutes. Our onboarding is simple and our team provides dedicated support during the setup and trial period."
    }
  ];

  return (
    <section id="faq-section" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Frequently Asked
            </span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            We clarify the main questions about our platform for technical schools
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