'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  stock: number;
  sold: number;
}

const DealsOfTheDay = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Product error:', err));
  }, []);

  return (
    <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6 mt-10">
   
      <div className="md:col-span-6 border rounded-xl p-6 bg-white">
        <h2 className="text-xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
          <i className="ri-fire-line text-red-500 text-xl" /> Deals Of The Day
        </h2>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          {products.slice(0, 2).map((product) => (
            <div key={product._id} className="w-full md:w-1/2 text-center group relative">
              <div className="relative overflow-hidden rounded-lg">
                <span className="absolute left-2 top-2 bg-white border text-xs px-2 py-1 rounded-full text-gray-700 font-medium">SALE!</span>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={180}
                  className="mx-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
               
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                  <button className="bg-slate-300 text-black rounded-full w-10 h-10 flex items-center justify-center text-xl hover:text-primaryGreen transition">
                    <i className="ri-shopping-cart-2-line"></i>
                  </button>
                  <button className="bg-slate-300 text-black rounded-full w-10 h-10 flex items-center justify-center text-xl hover:text-primaryGreen transition">
                    <i className="ri-heart-line"></i>
                  </button>
                  <button className="bg-slate-300 text-black rounded-full w-10 h-10 flex items-center justify-center text-xl hover:text-primaryGreen transition">
                    <i className="ri-search-line"></i>
                  </button>
                </div>
              </div>

              <h3 className="text-sm mt-2">{product.name}</h3>
              <div className="flex justify-center items-center gap-2 text-sm mt-1">
                {product.oldPrice && (
                  <span className="line-through text-gray-400">${product.oldPrice.toFixed(2)}</span>
                )}
                <span className="text-black">${product.price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>Available: <span className="text-green-600">{product.stock}</span></span>
                <span>Sold: {product.sold}</span>
              </div>

              <div className="h-1 bg-gray-200 mt-2 mb-4">
                <div
                  className="bg-primaryGreen h-1"
                  style={{
                    width: `${Math.min(100, (product.sold / (product.stock + product.sold)) * 100)}%`,
                  }}
                />
              </div>

              <div className="grid grid-cols-4 text-xs text-center text-gray-700">
                <div><p className="font-semibold">173</p><p>Days</p></div>
                <div><p className="font-semibold">21</p><p>Hours</p></div>
                <div><p className="font-semibold">12</p><p>Mins</p></div>
                <div><p className="font-semibold">56</p><p>Secs</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <div className="md:col-span-6 grid grid-rows-2 gap-4">
        
        <div
          className="bg-cover bg-center rounded-xl p-6 flex flex-col justify-end transition-transform duration-300 hover:scale-[1.02]"
          style={{ backgroundImage: `url('/images/headphones.jpg')` }}
        >
          <div>
            <h3 className="text-xl font-semibold text-white">Headphones</h3>
            <p className="text-white text-sm">Integrated Control and Mode</p>
            <button className="mt-3 text-sm bg-primaryGreen text-white px-4 py-1 rounded">See Category</button>
          </div>
        </div>

        
      <div className="grid grid-cols-2 gap-4 h-full">
  
  <div
    className="relative bg-cover bg-center rounded-xl p-4 flex items-end transition-transform duration-300 hover:scale-105 group overflow-hidden"
    style={{ backgroundImage: `url('/images/wireless.jpg')` }}
  >
    <div className='py-16'>
      <h4 className="text-white text-lg font-semibold">Wireless Charger</h4>
      <p className="text-white text-xs">Qi-Certified Fast Charging Pad</p>
    </div>

    
    <button className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-[-30px] bg-primaryGreen text-white px-4 py-2 rounded-md text-sm transition-all duration-300">
      Buy Now
    </button>
  </div>

  
  <div
    className="relative bg-cover bg-center rounded-xl p-4 flex items-end transition-transform duration-300 hover:scale-105 group overflow-hidden"
    style={{ backgroundImage: `url('/images/cover.jpg')` }}
  >
    <div className='py-16'>
      <h4 className="text-white text-lg font-semibold">Protection Cover</h4>
      <p className="text-white text-xs">Premium Transparent Hybrid Soft</p>
    </div>

   
    <button className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-[-30px] bg-primaryGreen text-white px-4 py-2 rounded-md text-sm transition-all duration-300">
      Buy Now
    </button>
  </div>
</div>

      </div>
    </section>
  );
};

export default DealsOfTheDay;





