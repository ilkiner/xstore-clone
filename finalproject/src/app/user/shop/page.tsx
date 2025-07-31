'use client';

import React, { useEffect, useState } from 'react';
import HeroBanner from '@/components/shop/HeroBanner';
import TopCategorySelector from '@/components/shop/TopCategorySelector';
import CategorySidebar from '@/components/shop/CategorySidebar';
import ProductCard from '@/components/shop/ProductCard';
import ProductQuickView from '@/components/shop/ProductQuickView';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => {
        const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;
        return selectedCategories.includes(categoryName);
      });
    }

    if (minPrice !== null && maxPrice !== null) {
      filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice);
    }

    if (selectedRating !== null) {
      filtered = filtered.filter((product) => product.rating >= selectedRating);
    }

    if (selectedColor !== null) {
      filtered = filtered.filter((product) => product.color === selectedColor);
    }

    setFilteredProducts(filtered);
    setVisibleCount(10);
  }, [products, selectedCategories, minPrice, maxPrice, selectedRating, selectedColor]);

  const handleCategoryFilterChange = (categories: string[]) => setSelectedCategories(categories);
  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  const handleRatingChange = (rating: number | null) => setSelectedRating(rating);
  const handleColorChange = (color: string | null) => setSelectedColor(color);

  const resetFilters = () => {
    setSelectedCategories([]);
    setMinPrice(null);
    setMaxPrice(null);
    setSelectedRating(null);
    setSelectedColor(null);
    setFilteredProducts(products);
    setVisibleCount(10);
  };

  const loadMore = () => setVisibleCount((prev) => prev + 10);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (product) => {
    console.log('Add to Cart:', product);
  };

  return (
    <div>
      <HeroBanner />
      <TopCategorySelector />

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <CategorySidebar
            onCategoryFilterChange={handleCategoryFilterChange}
            onPriceChange={handlePriceChange}
            onRatingChange={handleRatingChange}
            onColorChange={handleColorChange}
            onResetFilters={resetFilters}
          />
        </div>

        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  rating={product.rating}
                  image={product.image}
                  hoverImage={product.hoverImage}
                  onQuickView={() => handleQuickView(product)}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="bg-black text-white mb-8 px-6 py-2 rounded hover:bg-gray-800 transition"

              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      <ProductQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShopPage;


