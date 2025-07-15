import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const comparisons = [
  {
    feature: "Integrated TV, Sound & Lighting",
    smartWall: true,
    traditional: false,
  },
  {
    feature: "Luxury Marble / Stone Boards",
    smartWall: true,
    traditional: false,
  },
  {
    feature: "Smart Home Compatible (Orvibo)",
    smartWall: true,
    traditional: false,
  },
  {
    feature: "Installed in Under 4 Hours",
    smartWall: true,
    traditional: false,
  },
  {
    feature: "Minimal Construction Work",
    smartWall: true,
    traditional: false,
  },
  {
    feature: "Flexible Modular Sizes",
    smartWall: true,
    traditional: false,
  },
  {
    feature: "Looks Like a Custom-Built Feature Wall",
    smartWall: true,
    traditional: false,
  },
  {
    feature: "Custom Carpentry or Plastering Required",
    smartWall: false,
    traditional: true,
  },
  {
    feature: "Long Installation Time",
    smartWall: false,
    traditional: true,
  },
];

export default function SmartWallComparisonSection() {
  return (
    <section className="py-24 bg-white border-t border-[#ede1d3]">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-extrabold text-center text-[#231c14] mb-12 max-w-2xl mx-auto">
          Smart Wall vs Traditional Wall Solutions
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#f8f6f3] rounded-xl overflow-hidden text-sm sm:text-base shadow-md">
            <thead>
              <tr className="bg-[#ede1d3] text-[#231c14]">
                <th className="py-4 px-4 text-left">Feature</th>
                <th className="py-4 px-4 text-center">Smart Wall</th>
                <th className="py-4 px-4 text-center">Traditional Wall</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map(({ feature, smartWall, traditional }, i) => (
                <tr key={i} className="border-t border-[#e6dbd0]">
                  <td className="py-4 px-4 text-[#8e7762]">{feature}</td>
                  <td className="py-4 px-4 text-center">
                    {smartWall ? (
                      <CheckCircle className="w-6 h-6 text-[#907252] mx-auto" />
                    ) : (
                      <XCircle className="w-6 h-6 text-[#d1bfae] mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {traditional ? (
                      <CheckCircle className="w-6 h-6 text-[#907252] mx-auto" />
                    ) : (
                      <XCircle className="w-6 h-6 text-[#d1bfae] mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-[#8e7762] mt-8 italic text-sm">
          The Smart Wall system provides an all-in-one, modern solution — without the mess.
        </p>
      </div>
    </section>
  );
}
