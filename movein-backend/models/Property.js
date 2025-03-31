const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['apartment', 'house', 'studio', 'penthouse']
  },
  listingType: {
    type: String,
    required: true,
    enum: ['rent', 'sale']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  area: {
    type: Number,
    required: true,
    min: 0
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  features: [String],
  images: [String],
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, { timestamps: true });

// Index for search performance
propertySchema.index({ 
  title: 'text', 
  description: 'text', 
  'location.city': 'text'
});

module.exports = mongoose.model('Property', propertySchema); 