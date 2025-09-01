import React, { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

const quickLinks = [
  { title: "Smart Walls", href: "/smart-walls" },
  { title: "Smart Devices", href: "/smart-devices" },
  { title: "Wall Panels", href: "/wall-panels" },
  { title: "Carbon Rock Boards", href: "/carbon-rock-boards" },
  { title: "Luxury Wallpapers", href: "/luxury-wallpapers" },
  { title: "Installation", href: "/installation" },
];

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Please enter a valid email address.');
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus('idle');
    setSubscriptionMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      }

      setSubscriptionStatus('success');
      setSubscriptionMessage('Successfully subscribed! Check your email for confirmation.');
      setEmail('');
    } catch (err) {
      setSubscriptionStatus('error');
      setSubscriptionMessage(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
<footer
  ref={sectionRef}
  className="relative text-white overflow-hidden bg-gradient-to-r from-[#0f172a]  to-[#334155] backdrop-blur-md"
>


      <div className="relative z-10 container mx-auto px-4 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } lg:col-span-2`}>
            <h2 className="text-2xl font-bold text-white mb-4">
              The Wall Shop
            </h2>
            <p className="text-white/80 leading-relaxed mb-8">
              Transforming spaces with luxury wall coverings and revolutionary
              smart wall technology. Premium design meets cutting-edge innovation.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <div className="p-2 rounded-lg bg-white/10">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              Stay Connected
            </h3>
            <p className="text-white/80 mb-4 text-sm">
              Get the latest design trends and exclusive offers.
            </p>
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 px-4 py-2 rounded-md placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  disabled={isSubscribing}
                />
                <Button 
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-gradient-to-r from-gray-100 to-gray-300 text-black hover:from-gray-200 hover:to-gray-400 rounded-md py-2 font-semibold disabled:opacity-50"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
              {subscriptionMessage && (
                <p className={`text-sm ${
                  subscriptionStatus === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {subscriptionMessage}
                </p>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/5">
        <div className="container mx-auto px-4 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>
            © 2025 The Wall Shop. All rights reserved.
          </p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
            <a href="/warranty" className="hover:text-white transition">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
