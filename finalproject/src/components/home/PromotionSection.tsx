'use client';

import React from 'react';

const PromotionSection = () => {
  return (
    <section className="max-w-[1400px] mx-auto  px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="bg-[#e6f3f2] rounded-xl w-[500px] ml-24  overflow-hidden relative h-60 md:h-60 flex items-center justify-between px-6">
        <div className="z-10">
          <h3 className="text-lg font-semibold mb-2">
            Didn't Find Anything Interesting?
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            Perhaps you will find something among our promotions!
          </p>
          <a href="#" className="text-primaryGreen font-semibold text-sm hover:underline">
            All Promotions
          </a>
        </div>
        <div className="absolute inset-0">
          <img src="/images/Item-1.jpeg" alt="Promo" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#e6f3f2] opacity-80"></div>
      </div>

      <div className="bg-[#e6f3f2] rounded-xl overflow-hidden relative h-60 md:h- flex items-center justify-between px-6">
        <div className="z-10 w-full">
          <h3 className="text-lg font-semibold mb-3">
            Get the most interesting offers first to you!
          </h3>
          <div className="flex items-center w-full max-w-md">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none text-sm"
            />
            <button className="bg-primaryGreen text-white px-4 py-2 rounded-r-md hover:opacity-90 text-xl">
              +
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-6 z-10">
          <img src="/images/Item-2.jpeg" alt="Notify" className="w-[80px] h-[80px] object-cover rounded-full" />
          <span className="absolute top-0 left-0 bg-primaryGreen text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            1
          </span>
        </div>
        <div className="absolute inset-0">
          <img src="/images/Item-2.jpeg" alt="Notify BG" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#e6f3f2] opacity-80"></div>
      </div>
    </section>
  );
};

export default PromotionSection;
