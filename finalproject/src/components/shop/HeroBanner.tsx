import React from 'react';

const HeroBanner = () => {
  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-[1440px] h-[335px] mx-auto px-4 md:px-10 bg-primaryGreen rounded-lg grid grid-cols-1 md:grid-cols-12 items-center overflow-hidden">
        
        <div className="md:col-span-6 px-10 py-4 flex flex-col justify-center h-full">
          <h3 className="text-[16px] text-white mb-2">Find the right keyboard for you</h3>
          <h2 className="text-[28px] md:text-[30px] text-white font-bold mb-3 leading-snug">
            Keyboards That Have <br /> You Covered.
          </h2>
          <div className="mb-3">
            <p className="text-white text-xs mb-1">NOW ON SALE</p>
            <p className="text-[#FED700] text-[25px] font-bold leading-none">45% Flat</p>
          </div>
          <button className="w-fit bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-white hover:text-primaryGreen transition duration-300">
            Shop Now
          </button>
        </div>

        
        <div className="hidden md:block absolute bottom-[330px] right-64 transform z-10">
          <img
            src="/images/Image-min.webp"
            alt="bannerimage"
            className="w-[600px] max-h-[420px] object-contain"
          />
        </div>
      </div>

      
      <div className="block md:hidden mt-6 flex justify-center">
        <img
          src="/images/Image-min.webp"
          alt="bannerimage"
          className="w-full max-w-[320px] max-h-[220px] object-contain"
        />
      </div>
    </section>
  );
};

export default HeroBanner;
