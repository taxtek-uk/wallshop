import { MonitorSmartphone, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Adjust import if needed

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-white border-t border-[#e5ddd2]">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#231c14] mb-4">
          Our Signature Solutions
          </h2>
          <p className="text-lg text-[#6b5c47] max-w-2xl mx-auto">
            Whether you're upgrading your home, workspace or commercial venue, our most popular systems deliver beauty, functionality and speed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Smart Wall */}
          <div className="group bg-[#fefefe] border border-[#e3d5c4] rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src="/images/smart-walls/smart-wall-pro.jpg"
                alt="Smart Wall System"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-gradient-to-br from-[#b69777] to-[#907252] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                Smart Integration
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MonitorSmartphone className="text-[#b69777] w-6 h-6" />
                  <h3 className="text-2xl font-bold text-[#231c14]">Smart Wall</h3>
                </div>
                <p className="text-[#6b5c47] mb-4">
                  Pre-built, tech-loaded wall modules with integrated TV, sound, lighting, and control systems. Installed in 2–4 hours with no mess.
                </p>
              </div>
              <Link to="/smart-walls">
                <Button className="w-full bg-gradient-to-br from-[#b69777] to-[#907252] text-white font-bold">
                  View Smart Walls
                </Button>
              </Link>
            </div>
          </div>

          {/* Carbon Rock Boards */}
          <div className="group bg-[#fefefe] border border-[#e3d5c4] rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src="/images/carbon-rock-boards/bamboo.jpg"
                alt="Carbon Rock Boards"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-gradient-to-br from-[#b69777] to-[#907252] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                High Performance Panels
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Layers className="text-[#b69777] w-6 h-6" />
                  <h3 className="text-2xl font-bold text-[#231c14]">Carbon Rock Boards</h3>
                </div>
                <p className="text-[#6b5c47] mb-4">
                  Class A1 fire-rated panels with acoustic & thermal insulation. Available in stone, wood, and textured finishes for any space.
                </p>
              </div>
              <Link to="/carbon-rock-boards">
                <Button className="w-full bg-gradient-to-br from-[#b69777] to-[#907252] text-white font-bold">
                  View Rock Boards
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
