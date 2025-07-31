"use client";

import React, { useEffect, useState, useRef } from "react";

type Category = {
  _id: string;
  name: string;
  image: string;
};

type Product = {
  _id: string;
  name: string;
  image: string;
  category: Category | null;
};

const PopularCategorySlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -220 : 220,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Popular Products</h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
       
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow"
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow"
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>

       
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-2 scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="group min-w-[160px] flex-shrink-0 bg-white border rounded-xl p-4 text-center hover:shadow-md transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 object-contain mx-auto mb-3 transform transition-transform duration-500 group-hover:scale-125"
              />
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-xs text-gray-500">
                {product.category?.name || "Uncategorized"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategorySlider;

