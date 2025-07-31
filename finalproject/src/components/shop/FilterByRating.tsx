import React, { useState } from 'react';

interface FilterByRatingProps {
  onRatingChange: (rating: number | null) => void;
}

const FilterByRating: React.FC<FilterByRatingProps> = ({ onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleChange = (rating: number) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Filter By Rating</h3>
      <div className="space-y-2 text-sm text-gray-800">
        {[5, 4, 3, 2, 1].map((rating) => (
          <label key={rating} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedRating === rating}
              onChange={() => handleChange(rating)}
            />
            <span>
              {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByRating;

