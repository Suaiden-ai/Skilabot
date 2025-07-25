import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FAQSection = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const faqs = [
    {
      question: "How does Skilabot help improve client engagement?",
      answer: "Skilabot automates session reminders, follow-ups, and self-care tips, keeping clients engaged and supported between sessions."
    },
    {
      question: "Is client data secure and confidential?",
      answer: "Yes, all client data is encrypted and managed according to privacy regulations and ethical standards for mental health professionals."
    },
    {
      question: "Can clients book or reschedule sessions online?",
      answer: "Absolutely! Clients can book, reschedule, or cancel sessions online 24/7, making therapy more accessible and flexible."
    },
    {
      question: "Does Skilabot integrate with practice management tools?",
      answer: "Skilabot offers integrations with popular practice management platforms and provides an API for custom connections."
    },
    {
      question: "Can I send automated self-care campaigns or surveys?",
      answer: "Yes! You can send personalized self-care campaigns, satisfaction surveys, and collect feedback automatically."
    },
    {
      question: "How do I track client progress and session attendance?",
      answer: "Our dashboard provides real-time analytics on client engagement, session flow, and progress tracking."
    }
  ];

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#7C3AED]">
            Frequently Asked <span className="text-[#60A5FA]">Questions</span>
          </h2>
          <p className="text-xl text-[#23272F]">
            Get answers to common questions about our platform for psychologists and therapists
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-[#E9D8FD] rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-[#7C3AED] hover:text-[#60A5FA] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#23272F] leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="text-center mt-12">
        <p className="text-[#23272F] mb-6">Still have questions? Contact us!</p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://wa.me/5511999999999" 
            className="inline-flex items-center px-6 py-3 bg-[#7C3AED] text-white font-semibold rounded-lg hover:bg-[#60A5FA] transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          {isDesktop ? (
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border-2 border-[#7C3AED] text-[#7C3AED] font-semibold rounded-lg hover:bg-[#E9D8FD] transition-colors duration-300"
              onClick={() => setShowEmailModal(true)}
            >
              Email
            </button>
          ) : (
            <a 
              href="mailto:contact@skilabot.com" 
              className="inline-flex items-center px-6 py-3 border-2 border-[#7C3AED] text-[#7C3AED] font-semibold rounded-lg hover:bg-[#E9D8FD] transition-colors duration-300"
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
            <Button type="submit" className="w-full bg-purple-400 text-white hover:bg-purple-500" disabled={loading}>
              {loading ? "Sending..." : "Send Email"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FAQSection; 