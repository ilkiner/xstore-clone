'use client';

import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';

interface ProductQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    color?: string;
    inStock?: boolean;
    rating?: number;
  } | null;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  if (!product) return null;

  const handleAddToCart = () => {
    const uniqueId = `${product._id}-${product.color || 'default'}`;
    dispatch(
      addToCart({
        id: uniqueId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        color: product.color || 'default',
      })
    );
  };

  const handleGoToDetail = () => {
    onClose(); 
    router.push(`/product/${product._id}`); 
  };

  return (
    <div
      className={`fixed top-0 right-0 w-[360px] h-full bg-white shadow-2xl z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <button onClick={onClose} className="text-gray-500 text-2xl font-bold">
          ×
        </button>
      </div>

      
      <div className="p-4 overflow-y-auto">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="mx-auto object-contain"
        />
        <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
        <p className="text-sm text-gray-700 mb-1">${product.price.toFixed(2)}</p>

        {product.inStock && (
          <p className="text-sm text-green-600 mb-1">✓ In Stock</p>
        )}

        {product.color && (
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm">Color:</span>
            <div
              className="w-5 h-5 rounded-full border"
              style={{ backgroundColor: product.color }}
            />
            <span className="text-sm text-gray-600">{product.color}</span>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-2 mb-4">No description yet.</p>

        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition mb-2"
        >
          Add to Cart
        </button>

        <button
          onClick={handleGoToDetail}
          className="w-full text-sm text-blue-600 hover:underline"
        >
          Show full details
        </button>
      </div>
    </div>
  );
};

export default ProductQuickView;
