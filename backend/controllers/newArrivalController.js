const NewArrivalConfig = require('../models/NewArrivalConfig');

const getNewArrivals = async (req, res) => {
  try {
    let cfg = await NewArrivalConfig.findOne();
    if (!cfg) {
      cfg = await NewArrivalConfig.create({ productIds: [] });
    }
    await cfg.populate('productIds');
    res.json(cfg);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get new arrivals', error: err.message });
  }
};

const updateNewArrivals = async (req, res) => {
  try {
    const { productIds } = req.body;
    let cfg = await NewArrivalConfig.findOne();
    if (!cfg) {
      cfg = await NewArrivalConfig.create({ productIds });
    } else {
      cfg.productIds = productIds;
      await cfg.save();
    }
    await cfg.populate('productIds');
    res.json(cfg);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update new arrivals', error: err.message });
  }
};

module.exports = { getNewArrivals, updateNewArrivals };
