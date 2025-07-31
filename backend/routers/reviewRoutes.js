const router = require('express').Router();
const { addReview, getReviewsByProductId } = require('../controllers/reviewController');

router.post('/', addReview); 
router.get('/:productId', getReviewsByProductId); 
module.exports = router;
