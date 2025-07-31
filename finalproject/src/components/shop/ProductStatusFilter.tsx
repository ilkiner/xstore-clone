import React from 'react';

const ProductStatusFilter = () => {
  return (
    <div className="mb-6 mt-5">
      <h3 className="text-lg font-semibold mb-4">Product Status</h3>
      <ul className="space-y-2">
        <li>
          <label className="flex items-center gap-2 text-[13px] text-gray-800">
            <input type="checkbox" className="form-checkbox accent-primaryGreen" />
            In Stock
          </label>
        </li>
        <li>
          <label className="flex items-center gap-2 text-[13px] text-gray-800">
            <input type="checkbox" className="form-checkbox accent-primaryGreen" />
            Out of Stock
          </label>
        </li>
        <li>
          <label className="flex items-center gap-2 text-[13px] text-gray-800">
            <input type="checkbox" className="form-checkbox accent-primaryGreen" />
            On Sale
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ProductStatusFilter;

