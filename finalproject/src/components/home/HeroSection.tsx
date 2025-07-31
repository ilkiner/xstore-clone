'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
     <section className="max-w-[1300px] mx-auto px-4 mt-10">
      <div className="grid grid-cols-12 gap-4 h-[450px]">
       
        <div className="col-span-6 relative rounded-lg overflow-hidden group">
  <Image
    src="/home/banner-headphone.jpg"
    alt="Sony Headphone"
    fill
    className="object-cover transition-transform duration-500 group-hover:scale-105"
    priority
  />
  <div className="absolute bottom-10 left-10 text-white z-10">
    <h2 className="text-3xl font-bold mb-2">Sony 5G Headphone</h2>
    <p className="text-sm mb-4">Only Music. Nothing Else.</p>
    <Link href="/shop">
      <button className="bg-teal-700 hover:bg-teal-800 text-white text-sm px-5 py-2 rounded">
        View Details
      </button>
    </Link>
  </div>
</div>


       
        <div className="col-span-2 relative rounded-lg overflow-hidden">
          <Image
            src="/home/banner-drone.jpg"
            alt="Drone"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h4 className="text-lg font-bold">Air Mavic 3</h4>
            <p className="text-xs mb-2">As powerful as it is portable</p>
            <Link href="/shop">
              <button className="bg-black text-white hover:bg-white hover:text-primaryGreen text-sm px-4 py-1 rounded">
                Shop Now
              </button>
            </Link>
          </div>
        </div>

       
<div className="col-span-4 flex flex-col justify-between gap-4">
  
  <div className="relative h-[calc(50%-8px)] rounded-lg overflow-hidden group">
    <Image
      src="/home/banner-fan.jpg"
      alt="Fan"
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="absolute left-5 bottom-5 text-white z-10">
      <h4 className="text-sm font-semibold">Handheld</h4>
      <p className="text-xs">USB 3 Rechargeable</p>
      <Link href="/shop">
        <span className="text-sm mt-1 inline-block hover:underline hover:text-primaryGreen ">
          Shop Now →
        </span>
      </Link>
    </div>
  </div>


  <div className="relative h-[calc(50%-8px)] rounded-lg overflow-hidden">
    <Image
      src="/home/banner-vr.jpg"
      alt="VR"
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="absolute left-5 bottom-5 text-white z-10">
      <h4 className="text-sm font-semibold">Gearbox</h4>
      <p className="text-xs">Up to 30% Discount</p>
      <Link href="/shop">
        <span className="text-sm mt-1 inline-block hover:underline hover:text-primaryGreen ">
          Shop Now →
        </span>
      </Link>
    </div>
  </div>
</div>

      </div>
    </section>
  );
}

export default HeroSection;


