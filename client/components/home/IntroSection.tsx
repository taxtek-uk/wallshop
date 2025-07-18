import { Layers, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button"; // Update path if needed
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js

export default function IntroSection() {
  return (
    <section className="py-20 bg-[#fcf9f5] border-t border-[#e5ddd2]">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-[#231c14]">
            Intelligent Design. Effortless Living.
          </h2>
          <p className="text-lg text-[#6b5c47] max-w-3xl mx-auto">
            At <strong>The Wall Shop</strong>, we specialize in crafting pre-engineered smart wall systems and ultra-durable carbon rock boards for modern living. Our smart walls are manufactured to exact specifications—preloaded with all electronics for plug-and-play setup in under 4 hours. From integrated smart TVs and cinema-grade soundbars to lighting, fire, and broadband-ready tech, each system is designed for speed, beauty, and performance—without the mess of traditional builds.
          </p>
        </div>

        {/* Two Feature Highlights */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Smart Wall */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl border border-[#e2d5c4] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <MonitorSmartphone className="w-8 h-8 text-[#b69777]" />
                <h3 className="text-2xl font-bold text-[#231c14]">Smart Wall Systems</h3>
              </div>
              <p className="text-[#6b5c47] leading-relaxed mb-6">
                Our plug-and-play smart wall modules are built in our facility and delivered fully wired.
                From TVs, sound systems, and LED lighting to gaming, security, and broadband boosters —
                everything is integrated and controlled via remote. Choose from 100+ luxurious panel finishes
                like marble, copper, gloss or stainless, with optional lighting accents. No mess. No noise. Fully
                installed in under 4 hours.
              </p>
            </div>
            <div>
              <Link to="/smart-walls">
                <Button className="bg-gradient-to-br from-[#b69777] to-[#907252] text-white font-bold px-6 py-3 w-full">
                  Explore Smart Walls
                </Button>
              </Link>
            </div>
          </div>

          {/* Carbon Rock Boards */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl border border-[#e2d5c4] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Layers className="w-8 h-8 text-[#b69777]" />
                <h3 className="text-2xl font-bold text-[#231c14]">Carbon Rock Boards</h3>
              </div>
              <p className="text-[#6b5c47] leading-relaxed mb-6">
                Our Carbon Rock Boards combine A1 fire-resistance with exceptional thermal and acoustic
                insulation. These ultra-durable panels are ideal for homes, offices, and commercial spaces—
                offering a clean modern finish that’s impact, scratch, and moisture resistant. Available in wood,
                stone, WPC and fluted textures.
              </p>
            </div>
            <div>
              <Link to="/carbon-rock-boards">
                <Button className="bg-gradient-to-br from-[#b69777] to-[#907252] text-white font-bold px-6 py-3 w-full">
                  Explore Rock Boards
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
