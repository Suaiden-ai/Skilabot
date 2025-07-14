
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-teal-400 via-purple-500 to-pink-500">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                <p className="text-white text-xl">smartchat.info@gmail.com</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-white/60 rounded-full"></div>
                  <h4 className="font-semibold text-white/80 uppercase text-sm tracking-wider">ADDRESS</h4>
                </div>
                <p className="text-white text-xl">
                  034 Erling Knolls, Lake Kenn<br />
                  North Dakota 8902
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h3>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input 
                    placeholder="Your Name"
                    className="h-12 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-purple-500 focus-visible:ring-0 px-0"
                  />
                </div>
                <div>
                  <Input 
                    type="email"
                    placeholder="Your Email"
                    className="h-12 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-purple-500 focus-visible:ring-0 px-0"
                  />
                </div>
              </div>
              
              <div>
                <Input 
                  placeholder="Subject"
                  className="h-12 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-purple-500 focus-visible:ring-0 px-0"
                />
              </div>
              
              <div>
                <Textarea 
                  placeholder="Write here message"
                  rows={4}
                  className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-purple-500 focus-visible:ring-0 px-0 resize-none"
                />
              </div>
              
              <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl mt-8">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
