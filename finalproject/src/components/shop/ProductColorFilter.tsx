'use client';

import React, { useState } from 'react';

const colors = [
  { id: 'RED', hex: '#ff0000' },
  { id: 'BLACK', hex: '#000000' },
  { id: 'WHITE', hex: '#ffffff' },
  { id: 'SILVER', hex: '#c0c0c0' },
  { id: 'BLUE', hex: '#0000ff' },
  { id: 'GREEN', hex: '#008000' },
  { id: 'BROWN', hex: '#a52a2a' },
  { id: 'GREY', hex: '#808080' },
];

interface Props {
  onColorChange: (color: string | null) => void;
}

const ProductColorFilter: React.FC<Props> = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSelect = (colorId: string) => {
    const newColor = selectedColor === colorId ? null : colorId;
    setSelectedColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="mb-6 mt-5">
      <h3 className="text-lg font-semibold mb-4">Filter By Color</h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <div
            key={color.id}
            onClick={() => handleSelect(color.id)}
            className={`group relative w-8 h-8 rounded-full border cursor-pointer transition
              ${selectedColor === color.id ? 'border-black border-2' : 'border-gray-300'} 
              hover:border-black
            `}
            style={{ backgroundColor: color.hex }}
            title={color.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductColorFilter;
