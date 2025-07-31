const Review = require('../models/ReviewSchema');


const addReview = async (req, res) => {
  try {
    const { productId, userId, username, rating, comment } = req.body;

    
    if (!productId || !userId || !username || !rating || !comment) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    
    const newReview = new Review({
      productId,
      userId,
      username,
      rating,
      comment,
    });

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Review add:', error);
    res.status(500).json({ message: 'Error adding review', error });
  }
};


const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }

    const reviews = await Review.find({ productId });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Review error:', error);
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

module.exports = {
  addReview,
  getReviewsByProductId,
};

