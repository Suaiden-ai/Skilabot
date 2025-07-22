import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  const isMobile = useIsMobile();
  const [showModal, setShowModal] = useState(false);
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10 md:p-14">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 text-center tracking-tight">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-xl mx-auto">
            We'd love to hear from you! Reach out to us using the information below or send us an email directly.
          </p>
          <div className="mb-10 space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="w-7 h-7 text-pink-500 bg-pink-100 rounded-full p-1 shadow" />
              <span className="font-semibold text-gray-900">Email:</span> <a href="mailto:admin@skilabot.com" className="text-pink-600 hover:underline transition-colors">admin@skilabot.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-7 h-7 text-orange-500 bg-orange-100 rounded-full p-1 shadow" />
              <span className="font-semibold text-gray-900">Phone:</span> <a href="tel:+12345678900" className="text-orange-700 hover:underline transition-colors">+1 (234) 567 8900</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-7 h-7 text-purple-500 bg-purple-100 rounded-full p-1 shadow" />
              <span className="font-semibold text-gray-900">Address:</span> <span className="text-gray-700">Los Angeles, CA, USA</span>
            </div>
          </div>
          {isMobile ? (
            <a href="mailto:admin@skilabot.com" className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg shadow hover:from-pink-600 hover:to-orange-600 transition-all duration-200">
              Contact us by Email
            </a>
          ) : (
            <Button onClick={() => setShowModal(true)} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg shadow hover:from-pink-600 hover:to-orange-600 transition-all duration-200">
              Contact us by Email
            </Button>
          )}
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl border-0">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2 text-center">Contact us by Email</DialogTitle>
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
              <form className="space-y-5" onSubmit={handleSubmit}>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="h-12 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-pink-500 focus-visible:ring-0 px-0 text-lg"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="h-12 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-orange-500 focus-visible:ring-0 px-0 text-lg"
                />
                <Textarea
                  name="message"
                  placeholder="Your message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-pink-500 focus-visible:ring-0 px-0 resize-none text-lg"
                />
                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg mt-4 transition-all duration-200" disabled={loading}>
                  {loading ? "Sending..." : "Send Email"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
} 