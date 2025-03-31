const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Get all properties with optional filtering
router.get('/', async (req, res) => {
  try {
    const { 
      propertyType, 
      listingType, 
      minPrice, 
      maxPrice, 
      minBedrooms,
      city,
      sort = 'createdAt',
      order = 'desc',
      limit = 10, 
      page = 1 
    } = req.query;
    
    const query = {};
    
    // Apply filters if provided
    if (propertyType) query.propertyType = propertyType;
    if (listingType) query.listingType = listingType;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (minPrice) query.price = { $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (minBedrooms) query.bedrooms = { $gte: Number(minBedrooms) };

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Execute query with sorting and pagination
    const properties = await Property.find(query)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .limit(Number(limit))
      .skip(skip);
    
    // Get total count for pagination
    const total = await Property.countDocuments(query);
    
    res.json({ 
      properties,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new property
router.post('/', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update property
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete property
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 