
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.subject ? `${form.subject}\n\n${form.message}` : form.message
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess("Message sent successfully! We'll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
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
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-teal-400 via-purple-500 to-pink-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <span className="text-white/80 text-sm uppercase tracking-wider ml-2">GET IN TOUCH</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-white mb-8">
              Let's talk
            </h2>
            
            <p className="text-white/90 text-lg mb-12 leading-relaxed">
              We’re here to help you automate, scale, and transform your customer service with AI. Reach out to our team and let’s build the future of your business together.
            </p>
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-white/60 rounded-full"></div>
                  <h4 className="font-semibold text-white/80 uppercase text-sm tracking-wider">PHONE</h4>
                </div>
                <p className="text-white text-xl">+1 (234) 567 890 00</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-white/60 rounded-full"></div>
                  <h4 className="font-semibold text-white/80 uppercase text-sm tracking-wider">EMAIL</h4>
                </div>
                <p className="text-white text-xl">admin@skilabot.com</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-white/60 rounded-full"></div>
                  <h4 className="font-semibold text-white/80 uppercase text-sm tracking-wider">ADDRESS</h4>
                </div>
                <p className="text-white text-xl">
                Los Angeles, CA, USA<br />
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h3>
            <p className="text-gray-600 mb-8">
              Fill out the form and our team will get back to you as soon as possible. Let’s start your journey with Skilabot!
            </p>
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input 
                    name="name"
                    placeholder="Your Name"
                    className="h-12 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-purple-500 focus-visible:ring-0 px-0"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input 
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="h-12 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-purple-500 focus-visible:ring-0 px-0"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Input 
                  name="subject"
                  placeholder="Subject"
                  className="h-12 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-purple-500 focus-visible:ring-0 px-0"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Textarea 
                  name="message"
                  placeholder="Write here message"
                  rows={4}
                  className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-purple-500 focus-visible:ring-0 px-0 resize-none"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl mt-8" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
