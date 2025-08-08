// src/pages/Support.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Headphones,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Info,
  FileSearch,
  Truck,
  Wrench,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  ThumbsUp,
  User,
} from "lucide-react";
// For page fade-in animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const faqs = [
  {
    id: "order",
    question: "How do I check my order status?",
    answer:
      "Track your order anytime via the tracking link sent in your shipping confirmation email. If you need further help, contact our support team with your order number.",
  },
  {
    id: "installation",
    question: "Can I get help with installation or technical issues?",
    answer:
      "Yes! Our technical experts are available to assist with installation questions and troubleshooting. Reach out via email, phone, or our support form for tailored help.",
  },
  {
    id: "returns",
    question: "What is your return and refund policy?",
    answer:
      "We offer hassle-free returns within 30 days of delivery for most products. Visit our Returns Policy page or contact us to start a return or learn more.",
  },
  {
    id: "business",
    question: "Can I get a business or trade quote?",
    answer:
      "Absolutely! We offer trade pricing for volume orders and B2B projects. Please email info@thewallshop.co.uk with your requirements for a bespoke quote.",
  },
  {
    id: "support-hours",
    question: "What are your support hours?",
    answer:
      "Our support team is available Mon–Fri, 9:00 AM – 6:00 PM PST. You can always email us and we'll reply on the next business day.",
  },
];

const supportCards = [
  {
    icon: Headphones,
    title: "Contact Support",
    desc: "Reach our experts for any help, product queries, or after-sales service.",
    action: (
      <a
        href="mailto:info@thewallshop.co.uk"
        className="inline-flex items-center gap-1 font-medium text-leather-700 hover:underline"
      >
        Email Us <Mail className="w-4 h-4" />
      </a>
    ),
  },
  {
    icon: Truck,
    title: "Order & Delivery",
    desc: "Check your order status or ask about delivery issues.",
    action: (
      <a
        href="#faq-order"
        className="inline-flex items-center gap-1 font-medium text-leather-700 hover:underline"
      >
        Track Order <FileSearch className="w-4 h-4" />
      </a>
    ),
  },
  {
    icon: Wrench,
    title: "Technical Help",
    desc: "Installation guidance and troubleshooting for smart wall systems.",
    action: (
      <a
        href="#faq-installation"
        className="inline-flex items-center gap-1 font-medium text-leather-700 hover:underline"
      >
        Get Tech Help <Info className="w-4 h-4" />
      </a>
    ),
  },
];

const Support = () => {
  const [openFAQ, setOpenFAQ] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.title =
      "Support & Help - The Wall Shop | Contact, FAQs, Customer Service UK";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Need help with your order, product, or installation? Contact The Wall Shop for expert support, live help, FAQs, and customer service. UK-based support team. Phone: +44 141 739 3377, Email: info@thewallshop.co.uk"
      );
    }
  }, []);

  const toggleFAQ = (faqId: string) => {
    const newOpenFAQ = new Set(openFAQ);
    newOpenFAQ.has(faqId) ? newOpenFAQ.delete(faqId) : newOpenFAQ.add(faqId);
    setOpenFAQ(newOpenFAQ);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] font-sans">
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-support.jpg"
            alt="Customer Support Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-65 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-24 text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
              Support & Customer Care
            </h1>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              How can we help you today? Get instant answers or connect with a real support specialist at The Wall Shop.
            </p>
          </motion.div>
          <div className="mt-6 flex justify-center text-sm text-white/80 space-x-2">
            <a href="/" className="hover:underline">
              Home
            </a>
            <span>/</span>
            <span className="font-semibold">Support</span>
          </div>
        </div>
      </div>

      {/* Support Cards */}
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {supportCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all p-8 flex flex-col items-center text-center"
              >
                <div className="rounded-full bg-[#e2d5c4] p-5 mb-4 w-fit shadow">
                  <Icon className="w-9 h-9 text-leather-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-500 mb-4">{card.desc}</p>
                <div>{card.action}</div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto mb-16" id="faq">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq) => (
            <div key={faq.id} id={`faq-${faq.id}`} className="bg-white shadow rounded-lg mb-4">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition"
                aria-expanded={openFAQ.has(faq.id)}
                aria-controls={`faq-body-${faq.id}`}
              >
                <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                {openFAQ.has(faq.id) ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openFAQ.has(faq.id) && (
                <div
                  id={`faq-body-${faq.id}`}
                  className="p-4 border-t text-gray-700"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Contact Details */}
        <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Contact Us Directly</h2>
          <p className="mb-8 opacity-90">
            We're here to help with all inquiries—product info, installation, orders, trade, or feedback.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-2" />
              <h4 className="font-semibold">Email</h4>
              <a
                href="mailto:info@thewallshop.co.uk"
                className="hover:underline"
              >
                info@thewallshop.co.uk
              </a>
              <p className="text-xs text-gray-300 mt-2">
                For all support, sales & business inquiries.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-2" />
              <h4 className="font-semibold">Phone</h4>
              <a
                href="tel:+441417393377"
                className="hover:underline"
              >
                +44 141 739 3377
              </a>
              <p className="text-xs text-gray-300 mt-2">
                Mon–Fri: 9:00 AM – 6:00 PM PST
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 mb-2" />
              <h4 className="font-semibold">Business Hours</h4>
              <p>
                Mon–Fri: 9:00 AM – 6:00 PM PST
                <br />
                SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Support;