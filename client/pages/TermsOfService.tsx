import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Scale,
  FileText,
  Shield,
  CreditCard,
  Truck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const TermsOfService = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.title =
      "Terms of Service - The Wall Shop | Usage Terms & Conditions UK";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Terms of service for The Wall Shop covering website usage, wall design services, liability, refunds and intellectual property rights for luxury wall coverings in the UK.",
      );
    }
  }, []);

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: Scale,
      content: (
        <div className="space-y-4">
          <p className="text-mocha-950 leading-relaxed">
            By accessing and using The Wall Shop website and services, you
            accept and agree to be bound by the terms and provision of this
            agreement.
          </p>
          <p className="text-mocha-950 leading-relaxed">
            These terms apply to all visitors, users, and others who access or
            use our services for luxury wall coverings, smart wall systems, and
            interior design solutions.
          </p>
          <div className="bg-clay-100 border-l-4 border-leather-600 p-4 rounded-r-lg">
            <p className="text-mocha-950 font-medium">
              If you do not agree to these terms, please do not use our website
              or services.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "services",
      title: "Our Services",
      icon: FileText,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-mocha-950 mb-3">
              Design & Consultation Services
            </h4>
            <ul className="text-mocha-950 space-y-2">
              <li>• Free initial consultations and design assessments</li>
              <li>• Custom wall design and layout planning</li>
              <li>• Material selection and specification services</li>
              <li>• Project management and coordination</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-mocha-950 mb-3">
              Products & Installation
            </h4>
            <ul className="text-mocha-950 space-y-2">
              <li>• Luxury wallpapers and premium wall coverings</li>
              <li>• Smart wall systems with integrated technology</li>
              <li>• Acoustic panels and carbon rock boards</li>
              <li>• Professional installation and setup services</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 bg-clay-100 rounded-lg">
              <h5 className="font-semibold text-mocha-950 mb-2">
                Service Area
              </h5>
              <p className="text-sm text-mocha-950">
                Greater London and surrounding areas within 50 miles
              </p>
            </div>
            <div className="p-4 bg-clay-100 rounded-lg">
              <h5 className="font-semibold text-mocha-950 mb-2">Lead Times</h5>
              <p className="text-sm text-mocha-950">
                Standard installations: 2-4 weeks from order confirmation
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "orders",
      title: "Orders & Payment",
      icon: CreditCard,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-mocha-950 mb-3">
              Order Process
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-clay-100 rounded-lg">
                <div className="w-8 h-8 bg-leather-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                  1
                </div>
                <h5 className="font-semibold text-mocha-950">Consultation</h5>
                <p className="text-xs text-mocha-950">
                  Free design consultation
                </p>
              </div>
              <div className="text-center p-4 bg-clay-100 rounded-lg">
                <div className="w-8 h-8 bg-leather-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                  2
                </div>
                <h5 className="font-semibold text-mocha-950">Quote</h5>
                <p className="text-xs text-mocha-950">
                  Detailed proposal & pricing
                </p>
              </div>
              <div className="text-center p-4 bg-clay-100 rounded-lg">
                <div className="w-8 h-8 bg-leather-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                  3
                </div>
                <h5 className="font-semibold text-mocha-950">Installation</h5>
                <p className="text-xs text-mocha-950">Professional setup</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-mocha-950 mb-3">
              Payment Terms
            </h4>
            <div className="space-y-3">
              <div className="p-4 border border-stone-400 rounded-lg">
                <h5 className="font-semibold text-mocha-950 mb-2">Deposit</h5>
                <p className="text-mocha-950">
                  50% deposit required upon order confirmation
                </p>
              </div>
              <div className="p-4 border border-stone-400 rounded-lg">
                <h5 className="font-semibold text-mocha-950 mb-2">
                  Final Payment
                </h5>
                <p className="text-mocha-950">
                  Balance due upon completion of installation
                </p>
              </div>
              <div className="p-4 border border-stone-400 rounded-lg">
                <h5 className="font-semibold text-mocha-950 mb-2">
                  Accepted Methods
                </h5>
                <p className="text-mocha-950">
                  Bank transfer, credit/debit cards, cheque (by arrangement)
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "cancellation",
      title: "Cancellation & Refunds",
      icon: Truck,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-mocha-950 mb-3">
                Cancellation Rights
              </h4>
              <ul className="text-mocha-950 space-y-2">
                <li>• 14-day cooling-off period for distance sales</li>
                <li>• Full refund if cancelled within 48 hours of order</li>
                <li>• Partial refund available before production begins</li>
                <li>• No refund once custom production has started</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-mocha-950 mb-3">
                Refund Process
              </h4>
              <ul className="text-mocha-950 space-y-2">
                <li>• Written cancellation notice required</li>
                <li>• Refunds processed within 14 working days</li>
                <li>• Original payment method will be credited</li>
                <li>• Custom orders may incur restocking fees</li>
              </ul>
            </div>
          </div>

          <div className="bg-clay-100 border border-leather-600 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-mocha-950 mb-3">
              Important Notes
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-mocha-950">
              <div>
                <p>
                  <strong>Custom Products:</strong> Bespoke items cannot be
                  returned unless faulty
                </p>
              </div>
              <div>
                <p>
                  <strong>Installation:</strong> 50% labour refund if cancelled
                  before start date
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "liability",
      title: "Liability & Warranties",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-mocha-950 mb-3">
              Our Warranties
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-clay-100 rounded-lg text-center">
                <h5 className="font-semibold text-mocha-950 mb-2">Materials</h5>
                <p className="text-2xl font-bold text-leather-600 mb-1">
                  5 Years
                </p>
                <p className="text-xs text-mocha-950">Defects & fading</p>
              </div>
              <div className="p-4 bg-clay-100 rounded-lg text-center">
                <h5 className="font-semibold text-mocha-950 mb-2">
                  Installation
                </h5>
                <p className="text-2xl font-bold text-leather-600 mb-1">
                  2 Years
                </p>
                <p className="text-xs text-mocha-950">Workmanship guarantee</p>
              </div>
              <div className="p-4 bg-clay-100 rounded-lg text-center">
                <h5 className="font-semibold text-mocha-950 mb-2">
                  Smart Systems
                </h5>
                <p className="text-2xl font-bold text-leather-600 mb-1">
                  3 Years
                </p>
                <p className="text-xs text-mocha-950">Technology components</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-mocha-950 mb-3">
              Limitation of Liability
            </h4>
            <div className="space-y-3 text-mocha-950">
              <p>
                Our liability is limited to the value of goods and services
                provided. We are not liable for:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Indirect, consequential, or special damages</li>
                <li>• Loss of profits, revenue, or business</li>
                <li>• Damage to existing property or furnishings</li>
                <li>• Delays due to circumstances beyond our control</li>
              </ul>
            </div>
          </div>

          <div className="bg-clay-100 border-l-4 border-leather-600 p-4 rounded-r-lg">
            <p className="text-mocha-950 font-medium">
              Nothing in these terms excludes or limits our liability for death,
              personal injury, fraud, or any other liability that cannot be
              excluded by law.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-clay-500">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text-luxury">Terms of Service</span>
            </h1>
            <p className="text-xl text-mocha-950 max-w-3xl mx-auto">
              Please read these terms carefully before using our services. They
              govern your use of The Wall Shop's website and design services.
            </p>
            <div className="mt-4 text-sm text-stone-400">
              Effective from: {new Date().toLocaleDateString("en-GB")}
            </div>
          </div>

          {/* Content - Accordion Style */}
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section) => {
              const IconComponent = section.icon;
              const isOpen = openSections.has(section.id);

              return (
                <div
                  key={section.id}
                  className="bg-card rounded-2xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-clay-100 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <IconComponent className="w-8 h-8 text-leather-600" />
                      <h2 className="text-2xl font-bold gradient-text-clay">
                        {section.title}
                      </h2>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6 text-mocha-950" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-mocha-950" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-stone-400 pt-6">
                        {section.content}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Information */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-card rounded-2xl p-8 shadow-lg text-center">
              <h2 className="text-2xl font-bold gradient-text-mocha mb-4">
                Questions About Our Terms?
              </h2>
              <p className="text-mocha-950 mb-6">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:legal@thewallshop.co.uk"
                  className="inline-flex items-center justify-center px-6 py-3 bg-leather-600 text-white rounded-lg hover:bg-olive-500 transition-colors duration-300"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  legal@thewallshop.co.uk
                </a>
                <a
                  href="tel:+442012345678"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-leather-600 text-leather-600 rounded-lg hover:bg-leather-600 hover:text-white transition-colors duration-300"
                >
                  +44 (0) 20 1234 5678
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
