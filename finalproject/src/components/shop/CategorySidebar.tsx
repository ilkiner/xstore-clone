'use client';

import React, { useEffect, useState } from 'react';
import PriceFilter from './PriceFilter';
import FilterByRating from './FilterByRating';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface CategorySidebarProps {
  onCategoryFilterChange: (selectedCategories: string[]) => void;
  onPriceChange: (min: number, max: number) => void;
  onRatingChange: (rating: number | null) => void;
  onColorChange: (color: string | null) => void;
  onResetFilters: () => void;
}

const categories: Category[] = [
  { id: 'Daily Deals', label: 'Daily Deals', count: 4 },
  { id: 'Audio', label: 'Audio', count: 3 },
  { id: 'Camera & Drone', label: 'Camera & Drone', count: 4 },
  { id: 'Cell Phones', label: 'Cell Phones', count: 5 },
  { id: 'Computers', label: 'Computers', count: 4 },
  { id: 'iPad & Tablets', label: 'iPad & Tablets', count: 11 },
  { id: 'Portable Speakers', label: 'Portable Speakers', count: 4 },
  { id: 'Smart Home', label: 'Smart Home', count: 6 },
  { id: 'TV & Audio', label: 'TV & Audio', count: 5 },
  { id: 'Wearable Tech', label: 'Wearable Tech', count: 4 },
];

const colors = [
  { id: 'RED', hex: '#ff0000' },
  { id: 'BLACK', hex: '#000000' },
  { id: 'WHITE', hex: '#ffffff' },
  { id: 'BLUE', hex: '#0000ff' },
  { id: 'GREEN', hex: '#008000' },
  { id: 'SILVER', hex: '#c0c0c0' },
  { id: 'BROWN', hex: '#8B4513' },
  { id: 'GREY', hex: '#808080' },
];

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  onCategoryFilterChange,
  onPriceChange,
  onRatingChange,
  onColorChange,
  onResetFilters
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    const updated = selectedCategories.includes(id)
      ? selectedCategories.filter((cat) => cat !== id)
      : [...selectedCategories, id];
    setSelectedCategories(updated);
    onCategoryFilterChange(updated);
  };

  const handleColorSelect = (color: string) => {
    const updatedColor = selectedColor === color ? null : color;
    setSelectedColor(updatedColor);
    onColorChange(updatedColor);
  };

  return (
    <aside className="w-full md:w-[250px] bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">All Categories</h3>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
              />
              <span className="text-sm">{cat.label}</span>
            </label>
            <span className="text-xs bg-white px-2 py-0.5 rounded">{cat.count}</span>
          </li>
        ))}
      </ul>

      <PriceFilter onPriceChange={onPriceChange} />
      <FilterByRating onRatingChange={onRatingChange} />

      <div className="mb-6 mt-5">
        <h3 className="text-lg font-semibold mb-4">Filter By Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <div
              key={color.id}
              onClick={() => handleColorSelect(color.id)}
              className={`group relative w-8 h-8 rounded-full border cursor-pointer transition
                ${selectedColor === color.id ? 'border-black border-2' : 'border-gray-300'} 
                hover:border-black
              `}
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-40 transition"></div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="mt-6">
        <button
          onClick={onResetFilters}
          className="bg-primaryGreen text-white w-full py-2 rounded hover:bg-green-900 transition duration-300 text-sm"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
};

export default CategorySidebar;
