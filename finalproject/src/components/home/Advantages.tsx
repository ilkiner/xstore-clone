'use client';

import React from 'react';

const Advantages = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Our Advantages
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
          <i className="ri-bank-card-line text-primaryGreen text-xl"></i>
          <span className="text-sm font-medium">Fee-Free Installment</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
          <i className="ri-shield-check-line text-primaryGreen text-xl"></i>
          <span className="text-sm font-medium">Best Price Guarantee</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
          <i className="ri-gift-line text-primaryGreen text-xl"></i>
          <span className="text-sm font-medium">Bonus Program XStore</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
          <i className="ri-time-line text-primaryGreen text-xl"></i>
          <span className="text-sm font-medium">Pickup in 15 minutes</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
          <i className="ri-truck-line text-primaryGreen text-xl"></i>
          <span className="text-sm font-medium">Convenient Delivery</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
          <i className="ri-tools-line text-primaryGreen text-xl"></i>
          <span className="text-sm font-medium">Services and Services</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
          <i className="ri-shipment-line text-primaryGreen text-xl"></i>
          <span className="text-sm font-medium">Express Delivery in 2 Hours</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
          <i className="ri-checkbox-circle-line text-primaryGreen text-xl"></i>
          <span className="text-sm font-medium">Equipment Acceptance</span>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
