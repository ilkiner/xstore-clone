const express = require('express');
const router = express.Router();
const { getNewArrivals, updateNewArrivals } = require('../controllers/newArrivalController');
const authAdmin = require('../middlewares/authAdmin'); 
router.get('/', getNewArrivals);
router.put('/', authAdmin, updateNewArrivals);

module.exports = router;
