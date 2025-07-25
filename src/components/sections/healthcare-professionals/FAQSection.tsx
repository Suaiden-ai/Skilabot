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
      question: "How does Skilabot help improve patient engagement?",
      answer: "Skilabot automates appointment reminders, follow-ups, and health tips, keeping patients informed and reducing no-shows."
    },
    {
      question: "Is patient data secure and compliant?",
      answer: "Yes, all patient data is encrypted and managed according to healthcare regulations (HIPAA, LGPD, GDPR)."
    },
    {
      question: "Can patients book or reschedule appointments online?",
      answer: "Absolutely! Patients can book, reschedule, or cancel appointments online 24/7, reducing phone calls and missed appointments."
    },
    {
      question: "Does Skilabot integrate with EHR/EMR systems?",
      answer: "Skilabot offers integrations with popular EHR/EMR platforms and provides an API for custom connections."
    },
    {
      question: "Can I send automated health campaigns or surveys?",
      answer: "Yes! You can send personalized health campaigns, satisfaction surveys, and collect feedback automatically."
    },
    {
      question: "How do I track patient satisfaction and clinic performance?",
      answer: "Our dashboard provides real-time analytics on patient engagement, appointment flow, and satisfaction scores."
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1565C0]">
            Frequently Asked <span className="text-[#43A047]">Questions</span>
          </h2>
          <p className="text-xl text-[#23272F]">
            Get answers to common questions about our healthcare automation platform
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-[#90CAF9] rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-[#1565C0] hover:text-[#43A047] transition-colors">
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
            className="inline-flex items-center px-6 py-3 bg-[#43A047] text-white font-semibold rounded-lg hover:bg-[#1565C0] transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          {isDesktop ? (
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border-2 border-[#43A047] text-[#43A047] font-semibold rounded-lg hover:bg-[#90CAF9] transition-colors duration-300"
              onClick={() => setShowEmailModal(true)}
            >
              Email
            </button>
          ) : (
            <a 
              href="mailto:contact@skilabot.com" 
              className="inline-flex items-center px-6 py-3 border-2 border-[#43A047] text-[#43A047] font-semibold rounded-lg hover:bg-[#90CAF9] transition-colors duration-300"
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
    </section>
  );
};

export default FAQSection; 