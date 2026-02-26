import React from 'react';
import { Headset, ShieldCheck, Leaf, Map, Check, X } from 'lucide-react';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Headset size={32} className="text-[#00694B]" />,
      title: "Always Here for You",
      description: "24/7 support for your travel needs.",
      bg: "bg-red-50"
    },
    {
      icon: <ShieldCheck size={32} className="text-[#00694B]" />,
      title: "Your Safety Guaranteed",
      description: "Fully insured tours with Ship-Back Guarantee.",
      bg: "bg-green-50"
    },
    {
      icon: <Leaf size={32} className="text-[#00694B]" />,
      title: "Sustainability",
      description: "Eco-conscious tours that respect nature and communities.",
      bg: "bg-yellow-50"
    },
    {
      icon: <Map size={32} className="text-[#00694B]" />,
      title: "Local Expertise",
      description: "Discover through the eyes of passionate local experts.",
      bg: "bg-blue-50"
    }
  ];

  const comparisonData = [
    {
      feature: "Price",
      direct: "Lowest (Save $10-$20)",
      ota: "Higher (Inc. Commission)",
      highlight: true
    },
    {
      feature: "Equipment Ownership",
      direct: "We Own The Fleet",
      ota: "Middlemen/Brokers",
      highlight: true
    },
    {
      feature: "Group Size",
      direct: "Private / Small Group",
      ota: "Large Crowds",
      highlight: true
    },
    {
      feature: "Maintenance Base",
      direct: "On-site in Las Fuertes",
      ota: "None",
      highlight: true
    },
    {
      feature: "Ship Guarantee",
      direct: "100% Back-to-Ship",
      ota: "Basic Support",
      highlight: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <StaggeredTextReveal 
            el="h2" 
            className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4" 
            text="Why to choose ATV Roatan?" 
          />
          <div className="w-20 h-1 bg-[#00694B] mx-auto rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
              <div className={`w-20 h-20 rounded-full ${feature.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Table Header */}
            <div className="bg-[#00694B] p-6 text-center">
              <h3 className="text-2xl font-bold text-white">Why Book Direct with the Fleet Owners?</h3>
            </div>

            {/* Table Body */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 font-bold text-gray-700 w-1/3">Feature</th>
                    <th className="p-4 font-bold text-[#00694B] w-1/3 bg-[#00694B]/5">ATV Roatan (Direct)</th>
                    <th className="p-4 font-bold text-gray-500 w-1/3">OTAs (Viator/Expedia)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-700">{row.feature}</td>
                      <td className="p-4 font-bold text-[#00694B] bg-[#00694B]/5 flex items-center gap-2">
                        {row.highlight && <Check size={16} strokeWidth={3} />}
                        {row.direct}
                      </td>
                      <td className="p-4 text-gray-500">
                         {row.ota}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;

