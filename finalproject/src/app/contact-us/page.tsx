'use client';

import React from 'react';
import Image from 'next/image';

const ContactUsPage = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <div className="md:col-span-6">
          <Image
            src="/images/contact-map.png" 
            alt="Map Location"
            width={800}
            height={600}
            className="rounded-xl w-full h-auto"
          />
        </div>

       
        <div className="md:col-span-6 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div>
              <h3 className="text-2xl font-semibold flex items-center gap-2 mb-1">
                <i className="ri-store-line text-primaryGreen text-2xl"></i>
                Our Showroom
              </h3>
              <p className="text-gray-700 text-[16px]">
                551 Water Color Green Ball St, New York, NY 2041, USA
              </p>
              <p className="text-[16px] text-gray-700  mt-4">(+44) 1800 5555 3535</p>
              <p className="text-[16px] text-gray-700 mt-2 ">(+44) 1800 9999 6969</p>
            </div>

           
            <div>
              <h3 className="text-2xl font-semibold flex items-center gap-2 mb-1">
                <i className="ri-customer-service-2-line text-primaryGreen text-2xl"></i>
                Quick Help
              </h3>
              <p className="text-gray-700 text-[16px]">
                You can ask anything you want to know about our products
              </p>
              <p className="text-[16px] text-gray-700 mt-4">support24@xstore.com</p>
              <p className="text-[16px] text-gray-700 mt-2">information@xstore.com</p>
            </div>
          </div>

         
          <form className="mt-6 space-y-7">
            <input
              type="text"
              placeholder="Your name"
              className="w-full border px-4 py-4 rounded-md focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your E-mail"
              className="w-full border px-4 py-4 rounded-md focus:outline-none"
            />
            <select className="w-full border px-4 py-4 rounded-md focus:outline-none">
              <option>Technical Help</option>
              <option>Pre-Sale Questions</option>
              <option>Product Inquiry</option>
            </select>
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full border px-4 py-4 rounded-md focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-primaryGreen text-white px-9 py-2  rounded-lg font-semibold hover:bg-black transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;

