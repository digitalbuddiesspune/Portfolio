import express from 'express';
import multer from 'multer';
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';
import Portfolio from '../model/adminModal.js';
import Testimonial from '../model/testimonialModel.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer: keep file in memory for Cloudinary upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /image\/(jpeg|jpg|png|gif|webp)/;
    if (allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images (JPEG, PNG, GIF, WebP) are allowed.'), false);
    }
  }
});

// Public route: Get all portfolio items (no auth required)
router.get('/portfolio/public', async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: portfolios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolios',
      error: error.message
    });
  }
});

// Public route: Get all testimonials (no auth required)
router.get('/testimonials/public', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
});

// Apply authentication middleware to all admin routes below
router.use(authenticateToken);

// Upload image to Cloudinary; returns URL to save in DB
router.post('/upload-image', (req, res, next) => {
  upload.single('image')(req, res, (multerErr) => {
    if (multerErr) {
      console.error('Multer error:', multerErr);
      return res.status(400).json({
        success: false,
        message: multerErr.message || 'Invalid file. Use JPEG, PNG, GIF or WebP under 5MB.'
      });
    }
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided. Please select an image.'
      });
    }

    try {
      const stream = streamifier.createReadStream(req.file.buffer);
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio' },
        (err, result) => {
          if (err) {
            console.error('Cloudinary upload error:', err);
            return res.status(500).json({
              success: false,
              message: 'Cloudinary upload failed',
              error: err.message
            });
          }
          res.json({
            success: true,
            url: result.secure_url
          });
        }
      );
      stream.pipe(uploadStream);
    } catch (err) {
      console.error('Upload stream error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error during upload',
        error: err.message
      });
    }
  });
});

// Get all portfolio items
router.get('/portfolio', async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: portfolios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolios',
      error: error.message
    });
  }
});

// Get single portfolio item
router.get('/portfolio/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }
    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio',
      error: error.message
    });
  }
});

// Create new portfolio item
router.post('/portfolio', async (req, res) => {
  try {
    const { name, category, webType, websiteLink, image, description } = req.body;

    if (!category || !image) {
      return res.status(400).json({
        success: false,
        message: 'Category and image are required'
      });
    }

    const portfolio = new Portfolio({
      name: name || '',
      category,
      webType: webType || '',
      websiteLink: websiteLink || '',
      image,
      description: description || ''
    });

    await portfolio.save();

    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating portfolio item',
      error: error.message
    });
  }
});

// Update portfolio item
router.put('/portfolio/:id', async (req, res) => {
  try {
    const { name, category, webType, websiteLink, image, description } = req.body;

    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    // Update fields
    if (name !== undefined) portfolio.name = name;
    if (category !== undefined) portfolio.category = category;
    if (webType !== undefined) portfolio.webType = webType;
    if (websiteLink !== undefined) portfolio.websiteLink = websiteLink;
    if (image !== undefined) portfolio.image = image;
    if (description !== undefined) portfolio.description = description;

    await portfolio.save();

    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating portfolio item',
      error: error.message
    });
  }
});

// Delete portfolio item
router.delete('/portfolio/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting portfolio item',
      error: error.message
    });
  }
});

// --- Testimonials (authenticated) ---

// Get all testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
});

// Create testimonial
router.post('/testimonials', async (req, res) => {
  try {
    const { avatar, projectName, description, clientName, clientLocation, stars } = req.body;
    if (!avatar || !projectName || !description) {
      return res.status(400).json({
        success: false,
        message: 'Avatar, project name and description are required'
      });
    }
    const testimonial = new Testimonial({
      avatar: avatar || '',
      projectName: projectName || '',
      description: description || '',
      clientName: clientName || '',
      clientLocation: clientLocation || '',
      stars: Math.min(5, Math.max(1, Number(stars) || 5))
    });
    await testimonial.save();
    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating testimonial',
      error: error.message
    });
  }
});

// Update testimonial
router.put('/testimonials/:id', async (req, res) => {
  try {
    const { avatar, projectName, description, clientName, clientLocation, stars } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    if (avatar !== undefined) testimonial.avatar = avatar;
    if (projectName !== undefined) testimonial.projectName = projectName;
    if (description !== undefined) testimonial.description = description;
    if (clientName !== undefined) testimonial.clientName = clientName;
    if (clientLocation !== undefined) testimonial.clientLocation = clientLocation;
    if (stars !== undefined) testimonial.stars = Math.min(5, Math.max(1, Number(stars) || 5));
    await testimonial.save();
    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating testimonial',
      error: error.message
    });
  }
});

// Delete testimonial
router.delete('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting testimonial',
      error: error.message
    });
  }
});

export default router;
