const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },      
  month: { type: String, required: true },     
  category: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true }, 
  description: { type: String, required: false },    
  views: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
});

module.exports = mongoose.model('Blog', BlogSchema);
