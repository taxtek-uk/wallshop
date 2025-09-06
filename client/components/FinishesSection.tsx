/* ===========================================================================
 * FinishesSection.tsx
 * Reusable finishes gallery for The Wall Shop (React + Vite + Tailwind)
 * - Uses lucide-react icons only
 * - Mobile horizontal rail + desktop responsive grid
 * - Expand/Collapse per category with smooth motion
 * - Fully self-contained with default data; accepts overrides via props
 * =========================================================================== */

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Layers, TreePine, Square, Gem } from "lucide-react";

/* =========================
 * Types
 * ========================= */
export type FinishPanel = {
  id: string;
  name: string;
  img: string;
  desc?: string;
  stock?: number;
};

export type FinishCategory = {
  id: string;
  name: string;
  desc?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  img?: string;
  color?: string; // tailwind gradient tokens e.g. "from-leather-100 to-mocha-100"
  accent?: string; // tailwind token e.g. "leather-600"
  panels: FinishPanel[];
};

export type FinishesSectionProps = {
  /**
   * Override the default categories with your own data (optional).
   */
  categories?: FinishCategory[];

  /**
   * Number of panels shown before "Show all finishes" (default 8).
   */
  defaultMaxVisible?: number;

  /**
   * Helper badges shown on each category header (optional).
   * Example: ["Acoustic-aware", "Scratch-resistant"]
   */
  helperBadges?: string[];

  /**
   * Optional id/className so you can target this section from other components.
   */
  id?: string;
  className?: string;
};

/* =========================
 * Default Data (your full dataset)
 * ========================= */
const defaultCategories: FinishCategory[] = [
  {
    id: "fabric",
    name: "Cloth Pattern Series",
    desc: "Soft textile pattern with acoustic value.",
    icon: Layers,
    img: "/images/carbon-rock-boards/cloth.jpg",
    color: "from-leather-100 to-mocha-100",
    accent: "leather-600",
    panels: [
      {
        id: "T6004",
        name: "Stone Weave",
        img: "/images/carbon-rock-boards/fabric/t6004.jpg",
        desc:
          "Subtle woven texture with a natural stone-inspired fabric look, ideal for refined interiors.",
        stock: 10,
      },
      {
        id: "T6104",
        name: "Stone Bead",
        img: "/images/carbon-rock-boards/fabric/t6104.jpg",
        desc:
          "Delicate beaded weave with a tactile stone-like surface, offering a modern textile effect.",
        stock: 10,
      },
      {
        id: "T6201",
        name: "Pearl Shimmer",
        img: "/images/carbon-rock-boards/fabric/t6201.jpg",
        desc:
          "Elegant woven finish with a soft pearl shimmer, adding subtle radiance to interiors.",
        stock: 10,
      },
      {
        id: "T6301",
        name: "Chambray Grid",
        img: "/images/carbon-rock-boards/fabric/t6301.jpg",
        desc:
          "Classic chambray-style grid pattern with a balanced woven texture for modern spaces.",
        stock: 10,
      },
      {
        id: "S6026",
        name: "Mauve Weave",
        img: "/images/carbon-rock-boards/fabric/s6026.jpg",
        desc:
          "Textured weave in a soft mauve tone, blending warmth with subtle sophistication.",
        stock: 10,
      },
      {
        id: "S6029",
        name: "Rice Grain Weave",
        img: "/images/carbon-rock-boards/fabric/s6029.jpg",
        desc:
          "Distinctive rice-grain weave resembling natural linen threads for an organic appeal.",
        stock: 10,
      },
      {
        id: "T6102",
        name: "Silver Mesh",
        img: "/images/carbon-rock-boards/fabric/t6102.jpg",
        desc:
          "Reflective mesh weave with a silver metallic effect, adding depth and dimension.",
        stock: 10,
      },
      {
        id: "T6306",
        name: "Alabaster Cotton",
        img: "/images/carbon-rock-boards/fabric/t6306.jpg",
        desc:
          "Smooth cotton-inspired surface in an alabaster tone, offering a clean and minimal look.",
        stock: 10,
      },
      {
        id: "S6020",
        name: "Soft Gauze",
        img: "/images/carbon-rock-boards/fabric/t6020.jpg",
        desc:
          "Lightweight gauze-like texture with a delicate, airy transparency.",
        stock: 10,
      },
    ],
  },
  {
    id: "wood",
    name: "Wood Grain Series",
    desc: "Warm wood aesthetics with durable surface.",
    icon: TreePine,
    img: "/images/carbon-rock-boards/wood.jpg",
    color: "from-amber-100 to-orange-100",
    accent: "amber-600",
    panels: [
      {
        id: "T9016",
        name: "Ash Grey",
        img: "/images/carbon-rock-boards/wood/1.jpg",
        desc: "Soft ash grain with light grey overtone",
        stock: 10,
      },
      {
        id: "T9051",
        name: "Walnut Mist",
        img: "/images/carbon-rock-boards/wood/2.jpg",
        desc: "Mid-brown walnut tone with subtle striations",
        stock: 10,
      },
      {
        id: "T9222",
        name: "Smoked Ash",
        img: "/images/carbon-rock-boards/wood/3.jpg",
        desc: "Dark smoked ash grain with rich contrast",
        stock: 10,
      },
      {
        id: "T9012",
        name: "Rosewood Brown",
        img: "/images/carbon-rock-boards/wood/4.jpg",
        desc: "Warm reddish grain like tropical leatherwood",
        stock: 10,
      },
      {
        id: "T9015",
        name: "Weathered Storm",
        img: "/images/carbon-rock-boards/wood/5.jpg",
        desc: "Weathered wood texture with a stormy tone",
        stock: 10,
      },
      {
        id: "T9053",
        name: "Walnut Stream",
        img: "/images/carbon-rock-boards/wood/6.jpg",
        desc: "Strong walnut character with deep flowing grain",
        stock: 10,
      },
    ],
  },
  {
    id: "solid",
    name: "Solid Color Series",
    desc: "Industrial elegance with raw, minimalist tones.",
    icon: Square,
    img: "/images/carbon-rock-boards/wpc.jpg",
    color: "from-slate-100 to-gray-100",
    accent: "slate-600",
    panels: [
      {
        id: "T8201",
        name: "Warm Blush",
        img: "/images/carbon-rock-boards/solid/1.jpg",
        desc: "A soft blush hue for cozy minimalism",
        stock: 10,
      },
      {
        id: "T8026",
        name: "Ash Silver",
        img: "/images/carbon-rock-boards/solid/2.jpg",
        desc: "Neutral silver-gray with a clean industrial look",
        stock: 10,
      },
      {
        id: "T8107",
        name: "Slate Blue",
        img: "/images/carbon-rock-boards/solid/3.jpg",
        desc: "Dark blue-grey with a sophisticated edge",
        stock: 10,
      },
      {
        id: "T8039",
        name: "Ivory",
        img: "/images/carbon-rock-boards/solid/4.jpg",
        desc: "Soft ivory tone perfect for elegant settings",
        stock: 10,
      },
      {
        id: "T8103",
        name: "Pearl Cream",
        img: "/images/carbon-rock-boards/solid/5.jpg",
        desc: "Soft pearl-beige tone for warm ambience",
        stock: 10,
      },
      {
        id: "T8036",
        name: "Desert Sand",
        img: "/images/carbon-rock-boards/solid/6.jpg",
        desc: "Warm tan reminiscent of natural sands",
        stock: 10,
      },
      {
        id: "T8008",
        name: "Obsidian",
        img: "/images/carbon-rock-boards/solid/7.jpg",
        desc: "Matte black with premium depth and richness",
        stock: 10,
      },
    ],
  },
  {
    id: "stone",
    name: "Stone Grain Series",
    desc: "Classic stone surface with timeless elegance.",
    icon: Gem,
    img: "/images/carbon-rock-boards/stone.jpg",
    color: "from-stone-100 to-slate-100",
    accent: "stone-600",
    panels: [
      {
        id: "S3231",
        name: "White & Gold",
        img: "/images/carbon-rock-boards/stone/1.jpg",
        desc: "Stone texture White & Gold",
        stock: 10,
      },
      {
        id: "S3232",
        name: "Black & Blue",
        img: "/images/carbon-rock-boards/stone/s3232.jpg",
        desc: "Stone texture Black & Blue",
        stock: 10,
      },
      {
        id: "S3233",
        name: "Grey & Blue",
        img: "/images/carbon-rock-boards/stone/s3233.jpg",
        desc: "Stone texture Grey & Blue",
        stock: 10,
      },
      {
        id: "T3017",
        name: "Mid Grey & White",
        img: "/images/carbon-rock-boards/stone/4.jpg",
        desc: "Stone texture Mid Grey & White",
        stock: 10,
      },
      {
        id: "T3019",
        name: "Black & Brown",
        img: "/images/carbon-rock-boards/stone/t3019.jpg",
        desc: "Stone texture Black & Brown",
        stock: 10,
      },
      {
        id: "T3204",
        name: "Dark Grey & Black",
        img: "/images/carbon-rock-boards/stone/5.jpg",
        desc: "Stone texture Dark Grey & Black",
        stock: 10,
      },
    ],
  },
  {
    id: "metallic",
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
        img: "/images/carbon-rock-boards/metal/ls-2a05.jpg",
        desc: "Rich antique copper finish with timeless, rustic charm.",
        stock: 10,
      },
      {
        id: "LS-2A06",
        name: "Urban Brass",
        img: "/images/carbon-rock-boards/metal/ls-2a06.jpg",
        desc: "Bold brass tone with an industrial, modern character.",
        stock: 10,
      },
      {
        id: "LS-2A08",
        name: "Champagne Gold",
        img: "/images/carbon-rock-boards/metal/ls-2a08.jpg",
        desc: "Luxurious champagne gold with a refined, soft glow.",
        stock: 10,
      },
      {
        id: "LS-2A09",
        name: "Brushed Bronze",
        img: "/images/carbon-rock-boards/metal/ls-2a09.jpg",
        desc: "Matte brushed bronze with warm, contemporary appeal.",
        stock: 10,
      },
      {
        id: "SZ-703",
        name: "Brushed Silver",
        img: "/images/carbon-rock-boards/metal/sz-703.jpg",
        desc: "Sleek brushed silver offering a clean, modern look.",
        stock: 10,
      },
      {
        id: "SZ-705",
        name: "Satin Titanium",
        img: "/images/carbon-rock-boards/metal/sz-705.jpg",
        desc: "Smooth satin titanium with a durable, futuristic finish.",
        stock: 10,
      },
      {
        id: "H-8301",
        name: "Brushed Copper",
        img: "/images/carbon-rock-boards/metal/h-8301.jpg",
        desc: "Textured brushed copper with a warm metallic tone.",
        stock: 10,
      },
      {
        id: "SJ-2003",
        name: "Cobalt Satin Metal",
        img: "/images/carbon-rock-boards/metal/sj-2003.jpg",
        desc: "Smooth satin finish with a cool cobalt blue metallic tone.",
        stock: 10,
      },
      {
        id: "S-8026",
        name: "Bronze Satin Metal",
        img: "/images/carbon-rock-boards/metal/s-8026.jpg",
        desc: "Elegant satin finish with a rich bronze metallic appearance.",
        stock: 10,
      },
      {
        id: "S-8115",
        name: "Steel Shine Mosaic",
        img: "/images/carbon-rock-boards/metal/s8115.jpg",
        desc:
          "The brushed texture gives it a modern, reflective, metallic look.",
        stock: 10,
      },
    ],
  },
  {
    id: "mirror",
    name: "Mirror Series",
    desc: "Reflective brilliance with a sleek, high-gloss finish.",
    icon: Square,
    img: "/images/carbon-rock-boards/mirror.jpg",
    color: "from-leather-100 to-leather-100",
    accent: "stone-600",
    panels: [
      {
        id: "MR2001",
        name: "Mirror Gold",
        img: "/images/carbon-rock-boards/mirror/1.webp",
        desc: "Elegant gold mirror with a warm reflection.",
        stock: 10,
      },
      {
        id: "MR2002",
        name: "Ripple Silver Mirror",
        img: "/images/carbon-rock-boards/mirror/5.webp",
        desc:
          "Elegant silver mirror with a subtle ripple texture for a modern reflective finish.",
        stock: 10,
      },
      {
        id: "MR2003",
        name: "Mirror Black",
        img: "/images/carbon-rock-boards/mirror/2.webp",
        desc: "Bold black mirror with a dramatic reflection.",
        stock: 10,
      },
      {
        id: "MR2004",
        name: "Ripple Gold Mirror",
        img: "/images/carbon-rock-boards/mirror/4.webp",
        desc: "Textured gold mirror with a radiant glow.",
        stock: 10,
      },
      {
        id: "MR2005",
        name: "Mirror Silver",
        img: "/images/carbon-rock-boards/mirror/3.webp",
        desc: "Classic silver mirror with a clear finish.",
        stock: 10,
      },
      {
        id: "MR2006",
        name: "Mirror White",
        img: "/images/carbon-rock-boards/mirror/jm03.jpg",
        desc: "Clean white mirror with a bright reflection.",
        stock: 10,
      },
    ],
  },
];

/* =========================
 * Component
 * ========================= */
export default function FinishesSection({
  categories = defaultCategories,
  defaultMaxVisible = 8,
  helperBadges = ["Acoustic-aware", "Scratch-resistant"],
  id,
  className = "",
}: FinishesSectionProps) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const toggleCategory = (catId: string) =>
    setExpanded((prev) => ({ ...prev, [catId]: !prev[catId] }));

  return (
    <section
      id={id}
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-taupe-900 to-clay-900 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="space-y-10">
          {categories.map((category, index) => {
            const isOpen = !!expanded[category.id];
            const visiblePanels = isOpen
              ? category.panels
              : category.panels.slice(0, defaultMaxVisible);
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative rounded-2xl border border-clay-500/20 bg-gradient-to-br from-taupe-800/40 to-clay-800/30 backdrop-blur-md"
              >
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-6">
                  <div className="flex items-center gap-4">
                    <div className="grid place-items-center size-12 rounded-xl bg-gradient-to-r from-clay-500 to-taupe-500">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-white">
                          {category.name}
                        </h3>
                        <span className="inline-flex items-center gap-2 rounded-full border border-clay-500/30 bg-clay-900/40 px-3 py-1 text-xs text-clay-200/80">
                          {category.panels.length} finishes
                        </span>
                      </div>
                      {category.desc ? (
                        <p className="text-clay-300 mt-1.5">{category.desc}</p>
                      ) : null}
                    </div>
                  </div>

                  {/* Helper badges (text-only) */}
                  {helperBadges?.length ? (
                    <div className="flex flex-wrap items-center gap-2 text-xs text-clay-200/80">
                      {helperBadges.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center gap-2 rounded-md border border-clay-600/30 bg-clay-800/40 px-2.5 py-1"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* Panels */}
                <div className="pb-3">
                  {/* Mobile: horizontal rail */}
                  <div className="md:hidden px-6">
                    <div className="-mx-1 flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-clay-700/60">
                      {visiblePanels.map((panel) => (
                        <div
                          key={panel.id}
                          className="group relative w-56 min-w-56 overflow-hidden rounded-xl border border-clay-600/30 bg-clay-900/40 hover:border-clay-400/50 transition-colors"
                        >
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <img
                              src={panel.img}
                              alt={panel.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                // Hide broken image; a subtle gradient stays behind
                                e.currentTarget.style.visibility = "hidden";
                              }}
                            />
                            <div className="pointer-events-none absolute right-2 top-2 rounded-md bg-clay-900/70 px-2 py-1 text-[10px] font-medium text-white/90 ring-1 ring-inset ring-white/10 backdrop-blur">
                              {panel.id}
                            </div>
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-white leading-tight">
                              {panel.name}
                            </h4>
                            {panel.desc ? (
                              <p className="mt-1 text-sm text-clay-300 line-clamp-2">
                                {panel.desc}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Grid */}
                  <div className="hidden md:block">
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 px-6 pb-6">
                      <AnimatePresence initial={false}>
                        {visiblePanels.map((panel) => (
                          <motion.div
                            key={panel.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="group relative overflow-hidden rounded-xl border border-clay-600/30 bg-clay-900/40 hover:border-clay-400/50 transition-colors"
                          >
                            <div className="aspect-[16/10] overflow-hidden relative">
                              <img
                                src={panel.img}
                                alt={panel.name}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  e.currentTarget.style.visibility = "hidden";
                                }}
                              />
                              <div className="pointer-events-none absolute right-2 top-2 rounded-md bg-clay-900/70 px-2 py-1 text-[10px] font-medium text-white/90 ring-1 ring-inset ring-white/10 backdrop-blur">
                                {panel.id}
                              </div>
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                            <div className="p-4">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-semibold text-white leading-tight">
                                  {panel.name}
                                </h4>
                              </div>
                              {panel.desc ? (
                                <p className="mt-1 text-sm text-clay-300 line-clamp-2">
                                  {panel.desc}
                                </p>
                              ) : null}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Expand / Collapse */}
                {category.panels.length > defaultMaxVisible && (
                  <div className="flex justify-center pb-6">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-clay-600/30 bg-clay-800/40 px-4 py-2 text-clay-100 hover:border-clay-400/50 hover:bg-clay-800/60 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={`finishes-${category.id}`}
                    >
                      {isOpen ? "Show less ▲" : "Show all finishes ▼"}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================
 * Convenience export (if you want the dataset elsewhere)
 * ========================= */
export const FINISH_CATEGORIES_DEFAULT = defaultCategories;