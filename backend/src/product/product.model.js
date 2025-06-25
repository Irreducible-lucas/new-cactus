const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String, 
      required: true,
    },
    size: {
      label: {
        type: String,
        required: true,
      },
    },

    features: {   
        type: [String],
        required: true,
    
    },
    image: {
      type: [String],
      required: true,
    },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
    productType: {
      type: String,
      required: true,
    },
    productTag: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
