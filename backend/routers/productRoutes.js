const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
} = require('../controllers/productController');
const authAdmin = require('../middlewares/authAdmin');

router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);


router.post('/', authAdmin, createProduct);
router.patch('/:id', authAdmin, updateProduct);
router.delete('/:id', authAdmin, deleteProduct);

module.exports = router;


