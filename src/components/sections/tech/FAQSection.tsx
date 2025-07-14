
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How can I automatically notify the customer about repair status?",
      answer: "The system sends automatic updates via WhatsApp as you update the status in the panel. The customer receives real-time notifications about each stage: receipt, diagnosis, repair in progress, testing and completion."
    },
    {
      question: "Does the tool allow me to receive photos or videos of the problem?",
      answer: "Yes! The customer can send photos and videos directly through WhatsApp. Our AI performs a pre-analysis of the images to help with initial diagnosis, saving time in triage."
    },
    {
      question: "Can I integrate with other service order management software I'm already using?",
      answer: "Absolutely! We have native integrations with the main service order management systems in the market. The setup is simple and doesn't interfere with your current workflow."
    },
    {
      question: "How does the intelligent prioritization system work?",
      answer: "Our AI analyzes factors such as repair urgency, agreed SLA, customer type and parts availability to automatically suggest the optimal order for service attendance."
    },
    {
      question: "Does the system work outside business hours?",
      answer: "Yes! The AI operates 24/7, collecting customer information, answering basic questions and organizing calls for when you resume service."
    },
    {
      question: "Can I customize automatic messages?",
      answer: "Of course! You can customize all automatic messages with your technical support identity. We have ready templates that can be adapted to your needs."
    },
    {
      question: "How does inventory control integration work?",
      answer: "The system can connect with your inventory control via API. When a repair is requested, it automatically checks the availability of necessary parts and informs the real deadline to the customer."
    },
    {
      question: "Is there a limit on messages or services?",
      answer: "Our plans are sized according to your technical support volume, from small businesses to large support networks. Check our plans to find the ideal one for you."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Frequently Asked</span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to the main questions about our platform
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
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
