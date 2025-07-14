import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mb-16">
      <div className="text-center mb-8">
        <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Traditional vs Smart Wall
        </h3>
        <p className="text-lg text-muted-foreground">
          Drag the slider to compare traditional setup vs our smart wall solution
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-80 lg:h-[500px] rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* Traditional Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/traditional-wall.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-2 rounded-lg font-semibold shadow">
            Traditional Setup
          </div>
          <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg max-w-xs shadow">
            <p className="text-sm font-medium mb-1">Issues:</p>
            <ul className="text-xs space-y-1">
              <li>• Visible cables everywhere</li>
              <li>• Multiple mounting holes</li>
              <li>• 3-5 days installation</li>
              <li>• Limited customization</li>
            </ul>
          </div>
        </div>

        {/* Smart Wall Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/smart-wall-2.jpg')`,
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-2 rounded-lg font-semibold shadow">
            Smart Wall System
          </div>
          <div className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg max-w-xs shadow">
            <p className="text-sm font-medium mb-1">Benefits:</p>
            <ul className="text-xs space-y-1">
              <li>• No visible cables</li>
              <li>• One-day installation</li>
              <li>• Modular & expandable</li>
              <li>• 100+ finish options</li>
            </ul>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize transform -translate-x-0.5 z-10"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
            <ChevronLeft className="w-3 h-3 text-gray-600 -ml-0.5" />
            <ChevronRight className="w-3 h-3 text-gray-600 -mr-0.5" />
          </div>
        </div>

        {/* Instruction Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 px-4 py-2 rounded-lg shadow text-sm font-medium pointer-events-none">
          ← Drag to compare →
        </div>
      </div>

      {/* Stats comparison */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="text-lg font-semibold text-red-800 mb-2">
            Traditional Wall
          </h4>
          <div className="space-y-2 text-sm text-red-700">
            <div className="flex justify-between">
              <span>Installation Time:</span>
              <span className="font-medium">3–5 days</span>
            </div>
            <div className="flex justify-between">
              <span>Cable Management:</span>
              <span className="font-medium">Complex</span>
            </div>
            <div className="flex justify-between">
              <span>Customization:</span>
              <span className="font-medium">Limited</span>
            </div>
            <div className="flex justify-between">
              <span>Future Changes:</span>
              <span className="font-medium">Difficult</span>
            </div>
          </div>
        </div>

        <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-2">
            Smart Wall System
          </h4>
          <div className="space-y-2 text-sm text-green-700">
            <div className="flex justify-between">
              <span>Installation Time:</span>
              <span className="font-medium">3-4 Hours</span>
            </div>
            <div className="flex justify-between">
              <span>Cable Management:</span>
              <span className="font-medium">Hidden</span>
            </div>
            <div className="flex justify-between">
              <span>Customization:</span>
              <span className="font-medium">100+ options</span>
            </div>
            <div className="flex justify-between">
              <span>Future Changes:</span>
              <span className="font-medium">Plug & play</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;