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
  X, Layers, TreePine, Square, Gem
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
  | "summary";

type ModuleWidth = 400 | 600 | 800 | 1000 | 1100 | 1200;

type AccessoryKey = "tv" | "fireplace" | "soundbar" | "shelving";
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

type SwQuoteState = {
  // Dimensions
  widthInput: string; // as typed
  widthUnit: Unit;
  heightInput: string; // as typed
  heightUnit: Unit;
  moduleWidth: ModuleWidth;

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

  // UX ephemeral
  skipConfirm: {
    accessories: boolean; // should we show confirm?
    devices: boolean; // should we show confirm?
  };
};

/** -----------------------------------------------------------
 * Constants & Mock Catalogs
 * --------------------------------------------------------- */
const HEIGHT_MIN = 2200;
const HEIGHT_MAX = 4000;
const DEFAULT_HEIGHT = 2400;
const WIDTH_CLEARANCE = 100; // mm
const DUAL_SCREEN_MIN_WIDTH = 3000; // mm

const MODULE_WIDTHS: ModuleWidth[] = [400, 600, 800, 1000, 1100, 1200];

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
      { id: "T6301", name: "Chambray Grid", img: "/images/carbon-rock-boards/fabric/3.jpg", desc: "Chambray Grid texture for contemporary interior walls", stock: 10 },
      { id: "S6029", name: "Rice Grain Weave", img: "/images/carbon-rock-boards/fabric/9.jpg", desc: "Rice Grain Weave texture for contemporary interior walls", stock: 10 },
      { id: "T6102", name: "Silver Mesh", img: "/images/carbon-rock-boards/fabric/5.jpg", desc: "Silver Mesh texture for contemporary interior walls", stock: 10 },
      { id: "T6306", name: "Alabaster Cotton", img: "/images/carbon-rock-boards/fabric/11.jpg", desc: "Alabaster Cotton texture for contemporary interior walls", stock: 10 },
      { id: "S6020", name: "Soft Gauze", img: "/images/carbon-rock-boards/fabric/6.jpg", desc: "Soft Gauze texture for contemporary interior walls", stock: 10 }
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
      { id: "T9016", name: "Ash Grey", img: "/images/carbon-rock-boards/wood/16.jpg", desc: "Soft ash grain with light grey overtone", stock: 10 },
      { id: "T9051", name: "Walnut Mist", img: "/images/carbon-rock-boards/wood/2.jpg", desc: "Mid-brown walnut tone with subtle striations", stock: 10 },
      { id: "T9222", name: "Smoked Ash", img: "/images/carbon-rock-boards/wood/3.jpg", desc: "Dark smoked ash grain with rich contrast", stock: 10 },
      { id: "T9012", name: "leatherwood Brown", img: "/images/carbon-rock-boards/wood/11.jpg", desc: "Warm reddish grain like tropical leatherwood", stock: 10 },
      { id: "T9015", name: "Weathered Storm", img: "/images/carbon-rock-boards/wood/5.jpg", desc: "Weathered wood texture with a stormy tone", stock: 10 },
      { id: "T9053", name: "Walnut Stream", img: "/images/carbon-rock-boards/wood/14.jpg", desc: "Strong walnut character with deep flowing grain", stock: 10 }
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
      { id: "T8107", name: "Slate Blue", img: "/images/carbon-rock-boards/solid/10.jpg", desc: "Dark blue-grey with a sophisticated edge", stock: 10 },
      { id: "T8039", name: "Ivory", img: "/images/carbon-rock-boards/solid/11.jpg", desc: "Soft ivory tone perfect for elegant settings", stock: 10 },
      { id: "T8103", name: "Pearl Cream", img: "/images/carbon-rock-boards/solid/17.jpg", desc: "Soft pearl-beige tone for warm ambience", stock: 10 },
      { id: "T8036", name: "Desert Sand", img: "/images/carbon-rock-boards/solid/12.jpg", desc: "Warm tan reminiscent of natural sands", stock: 10 },
      { id: "T8008", name: "Obsidian", img: "/images/carbon-rock-boards/solid/15.jpg", desc: "Matte black with premium depth and richness", stock: 10 }
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
      { id: "S240", name: "S240", img: "/images/carbon-rock-boards/stone/3.jpg", desc: "Stone texture S240", stock: 0 },
      { id: "T3205", name: "Mid Grey & Dark Grey", img: "/images/carbon-rock-boards/stone/4.jpg", desc: "Stone texture Mid Grey & Dark Grey", stock: 0 },
      { id: "T3017", name: "Mid Grey & White", img: "/images/carbon-rock-boards/stone/5.jpg", desc: "Stone texture Mid Grey & White", stock: 0 },
      { id: "T3204", name: "Dark Grey & Black", img: "/images/carbon-rock-boards/stone/6.jpg", desc: "Stone texture Dark Grey & Black", stock: 0 },
      { id: "T3207", name: "T3207", img: "/images/carbon-rock-boards/stone/7.jpg", desc: "Stone texture T3207", stock: 0 },
      { id: "T3024", name: "Dark Grey & White", img: "/images/carbon-rock-boards/stone/8.jpg", desc: "Stone texture Dark Grey & White", stock: 0 }
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
      { id: "M1001", name: "Brushed Bronze", img: "/images/carbon-rock-boards/metal/1.jpg", desc: "Elegant bronze with a brushed satin finish", stock: 10 },
      { id: "M1002", name: "Antique Copper", img: "/images/carbon-rock-boards/metal/2.jpg", desc: "Warm copper tone with vintage character", stock: 10 },
      { id: "M1003", name: "Champagne Gold", img: "/images/carbon-rock-boards/metal/3.jpg", desc: "Subtle golden shimmer with soft elegance", stock: 10 },
      { id: "M1004", name: "Urban Brass", img: "/images/carbon-rock-boards/metal/4.jpg", desc: "Contemporary brass with matte warmth", stock: 10 },
      { id: "M1005", name: "Mirror Silver", img: "/images/carbon-rock-boards/metal/5.jpg", desc: "Sleek silver chrome for high reflectivity", stock: 10 },
      { id: "M1006", name: "Satin Titanium", img: "/images/carbon-rock-boards/metal/6.jpg", desc: "Modern titanium finish with silky texture", stock: 10 }
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
      { id: "MR2001", name: "Bronze Mirror", img: "/images/carbon-rock-boards/mirror/1.jpg", desc: "Warm bronze-tinted mirror with elegant shine", stock: 10 },
      { id: "MR2002", name: "Copper Reflection", img: "/images/carbon-rock-boards/mirror/2.jpg", desc: "Vintage copper tone with smooth mirrored surface", stock: 10 },
      { id: "MR2003", name: "Golden Glow", img: "/images/carbon-rock-boards/mirror/3.jpg", desc: "Champagne gold mirror finish with rich sheen", stock: 10 },
      { id: "MR2004", name: "Brass Luxe", img: "/images/carbon-rock-boards/mirror/4.jpg", desc: "Matte brass reflection with subtle warmth", stock: 10 },
      { id: "MR2005", name: "Crystal Silver", img: "/images/carbon-rock-boards/mirror/5.jpg", desc: "Sleek silver mirror with crisp reflectivity", stock: 10 },
      { id: "MR2006", name: "Titanium Gloss", img: "/images/carbon-rock-boards/mirror/6.jpg", desc: "Cool titanium mirror with polished finish", stock: 10 }
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
 * Component
 * --------------------------------------------------------- */
export default function SwQuoteModal({
  isOpen,
  onClose,
  onSubmit, // optional callback to receive payload
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: any) => void;
}) {
  const [step, setStep] = useState<Step>("dimensions");

  const [state, setState] = useState<SwQuoteState>({
    widthInput: "",
    widthUnit: "mm",
    heightInput: String(DEFAULT_HEIGHT),
    heightUnit: "mm",
    moduleWidth: 1000,

    widthMm: 0,
    heightMm: DEFAULT_HEIGHT,

    accessories: { tv: false, fireplace: false, soundbar: false, shelvingQty: 0 },

    gaming: { mode: null, options: {} },

    devices: {},

    styleCategory: null,
    finish: null,

    skipConfirm: { accessories: false, devices: false },
  });

  // Normalize to mm on change
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      widthMm: mmFrom(prev.widthInput, prev.widthUnit),
      heightMm: clamp(mmFrom(prev.heightInput, prev.heightUnit), HEIGHT_MIN, HEIGHT_MAX),
    }));
  }, [state.widthInput, state.widthUnit, state.heightInput, state.heightUnit]); // eslint-disable-line

  const usableWidth = useMemo(() => Math.max(0, state.widthMm - WIDTH_CLEARANCE), [state.widthMm]);
  const slotCount = useMemo(() => {
    if (!state.moduleWidth || usableWidth <= 0) return 0;
    return Math.floor(usableWidth / state.moduleWidth);
  }, [usableWidth, state.moduleWidth]);

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
      setStep("summary");
      return;
    }
  };

  const goBack = () => {
    if (step === "accessories") setStep("dimensions");
    else if (step === "gaming") setStep("accessories");
    else if (step === "devices") setStep("gaming");
    else if (step === "styles") setStep("devices");
    else if (step === "summary") setStep("styles");
  };

  const submit = async () => {
    const payload = {
      dimensions: {
        widthMm: state.widthMm,
        heightMm: state.heightMm,
        moduleWidth: state.moduleWidth,
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
      aiSEO: genAISeo(state),
      domain: "thewallshop.co.uk",
    };

    try {
      if (onSubmit) onSubmit(payload);
      // Optional: attempt to send to backend if present
       await fetch("/api/sendSwQuote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      onClose();
    } catch (e) {
      console.error(e);
      onClose();
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
            disabled={step === "dimensions"}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            {step !== "summary" ? (
              <button
                onClick={goNext}
                disabled={
                  (step === "dimensions" && !canNextDimensions) ||
                  (step === "gaming" && dualScreenBlocked) ||
                  (step === "styles" && !state.finish)
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Quote
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
}: {
  label: string;
  children: React.ReactNode;
  helper?: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
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
        <Field label="Preferred Module Width">
          <div className="flex flex-wrap gap-2">
            {MODULE_WIDTHS.map((mw) => (
              <RadioPill<ModuleWidth>
                key={mw}
                value={mw}
                current={state.moduleWidth}
                onSelect={(v) => setState((p) => ({ ...p, moduleWidth: v }))}
              >
                {mw} mm
              </RadioPill>
            ))}
          </div>
        </Field>

        <div className="rounded-xl bg-gray-50 border p-3">
          <p className="text-sm">
            Usable width: <strong>{numberFormat(usableWidth)} mm</strong>
          </p>
          <p className="text-sm">
            Slot count:{" "}
            <strong>
              {slotCount} × {state.moduleWidth} mm
            </strong>{" "}
            after {WIDTH_CLEARANCE} mm clearance.
          </p>
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
                    {typeof f.stock === "number" && (
                      <div className="text-[11px] text-gray-500">
                        Stock: {f.stock}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
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
      label: "Dimensions",
      value: `${numberFormat(state.widthMm)} × ${numberFormat(state.heightMm)} mm`,
    },
    {
      label: "Module Width",
      value: `${state.moduleWidth} mm`,
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

      <div className="flex items-start gap-2 text-sm text-gray-600">
        <AlertTriangle className="w-4 h-4 mt-0.5" />
        <p>
          This summary will be sent to our team. We’ll follow up from{" "}
          <a href="mailto:stephen@thewallshop.co.uk" className="underline">
            stephen@thewallshop.co.uk
          </a>{" "}
          or call +44 141 739 3377 (Mon–Fri, 9:00 AM–6:00 PM PST).
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
