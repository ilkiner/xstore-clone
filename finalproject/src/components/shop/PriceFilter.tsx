'use client';

import React, { useState } from 'react';

interface PriceFilterProps {
  onPriceChange: (min: number, max: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleApply = () => {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    onPriceChange(min, max);
  };

  const handleRangeClick = (min: number, max: number) => {
    setMinPrice(min.toString());
    setMaxPrice(max.toString());
    onPriceChange(min, max);
  };

  return (
    <div className="mb-6 mt-5">
      <h3 className="text-lg font-semibold mb-4">Filter By Price</h3>

      <div className="flex flex-col gap-2 text-sm text-gray-800">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="form-checkbox" onChange={() => handleRangeClick(0, 500)} />
          $0 - $500
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="form-checkbox" onChange={() => handleRangeClick(500, 1000)} />
          $500 - $1,000
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="form-checkbox" onChange={() => handleRangeClick(1000, 1500)} />
          $1,000 - $1,500
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="form-checkbox" onChange={() => handleRangeClick(1500, 2000)} />
          $1,500 - $2,000
        </label>
      </div>

     
      <div className="flex items-center gap-2 mt-4">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-16 border rounded px-2 py-1 text-sm"
        />
        <span>-</span>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-16 border rounded px-2 py-1 text-sm"
        />
        <button
          onClick={handleApply}
          className="ml-2 px-2 py-1 text-sm rounded bg-primaryGreen text-white hover:bg-black transition"
        >
          APPLY
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;

