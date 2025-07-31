const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

const createProduct = async (req, res) => {
  try {
    const payload = {
      ...req.body,
    };
    if (req.body.categoryId) {
      payload.category = req.body.categoryId;
    }
    delete payload.categoryId;

    const newProduct = new Product(payload);
    const savedProduct = await newProduct.save();
    await savedProduct.populate('category');
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatePayload = { ...req.body };
    if (req.body.categoryId !== undefined) {
      updatePayload.category = req.body.categoryId;
    }
    delete updatePayload.categoryId;

    const updated = await Product.findByIdAndUpdate(req.params.id, updatePayload, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: 'Product not found' });

    await updated.populate('category');
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};

