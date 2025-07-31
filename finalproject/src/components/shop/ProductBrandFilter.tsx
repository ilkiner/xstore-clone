"use client";

import React, { useState } from 'react';

const brands = [
  { id: 'apple', label: 'Apple' },
  { id: 'samsung', label: 'Samsung' },
  { id: 'xiaomi', label: 'Xiaomi' },
  { id: 'sony', label: 'Sony' },
  { id: 'huawei', label: 'Huawei' },
  { id: 'lenovo', label: 'Lenovo' },
  { id: 'lg', label: 'LG' },
  { id: 'asus', label: 'Asus' },
  { id: 'acer', label: 'Acer' },
];

const ProductBrandFilter = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleBrandChange = (id: string) => {
    if (selectedBrands.includes(id)) {
      setSelectedBrands(selectedBrands.filter(b => b !== id));
    } else {
      setSelectedBrands([...selectedBrands, id]);
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-6 mt-5">
      <h3 className="text-lg font-semibold mb-4">Filter By Brand</h3>

      
      <input
        type="text"
        placeholder="Search brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 text-sm"
      />

     
      <ul className="space-y-2 text-sm text-gray-800 max-h-[150px] overflow-y-auto">
        {filteredBrands.map((brand) => (
          <li key={brand.id} className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.id)}
                onChange={() => handleBrandChange(brand.id)}
                className="form-checkbox"
              />
              {brand.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductBrandFilter;
