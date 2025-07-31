const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    image: {      
      type: String,                   
      default: '/images/categories/default.jpg'  
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ProductCategory', productCategorySchema);
