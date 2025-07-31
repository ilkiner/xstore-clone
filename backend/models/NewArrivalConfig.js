const mongoose = require('mongoose');

const NewArrivalConfigSchema = new mongoose.Schema({
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

module.exports = mongoose.model('NewArrivalConfig', NewArrivalConfigSchema);
