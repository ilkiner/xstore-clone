'use client';

import React, { useState } from 'react';
import TopBar from '../topbar/TopBar';
import MainNavbar from '../navbar/MainNavbar';
import CartDrawer from '@/components/shop/CartDrawer';
import ProductQuickView from '@/components/shop/ProductQuickView';

interface QuickViewProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  inStock?: boolean;
  rating?: number;
}

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewOpen] = useState(false);
  const [selectedProduct] = useState<QuickViewProduct | null>(null);

  return (
    <>
      <header>
        <TopBar onCartClick={() => setCartOpen(true)} />
        <MainNavbar />
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <ProductQuickView
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default Header;


