const ProductCategory = require('../models/ProductCategory');


const getAllCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
};


const createCategory = async (req, res) => {
  try {
    const { name, code } = req.body;

    const newCategory = new ProductCategory({ name, code });
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};
