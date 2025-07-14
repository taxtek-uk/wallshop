import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Gift,
  Shield,
  Sparkles,
  Mail,
  User,
  Building,
  Phone,
  CheckCircle,
  Truck,
  Loader2,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  boardType: "",
  notes: "",
};
const boardOptions = [
  "Carbon Rock Board",
  "Acoustic Panel",
  "Luxury Wallpaper",
  "Other (specify below)",
];

export default function RequestFreeSample() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // SEO/Schema
  useEffect(() => {
    document.title =
      "Request a Free Sample - Premium Wall Panels & Boards | The Wall Shop UK";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Order your free sample of Carbon Rock Board, luxury wallpaper, or acoustic panel from The Wall Shop. See and feel our premium quality before you decide. Fast UK delivery."
      );
    }
    // AI-SEO Schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Request a Free Sample - The Wall Shop",
      "description":
        "Order a free sample of Carbon Rock Boards, luxury wallpapers, or acoustic panels. Discover the premium quality of The Wall Shop products, delivered fast and free across the UK.",
      "url": "https://thewallshop.co.uk/request-sample",
      "publisher": {
        "@type": "Organization",
        "name": "The Wall Shop",
        "url": "https://thewallshop.co.uk",
        "logo": {
          "@type": "ImageObject",
          "url": "https://thewallshop.co.uk/logo.png",
        },
      },
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // --- Handle Form ---
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.boardType) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    // Replace with your backend/API endpoint
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(initialForm);
    }, 1400);
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex flex-col">
      <Navigation />
      {/* Hero Section */}
      <section
        className="pt-24 pb-14 relative"
        style={{
          backgroundImage: "url('/images/smart-wall-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Left */}
            <div>
              <span className="inline-block bg-gradient-to-br from-[#b69777] to-[#907252] text-white px-4 py-2 rounded-full text-sm font-semibold shadow mb-6">
                <Gift className="inline w-5 h-5 mr-2 -mt-1" /> Free Wall Sample
              </span>
              <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight text-white drop-shadow">
                Try Before You Buy<br />
                <span className="text-[#ffe8be]">Request a Free Sample</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow">
                See the quality. Feel the finish. Discover why architects and homeowners trust The Wall Shop for premium wall solutions—delivered free, UK-wide.
              </p>
            </div>
            {/* Hero Right */}
            <div className="hidden lg:block">
              <img
                src="/images/wallpapers/wallpaper-55.avif"
                alt="Sample Board"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto border-4 border-white"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: "True-To-Life Samples",
                desc: "What you see is what you get. Our sample boards reflect full production quality.",
              },
              {
                icon: Shield,
                title: "Risk-Free",
                desc: "No obligation, no card required. Just expert guidance and real material in your hand.",
              },
              {
                icon: CheckCircle,
                title: "Super Fast Delivery",
                desc: "We ship within 1 business day, tracked with Royal Mail.",
              },
              {
                icon: Truck,
                title: "Free Across the UK",
                desc: "Every sample is 100% free—no hidden costs, anywhere in the UK.",
              },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="text-center p-7 rounded-2xl bg-gradient-to-br from-[#f9f7f5] via-[#fcf9f5] to-[#ece2d2] shadow hover:scale-105 transition-all duration-300 border border-[#f0e4c3]"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#231c14] mb-1">{b.title}</h3>
                  <p className="text-[#907252]">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section className="py-14 bg-[#faf7f3]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-14 border border-[#e2d5c4]">
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle className="mx-auto w-14 h-14 text-green-500 mb-3" />
                <h2 className="text-3xl font-bold mb-3">Request Received!</h2>
                <p className="text-lg mb-3">Thank you for requesting your free sample.<br />Our team will dispatch your sample shortly.</p>
                <p>
                  Questions? <a href="mailto:info@thewallshop.co.uk" className="text-leather-700 underline">Contact support</a>
                </p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
                <h2 className="text-3xl font-bold text-center mb-2">Request Your Free Sample</h2>
                <p className="text-center text-[#907252] mb-6">Complete the form below. No payment needed.</p>
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">{error}</div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#231c14] font-semibold mb-1" htmlFor="name">
                      <User className="inline w-4 h-4 mr-1 -mt-1" /> Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="block text-[#231c14] font-semibold mb-1" htmlFor="email">
                      <Mail className="inline w-4 h-4 mr-1 -mt-1" /> Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="block text-[#231c14] font-semibold mb-1" htmlFor="phone">
                      <Phone className="inline w-4 h-4 mr-1 -mt-1" /> Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="block text-[#231c14] font-semibold mb-1" htmlFor="company">
                      <Building className="inline w-4 h-4 mr-1 -mt-1" /> Company (if trade)
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                      value={form.company}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#231c14] font-semibold mb-1" htmlFor="address">
                    Address for Delivery *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#231c14] font-semibold mb-1" htmlFor="boardType">
                    Select Product *
                  </label>
                  <select
                    id="boardType"
                    name="boardType"
                    className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                    value={form.boardType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select One --</option>
                    {boardOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#231c14] font-semibold mb-1" htmlFor="notes">
                    Notes (color, finish, questions)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border border-[#b69777] bg-[#fcfaf7] focus:ring-2 focus:ring-[#b69777] font-medium"
                    value={form.notes}
                    onChange={handleChange}
                  />
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
                      <Gift className="w-5 h-5 mr-2" /> Request Sample Now
                    </>
                  )}
                </Button>
                <div className="text-xs text-gray-400 text-center mt-2">* Required fields. Free for UK customers only.</div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trust & Info */}
       

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] text-white text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-3">Not Sure Which Product to Choose?</h2>
        <p className="text-lg mb-7">Our experts are ready to guide you. Get tailored recommendations or schedule a free call.</p>
        <Button
          size="lg"
          className="bg-white text-[#b69777] hover:bg-[#faf7f3] px-8 py-4 text-lg font-bold shadow"
          asChild
        >
          <a href="mailto:info@thewallshop.co.uk">
            Ask an Expert
          </a>
        </Button>
      </section>

      <Footer />
    </div>
  );
}
