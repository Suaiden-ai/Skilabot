import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

function FAQSection() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/.netlify/functions/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess("Message sent successfully! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;

  return (
    <section id="faq-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Frequently Asked <span className="text-[#C62828]">Questions</span>
          </h2>
          <p className="text-xl text-black">
            Get answers to the main questions about our platform for political agents
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-[#E3E6F0] rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-black hover:text-[#C62828] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-black leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-12">
          <p className="text-black mb-6">Still have questions? Contact us!</p>
          <div className="flex gap-4 justify-center">
            <a 
              href="https://wa.me/5511999999999" 
              className="inline-flex items-center px-6 py-3 bg-[#C62828] text-white font-semibold rounded-lg hover:bg-[#a61b1b] transition-colors duration-300"
              target="_blank" 
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            {isDesktop ? (
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 border-2 border-[#C62828] text-[#C62828] font-semibold rounded-lg hover:bg-[#f8d7da] transition-colors duration-300"
                onClick={() => setShowEmailModal(true)}
              >
                Email
              </button>
            ) : (
              <a 
                href="mailto:contact@smartchat.com" 
                className="inline-flex items-center px-6 py-3 border-2 border-[#C62828] text-[#C62828] font-semibold rounded-lg hover:bg-[#f8d7da] transition-colors duration-300"
              >
                Email
              </a>
            )}
          </div>
        </div>
        <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact us by Email</DialogTitle>
            </DialogHeader>
            {success && (
              <Alert className="mb-4">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                placeholder="Your message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Email"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

export default FAQSection; 