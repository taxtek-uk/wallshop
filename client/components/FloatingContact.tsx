// src/components/FloatingContact.tsx
import { useState } from "react";
import { MessageCircle, Phone, Mail, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

/*  👉  Update these once, use everywhere  */
const WHATSAPP = "441417393377"; // no plus or spaces
const PHONE    = "+44 141 739 3377";
const EMAIL    = "info@thewallshop.co.uk";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"chat" | "phone" | "email">("chat");
  const [msg, setMsg] = useState("");

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                           */
  /* ------------------------------------------------------------------ */
  const quickContact = (type: "whatsapp" | "phone" | "email") => {
    if (type === "whatsapp")
      window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
          "Hi! I'm interested in The Wall Shop products."
        )}`
      );
    if (type === "phone") window.open(`tel:${PHONE.replace(/ /g, "")}`);
    if (type === "email")
      window.open(
        `mailto:${EMAIL}?subject=Enquiry from TheWallShop.co.uk&body=${encodeURIComponent(
          msg || ""
        )}`
      );
    setOpen(false);
  };

  const sendMessage = () => {
    if (!msg.trim()) return;
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg.trim())}`
    );
    setMsg("");
    setOpen(false);
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            aria-label="Open contact panel"
            className="w-14 h-14 rounded-full bg-accent text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-transform hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        ) : (
          /* Panel */
          <div className="w-80 max-w-[calc(100vw-2rem)] rounded-lg shadow-2xl border border-border bg-white animate-slide-up">
            {/* Header */}
            <header className="bg-accent text-white p-4 rounded-t-lg flex justify-between">
              <div>
                <h3 className="font-semibold">Contact The Wall Shop</h3>
                <p className="text-sm opacity-90">We’re here to help!</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-white/20 rounded"
                aria-label="Close contact panel"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* Tabs */}
            <nav className="flex border-b border-border">
              {[
                { id: "chat", icon: MessageCircle, label: "Chat" },
                { id: "phone", icon: Phone, label: "Call" },
                { id: "email", icon: Mail, label: "Email" },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setTab(id as any)}
                  className={`flex-1 p-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                    tab === id
                      ? "bg-accent/10 text-accent border-b-2 border-accent"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>

            {/* Content */}
            <div className="p-4 space-y-4">
              {tab === "chat" && (
                <>
                  <textarea
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Hi! I'm interested in..."
                    rows={3}
                    className="w-full border border-border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!msg.trim()}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" /> Send via WhatsApp
                  </Button>
                </>
              )}

              {tab === "phone" && (
                <>
                  <div className="text-center">
                    <Phone className="w-8 h-8 text-accent mx-auto mb-2" />
                    <h4 className="font-semibold">Call Us Now</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Speak directly with our design experts
                    </p>
                  </div>
                  <Button
                    onClick={() => quickContact("phone")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" /> {PHONE}
                  </Button>
                  <p className="text-xs text-center text-gray-400 mt-2">
                    Mon-Fri 9 AM–6 PM PST
                  </p>
                </>
              )}

              {tab === "email" && (
                <>
                  <div className="text-center">
                    <Mail className="w-8 h-8 text-accent mx-auto mb-2" />
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Get detailed information and quotes
                    </p>
                  </div>
                  <Button
                    onClick={() => quickContact("email")}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Mail className="w-4 h-4 mr-2" /> {EMAIL}
                  </Button>
                  <p className="text-xs text-center text-gray-400 mt-2">
                    We aim to respond within 2 hours
                  </p>
                </>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="border-t border-border px-4 py-3">
              <p className="text-xs text-gray-400 mb-2">Quick prompts:</p>
              <div className="flex gap-2">
                {[
                  "I'd like to schedule a free consultation",
                  "Please send me more information about Smart Walls",
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setMsg(preset);
                      setTab("chat");
                    }}
                    className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded px-2 py-1"
                  >
                    {preset.replace(/I'd like to /, "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop on mobile */}
      {open && (
        <div
          aria-hidden
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
