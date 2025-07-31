'use client';

import React from 'react';
import Image from 'next/image';
import { RiHeartLine, RiShoppingCart2Line, RiEyeLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

interface ProductCardProps {
  id: string;
  category: string | { name: string };
  name: string;
  price: number;
  rating: number;
  image: string;
  hoverImage?: string;
  color: string;
  onQuickView: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  category,
  name,
  price,
  image,
  hoverImage,
  rating = 0,
  color,
  onQuickView,
}) => {
  const dispatch = useDispatch();

  const displayCategory =
    typeof category === 'object' && category !== null ? category.name : category;

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('🚫 Please login to add products to cart');
      return;
    }

    const uniqueId = `${id}-${color}`;
    dispatch(
      addToCart({
        id: uniqueId,
        name,
        price,
        image,
        quantity: 1,
        color,
      })
    );
  };

  const handleQuickViewClick = () => {
    onQuickView({
      id,
      name,
      price,
      image,
      color,
      inStock: true,
      rating,
    });
  };

  return (
    <div className="group w-full max-w-[240px] mx-auto">
     
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className={`w-full object-contain transition duration-300 ${
            hoverImage ? 'group-hover:opacity-0' : ''
          }`}
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${name} hover`}
            width={300}
            height={300}
            className="w-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-300"
          />
        )}

       
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button className="bg-white p-2 rounded-full shadow hover:scale-110 transition">
            <RiHeartLine size={18} />
          </button>

          <button
            onClick={handleAddToCart}
            className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
          >
            <RiShoppingCart2Line size={18} />
          </button>

          <button
            onClick={handleQuickViewClick}
            className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
          >
            <RiEyeLine size={18} />
          </button>
        </div>
      </div>

    
      <div className="text-sm text-gray-500 mt-2">{displayCategory}</div>

    
      <div className="font-medium text-[15px] text-black line-clamp-1">{name}</div>

      <div className="text-green-600 text-sm mb-1">
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </div>

    
      <div className="text-[15px] font-semibold text-gray-800">
        {typeof price === 'number' ? `$${price.toFixed(2)}` : <span className="text-gray-400">Price not available</span>}
      </div>
    </div>
  );
};

export default ProductCard;

