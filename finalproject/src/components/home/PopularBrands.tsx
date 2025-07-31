'use client';

import React from 'react';

const brands = [
  'Amazon', 'AMD', 'Facebook', 'Logitech', 'Apper',
  'Hooli', 'FedEx', 'PayPal', 'Netflix', 'Spotify',
];

const PopularBrands = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Popular Brands</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-gray-100 text-gray-500 hover:text-black  transition-colors text-center py-6 rounded-md font-semibold cursor-pointer"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBrands;
