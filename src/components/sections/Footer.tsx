
const Footer = () => {
  const companyLinks = ["About Us", "Blog", "Careers", "Contact"];
  const featureLinks = ["Natural Language", "24/7 Availability", "Multi-platform", "Analytics"];
  const menuLinks = ["FAQ", "Login", "Support", "Documentation"];

  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Smart Chat
            </h3>
            <p className="text-gray-400 max-w-sm">
              Empowering businesses with intelligent AI conversations that transform customer experience.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Links */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              {featureLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2025 Smart Chat. All rights reserved. Created by Evonicmedia
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            {["LinkedIn", "Instagram", "Twitter", "Facebook"].map((social, index) => (
              <a 
                key={index}
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition-all duration-300"
              >
                <span className="text-sm font-medium">{social[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
