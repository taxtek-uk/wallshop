import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+44 141 739 3377",
      href: "tel:+441417393377",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@thewallshop.co.uk",
      href: "mailto:info@thewallshop.co.uk",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: "https://wa.me/441417393377",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon–Fri: 9 AM–6 PM PST",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin,  href: "#", label: "LinkedIn"  },
    { icon: Facebook,  href: "#", label: "Facebook"  },
  ];

  const quickLinks = [
    { title: "Luxury Wallpapers",    href: "/luxury-wallpapers"   },
    { title: "Acoustic Panels",      href: "/acoustic-panels"     },
    { title: "Carbon Rock Boards",   href: "/carbon-rock-boards"  },
    { title: "Smart Walls",          href: "/smart-walls"         },
    { title: "Free Sample",          href: "/request-free-sample" },
    { title: "Installation",         href: "/installation"        },
  ];

  return (
    <footer id="contact" className="bg-white text-gray-800">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              The Wall Shop
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
              Transforming spaces with luxury wall coverings and revolutionary
              smart wall technology. Premium design meets cutting-edge innovation.
            </p>

            {/* Contact Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((contact, idx) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={idx}
                    href={contact.href}
                    className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {contact.label}
                      </p>
                      <p className="font-medium text-gray-800 group-hover:text-accent transition-colors">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-accent transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Stay Connected</h3>
            <p className="text-gray-600 mb-6">
              Get the latest design trends and exclusive offers.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4 mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              />
              <Button className="w-full bg-accent hover:bg-accent/90 text-white font-medium">
                Subscribe
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 text-gray-600"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8">
              <p className="text-gray-500 text-sm">
                © 2025 The Wall Shop. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a
                  href="/privacy"
                  className="text-gray-500 hover:text-accent transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-gray-500 hover:text-accent transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/warranty"
                  className="text-gray-500 hover:text-accent transition-colors"
                >
                  Warranty
                </a>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Designed & Built with ❤️ by The Wall Shop team
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;