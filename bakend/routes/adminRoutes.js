import express from 'express';
import Portfolio from '../model/adminModal.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(authenticateToken);

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

export default router;
