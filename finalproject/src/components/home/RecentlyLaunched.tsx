'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';
import QuickViewDrawer from '@/components/home/QuickViewDrawer';

interface Product {
  _id: string;
  name: string;
  image: string;
  hoverImage?: string;
  price: number;
  rating: number;
  color?: string;
  inStock?: boolean;
}

interface Category {
  _id: string;
  name: string;
}

const RecentlyLaunched: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Products API error:', err));

    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Categories API error:', err));
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Recently Launched</h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left Promo & Categories */}
        <div className="md:col-span-4 bg-white overflow-hidden">
          <div className="bg-black text-white p-6 h-full flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold">Virtual Reality</h3>
              <p className="text-sm mt-1 text-center">Gear VR(R) Immersive Viewing Goggles</p>
            </div>
            <div className="my-6">
              <img src="/images/vr.png" alt="VR" className="w-full object-contain" />
            </div>
            <button className="bg-primaryGreen px-2 py-3 rounded text-white text-sm hover:opacity-90 mb-4">
              Shop Now
            </button>

            <div className="w-full bg-white text-black px-4 py-3 rounded-xl">
              <h4 className="text-black font-semibold mb-2">Categories</h4>
              <ul className="space-y-1">
                {categories.slice(0, 6).map(category => (
                  <li
                    key={category._id}
                    className="text-sm hover:underline cursor-pointer text-black"
                    onClick={() => router.push(`/user/shop?category=${category._id}`)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0">
          {products.slice(0, 8).map(product => (
            <div
              key={product._id}
              className="group relative border p-4 bg-white transition duration-300 hover:shadow-md"
            >
              <div className="relative w-full h-40 overflow-hidden flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={160}
                  height={160}
                  className="transition-opacity duration-300 group-hover:opacity-0 object-contain"
                />
                {product.hoverImage && (
                  <Image
                    src={product.hoverImage}
                    alt="hover"
                    width={160}
                    height={160}
                    className="absolute top-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 object-contain"
                  />
                )}

                {/* Hover Icons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-white hover:bg-primaryGreen hover:text-white text-black p-2 rounded-full shadow text-xl"
                  >
                    <i className="ri-shopping-cart-2-line"></i>
                  </button>
                  <button className="bg-white hover:bg-primaryGreen hover:text-white text-black p-2 rounded-full shadow text-xl">
                    <i className="ri-heart-line"></i>
                  </button>
                  <button
                    onClick={() => handleQuickView(product)}
                    className="bg-white hover:bg-primaryGreen hover:text-white text-black p-2 rounded-full shadow text-xl"
                  >
                    <i className="ri-eye-line"></i>
                  </button>
                </div>
              </div>

              <h4 className="text-sm mt-3 font-medium">{product.name}</h4>
              <div className="text-gray-700 text-sm font-semibold">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-green-600 text-xs mt-1">
                {'⭐'.repeat(Math.floor(product.rating))}
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <QuickViewDrawer
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        product={selectedProduct}
      />
    </section>
  );
};

export default RecentlyLaunched;






