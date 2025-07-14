import { useRef, useEffect, useState } from "react";
import {
  Tv,
  Flame,
  Lightbulb,
  Volume2,
  Shield,
  Settings,
  Wifi,
  Thermometer,
  X,
} from "lucide-react";

interface Hotspot {
  id: string;
  icon: any;
  title: string;
  description: string;
  features: string[];
  position: { top: string; left: string };
  color: string;
}

// Brand gold/bronze gradients
const GOLD_GRAD = "bg-gradient-to-br from-[#b69777] to-[#907252]";
const GOLD_BORDER = "border-[#b69777]";
const LIGHT_BG = "bg-[#faf7f3]";

// Hotspot data (adjust position/colors as needed)
const hotspots: Hotspot[] = [
  {
    id: "tv",
    icon: Tv,
    title: "Integrated Display",
    description: "Ultra-slim 4K OLED display seamlessly embedded in the wall panel",
    features: [
      "4K OLED technology",
      "Ultra-thin bezel design",
      "Smart TV capabilities",
      "Wireless connectivity",
      "Voice control ready",
    ],
    position: { top: "24%", left: "28%" },
    color: "bg-blue-600",
  },
  {
    id: "fireplace",
    icon: Flame,
    title: "Smart Fireplace",
    description: "Electric fireplace with remote temperature and ambiance control",
    features: [
      "Instant on/off control",
      "Adjustable temperature",
      "Realistic flame effects",
      "Energy efficient",
      "Safety features",
    ],
    position: { top: "66%", left: "27%" },
    color: "bg-orange-500",
  },
  {
    id: "lighting",
    icon: Lightbulb,
    title: "Ambient Lighting",
    description: "Programmable LED strips with millions of color combinations",
    features: [
      "16 million colors",
      "Automated scheduling",
      "Music synchronization",
      "Energy efficient LEDs",
      "Smartphone control",
    ],
    position: { top: "16%", left: "74%" },
    color: "bg-yellow-500",
  },
  {
    id: "audio",
    icon: Volume2,
    title: "Invisible Speakers",
    description: "Hidden audio system with spatial sound technology",
    features: [
      "Invisible integration",
      "Spatial audio technology",
      "Wireless connectivity",
      "High-fidelity sound",
      "Multi-room support",
    ],
    position: { top: "44%", left: "79%" },
    color: "bg-purple-600",
  },
  {
    id: "security",
    icon: Shield,
    title: "Security Hub",
    description: "Integrated cameras and access control systems",
    features: [
      "Hidden camera integration",
      "Motion detection",
      "Remote monitoring",
      "Access control",
      "Smart alerts",
    ],
    position: { top: "74%", left: "64%" },
    color: "bg-red-600",
  },
  {
    id: "climate",
    icon: Thermometer,
    title: "Climate Control",
    description: "Smart temperature and air quality management",
    features: [
      "Temperature control",
      "Air quality monitoring",
      "Automated ventilation",
      "Energy optimization",
      "Remote access",
    ],
    position: { top: "88%", left: "46%" },
    color: "bg-green-600",
  },
  {
    id: "control",
    icon: Settings,
    title: "Central Control",
    description: "Master control panel for all smart wall functions",
    features: [
      "Touch control interface",
      "Voice commands",
      "Mobile app control",
      "Automation settings",
      "System monitoring",
    ],
    position: { top: "51%", left: "51%" },
    color: "bg-gray-700",
  },
  {
    id: "connectivity",
    icon: Wifi,
    title: "Smart Connectivity",
    description: "Built-in Wi-Fi and IoT device integration",
    features: [
      "Built-in Wi-Fi mesh",
      "IoT device hub",
      "Cloud connectivity",
      "Software updates",
      "Data analytics",
    ],
    position: { top: "30%", left: "59%" },
    color: "bg-indigo-600",
  },
];

const FeatureHotspots = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Close on ESC or outside click
  useEffect(() => {
    if (!activeHotspot) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveHotspot(null);
    };
    const handleClick = (e: MouseEvent) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(e.target as Node)
      ) {
        setActiveHotspot(null);
      }
    };
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [activeHotspot]);

  const handleHotspotClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    if (activeHotspot === id) {
      setActiveHotspot(null);
      setTooltipPos(null);
      return;
    }
    // Find button's position relative to parent
    const container = sectionRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = e.currentTarget.getBoundingClientRect();
    const centerTop = btnRect.top + btnRect.height / 2 - containerRect.top;
    const centerLeft = btnRect.left + btnRect.width / 2 - containerRect.left;
    setActiveHotspot(id);
    setTooltipPos({ top: centerTop, left: centerLeft });
  };

  const activeFeature = hotspots.find((h) => h.id === activeHotspot);

  // Tooltip positioning logic for desktop/mobile
  function getTooltipStyle() {
    if (!tooltipPos || typeof window === "undefined") return {};
    const w = window.innerWidth;
    if (w < 700) {
      // Always center on mobile
      return {
        top: "60%",
        left: "50%",
        transform: "translate(-50%, 0)",
      };
    }
    // Desktop: flip if too close to edge
    let top = tooltipPos.top;
    let left = tooltipPos.left + 80;
    if (left + 350 > 760) left = tooltipPos.left - 330;
    if (top + 260 > 500) top = tooltipPos.top - 160;
    if (left < 30) left = 30;
    if (top < 0) top = 10;
    return {
      top,
      left,
    };
  }

  return (
    <section
      className="relative py-14 px-2 sm:px-8"
      style={{
        background: `url('/images/happy-smart-wall.webp') center/cover no-repeat`,
        borderRadius: "2rem",
      }}
      ref={sectionRef}
    >
      {/* Soft white overlay for contrast */}
      <div className="absolute inset-0 bg-white/80 rounded-[2rem] pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
            Interactive Smart Wall Features
          </h3>
          <p className="text-lg text-[#6b5c47] font-medium">
            Tap or click a hotspot to explore each built-in technology.
          </p>
        </div>

        {/* Wall grid */}
        <div className="relative mx-auto w-full aspect-[16/9] min-h-[330px] max-w-3xl bg-white/60 rounded-3xl shadow-2xl border border-[#ede1d3] overflow-hidden backdrop-blur-lg">
          {/* Decorative panel grid */}
          <div className="absolute inset-0 z-0 grid grid-cols-6 grid-rows-4 gap-2 opacity-90 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className={`rounded-xl border border-[#ede1d3] shadow-sm
                  ${[5, 11].includes(i)
                    ? "bg-gradient-to-br from-blue-100 to-blue-300"
                    : [16, 17].includes(i)
                    ? "bg-gradient-to-br from-orange-100 to-orange-300"
                    : [1, 2, 7, 8].includes(i)
                    ? "bg-gradient-to-br from-[#e0d1bd] to-[#d2b793]"
                    : "bg-[#f9f7f5]"}
                `}
              />
            ))}
          </div>
          {/* Hotspots */}
          {hotspots.map((hotspot) => {
            const IconComponent = hotspot.icon;
            const isActive = activeHotspot === hotspot.id;
            return (
              <button
                key={hotspot.id}
                aria-label={hotspot.title}
                tabIndex={0}
                onClick={(e) => handleHotspotClick(e, hotspot.id)}
                className={`
                  absolute w-12 h-12 rounded-full flex items-center justify-center text-white
                  border-2 border-white/70 shadow-lg hover:scale-110
                  transition-all duration-200 z-10
                  ${hotspot.color}
                  ${isActive ? "ring-4 ring-[#b69777]/60 scale-125 shadow-2xl" : ""}
                `}
                style={{
                  top: hotspot.position.top,
                  left: hotspot.position.left,
                  transform: "translate(-50%, -50%)",
                  zIndex: isActive ? 50 : 10,
                }}
              >
                <IconComponent className="w-6 h-6" />
                {!isActive && (
                  <span className={`absolute inset-0 rounded-full ${hotspot.color} animate-pulse opacity-40`} />
                )}
              </button>
            );
          })}
          {/* Tooltip */}
          {activeFeature && (
            <div
              className={`
                absolute z-40 w-80 max-w-[95vw] 
                bg-white border-2 ${GOLD_BORDER} rounded-2xl shadow-2xl
                animate-fadeIn
                px-6 py-5
                flex flex-col
                `}
              style={getTooltipStyle()}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
            >
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 rounded-full ${activeFeature.color} flex items-center justify-center shadow mr-3`}>
                  <activeFeature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#231c14] text-lg mb-1">{activeFeature.title}</h4>
                  <p className="text-sm text-[#b89773] font-semibold leading-tight">
                    {activeFeature.description}
                  </p>
                </div>
                <button
                  aria-label="Close details"
                  onClick={() => { setActiveHotspot(null); setTooltipPos(null); }}
                  className="ml-auto text-[#b89773] hover:text-[#907252] rounded-full p-2 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <div className="font-semibold text-xs mb-1 text-[#231c14]">Key Features:</div>
                <ul className="space-y-1 pl-2">
                  {activeFeature.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-[#6b5c47]">
                      <span className="w-2 h-2 rounded-full mr-2 inline-block bg-gradient-to-br from-[#b69777] to-[#907252]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-8 w-full overflow-x-auto pb-2">
          <div className="flex flex-nowrap gap-4 justify-center md:grid md:grid-cols-4 md:gap-8">
            {hotspots.map((hotspot) => {
              const IconComponent = hotspot.icon;
              const isActive = activeHotspot === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() =>
                    setActiveHotspot(
                      hotspot.id === activeHotspot ? null : hotspot.id,
                    )
                  }
                  className={`
                    flex flex-col items-center p-3 min-w-[120px]
                    rounded-xl border transition-all duration-200
                    hover:shadow-md hover:border-[#b69777]
                    ${isActive
                      ? `border-[#b69777] bg-[#faf7f3] shadow`
                      : "border-[#ede1d3] bg-white"
                    }
                  `}
                >
                  <div className={`w-8 h-8 rounded-full ${hotspot.color} flex items-center justify-center mb-2`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-[#231c14] text-center">
                    {hotspot.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fancy Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s cubic-bezier(.33,1,.68,1) both;
        }
      `}</style>
    </section>
  );
};

export default FeatureHotspots;