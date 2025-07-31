'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '@/store/cartSlice';
import Image from 'next/image';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 w-[360px] h-full bg-white shadow-2xl z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
     
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">🛒 Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 text-2xl font-bold">
          ×
        </button>
      </div>

     
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-180px)]">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b py-3"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>

                <div className="flex items-center mt-1 gap-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="w-6 h-6 bg-gray-200 text-sm rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="w-6 h-6 bg-gray-200 text-sm rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 text-sm"
                title="Remove"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      
      <div className="border-t p-4">
        <div className="flex justify-between mb-3 text-sm font-medium">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition mb-2">
          View Cart
        </button>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;
