require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Allow multiple CORS origins (both local and deployed frontend)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'https://new-cactus.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());

// ✅ Routes
const authRoutes = require('./src/user/user.routes');
const productRoutes = require('./src/product/product.route');
const reviewsRoutes = require('./src/reviews/review.route');
const favoritesRoutes = require('./src/favourite/favorites.route');
const orderRoutes = require('./src/order/order.route');

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('API server is running on port ' + port);
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});

// ✅ MongoDB Connection & Server Start
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log('✅ MongoDB is connected');

    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

main();
