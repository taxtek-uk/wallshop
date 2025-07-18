import {
  Hammer,
  PackageCheck,
  PanelTopClose,
  PlugZap,
  Settings2,
} from "lucide-react";

export default function SmartWallInstallation() {
  const steps = [
    {
      icon: Settings2,
      title: "Pre-Built in Workshop",
      description:
        "Each Smart Wall is precision-built in our manufacturing facility—fully integrated with electronics and wiring.",
    },
    {
      icon: PackageCheck,
      title: "Delivered in Sections",
      description:
        "The complete system arrives in pre-finished, easy-to-install modules—ready for rapid installation.",
    },
    {
      icon: Hammer,
      title: "Bracket Installation",
      description:
        "Brackets are fixed cleanly to your existing wall—no demolition, no dust, no disruption.",
    },
    {
      icon: PanelTopClose,
      title: "Modules Mounted",
      description:
        "Smart Wall modules are securely mounted to the bracket system for seamless alignment.",
    },
    {
      icon: PlugZap,
      title: "Plug & Power On",
      description:
        "Just plug into a nearby socket and the entire Smart Wall system powers up—no extra wiring needed.",
    },
  ];

  return (
    <section className="py-20 bg-[#fcf9f5] border-t border-[#e3d6c5]">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#231c14] mb-4">
            Seamless Installation Process
          </h2>
          <p className="text-lg text-[#6b5c47] max-w-2xl mx-auto">
            From factory-built precision to same-day plug-and-play setup—our Smart Wall installation is faster, cleaner, and smarter than traditional methods.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-[#e2d5c4] shadow hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mb-4 shadow">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#231c14] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#6b5c47] text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
