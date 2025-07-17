import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI chatbot help with voter engagement?",
    answer: "The chatbot responds instantly to voters, collects suggestions and complaints, and keeps your base informed 24/7."
  },
  {
    question: "Can I send segmented messages to different audiences?",
    answer: "Yes! You can segment your audience by location, interests, or engagement level and send personalized messages easily."
  },
  {
    question: "Does the platform integrate with social media?",
    answer: "Absolutely! The chatbot works on WhatsApp, Instagram, and Facebook, centralizing all conversations in one dashboard."
  },
  {
    question: "Is it possible to track the main demands and topics?",
    answer: "Yes, the dashboard provides reports on the most discussed topics, engagement rates, and suggestions received."
  },
  {
    question: "Can I automate reminders for events and meetings?",
    answer: "Definitely! The AI can send automatic reminders to your base about events, meetings, and important dates."
  }
];

const FAQSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">Frequently Asked</span> Questions
        </h2>
        <p className="text-xl text-gray-600">
          Get answers to the main questions about our platform for political agents
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
    </div>
  </section>
);

export default FAQSection; 