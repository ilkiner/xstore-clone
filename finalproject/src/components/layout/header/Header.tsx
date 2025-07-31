'use client';

import React, { useState } from 'react';
import TopBar from '../topbar/TopBar';
import MainNavbar from '../navbar/MainNavbar';
import CartDrawer from '@/components/shop/CartDrawer';
import ProductQuickView from '@/components/shop/ProductQuickView';

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); 

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

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


