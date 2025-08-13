import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  HelpCircle,
  Building,
  CheckCircle,
  Loader2,
} from "lucide-react";

// Contact details for The Wall Shop
const CONTACT = {
  email: "info@thewallshop.co.uk",
  phone: "+44 141 739 3377",
  hq: "SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK",
  hours: "Mon–Fri, 9:00 AM – 6:00 PM PST",
};

const reasons = [
  "General Inquiry",
  "Product Information",
  "Trade/Business Partnership",
  "Order/Delivery Support",
  "Warranty/Returns",
  "Press/Media",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  reason: "",
  message: "",
};

export default function ContactUs() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Contact Us - The Wall Shop | Support, Sales, Enquiries UK";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Get in touch with The Wall Shop for sales, support, trade, and all enquiries. Call, email, or use our contact form. Based in Glasgow, UK."
      );
    }
    // Schema for SEO
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Us - The Wall Shop",
      "description":
        "Contact The Wall Shop for product, order, trade or support questions. Call, email, or use the online form.",
      "url": "https://thewallshop.co.uk/contact",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": CONTACT.phone,
          "contactType": "customer support",
          "email": CONTACT.email,
        },
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "SMK Business Centre, 4 The Piazza",
        "addressLocality": "Glasgow",
        "postalCode": "G5 8BE",
        "addressCountry": "UK",
      },
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Handle form logic
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.reason) {
      setError("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    
    try {
      console.log('Submitting form to /api/working-contact...');
      console.log('Form data:', form);
      
      const response = await fetch('/api/working-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Get response as text first to see what we're actually receiving
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      // Try to parse as JSON
      let result;
      try {
        result = JSON.parse(responseText);
        console.log('Parsed JSON result:', result);
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        console.error('Response text was:', responseText);
        throw new Error(`Invalid response from server: ${responseText.substring(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to send message');
      }

      setSubmitting(false);
      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-14 bg-gradient-to-br from-[#b69777] via-[#b89773] to-[#907252] relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center bg-white/20 px-5 py-2 rounded-full text-white font-semibold mb-6 shadow text-lg">
                <HelpCircle className="w-6 h-6 mr-2" />
                We're here to help
              </span>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow">
                Contact <span className="text-[#ffe8be]">The Wall Shop</span>
              </h1>
              <p className="text-xl text-white/90 mb-7 max-w-xl">
                Get in touch with our team for fast support, expert product advice, and friendly help with any enquiry. We respond within 1 business day (Mon–Fri).
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#b69777] font-bold text-lg shadow hover:bg-[#faf7f3] transition"
                >
                  <Mail className="w-5 h-5" /> Email Us
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white text-white font-bold text-lg shadow hover:bg-white hover:text-[#b69777] transition"
                >
                  <Phone className="w-5 h-5" /> Call Now
                </a>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-end">
              <img
                src="/images/smart-walls/smart-wall-cover.webp"
                alt="The Wall Shop Team"
                className="rounded-2xl shadow-2xl border-4 border-white max-w-lg"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Mail,
                title: "Email",
                info: (
                  <a href={`mailto:${CONTACT.email}`} className="text-leather-700 underline font-semibold">{CONTACT.email}</a>
                ),
              },
              {
                icon: Phone,
                title: "Phone",
                info: (
                  <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className="text-leather-700 underline font-semibold">{CONTACT.phone}</a>
                ),
              },
              {
                icon: MapPin,
                title: "Headquarters",
                info: <span>{CONTACT.hq}</span>,
              },
              {
                icon: Clock,
                title: "Business Hours",
                info: <span>{CONTACT.hours}</span>,
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="text-center p-7 rounded-2xl bg-gradient-to-br from-[#f9f7f5] via-[#fcf9f5] to-[#ece2d2] shadow hover:scale-105 transition-all duration-300 border border-[#f0e4c3]"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#231c14] mb-1">{card.title}</h3>
                  <p className="text-[#6b5c47] break-words">{card.info}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 bg-[#faf7f3]">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-14 border border-[#e2d5c4]">
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle className="mx-auto w-14 h-14 text-green-500 mb-3" />
                <h2 className="text-3xl font-bold mb-3">Message Sent!</h2>
                <p className="text-lg mb-3">
                  Thanks for contacting us.<br />
                  We'll get back to you within 1 business day.
                </p>
                <p>
                  Urgent? Call us at <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className="text-leather-700 underline">{CONTACT.phone}</a>
                </p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
                <h2 className="text-3xl font-bold text-center mb-2">Send Us a Message</h2>
                <p className="text-center text-[#907252] mb-6">We respond promptly, Mon–Fri.</p>
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">{error}</div>
                )}
                <div>
                  <label className="block text-[#231c14] font-semibold mb-1" htmlFor="name">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#231c14] font-semibold mb-1" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#231c14] font-semibold mb-1" htmlFor="reason">
                    Reason for Contact *
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                    value={form.reason}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select --</option>
                    {reasons.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#231c14] font-semibold mb-1" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Debug Section */}
                <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
                  <h4 className="font-bold mb-2">🔧 Debug Testing</h4>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          console.log('Testing /api/ (root)...');
                          const res = await fetch('/api/');
                          const text = await res.text();
                          console.log('Root API response:', text);
                          alert('Root API: ' + text.substring(0, 100));
                        } catch (err) {
                          console.error('Root API error:', err);
                          alert('Root API error: ' + err.message);
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                    >
                      Test Root API
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          console.log('Testing /api/hello (CommonJS)...');
                          const res = await fetch('/api/hello');
                          const text = await res.text();
                          console.log('Hello API response:', text);
                          alert('Hello API: ' + text.substring(0, 100));
                        } catch (err) {
                          console.error('Hello API error:', err);
                          alert('Hello API error: ' + err.message);
                        }
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                    >
                      Test Hello (CommonJS)
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          console.log('Testing /api/test (ES Module)...');
                          const res = await fetch('/api/test');
                          const text = await res.text();
                          console.log('Test API response:', text);
                          alert('Test API: ' + text.substring(0, 100));
                        } catch (err) {
                          console.error('Test API error:', err);
                          alert('Test API error: ' + err.message);
                        }
                      }}
                      className="px-3 py-1 bg-indigo-500 text-white rounded text-xs"
                    >
                      Test ES Module
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          console.log('Testing /api/contact-simple...');
                          const res = await fetch('/api/contact-simple', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: 'Test', email: 'test@example.com', reason: 'Test', message: 'Test message' })
                          });
                          const text = await res.text();
                          console.log('Contact Simple API response:', text);
                          alert('Contact Simple API: ' + text.substring(0, 100));
                        } catch (err) {
                          console.error('Contact Simple API error:', err);
                          alert('Contact Simple API error: ' + err.message);
                        }
                      }}
                      className="px-3 py-1 bg-green-500 text-white rounded text-xs"
                    >
                      Test Contact Simple
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          console.log('Testing /api/contact (full)...');
                          const res = await fetch('/api/contact', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: 'Test', email: 'test@example.com', reason: 'Test', message: 'Test message' })
                          });
                          const text = await res.text();
                          console.log('Contact Full API response:', text);
                          alert('Contact Full API: ' + text.substring(0, 100));
                        } catch (err) {
                          console.error('Contact Full API error:', err);
                          alert('Contact Full API error: ' + err.message);
                        }
                      }}
                      className="px-3 py-1 bg-purple-500 text-white rounded text-xs"
                    >
                      Test Contact Full
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          console.log('Testing /api/contact-test (CommonJS)...');
                          const res = await fetch('/api/contact-test', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: 'Test', email: 'test@example.com', reason: 'Test', message: 'Test message' })
                          });
                          const text = await res.text();
                          console.log('Contact Test API response:', text);
                          alert('Contact Test API: ' + text.substring(0, 100));
                        } catch (err) {
                          console.error('Contact Test API error:', err);
                          alert('Contact Test API error: ' + err.message);
                        }
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded text-xs"
                    >
                      Test Contact CommonJS
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          console.log('Testing /api/working-contact (Final)...');
                          const res = await fetch('/api/working-contact', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: 'Test User', email: 'test@example.com', reason: 'Testing', message: 'This is a test message from the debug panel.' })
                          });
                          const text = await res.text();
                          console.log('Working Contact API response:', text);
                          alert('Working Contact API: ' + text.substring(0, 150));
                        } catch (err) {
                          console.error('Working Contact API error:', err);
                          alert('Working Contact API error: ' + err.message);
                        }
                      }}
                      className="px-3 py-1 bg-emerald-500 text-white rounded text-xs"
                    >
                      Test Final Contact
                    </button>
                  </div>
                </div>

                <Button
                  size="lg"
                  type="submit"
                  className="w-full px-8 py-4 text-lg font-bold shadow bg-gradient-to-br from-[#b69777] to-[#907252] text-white flex items-center justify-center"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5 mr-2" /> Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" /> Send Message
                    </>
                  )}
                </Button>
                <div className="text-xs text-gray-400 text-center mt-2">* All fields required</div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#231c14] mb-2 flex items-center gap-2">
              <Building className="w-7 h-7 text-[#b69777]" /> Our Office & Showroom
            </h3>
            <p className="text-[#6b5c47] mb-2">
              <span className="font-semibold">{CONTACT.hq}</span>
              <br />
              Visits by appointment only. Free samples and product demos available.
            </p>
            <p className="text-[#907252] text-sm">
              Public transport: 3 min walk from Bridge Street subway station.<br />
              Parking: Free for visitors.
            </p>
          </div>
          <div className="w-full md:w-[460px] rounded-xl overflow-hidden border border-[#e2d5c4] shadow-lg">
            <iframe
              title="The Wall Shop HQ Map"
              src="https://maps.google.com/maps?q=SMK%20Business%20Centre,%204%20The%20Piazza,%20Glasgow,%20G5%208BE&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="280"
              loading="lazy"
              className="w-full"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Trust & FAQ */}
      <section className="py-8 bg-[#faf7f3]">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[#b69777]" />
            <span className="font-bold text-[#b69777] text-lg">
              Real humans, real help.
            </span>
          </div>
          <div className="flex-1 text-[#6b5c47] text-center md:text-right text-sm">
            Need quick answers? Check our{" "}
            <a href="/support" className="underline text-[#b69777] font-semibold">
              Support & FAQ page
            </a>{" "}
            or email{" "}
            <a href={`mailto:${CONTACT.email}`} className="underline text-[#b69777] font-semibold">
              info@thewallshop.co.uk
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
