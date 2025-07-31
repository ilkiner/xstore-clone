'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';


interface Category {
  _id: string;
  name: string;
  code: string;
  image: string;
  color?: string;
}

const TopCategorySelector = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  
  const specialCategories = [
    { label: 'ALL', text: 'Shop All', bg: 'bg-gray-100', color: 'text-black' },
    { label: 'NEW', text: 'New Arrivals', bg: 'bg-green-100', color: 'text-green-700' },
    { label: 'SALE', text: 'Sale', bg: 'bg-red-100', color: 'text-red-600' }
  ];

  return (
    <section className="w-full py-6 ml-10 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-11 gap-8">

     
        {specialCategories.map((cat) => (
          <div
            key={cat.label}
            className="group flex flex-col items-center text-center cursor-pointer min-h-[110px]"
          >
            <div className={`w-[86px] h-[86px] flex items-center justify-center rounded-full ${cat.bg} border border-gray-300`}>
              <span className={`font-bold text-[14px] ${cat.color}`}>{cat.label}</span>
            </div>
            <span className="relative mt-2 text-[14px] font-medium text-black group-hover:underline">{cat.text}</span>
          </div>
        ))}

        
        {categories.map((category) => (
          <div
            key={category._id}
            className="group flex flex-col items-center text-center cursor-pointer min-h-[110px]"
          >
            <div className={`w-[86px] h-[86px] flex items-center justify-center rounded-full ${category.color || 'bg-gray-100'} border border-gray-300 `}>
              <Image
                src={category.image || '/images/categories/default-icon.png'}
                alt={category.name}
                width={60}
                height={60}
                className="object-cover "
              />
            </div>
            <span className="relative mt-2 text-[14px] font-medium text-black">
              {category.name}
              <span className="absolute bottom-[-2px] left-1/2 w-0 h-[2px] bg-black transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
            </span>
          </div>
        ))}

      </div>
    </section>
  );
};

export default TopCategorySelector;

