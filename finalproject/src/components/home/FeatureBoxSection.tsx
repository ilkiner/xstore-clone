
import React from "react";

const features = [
  {
    icon: "ri-discount-percent-fill",
    text: (
      <>
        Log in <span className="text-teal-700 font-semibold">get up to 50% discounts</span>
      </>
    ),
  },
  {
    icon: "ri-store-2-line",
    text: <>Open new stores in your city</>,
  },
  {
    icon: "ri-truck-line",
    text: (
      <>
        Free fast express delivery <br /> with tracking
      </>
    ),
  },
  {
    icon: "ri-shield-check-line",
    text: <>Equipment loose and damage insurance</>,
  },
  {
    icon: "ri-bank-card-line",
    text: <>Installment without overpayments</>,
  },
];

const FeatureBoxSection = () => {
  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-[1350px] mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 flex items-start gap-3 shadow-sm"
          >
            <i className={`${feature.icon} text-2xl text-black  hover:text-primaryGreen mt-1`} />
            <p className="text-sm leading-snug">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureBoxSection;
