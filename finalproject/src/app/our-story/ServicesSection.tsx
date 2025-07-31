'use client';

import React from 'react';

const services = [
  {
    title: 'Wide network of outlets',
    description:
      'Implemented open access to goods, interactive zones of virtual reality, zones of smart devices, electric transport - this makes it possible to study the goods in detail.',
  },
  {
    title: 'Convenient site and delivery',
    description:
      'Intuitive search, informative photos, detailed descriptions, characteristics - the most pleasant online shopping!',
  },
  {
    title: 'Authorized service centers',
    description:
      'Trained craftsmen with relevant diplomas, original parts, repair guarantee - we know how to put the device in order if something went wrong.',
  },
  {
    title: 'Original goods with a guarantee',
    description:
      'Gadgets from trusted manufacturers that confirm the declared quality of their devices have won the trust of users.',
  },
];

const ServicesSection = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-16">
      <h2 className="text-[32px] md:text-[32px] font-bold text-center mb-12">
        A Complete List of Services of the XStore
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <i className="ri-checkbox-circle-line text-3xl text-primaryGreen flex-shrink-0"></i>
            <div>
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed ">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
