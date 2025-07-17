import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does AI help increase my course sales?",
      answer: "Our AI automates lead nurturing, follow-ups, and personalized offers via WhatsApp and email, increasing conversion rates and reducing manual work."
    },
    {
      question: "Can I integrate with my LMS and payment platforms?",
      answer: "Yes! The platform integrates with major LMS, payment gateways, and marketing tools, centralizing your student and sales data."
    },
    {
      question: "Can I automate reminders for live classes and events?",
      answer: "Absolutely! The system sends automatic reminders for live classes, webinars, and deadlines via WhatsApp, email, and SMS, improving attendance and engagement."
    },
    {
      question: "Can the AI handle upsell and cross-sell offers?",
      answer: "Yes, our AI analyzes student profiles and recommends new courses or products at the ideal moment, increasing your revenue per student."
    },
    {
      question: "Is it possible to collect feedback and testimonials automatically?",
      answer: "Yes! After course completion, the platform automatically requests feedback and testimonials from your students, helping you improve and sell more."
    },
    {
      question: "How fast can I set up the platform for my business?",
      answer: "You can get started in less than 5 minutes. Our onboarding is simple and our team provides dedicated support during the setup and trial period."
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
            We clarify the main questions about our platform for infoproduct creators
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