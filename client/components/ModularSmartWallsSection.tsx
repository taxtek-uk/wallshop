import React, { useState } from "react";
import { MoveHorizontal, Box, PlugZap, Clock } from "lucide-react";

const modules = [
  { width: "400mm", depth: "120mm", info: "Compact size, perfect for small spaces" },
  { width: "600mm", depth: "150mm", info: "Standard option, versatile" },
  { width: "800mm", depth: "120mm", info: "Ideal balance of width and depth" },
  { width: "1000mm", depth: "180mm", info: "Deep profile for integrated tech" },
  { width: "1100mm", depth: "150mm", info: "Premium size for luxury setups" },
  { width: "1200mm", depth: "180mm", info: "Largest module for max tech" },
];

export default function ModularSmartWallsSection() {
  const [selected, setSelected] = useState(modules[0]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const widthToPx = (width) => {
    switch (width) {
      case "400mm": return 120;
      case "600mm": return 180;
      case "800mm": return 240;
      case "1000mm": return 300;
      case "1100mm": return 330;
      case "1200mm": return 360;
      default: return 180;
    }
  };

  const depthToPx = (depth) => {
    switch (depth) {
      case "120mm": return 80;
      case "150mm": return 100;
      case "180mm": return 120;
      default: return 100;
    }
  };

  return (
    <section className="relative py-24 bg-[#1a1a1a] text-white overflow-hidden select-none">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/smart-home.png"
          alt="Smart Wall Background"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Column */}
          <div>
            <h2
              className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 max-w-xl"
            >
              The Future of Walls: <br />
              <span className="bg-gradient-to-r from-[#b69777] to-[#907252] bg-clip-text text-transparent">
                Modular Smart Wall Systems
              </span>
            </h2>

            <p className="text-white/90 text-lg max-w-xl mb-8 leading-relaxed tracking-wide">
              Engineered for fast installation and timeless luxury, our smart walls combine a steel frame with premium marble & stone-effect boards. Integrated technology supports TVs, shelves, dimmable lighting, speakers, fireplaces — all controlled via{" "}
              <strong className="text-[#b69777]">Smart home devices</strong>.
            </p>

            <ul className="space-y-6 max-w-md font-semibold text-white/90">
              <li className="flex items-center gap-4 hover:text-[#b69777] transition-colors cursor-pointer">
                <MoveHorizontal className="w-7 h-7 text-[#b69777] drop-shadow" />
                <span>Width options: 400mm, 600mm, 800mm, 1000mm, 1100mm, 1200mm</span>
              </li>
              <li className="flex items-center gap-4 hover:text-[#b69777] transition-colors cursor-pointer">
                <Box className="w-7 h-7 text-[#b69777] drop-shadow" />
                <span>Depths: 120mm, 150mm, 180mm — perfect for lights, speakers & shelves</span>
              </li>
              <li className="flex items-center gap-4 hover:text-[#b69777] transition-colors cursor-pointer">
                <PlugZap className="w-7 h-7 text-[#b69777] drop-shadow" />
                <span>Seamless integration with Our smart home systems</span>
              </li>
              <li className="flex items-center gap-4 hover:text-[#b69777] transition-colors cursor-pointer">
                <Clock className="w-7 h-7 text-[#b69777] drop-shadow" />
                <span>Professional installation in under 4 hours</span>
              </li>
            </ul>
          </div>

          {/* Interactive Visual */}
          <div className="relative flex flex-col items-center">

            {/* Selected Module Display */}
            <div
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 mb-8 text-[#231c14] transform transition-transform duration-500 ease-in-out"
              style={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-[#907252] text-center mb-4 select-text">
                Selected Module
              </h3>
              <div
                className="relative h-40 mx-auto rounded-lg overflow-hidden shadow-inner cursor-pointer"
                aria-label="Selected module visual"
              >
                <div
                  className="absolute bottom-0 left-1/2 bg-gradient-to-br from-[#b69777] to-[#907252] rounded-t-lg shadow-lg transition-transform duration-500 ease-in-out"
                  style={{
                    width: widthToPx(selected.width),
                    height: depthToPx(selected.depth),
                    transform: "translateX(-50%)",
                  }}
                />
              </div>

              <div className="text-center text-[#8e7762] font-semibold mt-4 select-text">
                Width: <span className="text-[#907252]">{selected.width}</span> | Depth:{" "}
                <span className="text-[#907252]">{selected.depth}</span>
              </div>
            </div>

            {/* Module Selector Grid */}
            <div className="grid grid-cols-3 gap-6 max-w-md w-full">
              {modules.map((mod, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(mod)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`p-4 rounded-xl border
                    transition-shadow duration-300 transform
                    ${selected === mod
                      ? "border-[#907252] shadow-lg scale-105"
                      : "border-[#ede1d3] hover:shadow-md hover:scale-[1.03]"}
                    bg-white text-[#231c14]
                    flex flex-col items-center cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-[#b69777]
                    `}
                  aria-pressed={selected === mod}
                >
                  <div className="text-[#907252] font-bold mb-2">{mod.width}</div>
                  <div className="w-full h-12 bg-gradient-to-br from-[#b69777] to-[#907252] rounded-md shadow-inner" />
                  <div className="mt-2 text-xs text-[#8e7762]">{`Depth: ${mod.depth}`}</div>

                  {/* Tooltip */}
                  {hoveredIndex === i && (
                    <div className="absolute -top-10 z-20 bg-[#b69777cc] text-[#231c14] rounded-md px-3 py-1 text-xs font-semibold whitespace-nowrap pointer-events-none select-none shadow-lg">
                      {mod.info}
                    </div>
                  )}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm italic text-white/80 text-center max-w-sm select-none">
              Click a module to see its size visualized above.
            </p>

            {/* Call to Action */}
            <button
              type="button"
              className="mt-10 inline-block px-8 py-3 bg-gradient-to-r from-[#b69777] to-[#907252] text-white font-bold rounded-full shadow-lg hover:brightness-110 transition"
              onClick={() => alert("Request a Quote clicked!")}
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
