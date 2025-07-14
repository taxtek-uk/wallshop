import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Shield,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Hammer,
  Paintbrush,
  Cpu,
  Sun,
  StickyNote,
  EyeOff,
  ZapOff,
  XCircle,
  CloudLightning,
  Wrench,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Warranty = () => {
  const [openFAQ, setOpenFAQ] = useState(new Set());

  useEffect(() => {
    document.title =
      "Warranty Information - The Wall Shop | Smart Wall & Product Guarantees UK";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Comprehensive warranty information for The Wall Shop's smart wall systems, luxury wallpapers, and wall coverings. Learn about coverage periods, claims process, and guarantees in the UK."
      );
    }
  }, []);

  const toggleFAQ = (faqId: string) => {
    const newOpenFAQ = new Set(openFAQ);
    newOpenFAQ.has(faqId) ? newOpenFAQ.delete(faqId) : newOpenFAQ.add(faqId);
    setOpenFAQ(newOpenFAQ);
  };

  const warranties = [
    {
      product: "Smart Wall Systems",
      duration: "3 Years",
      coverage: "Electronics, software, integration components",
      color: "bg-leather-600",
      textColor: "text-white",
      icon: Shield,
    },
    {
      product: "Luxury Wallpapers",
      duration: "5 Years",
      coverage: "Fading, peeling, material defects",
      color: "bg-olive-500",
      textColor: "text-white",
      icon: CheckCircle,
    },
    {
      product: "Installation Work",
      duration: "2 Years",
      coverage: "Workmanship, adhesion, finish quality",
      color: "bg-mocha-950",
      textColor: "text-white",
      icon: Clock,
    },
    {
      product: "Carbon Rock Boards",
      duration: "10 Years",
      coverage: "Structural integrity, fire resistance",
      color: "bg-taupe-600",
      textColor: "text-white",
      icon: Shield,
    },
  ];

  const faqs = [
    {
      id: "coverage",
      question: "What exactly is covered under warranty?",
      answer:
        "Our warranty covers manufacturing defects, material failures, and workmanship issues. This includes fading of wallpapers, electronic component failures in smart walls, adhesion problems, and structural defects in panels. Normal wear and tear, damage from misuse, and cosmetic issues caused by user actions are not covered.",
    },
    {
      id: "claim",
      question: "How do I make a warranty claim?",
      answer:
        "Contact our warranty team at warranty@thewallshop.co.uk or call our dedicated warranty hotline. Provide your order number, photos of the issue, and a description of the problem. We'll arrange an inspection within 5 working days and provide a resolution timeline.",
    },
    {
      id: "excluded",
      question: "What is not covered by the warranty?",
      answer:
        "Damage from accidents, misuse, normal wear and tear, exposure to extreme conditions, modifications by third parties, or damage from cleaning with inappropriate products. Acts of nature, vandalism, and damage from pets or children are also excluded.",
    },
    {
      id: "transfer",
      question: "Can I transfer the warranty to a new owner?",
      answer:
        "Yes, our warranties are transferable to new property owners. The new owner must register the transfer with us within 30 days of property transfer, providing proof of purchase and property sale documentation.",
    },
    {
      id: "extension",
      question: "Can I extend my warranty period?",
      answer:
        "Extended warranty plans are available for purchase within the first year of installation. Extended plans can add up to 2 additional years for most products and include priority service and annual maintenance checks.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-warranty.jpg"
            alt="Warranty Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-28 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Warranty Information</h1>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              We stand behind the quality of our products and workmanship. Discover our warranty coverage and claim process.
            </p>
          </motion.div>
          <div className="mt-6 flex justify-center text-sm text-white/80 space-x-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/support" className="hover:underline">Support</Link>
            <span>/</span>
            <span className="text-white font-semibold">Warranty</span>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-4 lg:px-8 py-24">
        {/* Warranty Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {warranties.map((w, i) => {
            const Icon = w.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all p-6"
              >
                <div className={`rounded-full p-4 ${w.color} mb-4 mx-auto w-fit`}>
                  <Icon className={`w-8 h-8 ${w.textColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{w.product}</h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700 mb-1">{w.duration}</div>
                  <p className="text-gray-500">{w.coverage}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* What's Covered / Not Covered */}
        <section className="p-10 mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="grid lg:grid-cols-2 gap-12 text-center"
          >
            {/* Covered */}
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              className="bg-gradient-to-br from-[#ede7df] via-[#f5f0e9] to-[#e2d5c4] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex justify-center items-center space-x-3 mb-6">
                <CheckCircle className="w-8 h-8 text-leather-700" />
                <h2 className="text-3xl font-bold text-leather-900">What's Covered</h2>
              </div>
              <div className="space-y-5 text-left max-w-md mx-auto">
                {[
                  [Hammer, "Manufacturing Defects", "Materials that fail due to production flaws"],
                  [Paintbrush, "Installation Issues", "Problems with our workmanship during setup"],
                  [Cpu, "Electronic Components", "Smart wall technology and integrated systems"],
                  [Sun, "Premature Fading", "Color degradation beyond normal expectations"],
                  [StickyNote, "Adhesion Failures", "Wallpapers or panels that don't stay properly attached"],
                ].map(([Icon, title, desc], i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 mt-1 text-leather-700 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-mocha-950">{title}</h4>
                      <p className="text-sm text-stone-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Not Covered */}
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              className="bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex justify-center items-center space-x-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-bold text-orange-800">Not Covered</h2>
              </div>
              <div className="space-y-5 text-left max-w-md mx-auto">
                {[
                  [EyeOff, "Normal Wear & Tear", "Expected aging and usage over time"],
                  [XCircle, "Accidental Damage", "Impact damage, scratches, or user-caused issues"],
                  [ZapOff, "Misuse or Abuse", "Damage from improper use or maintenance"],
                  [CloudLightning, "Environmental Factors", "Extreme conditions, flooding, or fire damage"],
                  [Wrench, "Third-Party Modifications", "Changes made by non-authorized personnel"],
                ].map(([Icon, title, desc], i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 mt-1 text-orange-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-mocha-950">{title}</h4>
                      <p className="text-sm text-stone-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Claim Process */}
        <section className="bg-white rounded-xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold gradient-text-luxury text-center mb-8">
            How to Make a Claim
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              ["Contact Us", "Email or call our warranty team with your issue", "bg-leather-600"],
              ["Provide Details", "Share photos, order number, and problem description", "bg-olive-500"],
              ["Assessment", "We'll arrange an inspection within 5 working days", "bg-mocha-950"],
              ["Resolution", "Repair, replace, or refund as appropriate", "bg-taupe-600"],
            ].map(([title, desc, bg], i) => (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 ${bg} text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl`}>
                  {i + 1}
                </div>
                <h4 className="font-semibold text-mocha-950 mb-2">{title}</h4>
                <p className="text-sm text-stone-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white shadow rounded-lg mb-4">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition"
              >
                <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                {openFAQ.has(faq.id) ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openFAQ.has(faq.id) && (
                <div className="p-4 border-t text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Need to Make a Warranty Claim?</h2>
          <p className="mb-8 opacity-90">Our warranty team is here to assist quickly and efficiently.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-2" />
              <h4 className="font-semibold">Email</h4>
              <a href="mailto:warranty@thewallshop.co.uk" className="hover:underline">warranty@thewallshop.co.uk</a>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-2" />
              <h4 className="font-semibold">Phone</h4>
              <a href="tel:+442012345678" className="hover:underline">+44 (0) 20 1234 5678</a>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 mb-2" />
              <h4 className="font-semibold">Hours</h4>
              <p>Mon–Fri: 9AM–6PM<br />Sat: 10AM–4PM</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Warranty;
