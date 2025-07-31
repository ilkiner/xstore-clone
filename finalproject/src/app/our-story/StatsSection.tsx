'use client';

import React from 'react';

const stats = [
  {
    value: '120+',
    label: 'Retail stores opened all over the world',
  },
  {
    value: '15M',
    label: 'Products sold till date through all platforms',
  },
  {
    value: '200K',
    label: 'Registered users on our all the platform',
  },
  {
    value: '350+',
    label: 'Brands linked & collaborated with our store',
  },
  {
    value: '60',
    label: 'Quick shipping platforms for fastest transfers',
  },
];

const StatsSection = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-12">We Reached So Far</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-5xl font-bold mb-2">{stat.value}</p>
            <p className="text-lg text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
