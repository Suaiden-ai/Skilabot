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
      question: "How does Skilabot help small businesses with accounting?",
      answer: "Skilabot automates invoicing, tax calculation, and financial reporting, making accounting easy and stress-free for small businesses."
    },
    {
      question: "Can I manage all my tax obligations in one place?",
      answer: "Yes! Our platform lets you calculate, file, and track all your tax documents and deadlines from a single dashboard."
    },
    {
      question: "Does Skilabot integrate with payment and banking systems?",
      answer: "Absolutely. Skilabot integrates with major payment processors and banks, and offers an API for custom connections."
    },
    {
      question: "Is my data secure?",
      answer: "All your data is encrypted and managed according to the highest security standards, ensuring privacy and compliance."
    },
    {
      question: "Can I get automated reminders for tax deadlines?",
      answer: "Yes! You can schedule and receive reminders for all important tax dates and obligations automatically."
    },
    {
      question: "How do I analyze my business performance?",
      answer: "Our dashboard provides real-time analytics on revenue, expenses, and business growth to help you make informed decisions."
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#23272F]">
            Frequently Asked Questions
          </h2>
          <p className="text-xl mb-8 text-[#343A40]">
            Get answers to common questions about our digital accounting platform for small businesses
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-[#D1D5DB] rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-[#23272F]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#343A40]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="text-center mt-12">
        <p className="mb-6 text-[#343A40]">Still have questions? Contact us!</p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://wa.me/15555555555" 
            className="inline-flex items-center px-6 py-3 bg-[#23272F] text-white font-semibold rounded-lg hover:bg-[#343A40] transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          {isDesktop ? (
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border-2 border-[#23272F] text-[#23272F] font-semibold rounded-lg hover:bg-[#F1F3F4] transition-colors duration-300"
              onClick={() => setShowEmailModal(true)}
            >
              Email
            </button>
          ) : (
            <a 
              href="mailto:contact@skilabot.com" 
              className="inline-flex items-center px-6 py-3 border-2 border-[#23272F] text-[#23272F] font-semibold rounded-lg hover:bg-[#F1F3F4] transition-colors duration-300"
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
            <Button type="submit" className="w-full bg-[#1565C0] text-white hover:bg-[#43A047]" disabled={loading}>
              {loading ? "Sending..." : "Send Email"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FAQSection; 