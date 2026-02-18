import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import Portfolio from './model/adminModal.js';
import Testimonial from './model/testimonialModel.js';

// Load environment variables from .env file
dotenv.config();

// Cloudinary config (for image uploads)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

// CORS: allow frontend (must be before any routes that can send 403/401)
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get PORT and DBURL from .env
const PORT = process.env.PORT || 5000;
const DBURL = process.env.DBURL;

// MongoDB Connection
if (!DBURL) {
  console.error('Error: DBURL is not defined in .env file');
  process.exit(1);
}

mongoose.connect(DBURL)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Gamotech Portfolio Backend API is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);

// Public read-only API (no auth) – must be before admin routes so they match first
app.get('/api/admin/portfolio/public', async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.json({ success: true, data: portfolios });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching portfolios', error: error.message });
  }
});
app.get('/api/admin/testimonials/public', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching testimonials', error: error.message });
  }
});

app.use('/api/admin', adminRoutes);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
});

// Handle server errors (e.g., port already in use)
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please stop the other process or use a different port.`);
    console.error(`💡 On macOS: lsof -i :${PORT}  then  kill -9 <PID>`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('📊 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('📊 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📊 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('📊 MongoDB connection closed due to app termination');
  process.exit(0);
});
