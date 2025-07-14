
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does AI help convert more leads into members?",
      answer: "Our AI analyzes each lead's behavior and automatically personalizes messages. It identifies the ideal moment to send offers, instantly answers questions and maintains prospect interest until conversion. On average, our clients see a 60% increase in lead conversion."
    },
    {
      question: "Does the system only work on WhatsApp?",
      answer: "While WhatsApp is our main platform due to its popularity in Brazil, we also offer integration with Instagram Direct, Facebook Messenger and SMS. WhatsApp represents 85% of our clients' conversations, which is why we focus on it."
    },
    {
      question: "Is there integration with gym management systems?",
      answer: "Yes! We integrate with major systems like Tecnofit, FitSW, Academia Plus, SisGym and many others. Integration allows automatic synchronization of member data, plans, payments and schedules."
    },
    {
      question: "Is it difficult to configure AI for my gym?",
      answer: "Not at all! Setup takes less than 5 minutes. Our support team does all the initial setup for you, including message customization with your gym's identity. You just need to provide us with some basic information."
    },
    {
      question: "How does the free trial period work?",
      answer: "You have 7 full days to test all features without paying anything. We don't ask for a credit card and there's no setup fee. During the trial, we offer dedicated support to ensure you make the most of the platform."
    },
    {
      question: "Can AI understand fitness slang and language?",
      answer: "Absolutely! Our AI was specifically trained for the fitness market. It understands terms like 'bulking', 'cutting', 'hypertrophy', 'cardio' and hundreds of other expressions from the fitness universe, responding naturally and expertly."
    },
    {
      question: "Can I customize AI messages?",
      answer: "Yes! You can completely customize the tone, style and content of messages. You can create specific flows for different types of members (beginner, advanced, weight loss, muscle gain) and define personalized responses for your gym."
    },
    {
      question: "How many members can I serve simultaneously?",
      answer: "There's no limit! AI can handle thousands of conversations simultaneously, 24 hours a day. This means you'll never lose a lead for not being able to respond quickly, even during peak hours."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Get your main questions about our platform answered
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 hover:shadow-md transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-600 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6">
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
};

export default FAQSection;
