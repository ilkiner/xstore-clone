'use client';

import Image from 'next/image';
import React from 'react';

const AboutSection = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <div>
          <Image
            src="/images/about-woman.jpg" 
            alt="Woman with phone"
            width={700}
            height={500}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>

      
        <div>
          <h2 className="text-[32px] md:text-[32px] font-semibold mb-10">
            Serving People for More Than 12 <br /> Years With Over 95% Satisfied <br /> Customers.
          </h2>
          <p className="text-gray-600 text-[17px] leading-relaxed mb-4">
            Nullam accumsan nulla in arcu condimentum imperdiet. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Curabitur lacinia purus vitae lorem porttitor fermentum.
            In in mattis erat, eu mattis libero.
          </p>
          <p className="text-gray-600 text-[17px] leading-relaxed">
           ociosqu ad litora torquent per conubia nostra, per inceptos himenaeo. Curabitur lacinia purus vitae lorem porttitor fermetum. In in mattis erat, eu mattis libero. Donec volutpat faucibus elit cursus interdum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
