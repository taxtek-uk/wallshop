import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Eye, Cookie, Database, Mail, Phone } from "lucide-react";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title =
      "Privacy Policy - The Wall Shop | Data Protection & GDPR Compliance";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Privacy policy for The Wall Shop covering GDPR compliance, data protection, cookie usage and user data handling for luxury wall coverings services in the UK.",
      );
    }
  }, []);

  const sections = [
    { id: "overview", title: "Overview", icon: Shield },
    { id: "data-collection", title: "Data We Collect", icon: Database },
    { id: "data-usage", title: "How We Use Your Data", icon: Eye },
    { id: "cookies", title: "Cookies Policy", icon: Cookie },
    { id: "rights", title: "Your Rights", icon: Shield },
    { id: "contact", title: "Contact Us", icon: Mail },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-clay-500">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text-luxury">Privacy Policy</span>
            </h1>
            <p className="text-xl text-mocha-950 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how The Wall
              Shop collects, uses, and protects your personal information.
            </p>
            <div className="mt-4 text-sm text-stone-400">
              Last updated: {new Date().toLocaleDateString("en-GB")}
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-card rounded-2xl p-8 mb-12 shadow-lg">
            <h2 className="text-2xl font-bold gradient-text-mocha mb-6">
              Table of Contents
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="flex items-center space-x-3 p-4 rounded-lg border border-stone-400 hover:border-leather-600 hover:bg-clay-100 transition-all duration-300 text-left group"
                  >
                    <IconComponent className="w-5 h-5 text-leather-600 group-hover:text-olive-500" />
                    <span className="font-medium text-mocha-950 group-hover:text-olive-500">
                      {section.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Sections */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Overview */}
            <section
              id="overview"
              className="bg-card rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-8 h-8 text-leather-600" />
                <h2 className="text-3xl font-bold gradient-text-clay">
                  Overview
                </h2>
              </div>
              <div className="prose prose-stone max-w-none">
                <p className="text-mocha-950 leading-relaxed mb-4">
                  The Wall Shop ("we," "our," or "us") is committed to
                  protecting your privacy and personal data. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  information when you visit our website or use our services.
                </p>
                <p className="text-mocha-950 leading-relaxed mb-4">
                  We comply with the UK General Data Protection Regulation (UK
                  GDPR) and the Data Protection Act 2018. Our registered office
                  is located in the United Kingdom.
                </p>
                <div className="bg-clay-100 border-l-4 border-leather-600 p-4 rounded-r-lg">
                  <p className="text-mocha-950 font-medium">
                    <strong>Data Controller:</strong> The Wall Shop Ltd
                    <br />
                    <strong>Contact:</strong> privacy@thewallshop.co.uk
                    <br />
                    <strong>Registration:</strong> ICO Registration Number:
                    [Number]
                  </p>
                </div>
              </div>
            </section>

            {/* Data Collection */}
            <section
              id="data-collection"
              className="bg-card rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Database className="w-8 h-8 text-leather-600" />
                <h2 className="text-3xl font-bold gradient-text-clay">
                  Data We Collect
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-mocha-950 mb-3">
                    Personal Information
                  </h3>
                  <ul className="text-mocha-950 space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-leather-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Name, email address, phone number</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-leather-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Property address and project details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-leather-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Design preferences and requirements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-leather-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Payment and billing information</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-mocha-950 mb-3">
                    Technical Information
                  </h3>
                  <ul className="text-mocha-950 space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-leather-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>IP address and browser information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-leather-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Website usage and navigation patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-leather-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Device and operating system details</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section
              id="data-usage"
              className="bg-card rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="w-8 h-8 text-leather-600" />
                <h2 className="text-3xl font-bold gradient-text-clay">
                  How We Use Your Data
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-mocha-950">
                    Service Delivery
                  </h3>
                  <ul className="text-mocha-950 space-y-2">
                    <li>• Providing consultations and quotes</li>
                    <li>• Processing orders and installations</li>
                    <li>• Customer support and communication</li>
                    <li>• Project management and delivery</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-mocha-950">
                    Business Operations
                  </h3>
                  <ul className="text-mocha-950 space-y-2">
                    <li>• Website analytics and improvement</li>
                    <li>• Marketing and promotional communications</li>
                    <li>• Legal compliance and protection</li>
                    <li>• Quality assurance and training</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section id="cookies" className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Cookie className="w-8 h-8 text-leather-600" />
                <h2 className="text-3xl font-bold gradient-text-clay">
                  Cookies Policy
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-mocha-950 leading-relaxed">
                  We use cookies and similar technologies to enhance your
                  browsing experience and analyze website performance.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-stone-400 rounded-lg">
                    <thead>
                      <tr className="bg-clay-100">
                        <th className="border border-stone-400 p-3 text-left text-mocha-950 font-semibold">
                          Cookie Type
                        </th>
                        <th className="border border-stone-400 p-3 text-left text-mocha-950 font-semibold">
                          Purpose
                        </th>
                        <th className="border border-stone-400 p-3 text-left text-mocha-950 font-semibold">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-stone-400 p-3 text-mocha-950">
                          Essential
                        </td>
                        <td className="border border-stone-400 p-3 text-mocha-950">
                          Website functionality and security
                        </td>
                        <td className="border border-stone-400 p-3 text-mocha-950">
                          Session
                        </td>
                      </tr>
                      <tr className="bg-clay-50">
                        <td className="border border-stone-400 p-3 text-mocha-950">
                          Analytics
                        </td>
                        <td className="border border-stone-400 p-3 text-mocha-950">
                          Usage statistics and performance
                        </td>
                        <td className="border border-stone-400 p-3 text-mocha-950">
                          2 years
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-stone-400 p-3 text-mocha-950">
                          Marketing
                        </td>
                        <td className="border border-stone-400 p-3 text-mocha-950">
                          Personalized advertising
                        </td>
                        <td className="border border-stone-400 p-3 text-mocha-950">
                          1 year
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Rights */}
            <section id="rights" className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-8 h-8 text-leather-600" />
                <h2 className="text-3xl font-bold gradient-text-clay">
                  Your Rights
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-clay-100 rounded-lg">
                    <h4 className="font-semibold text-mocha-950 mb-2">
                      Right to Access
                    </h4>
                    <p className="text-sm text-mocha-950">
                      Request copies of your personal data
                    </p>
                  </div>
                  <div className="p-4 bg-clay-100 rounded-lg">
                    <h4 className="font-semibold text-mocha-950 mb-2">
                      Right to Rectification
                    </h4>
                    <p className="text-sm text-mocha-950">
                      Request correction of inaccurate data
                    </p>
                  </div>
                  <div className="p-4 bg-clay-100 rounded-lg">
                    <h4 className="font-semibold text-mocha-950 mb-2">
                      Right to Erasure
                    </h4>
                    <p className="text-sm text-mocha-950">
                      Request deletion of your data
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-clay-100 rounded-lg">
                    <h4 className="font-semibold text-mocha-950 mb-2">
                      Right to Portability
                    </h4>
                    <p className="text-sm text-mocha-950">
                      Request transfer of your data
                    </p>
                  </div>
                  <div className="p-4 bg-clay-100 rounded-lg">
                    <h4 className="font-semibold text-mocha-950 mb-2">
                      Right to Object
                    </h4>
                    <p className="text-sm text-mocha-950">
                      Object to processing of your data
                    </p>
                  </div>
                  <div className="p-4 bg-clay-100 rounded-lg">
                    <h4 className="font-semibold text-mocha-950 mb-2">
                      Right to Restriction
                    </h4>
                    <p className="text-sm text-mocha-950">
                      Request limitation of processing
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="w-8 h-8 text-leather-600" />
                <h2 className="text-3xl font-bold gradient-text-clay">
                  Contact Us
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-mocha-950 mb-4">
                    Data Protection Officer
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-leather-600" />
                      <span className="text-mocha-950">
                        privacy@thewallshop.co.uk
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-leather-600" />
                      <span className="text-mocha-950">
                        +44 (0) 20 1234 5678
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-mocha-950 mb-4">
                    Regulatory Authority
                  </h3>
                  <p className="text-mocha-950 leading-relaxed">
                    If you're not satisfied with our response, you can contact
                    the Information Commissioner's Office (ICO):
                  </p>
                  <div className="mt-3">
                    <p className="text-mocha-950">
                      <strong>Website:</strong> ico.org.uk
                      <br />
                      <strong>Phone:</strong> 0303 123 1113
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
