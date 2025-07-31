'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import QuickViewDrawer from '@/components/home/QuickViewDrawer';

type Category = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  name: string;
  image: string;
  hoverImage?: string;
  price: number;
  category: Category | null;
  rating: number;
  color: string;
  inStock?: boolean;
  createdAt?: string;
};

const NewArrivalSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
      
        const cfgRes = await fetch('http://localhost:5000/api/new-arrivals');
        let productIds: string[] = [];
        if (cfgRes.ok) {
          const cfgData = await cfgRes.json();
          productIds = (cfgData.productIds || []).map((p: any) => p._id);
        }

       
        if (productIds.length === 0) {
          const res = await fetch('http://localhost:5000/api/products?new=true&limit=8');
          const latest: Product[] = await res.json();
          setProducts(latest);
          return;
        }

        
        const resAll = await fetch('http://localhost:5000/api/products');
        const all: Product[] = await resAll.json();
        const filtered = all.filter(p => productIds.includes(p._id));
        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      }
    };

    fetchNewArrivals();
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -220 : 220,
        behavior: 'smooth',
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('🚫 Please login to add products to cart');
      return;
    }

    const uniqueId = `${product._id}-${product.color}`;
    dispatch(
      addToCart({
        id: uniqueId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        color: product.color,
      })
    );
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.color,
      inStock: product.inStock ?? true,
      rating: product.rating,
    });
    setQuickViewOpen(true);
  };

  return (
    <section className="py-12 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">New Arrival Products</h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow"
        >
          <i className="ri-arrow-left-s-line text-xl" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow"
        >
          <i className="ri-arrow-right-s-line text-xl" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-2"
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[180px] flex-shrink-0 bg-white border rounded-xl p-4 text-center hover:shadow-md transition-transform duration-300 group relative"
            >
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-28 h-28 object-contain mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 ${
                    product.hoverImage ? 'group-hover:opacity-0' : ''
                  }`}
                />
                {product.hoverImage && (
                  <img
                    src={product.hoverImage}
                    alt={product.name}
                    className="w-28 h-28 object-contain mx-auto mb-3 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-300"
                  />
                )}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <button className="bg-white p-2 rounded-full shadow hover:scale-110 transition">
                    <i className="ri-heart-line text-[16px]" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                  >
                    <i className="ri-shopping-cart-2-line text-[16px]" />
                  </button>
                  <button
                    onClick={() => handleQuickView(product)}
                    className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                  >
                    <i className="ri-eye-line text-[16px]" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                {product.category?.name || 'Uncategorized'}
              </p>
              <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
              <p className="text-sm text-green-600 font-semibold">
                ${product.price.toFixed(2)}
              </p>
              <div className="text-yellow-500 text-sm">
                {'★'.repeat(product.rating)}
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

export default NewArrivalSlider;







