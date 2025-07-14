import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Ghost,
  Home,
  SmilePlus,
  Search,
  RotateCw,
  Sparkles,
  ArrowLeft,
  Laugh,
  HelpCircle,
} from "lucide-react";

const randomLinks = [
  { url: "/", label: "Home", icon: Home },
  { url: "/products/carbon-rock-boards", label: "Carbon Rock Boards", icon: Sparkles },
  { url: "/luxury-wallpapers", label: "Luxury Wallpapers", icon: SmilePlus },
  { url: "/acoustic-panels", label: "Acoustic Panels", icon: Search },
];

const NotFound = () => {
  const location = useLocation();
  const [joke, setJoke] = useState<string | null>(null);

  useEffect(() => {
    // Fun 404 jokes
    const jokes = [
      "Looks like this wall doesn't exist. Even our Carbon Rock Boards can't fix this one!",
      "Well, this is awkward. You've found the secret passage to nowhere!",
      "404: This page is like a silent room – no echoes, no content.",
      "Are you sure you didn't mean to visit our sample page? At least that's real!",
      "Oops! Even our AI can't find this wall. Try knocking somewhere else.",
    ];
    setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  // Random link function
  function tryYourLuck() {
    const link = randomLinks[Math.floor(Math.random() * randomLinks.length)];
    window.location.href = link.url;
  }

  // Animate ghost
  const ghostAnimate = {
    animation: "floatGhost 2.5s ease-in-out infinite alternate",
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#f8f6f3] via-[#fcf9f5] to-[#ece2d2]">
      <style>{`
        @keyframes floatGhost { 
          0% { transform: translateY(0);}
          100% { transform: translateY(-16px);}
        }
        .wiggle {animation: wiggle 0.28s ease-in-out;}
        @keyframes wiggle {
          0%,100%{transform:rotate(-7deg);}
          50%{transform:rotate(7deg);}
        }
        .hover-wiggle:hover { animation: wiggle 0.3s; }
        .glow { filter: drop-shadow(0 0 10px #b89773aa);}
      `}</style>
      <div className="flex flex-col items-center gap-4">
        <Ghost
          className="w-28 h-28 text-[#b69777] glow mb-1"
          style={ghostAnimate}
        />
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent drop-shadow mb-1">
          404
        </h1>
        <p className="text-2xl font-bold text-[#6b5c47] flex items-center gap-2">
          <Laugh className="w-6 h-6 text-[#907252]" /> 
          Page Not Found
        </p>
        <div className="max-w-lg text-center text-[#b69777] text-lg mb-2">{joke}</div>
        <div className="flex flex-col sm:flex-row gap-4 mt-3">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-br from-[#b69777] to-[#907252] text-white font-bold text-lg shadow-lg hover:scale-105 transition hover-wiggle"
          >
            <Home className="w-5 h-5" /> Home
          </a>
          <button
            onClick={tryYourLuck}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border-2 border-[#b69777] text-[#b69777] font-bold text-lg shadow hover:bg-[#faf7f3] hover:scale-105 transition hover-wiggle"
          >
            <RotateCw className="w-5 h-5" /> Try Your Luck
          </button>
        </div>
        <div className="flex items-center justify-center gap-3 mt-4">
          <HelpCircle className="w-5 h-5 text-[#b69777]" />
          <span className="text-[#6b5c47] text-sm">
            Still lost?{" "}
            <a href="mailto:info@thewallshop.co.uk" className="underline hover:text-[#907252] font-semibold">
              Email Support
            </a>
          </span>
        </div>
        {/* Mini AI hint */}
        <div className="flex items-center justify-center mt-6 bg-[#f5f0e9] border border-[#e2d5c4] rounded-xl px-4 py-2 shadow text-[#907252] text-sm gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>
            <strong>Tip:</strong> You can always ask our AI assistant for help in the corner!
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
