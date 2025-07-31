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

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  isOpen,
  onClose,
  product,
}) => {
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

  const handleShowDetails = () => {
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

      <div className="p-4 overflow-y-auto flex flex-col">
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={250}
            height={250}
            className="object-contain"
          />
        </div>

        <div className="mt-4 space-y-2 text-left">
          <h2 className="text-[16px] font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-800">${product.price.toFixed(2)}</p>

          {product.inStock && (
            <p className="text-sm text-green-600">✓ In Stock</p>
          )}

          {product.color && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Color:</span>
              <div
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: product.color }}
              />
              <span className="text-sm text-gray-700 uppercase">{product.color}</span>
            </div>
          )}

          <p className="text-sm text-gray-500 mt-1">No description yet.</p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition mb-2"
          >
            Add to Cart
          </button>
          <button
            onClick={handleShowDetails}
            className="w-full text-sm text-blue-600 hover:underline"
          >
            Show full details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;


