'use client';

import Image from 'next/image';
import React from 'react';

const PrioritySection = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <div>
          <Image
            src="/images/service-man.jpg" 
            alt="Service support"
            width={700}
            height={500}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>

       
        <div>
          <h2 className="text-3xl md:text-3xl font-bold mb-10">
            Service is Our Top Priority
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-7">
            We are available 24/7/365 for you! Do you want to surprise someone?
            Take advantage of our gift service. Do you need advice? One of our private shoppers
            will be happy to help you put together an ideal time give priority and get more packages.
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-primaryGreen text-white px-4 py-3 rounded-md font-medium hover:bg-black transition duration-300"    
          >
            Contact Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default PrioritySection;
