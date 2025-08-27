import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ruler,
  MoveHorizontal,
  MoveVertical,
  Tv,
  Flame,
  Waves,
  Archive,
  Gamepad2,
  Monitor,
  Cpu,
  Speaker,
  Lightbulb,
  Fan,
  DoorOpen,
  ScanFace,
  Shield,
  Music4,
  CloudSun,
  LampCeiling,
  PanelsTopLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  X, 
  Layers, 
  TreePine, 
  Square, 
  Gem,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Loader2
} from "lucide-react";

/** -----------------------------------------------------------
 * Local Types (single-file) — SwQuoteState is the form state
 * --------------------------------------------------------- */
type Unit = "mm" | "m";
type Step =
  | "dimensions"
  | "accessories"
  | "gaming"
  | "devices"
  | "styles"
  | "contact"
  | "summary";

type ModuleDepth = 120 | 150 | 180;

type AccessoryKey = "tv" | "fireplace" | "soundbar";
type GamingMode = "single" | "dual";

type GamingOptionKey =
  | "controllerCharger"
  | "gamingShelfDesk"
  | "concealedPC"
  | "openPC"
  | "rgbLights"
  | "smartChair"
  | "gamingSoundbar"
  | "gamingSpeakers"
  | "curtainControl"
  | "centralPanel"
  | "climateControl";

type DeviceKey =
  | "mixPad"
  | "smartSwitch"
  | "smartCurtain"
  | "smartLock"
  | "smartClimate"
  | "cctv"
  | "smartLighting"
  | "musicSystem"
  | "smartHanger"
  | "skyDomeLight";

type StyleCategory = "fabric" | "wood" | "solid" | "stone" | "metallic" | "mirror";

type Finish = {
  id: string;
  name: string;
  img: string;
  desc?: string;
  stock?: number;
};

type ContactInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  consent: boolean;
};

type SwQuoteState = {
  // Dimensions
  widthInput: string; // as typed
  widthUnit: Unit;
  heightInput: string; // as typed
  heightUnit: Unit;
  moduleDepth: ModuleDepth;

  // Derived, normalized (mm)
  widthMm: number;
  heightMm: number;

  // Accessories
  accessories: {
    tv: boolean;
    fireplace: boolean;
    soundbar: boolean;
    shelvingQty: number; // 0..6
  };

  // Gaming
  gaming: {
    mode: GamingMode | null;
    options: Partial<Record<GamingOptionKey, boolean>>;
  };

  // Devices
  devices: Partial<Record<DeviceKey, boolean>>;

  // Styles
  styleCategory: StyleCategory | null;
  finish: Finish | null;

  // Contact Information
  contact: ContactInfo;

  // UX ephemeral
  skipConfirm: {
    accessories: boolean; // should we show confirm?
    devices: boolean; // should we show confirm?
  };

  // Submission state
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
};

/** -----------------------------------------------------------
 * Constants & Mock Catalogs
 * --------------------------------------------------------- */
const HEIGHT_MIN = 2200;
const HEIGHT_MAX = 4000;
const DEFAULT_HEIGHT = 2400;
const WIDTH_CLEARANCE = 100; // mm
const DUAL_SCREEN_MIN_WIDTH = 3000; // mm

const MODULE_DEPTHS: ModuleDepth[] = [120, 150, 180];

const deviceCatalog: {
  key: DeviceKey;
  title: string;
  category: string;
  desc: string;
  features: string[];
  Icon: React.ComponentType<any>;
}[] = [
  {
    key: "mixPad",
    title: "MixPad Smart Panel",
    category: "Control Panel",
    desc: "All-in-one scene control with voice intercom.",
    features: ["Touch + App + Voice", "Scene shortcuts", "Intercom"],
    Icon: PanelsTopLeft,
  },
  {
    key: "smartSwitch",
    title: "Smart Switch",
    category: "Lighting",
    desc: "Programmable scenes & schedules.",
    features: ["Timer/Countdown", "Voice control", "Group control"],
    Icon: Lightbulb,
  },
  {
    key: "smartCurtain",
    title: "Smart Curtain",
    category: "Curtains",
    desc: "Silent motorised curtains with precise control.",
    features: ["App/Voice control", "Scene linkage", "Smooth motion"],
    Icon: DoorOpen,
  },
  {
    key: "smartLock",
    title: "Smart Lock",
    category: "Security",
    desc: "AI face recognition door access.",
    features: ["Visual door viewer", "Long battery life", "Linkage"],
    Icon: ScanFace,
  },
  {
    key: "smartClimate",
    title: "Smart Climate",
    category: "HVAC",
    desc: "Zone heating/cooling with energy efficiency.",
    features: ["Schedules", "Sensors", "Remote control"],
    Icon: Fan,
  },
  {
    key: "cctv",
    title: "CCTV",
    category: "Security",
    desc: "Integrated CCTV with remote access.",
    features: ["Push notifications", "Scene link", "Recording"],
    Icon: Shield,
  },
  {
    key: "smartLighting",
    title: "Smart Lighting",
    category: "Lighting",
    desc: "Dynamic scenes and ambient moods.",
    features: ["RGB scenes", "Presets", "Automation"],
    Icon: LampCeiling,
  },
  {
    key: "musicSystem",
    title: "Music System",
    category: "Audio",
    desc: "Multi-room audio with streaming.",
    features: ["App control", "Zones", "Hi-fi sound"],
    Icon: Music4,
  },
  {
    key: "smartHanger",
    title: "Smart Hanger",
    category: "Utility",
    desc: "Quiet, remote laundry hanger.",
    features: ["Remote/Voice", "Low noise", "Aerospace-grade build"],
    Icon: CloudSun,
  },
  {
    key: "skyDomeLight",
    title: "Sky Dome Light",
    category: "Lighting",
    desc: "Quasi-natural light with multiple modes.",
    features: ["Four modes", "No blue-light glare", "Quick install"],
    Icon: Lightbulb,
  },
];

const textureCategories = [
  {
    id: 'fabric',
    name: "Cloth Pattern Series",
    desc: "Soft textile pattern with acoustic value.",
    icon: Layers,
    img: "/images/carbon-rock-boards/cloth.jpg",
    color: "from-leather-100 to-mocha-100",
    accent: "leather-600",
    panels: [
  { 
    id: "T6301", 
    name: "Chambray Grid", 
    img: "/images/carbon-rock-boards/fabric/1.jpg", 
    desc: "Chambray Grid texture with subtle woven pattern, ideal for modern interiors.", 
    stock: 10 
  },
  { 
    id: "S6029",
    name: "Rice Grain Weave", 
    img: "/images/carbon-rock-boards/fabric/2.jpg", 
    desc: "Rice Grain Weave surface resembling natural linen threads.", 
    stock: 10 
  },
  { 
    id: "T6102", 
    name: "Silver Mesh", 
    img: "/images/carbon-rock-boards/fabric/3.jpg", 
    desc: "Silver Mesh metallic-style weave, adding reflective depth.", 
    stock: 10 
  },
  { 
    id: "T6306", 
    name: "Alabaster Cotton", 
    img: "/images/carbon-rock-boards/fabric/4.jpg", 
    desc: "Alabaster Cotton smooth textile finish with soft tone.", 
    stock: 10 
  },
  { 
    id: "S6020", 
    name: "Soft Gauze", 
    img: "/images/carbon-rock-boards/fabric/5.jpg", 
    desc: "Soft Gauze airy fabric effect with delicate transparency.", 
    stock: 10 
  }
]

  },
  {
    id: 'wood',
    name: "Wood Grain Series",
    desc: "Warm wood aesthetics with durable surface.",
    icon: TreePine,
    img: "/images/carbon-rock-boards/wood.jpg",
    color: "from-amber-100 to-orange-100",
    accent: "amber-600",
    panels: [
      { id: "T9016", name: "Ash Grey", img: "/images/carbon-rock-boards/wood/1.jpg", desc: "Soft ash grain with light grey overtone", stock: 10 },
      { id: "T9051", name: "Walnut Mist", img: "/images/carbon-rock-boards/wood/2.jpg", desc: "Mid-brown walnut tone with subtle striations", stock: 10 },
      { id: "T9222", name: "Smoked Ash", img: "/images/carbon-rock-boards/wood/3.jpg", desc: "Dark smoked ash grain with rich contrast", stock: 10 },
      { id: "T9012", name: "Rosewood Brown", img: "/images/carbon-rock-boards/wood/4.jpg", desc: "Warm reddish grain like tropical leatherwood", stock: 10 },
      { id: "T9015", name: "Weathered Storm", img: "/images/carbon-rock-boards/wood/5.jpg", desc: "Weathered wood texture with a stormy tone", stock: 10 },
      { id: "T9053", name: "Walnut Stream", img: "/images/carbon-rock-boards/wood/6.jpg", desc: "Strong walnut character with deep flowing grain", stock: 10 }
    ]
  },
  {
    id: 'solid',
    name: "Solid Color Series",
    desc: "Industrial elegance with raw, minimalist tones.",
    icon: Square,
    img: "/images/carbon-rock-boards/wpc.jpg",
    color: "from-slate-100 to-gray-100",
    accent: "slate-600",
    panels: [
      { id: "T8201", name: "Warm Blush", img: "/images/carbon-rock-boards/solid/1.jpg", desc: "A soft blush hue for cozy minimalism", stock: 10 },
      { id: "T8026", name: "Ash Silver", img: "/images/carbon-rock-boards/solid/2.jpg", desc: "Neutral silver-gray with a clean industrial look", stock: 10 },
      { id: "T8107", name: "Slate Blue", img: "/images/carbon-rock-boards/solid/3.jpg", desc: "Dark blue-grey with a sophisticated edge", stock: 10 },
      { id: "T8039", name: "Ivory", img: "/images/carbon-rock-boards/solid/4.jpg", desc: "Soft ivory tone perfect for elegant settings", stock: 10 },
      { id: "T8103", name: "Pearl Cream", img: "/images/carbon-rock-boards/solid/5.jpg", desc: "Soft pearl-beige tone for warm ambience", stock: 10 },
      { id: "T8036", name: "Desert Sand", img: "/images/carbon-rock-boards/solid/6.jpg", desc: "Warm tan reminiscent of natural sands", stock: 10 },
      { id: "T8008", name: "Obsidian", img: "/images/carbon-rock-boards/solid/7.jpg", desc: "Matte black with premium depth and richness", stock: 10 }
    ]
  },
  {
    id: 'stone',
    name: "Stone Grain Series",
    desc: "Classic stone surface with timeless elegance.",
    icon: Gem,
    img: "/images/carbon-rock-boards/stone.jpg",
    color: "from-stone-100 to-slate-100",
    accent: "stone-600",
    panels: [
      { id: "S3231", name: "White & Gold", img: "/images/carbon-rock-boards/stone/1.jpg", desc: "Stone texture White & Gold", stock: 0 },
      { id: "S3232", name: "Black & Blue", img: "/images/carbon-rock-boards/stone/2.jpg", desc: "Stone texture Black & Blue", stock: 0 },
      { id: "T3017", name: "Mid Grey & White", img: "/images/carbon-rock-boards/stone/4.jpg", desc: "Stone texture Mid Grey & White", stock: 0 },
      { id: "T3204", name: "Dark Grey & Black", img: "/images/carbon-rock-boards/stone/5.jpg", desc: "Stone texture Dark Grey & Black", stock: 0 }
    ]
  },
  {
    id: 'metallic',
    name: "Metal Series",
    desc: "Luxury feel with metallic luster and reflectivity.",
    icon: Layers,
    img: "/images/carbon-rock-boards/metal.jpg",
    color: "from-amber-100 to-yellow-100",
    accent: "amber-600",
    panels: [
  { 
    id: "LS-2A05", 
    name: "Antique Copper", 
    img: "/images/carbon-rock-boards/metal/1.jpg", 
    desc: "Rich antique copper finish with timeless, rustic charm.", 
    stock: 10 
  },
  { 
    id: "LS-2A06", 
    name: "Urban Brass", 
    img: "/images/carbon-rock-boards/metal/2.jpg", 
    desc: "Bold brass tone with an industrial, modern character.", 
    stock: 10 
  },
  { 
    id: "LS-2A08", 
    name: "Champagne Gold", 
    img: "/images/carbon-rock-boards/metal/3.jpg", 
    desc: "Luxurious champagne gold with a refined, soft glow.", 
    stock: 10 
  },
  { 
    id: "LS-2A09", 
    name: "Brushed Bronze", 
    img: "/images/carbon-rock-boards/metal/4.jpg", 
    desc: "Matte brushed bronze with warm, contemporary appeal.", 
    stock: 10 
  },
  { 
    id: "SZ-703", 
    name: "Brushed Silver", 
    img: "/images/carbon-rock-boards/metal/5.jpg", 
    desc: "Sleek brushed silver offering a clean, modern look.", 
    stock: 10 
  },
  { 
    id: "SZ-705", 
    name: "Satin Titanium", 
    img: "/images/carbon-rock-boards/metal/6.jpg", 
    desc: "Smooth satin titanium with a durable, futuristic finish.", 
    stock: 10 
  },
  { 
    id: "H-8301", 
    name: "Brushed Copper", 
    img: "/images/carbon-rock-boards/metal/7.jpg", 
    desc: "Textured brushed copper with a warm metallic tone.", 
    stock: 10 
  }
]
  },
  {
    id: 'mirror',
    name: "Mirror Series",
    desc: "Reflective brilliance with a sleek, high-gloss finish.",
    icon: Square,
    img: "/images/carbon-rock-boards/mirror.jpg",
    color: "from-leather-100 to-leather-100",
    accent: "stone-600",
    panels: [
  { 
    id: "MR2001", 
    name: "Mirror Bronze", 
    img: "/images/carbon-rock-boards/mirror/1.webp", 
    desc: "Elegant bronze mirror with a warm reflection.", 
    stock: 10 
  },
  { 
    id: "MR2003", 
    name: "Mirror Black", 
    img: "/images/carbon-rock-boards/mirror/2.webp", 
    desc: "Bold black mirror with a dramatic reflection.", 
    stock: 10 
  },
  { 
    id: "MR2004", 
    name: "Ripple Gold Mirror", 
    img: "/images/carbon-rock-boards/mirror/4.webp", 
    desc: "Textured gold mirror with a radiant glow.", 
    stock: 10 
  },
  { 
    id: "MR2005", 
    name: "Mirror Silver", 
    img: "/images/carbon-rock-boards/mirror/3.webp", 
    desc: "Classic silver mirror with a clear finish.", 
    stock: 10 
  },
  { 
    id: "MR2006",
    name: "Mirror White", 
    img: "/images/carbon-rock-boards/mirror/5.webp", 
    desc: "Clean white mirror with a bright reflection.", 
    stock: 10 
  }
]
  }
];

/** -----------------------------------------------------------
 * Helpers
 * --------------------------------------------------------- */
const mmFrom = (val: string, unit: Unit) => {
  const num = parseFloat(val.replace(/[^\d.]/g, ""));
  if (!isFinite(num)) return 0;
  return unit === "mm" ? Math.round(num) : Math.round(num * 1000);
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const numberFormat = (n: number) => new Intl.NumberFormat("en-GB").format(n);

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  // Flexible: allows + for international, or local starting with 0
  const phoneRegex = /^(?:\+?\d{1,15}|0\d{1,15})$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};


const genAISeo = (state: SwQuoteState) => {
  const keys: string[] = [];
  if (state.accessories.tv) keys.push("TV module");
  if (state.accessories.fireplace) keys.push("electric fireplace");
  if (state.accessories.soundbar) keys.push("soundbar");
  if (state.accessories.shelvingQty > 0) keys.push(`${state.accessories.shelvingQty}x shelving`);

  const gaming = state.gaming.mode
    ? [`${state.gaming.mode === "dual" ? "dual-screen" : "single-screen"} gaming`]
    : [];

  const deviceKeys = Object.entries(state.devices)
    .filter(([, v]) => v)
    .map(([k]) => k.replace(/([A-Z])/g, " $1").toLowerCase());

  const styleBits = state.finish ? [`${state.finish.name} (${state.finish.id})`] : [];

  const title = `Smart Wall Quote — ${[
    ...keys,
    ...gaming,
    ...styleBits,
  ]
    .filter(Boolean)
    .join(", ") || "Custom Configuration"} | The Wall Shop`;

  const description = `Get a personalised smart wall quote with module planning, ${[
    "dimensions",
    "accessories",
    "gaming",
    "devices",
    "styles",
  ].join(", ")}, and AI-SEO structured data on thewallshop.co.uk.`;

  const keywords = [
    "smart wall",
    "wall modules",
    "home automation",
    "gaming wall",
    "orvibo",
    "mixpad",
    ...keys,
    ...deviceKeys,
  ]
    .filter(Boolean)
    .join(", ");

  return { title, description, keywords };
};

const injectSEO = (state: SwQuoteState) => {
  if (typeof document === "undefined") return;
  const { title, description, keywords } = genAISeo(state);

  // Title
  document.title = title;

  // Meta description
  let desc = document.querySelector('meta[name="description"]');
  if (!desc) {
    desc = document.createElement("meta");
    desc.setAttribute("name", "description");
    document.head.appendChild(desc);
  }
  desc.setAttribute("content", description);

  // Meta keywords
  let kw = document.querySelector('meta[name="keywords"]');
  if (!kw) {
    kw = document.createElement("meta");
    kw.setAttribute("name", "keywords");
    document.head.appendChild(kw);
  }
  kw.setAttribute("content", keywords);

  // JSON-LD
  const id = "swquote-jsonld";
  let script = document.getElementById(id);
  if (script) script.remove();
  const payload = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Smart Wall Design & Installation",
    provider: { "@type": "Organization", name: "The Wall Shop", url: "https://www.thewallshop.co.uk" },
    areaServed: "UK",
    serviceType: "Smart Wall",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Smart Wall Options",
      itemListElement: [
        { "@type": "Offer", name: "Accessories", itemOffered: Object.entries(state.accessories).map(([k, v]) => `${k}:${v}`) },
        { "@type": "Offer", name: "Gaming", itemOffered: [state.gaming.mode, ...Object.keys(state.gaming.options ?? {})].filter(Boolean) },
        { "@type": "Offer", name: "Devices", itemOffered: Object.keys(state.devices ?? {}) },
        state.finish ? { "@type": "Offer", name: "Finish", itemOffered: [`${state.finish.name} (${state.finish.id})`] } : null,
      ].filter(Boolean),
    },
  };
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.id = id;
  s.text = JSON.stringify(payload);
  document.head.appendChild(s);
};

/** -----------------------------------------------------------
 * Main Component
 * --------------------------------------------------------- */
export default function SwQuoteModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: any) => void;
}) {
  const [step, setStep] = useState<Step>("dimensions");
  const [state, setState] = useState<SwQuoteState>({
    widthInput: "",
    widthUnit: "mm",
    heightInput: "",
    heightUnit: "mm",
    moduleDepth: 120,
    widthMm: 0,
    heightMm: 0,
    accessories: { tv: false, fireplace: false, soundbar: false, shelvingQty: 0 },
    gaming: { mode: null, options: {} },
    devices: {},
    styleCategory: null,
    finish: null,
    contact: {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      consent: false,
    },
    skipConfirm: { accessories: false, devices: false },
    isSubmitting: false,
    submitSuccess: false,
    submitError: null,
  });

  // Derive normalized dimensions
  useEffect(() => {
    const widthMm = mmFrom(state.widthInput, state.widthUnit);
    const heightMm = mmFrom(state.heightInput, state.heightUnit);
    const clampedHeight = clamp(heightMm, HEIGHT_MIN, HEIGHT_MAX);
    setState((p) => ({ ...p, widthMm, heightMm: clampedHeight }));
  }, [state.widthInput, state.widthUnit, state.heightInput, state.heightUnit]);

  const usableWidth = Math.max(0, state.widthMm - WIDTH_CLEARANCE);
  const slotCount = useMemo(() => {
    return Math.floor(usableWidth / state.moduleDepth);
  }, [usableWidth, state.moduleDepth]);

  const canNextDimensions =
    state.widthMm > 0 &&
    state.heightMm >= HEIGHT_MIN &&
    state.heightMm <= HEIGHT_MAX &&
    slotCount > 0;

  const mustConfirmAccessories =
    !state.accessories.tv &&
    !state.accessories.fireplace &&
    !state.accessories.soundbar &&
    state.accessories.shelvingQty === 0;

  const mustConfirmDevices = Object.values(state.devices).filter(Boolean).length === 0;

  const dualScreenBlocked =
    state.gaming.mode === "dual" && state.widthMm > 0 && state.widthMm < DUAL_SCREEN_MIN_WIDTH;

  const canNextContact = 
    state.contact.name.trim() !== "" &&
    validateEmail(state.contact.email) &&
    validatePhone(state.contact.phone) &&
    state.contact.address.trim() !== "" &&
    state.contact.consent;

  // Inject SEO/JSON-LD as state evolves
  useEffect(() => {
    injectSEO(state);
  }, [state]);

  const goNext = () => {
    if (step === "dimensions") {
      if (!canNextDimensions) return;
      setStep("accessories");
      return;
    }
    if (step === "accessories") {
      if (mustConfirmAccessories && !state.skipConfirm.accessories) {
        setState((p) => ({ ...p, skipConfirm: { ...p.skipConfirm, accessories: true } }));
        return;
      }
      setStep("gaming");
      return;
    }
    if (step === "gaming") {
      if (dualScreenBlocked) return;
      setStep("devices");
      return;
    }
    if (step === "devices") {
      if (mustConfirmDevices && !state.skipConfirm.devices) {
        setState((p) => ({ ...p, skipConfirm: { ...p.skipConfirm, devices: true } }));
        return;
      }
      setStep("styles");
      return;
    }
    if (step === "styles") {
      if (!state.finish) return;
      setStep("contact");
      return;
    }
    if (step === "contact") {
      if (!canNextContact) return;
      setStep("summary");
      return;
    }
  };

  const goBack = () => {
    if (step === "accessories") setStep("dimensions");
    else if (step === "gaming") setStep("accessories");
    else if (step === "devices") setStep("gaming");
    else if (step === "styles") setStep("devices");
    else if (step === "contact") setStep("styles");
    else if (step === "summary") setStep("contact");
  };

  const submit = async () => {
    setState(p => ({ ...p, isSubmitting: true, submitError: null }));

    const payload = {
      dimensions: {
        widthMm: state.widthMm,
        heightMm: state.heightMm,
        moduleDepth: state.moduleDepth,
        usableWidth,
        slotCount,
      },
      accessories: {
        tv: state.accessories.tv,
        fireplace: state.accessories.fireplace,
        soundbar: state.accessories.soundbar,
        shelvingQty: state.accessories.shelvingQty,
      },
      gaming: {
        mode: state.gaming.mode,
        options: Object.entries(state.gaming.options)
          .filter(([, v]) => v)
          .map(([k]) => k),
      },
      devices: Object.entries(state.devices)
        .filter(([, v]) => v)
        .map(([k]) => k),
      style: {
        category: state.styleCategory,
        finish: state.finish,
      },
      contact: {
        name: state.contact.name,
        email: state.contact.email,
        phone: state.contact.phone,
        address: state.contact.address,
        message: state.contact.message,
      },
      aiSEO: genAISeo(state),
      domain: "thewallshop.co.uk",
    };

    try {
      if (onSubmit) onSubmit(payload);
      
      const response = await fetch("/api/sendSwQuote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.ok) {
        setState(p => ({ ...p, isSubmitting: false, submitSuccess: true }));
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error("Submit error:", e);
      setState(p => ({ 
        ...p, 
        isSubmitting: false, 
        submitError: e.message || "Failed to submit quote. Please try again." 
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="w-full sm:max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Smart Wall Quote Modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <PanelsTopLeft className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-semibold">Smart Wall Quote</h2>
          </div>
          <button
            aria-label="Close"
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={onClose}
            disabled={state.isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-4 sm:px-6 py-2">
          <ProgressBar step={step} />
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-4 max-h-[70vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === "dimensions" && (
              <StepDimensions
                key="dimensions"
                state={state}
                setState={setState}
                slotCount={slotCount}
                usableWidth={usableWidth}
              />
            )}
            {step === "accessories" && (
              <StepAccessories
                key="accessories"
                state={state}
                setState={setState}
              />
            )}
            {step === "gaming" && (
              <StepGaming
                key="gaming"
                state={state}
                setState={setState}
                dualScreenBlocked={dualScreenBlocked}
              />
            )}
            {step === "devices" && (
              <StepDevices key="devices" state={state} setState={setState} />
            )}
            {step === "styles" && (
              <StepStyles key="styles" state={state} setState={setState} />
            )}
            {step === "contact" && (
              <StepContact key="contact" state={state} setState={setState} />
            )}
            {step === "summary" && (
              <StepSummary
                key="summary"
                state={state}
                slotCount={slotCount}
                usableWidth={usableWidth}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={step === "dimensions" || state.isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            {state.submitSuccess && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Quote submitted successfully!</span>
              </div>
            )}
            {state.submitError && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">{state.submitError}</span>
              </div>
            )}
            {step !== "summary" ? (
              <button
                onClick={goNext}
                disabled={
                  (step === "dimensions" && !canNextDimensions) ||
                  (step === "gaming" && dualScreenBlocked) ||
                  (step === "styles" && !state.finish) ||
                  (step === "contact" && !canNextContact) ||
                  state.isSubmitting
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={state.isSubmitting || state.submitSuccess}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {state.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Quote Request
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Confirm skip (Accessories) */}
      <ConfirmSkip
        open={state.skipConfirm.accessories && step === "accessories" && mustConfirmAccessories}
        title="Are you sure you don't want to integrate any Accessory into your smart wall?"
        onGoBack={() =>
          setState((p) => ({ ...p, skipConfirm: { ...p.skipConfirm, accessories: false } }))
        }
        onContinue={() => {
          setState((p) => ({ ...p, skipConfirm: { ...p.skipConfirm, accessories: false } }));
          setStep("gaming");
        }}
      />

      {/* Confirm skip (Devices) */}
      <ConfirmSkip
        open={state.skipConfirm.devices && step === "devices" && mustConfirmDevices}
        title="Are you sure you don't want to integrate any Smart Device into your smart wall?"
        onGoBack={() =>
          setState((p) => ({ ...p, skipConfirm: { ...p.skipConfirm, devices: false } }))
        }
        onContinue={() => {
          setState((p) => ({ ...p, skipConfirm: { ...p.skipConfirm, devices: false } }));
          setStep("styles");
        }}
      />
    </div>
  );
}

/** -----------------------------------------------------------
 * Subcomponents
 * --------------------------------------------------------- */
function ProgressBar({ step }: { step: Step }) {
  const steps: Step[] = [
    "dimensions",
    "accessories",
    "gaming",
    "devices",
    "styles",
    "contact",
    "summary",
  ];
  const idx = steps.indexOf(step);
  const pct = ((idx + 1) / steps.length) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Dimensions</span>
        <span>Accessories</span>
        <span>Gaming</span>
        <span>Devices</span>
        <span>Styles</span>
        <span>Contact</span>
        <span>Summary</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black transition-all"
          style={{ width: `${pct}%` }}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  helper,
  error,
}: {
  label: string;
  children: React.ReactNode;
  helper?: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
      {helper && <p className="text-xs text-gray-600">{helper}</p>}
    </div>
  );
}

function RadioPill<T extends string | number>({
  value,
  current,
  onSelect,
  children,
}: {
  value: T;
  current: T;
  onSelect: (v: T) => void;
  children: React.ReactNode;
}) {
  const active = value === current;
  return (
    <button
      type="button"
      className={`px-3 py-1 rounded-full border ${
        active ? "bg-black text-white border-black" : "hover:bg-gray-50"
      }`}
      onClick={() => onSelect(value)}
    >
      {children}
    </button>
  );
}

function Card({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left w-full rounded-2xl border p-4 transition ${
        active ? "border-black ring-2 ring-black" : "hover:shadow-sm"
      }`}
    >
      {children}
    </button>
  );
}

/** Step: Dimensions */
function StepDimensions({
  state,
  setState,
  slotCount,
  usableWidth,
}: {
  state: SwQuoteState;
  setState: React.Dispatch<React.SetStateAction<SwQuoteState>>;
  slotCount: number;
  usableWidth: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      className="space-y-5"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Ruler className="w-5 h-5" />
        Wall Dimensions
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Available Wall Width"
          helper={
            <span className="inline-flex items-center gap-2 text-gray-700">
              <MoveHorizontal className="w-4 h-4" />
              Enter your total available width. Usable width = width − {WIDTH_CLEARANCE} mm.
            </span>
          }
        >
          <div className="flex gap-2">
            <input
              inputMode="decimal"
              value={state.widthInput}
              onChange={(e) =>
                setState((p) => ({ ...p, widthInput: e.target.value }))
              }
              placeholder={state.widthUnit === "mm" ? "e.g., 3000" : "e.g., 3"}
              className="w-full border rounded-xl px-3 py-2"
            />
            <RadioPill<Unit>
              value="mm"
              current={state.widthUnit}
              onSelect={(v) => setState((p) => ({ ...p, widthUnit: v }))}
            >
              mm
            </RadioPill>
            <RadioPill<Unit>
              value="m"
              current={state.widthUnit}
              onSelect={(v) => setState((p) => ({ ...p, widthUnit: v }))}
            >
              m
            </RadioPill>
          </div>
        </Field>

        <Field
          label="Available Wall Height"
          helper={
            <span className="inline-flex items-center gap-2 text-gray-700">
              <MoveVertical className="w-4 h-4" />
              Allowed range: {HEIGHT_MIN}–{HEIGHT_MAX} mm. Default {DEFAULT_HEIGHT} mm.
            </span>
          }
        >
          <div className="flex gap-2">
            <input
              inputMode="decimal"
              value={state.heightInput}
              onChange={(e) =>
                setState((p) => ({ ...p, heightInput: e.target.value }))
              }
              placeholder={state.heightUnit === "mm" ? "e.g., 2400" : "e.g., 2.4"}
              className="w-full border rounded-xl px-3 py-2"
            />
            <RadioPill<Unit>
              value="mm"
              current={state.heightUnit}
              onSelect={(v) => setState((p) => ({ ...p, heightUnit: v }))}
            >
              mm
            </RadioPill>
            <RadioPill<Unit>
              value="m"
              current={state.heightUnit}
              onSelect={(v) => setState((p) => ({ ...p, heightUnit: v }))}
            >
              m
            </RadioPill>
          </div>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Preferred Module Depth">
          <div className="flex flex-wrap gap-2">
            {MODULE_DEPTHS.map((md) => (
              <RadioPill<ModuleDepth>
                key={md}
                value={md}
                current={state.moduleDepth}
                onSelect={(v) => setState((p) => ({ ...p, moduleDepth: v }))}
              >
                {md} mm
              </RadioPill>
            ))}
          </div>
        </Field>

        <div className="rounded-xl bg-gray-50 border p-3">
          <p className="text-sm">
            Usable width: <strong>{numberFormat(usableWidth)} mm</strong>
          </p>
          {/* <p className="text-sm">
            Slot count:{" "}
            <strong>
              {slotCount} × {state.moduleDepth} mm
            </strong>{" "}
            after {WIDTH_CLEARANCE} mm clearance.
          </p> */}
          <p className="text-xs text-gray-600">
            Modules will scale to fit total height ({numberFormat(state.heightMm)} mm).
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/** Step: Accessories */
function StepAccessories({
  state,
  setState,
}: {
  state: SwQuoteState;
  setState: React.Dispatch<React.SetStateAction<SwQuoteState>>;
}) {
  const toggles: { key: AccessoryKey; title: string; Icon: any }[] = [
    { key: "tv", title: "TV", Icon: Tv },
    { key: "fireplace", title: "Electric Fireplace", Icon: Flame },
    { key: "soundbar", title: "Soundbar", Icon: Waves },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      className="space-y-5"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Archive className="w-5 h-5" />
        Accessories
      </h3>

      <div className="grid sm:grid-cols-3 gap-3">
        {toggles.map(({ key, title, Icon }) => {
          const active = state.accessories[key as "tv" | "fireplace" | "soundbar"];
          return (
            <Card
              key={key}
              active={active}
              onClick={() =>
                setState((p) => ({
                  ...p,
                  accessories: { ...p.accessories, [key]: !active },
                }))
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-6 h-6" />
                <div>
                  <div className="font-medium">{title}</div>
                  <div className="text-xs text-gray-600">
                    Tap to {active ? "remove" : "add"}.
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {/* Shelving with quantity */}
        <Card>
          <div className="flex items-center gap-3">
            <Archive className="w-6 h-6" />
            <div className="flex-1">
              <div className="font-medium">Shelving</div>
              <div className="text-xs text-gray-600">Select quantity</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Decrease shelves"
                className="w-8 h-8 rounded-full border hover:bg-gray-50"
                onClick={() =>
                  setState((p) => ({
                    ...p,
                    accessories: {
                      ...p.accessories,
                      shelvingQty: Math.max(0, p.accessories.shelvingQty - 1),
                    },
                  }))
                }
              >
                −
              </button>
              <span className="min-w-6 text-center">
                {state.accessories.shelvingQty}
              </span>
              <button
                aria-label="Increase shelves"
                className="w-8 h-8 rounded-full border hover:bg-gray-50"
                onClick={() =>
                  setState((p) => ({
                    ...p,
                    accessories: {
                      ...p.accessories,
                      shelvingQty: Math.min(6, p.accessories.shelvingQty + 1),
                    },
                  }))
                }
              >
                +
              </button>
            </div>
          </div>
        </Card>
      </div>

      <p className="text-xs text-gray-600">
        Tip: You can add multiple shelves (e.g. 3–4) to balance the composition.
      </p>
    </motion.div>
  );
}

/** Step: Gaming */
function StepGaming({
  state,
  setState,
  dualScreenBlocked,
}: {
  state: SwQuoteState;
  setState: React.Dispatch<React.SetStateAction<SwQuoteState>>;
  dualScreenBlocked: boolean;
}) {
  const mode = state.gaming.mode;

  const gamingToggles: { key: GamingOptionKey; title: string; Icon: any }[] = [
    { key: "controllerCharger", title: "Controller Charger", Icon: Gamepad2 },
    { key: "gamingShelfDesk", title: "Shelf / Desk", Icon: Archive },
    { key: "concealedPC", title: "Concealed PC System", Icon: Cpu },
    { key: "openPC", title: "Open PC System", Icon: Cpu },
    { key: "rgbLights", title: "RGB Lights", Icon: Lightbulb },
    { key: "smartChair", title: "Smart Chair", Icon: Monitor },
    { key: "gamingSoundbar", title: "Soundbar", Icon: Waves },
    { key: "gamingSpeakers", title: "Speakers", Icon: Speaker },
    { key: "curtainControl", title: "Curtain Control", Icon: DoorOpen },
    { key: "centralPanel", title: "Central Control Panel", Icon: PanelsTopLeft },
    { key: "climateControl", title: "Climate Control", Icon: Fan },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      className="space-y-5"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" />
        Gaming
      </h3>

      <Field label="Screen Layout">
        <div className="flex gap-2">
          <RadioPill<GamingMode>
            value="single"
            current={mode || "single"}
            onSelect={(v) =>
              setState((p) => ({ ...p, gaming: { ...p.gaming, mode: v } }))
            }
          >
            Single Screen
          </RadioPill>
          <RadioPill<GamingMode>
            value="dual"
            current={mode || "single"}
            onSelect={(v) =>
              setState((p) => ({ ...p, gaming: { ...p.gaming, mode: v } }))
            }
          >
            Dual Screen
          </RadioPill>
        </div>
        {mode === "dual" && (
          <p className={`text-sm mt-2 ${dualScreenBlocked ? "text-red-600" : "text-gray-600"}`}>
            Dual Screen requires available width &ge; {DUAL_SCREEN_MIN_WIDTH} mm.
          </p>
        )}
      </Field>

      <div className="grid sm:grid-cols-2 gap-3">
        {gamingToggles.map(({ key, title, Icon }) => {
          const active = !!state.gaming.options[key];
          return (
           <Card
            key={key}
            active={active}
            onClick={() =>
              setState((p) => ({
                ...p,
                gaming: {
                  ...p.gaming,
                  options: { ...p.gaming.options, [key]: !active },
                },
              }))
            }
          >
              <div className="flex items-center gap-3">
                <Icon className="w-6 h-6" />
                <div>
                  <div className="font-medium">{title}</div>
                  <div className="text-xs text-gray-600">
                    Tap to {active ? "remove" : "add"}.
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}

/** Step: Devices */
function StepDevices({
  state,
  setState,
}: {
  state: SwQuoteState;
  setState: React.Dispatch<React.SetStateAction<SwQuoteState>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      className="space-y-5"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <PanelsTopLeft className="w-5 h-5" />
        Smart Devices
      </h3>

      <div className="grid sm:grid-cols-2 gap-3">
        {deviceCatalog.map((d) => {
          const active = !!state.devices[d.key];
          const Ico = d.Icon;
          return (
            <Card
              key={d.key}
              active={active}
              onClick={() =>
                setState((p) => ({
                  ...p,
                  devices: { ...p.devices, [d.key]: !active },
                }))
              }
            >
              <div className="flex items-start gap-3">
                <Ico className="w-6 h-6 mt-1" />
                <div>
                  <div className="font-medium">{d.title}</div>
                  <div className="text-xs text-gray-600">{d.category}</div>
                  <p className="text-sm mt-1">{d.desc}</p>
                  <ul className="mt-2 text-xs text-gray-700 list-disc ml-5">
                    {d.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}

/** Step: Styles */
function StepStyles({
  state,
  setState,
}: {
  state: SwQuoteState;
  setState: React.Dispatch<React.SetStateAction<SwQuoteState>>;
}) {
  // Derive label list from textureCategories
  const categories = textureCategories.map((c) => ({
    key: c.id as StyleCategory,
    label: c.name,
  }));

  const activeCat =
    textureCategories.find((c) => c.id === state.styleCategory) ??
    textureCategories[0];

  // Ensure default category is set when entering this step
  useEffect(() => {
    if (!state.styleCategory && activeCat) {
      setState((p) => ({ ...p, styleCategory: activeCat.id as StyleCategory }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finishes = activeCat?.panels ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      className="space-y-5"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <LampCeiling className="w-5 h-5" />
        Style Selection
      </h3>

      <Field label="Category">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <RadioPill<StyleCategory>
              key={c.key}
              value={c.key}
              current={(state.styleCategory ?? c.key) as StyleCategory}
              onSelect={(v) =>
                setState((p) => ({ ...p, styleCategory: v, finish: null }))
              }
            >
              {c.label}
            </RadioPill>
          ))}
        </div>
      </Field>

      {activeCat && (
        <>
          <p className="text-sm text-gray-600">{activeCat.desc}</p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {finishes.map((f) => {
              const active = state.finish?.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setState((p) => ({ ...p, finish: f }))}
                  className={`group relative cursor-pointer transition transform hover:scale-105`}
                  aria-label={`${f.name} (${f.id})`}
                >
                  <div
                    className={`rounded-full aspect-square ring-1 ${
                      active ? "ring-4 ring-offset-2 ring-black" : "ring-gray-300"
                    }`}
                  >
                    <img
                      src={f.img}
                      alt={f.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Caption always visible under the image */}
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium">{f.name}</div>
                    <div className="text-xs text-gray-600">{f.id}</div>

                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-600 text-center">Many more options are available on request</p>
        </>
      )}
    </motion.div>
  );
}

/** Step: Contact */
function StepContact({
  state,
  setState,
}: {
  state: SwQuoteState;
  setState: React.Dispatch<React.SetStateAction<SwQuoteState>>;
}) {
  const updateContact = (field: keyof ContactInfo, value: string | boolean) => {
    setState((p) => ({
      ...p,
      contact: { ...p.contact, [field]: value },
    }));
  };

  const nameError = state.contact.name.trim() === "" ? "Name is required" : "";
  const emailError = !validateEmail(state.contact.email) ? "Valid email is required" : "";
  const phoneError = !validatePhone(state.contact.phone) ? "Valid phone number is required" : "";
  const addressError = state.contact.address.trim() === "" ? "Address is required" : "";
  const consentError = !state.contact.consent ? "You must agree to be contacted" : "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      className="space-y-5"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <User className="w-5 h-5" />
        Contact Details
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Full Name"
          error={nameError}
        >
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={state.contact.name}
              onChange={(e) => updateContact("name", e.target.value)}
              placeholder="Enter your full name"
              className={`w-full border rounded-xl px-10 py-2 ${nameError ? "border-red-300" : ""}`}
            />
          </div>
        </Field>

        <Field
          label="Email Address"
          error={emailError}
        >
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={state.contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
              placeholder="your.email@example.com"
              className={`w-full border rounded-xl px-10 py-2 ${emailError ? "border-red-300" : ""}`}
            />
          </div>
        </Field>

        <Field
          label="Phone Number"
          error={phoneError}
        >
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={state.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
              placeholder="+44 123 456 7890"
              className={`w-full border rounded-xl px-10 py-2 ${phoneError ? "border-red-300" : ""}`}
            />
          </div>
        </Field>

        <Field
          label="Address"
          error={addressError}
        >
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              value={state.contact.address}
              onChange={(e) => updateContact("address", e.target.value)}
              placeholder="Enter your full address"
              rows={3}
              className={`w-full border rounded-xl px-10 py-2 resize-none ${addressError ? "border-red-300" : ""}`}
            />
          </div>
        </Field>
      </div>

      <Field
        label="Additional Message (Optional)"
      >
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            value={state.contact.message}
            onChange={(e) => updateContact("message", e.target.value)}
            placeholder="Any specific requirements or questions about your smart wall project..."
            rows={4}
            className="w-full border rounded-xl px-10 py-2 resize-none"
          />
        </div>
      </Field>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            checked={state.contact.consent}
            onChange={(e) => updateContact("consent", e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="consent" className="text-sm text-gray-700">
            I agree to be contacted by The Wall Shop regarding my smart wall quote. 
            I understand that my information will be used to provide a personalized quote 
            and follow-up services. I can withdraw consent at any time.
          </label>
        </div>
        {consentError && <p className="text-xs text-red-600">{consentError}</p>}
      </div>

      <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
        <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• We'll review your smart wall configuration within 24 hours</li>
          <li>• Our team will contact you to discuss your requirements</li>
          <li>• We'll provide a detailed quote and timeline</li>
          <li>• Schedule a consultation if needed</li>
        </ul>
      </div>
    </motion.div>
  );
}

/** Step: Summary */
function StepSummary({
  state,
  slotCount,
  usableWidth,
}: {
  state: SwQuoteState;
  slotCount: number;
  usableWidth: number;
}) {
  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Contact",
      value: `${state.contact.name} (${state.contact.email})`,
    },
    {
      label: "Dimensions",
      value: `${numberFormat(state.widthMm)} × ${numberFormat(state.heightMm)} mm`,
    },
    {
      label: "Module Width",
      value: `${state.moduleDepth} mm`,
    },
    {
      label: "Usable Width",
      value: `${numberFormat(usableWidth)} mm`,
    },
    {
      label: "Slots",
      value: `${slotCount}`,
    },
    {
      label: "Accessories",
      value: [
        state.accessories.tv && "TV",
        state.accessories.fireplace && "Electric Fireplace",
        state.accessories.soundbar && "Soundbar",
        state.accessories.shelvingQty > 0 &&
          `${state.accessories.shelvingQty}x Shelving`,
      ]
        .filter(Boolean)
        .join(", ") || "None",
    },
    {
      label: "Gaming",
      value:
        (state.gaming.mode
          ? state.gaming.mode === "dual"
            ? "Dual Screen"
            : "Single Screen"
          : "Not selected") +
        (Object.entries(state.gaming.options)
          .filter(([, v]) => v)
          .map(([k]) => k)
          .join(", ")
          ? " • " +
            Object.entries(state.gaming.options)
              .filter(([, v]) => v)
              .map(([k]) => k.replace(/([A-Z])/g, " $1"))
              .join(", ")
          : ""),
    },
    {
      label: "Devices",
      value:
        Object.entries(state.devices)
          .filter(([, v]) => v)
          .map(([k]) => k.replace(/([A-Z])/g, " $1"))
          .join(", ") || "None",
    },
    {
      label: "Style",
      value: state.finish
        ? `${state.styleCategory?.toUpperCase()} • ${state.finish.name} (${state.finish.id})`
        : "None selected",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      className="space-y-5"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5" />
        Summary
      </h3>

      <div className="rounded-2xl border divide-y">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between px-4 py-3">
            <div className="text-sm text-gray-600">{r.label}</div>
            <div className="text-sm font-medium text-right">{r.value}</div>
          </div>
        ))}
      </div>

      {state.contact.message && (
        <div className="rounded-xl bg-gray-50 border p-4">
          <h4 className="font-medium mb-2">Additional Message:</h4>
          <p className="text-sm text-gray-700">{state.contact.message}</p>
        </div>
      )}

      <div className="flex items-start gap-2 text-sm text-gray-600">
        <AlertTriangle className="w-4 h-4 mt-0.5" />
        <p>
          This summary will be sent to our team. We'll follow up from{" "}
          <a href="mailto:stephen@thewallshop.co.uk" className="underline">
            stephen@thewallshop.co.uk
          </a>{" "}
          or call +44 141 739 3377 (Mon–Fri, 9:00 AM–6:00 PM GMT).
        </p>
      </div>
    </motion.div>
  );
}

function ConfirmSkip({
  open,
  title,
  onGoBack,
  onContinue,
}: {
  open: boolean;
  title: string;
  onGoBack: () => void;
  onContinue: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h4 className="text-base font-semibold mb-2">{title}</h4>
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            onClick={onGoBack}
            className="px-4 py-2 rounded-xl border hover:bg-gray-50"
          >
            Go back
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
          >
            No, Continue
          </button>
        </div>
      </div>
    </div>
  );
}
