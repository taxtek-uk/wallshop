// SmartWallBenefitsSection.jsx
import React from "react";
import {
  Sun,
  ShieldCheck,
  Zap,
  Home,
  Clock,
  Award,
} from "lucide-react";

const benefits = [
  {
    icon: Sun,
    title: "Customizable Finishes",
    description:
      "Choose from a wide range of luxury marble, stone, and textured boards to match your style.",
  },
  {
    icon: ShieldCheck,
    title: "Durable Metal Frame",
    description:
      "Robust metal frame ensures long-lasting stability and perfect fit on any existing wall.",
  },
  {
    icon: Zap,
    title: "Smart Home Integration",
    description:
      "Seamlessly connect your smart walls to Our devices for lighting, sound, and control.",
  },
  {
    icon: Home,
    title: "Space-Saving Design",
    description:
      "Modular design bolts onto your existing walls, transforming spaces without renovations.",
  },
  {
    icon: Clock,
    title: "Fast Professional Installation",
    description:
      "Our expert team installs your smart wall in under 4 hours, minimizing disruption.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Engineered with top-tier materials and craftsmanship to ensure luxury and longevity.",
  },
];

export default function SmartWallBenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-extrabold text-center text-[#231c14] mb-12 max-w-3xl mx-auto">
          Why Choose Our Smart Walls?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {benefits.map(({ icon: Icon, title, description }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#f8f6f3] shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`Benefit: ${title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") e.currentTarget.click();
              }}
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center shadow-md">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#231c14] mb-3">{title}</h3>
              <p className="text-[#8e7762] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
