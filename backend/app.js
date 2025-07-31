const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const homeRouter = require('./routers/homeRouter');
const AuthRouter = require('./routers/AuthRouter');
const categoryRoutes = require('./routers/categoryRouter');
const productRoutes = require('./routers/productRoutes');
const productCategoryRoutes = require('./routers/ProductCategoryRouter');
const reviewRoutes = require('./routers/reviewRoutes');
const newArrivalRouter = require('./routers/newArrivalRouter');
const blogRoutes = require('./routers/blogRoutes');
const adminAuthRouter = require('./routers/adminAuth');
const authAdmin = require('./middlewares/authAdmin');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/api/auth', AuthRouter);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/product-categories', productCategoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/new-arrivals', newArrivalRouter);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/home', homeRouter);

app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

