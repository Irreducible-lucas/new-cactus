const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { storage } = require('../../util/uploadToCloudinary');
const Product = require('./product.model');

const router = express.Router();
const upload = multer({ storage });

// CREATE PRODUCT
router.post('/create-product', upload.array('image', 5), async (req, res) => {
  try {
    const productData = req.body;
    const uploadedImages = req.files.map(file => file.path);

    const requiredFields = ['title', 'price', 'size', 'features', 'productType', 'productTag', 'rating'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        return res.status(400).send({ message: `Missing required field: ${field}` });
      }
    }

    const newProduct = new Product({
      ...productData,
      image: uploadedImages,
      features: Array.isArray(productData.features)
        ? productData.features
        : productData.features.split(','),
      size: typeof productData.size === 'string'
        ? JSON.parse(productData.size)
        : productData.size,
    });

    const savedProduct = await newProduct.save();
    res.status(201).send(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send({ message: 'Failed to create product', error: error.message });
  }
});

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ message: 'Failed to fetch products', error: error.message });
  }
});

// ✅ GET PRODUCTS BY TYPE (PUT ABOVE /:id)
router.get('/type/:productType', async (req, res) => {
  try {
    const { productType } = req.params;
    const products = await Product.find({
      productType: new RegExp(`^${productType}$`, 'i') // case-insensitive
    }).sort({ createdAt: -1 });

    res.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products by type:', error);
    res.status(500).send({ message: 'Failed to fetch products by type', error: error.message });
  }
});

// GET RANDOM PRODUCTS
router.get('/random', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const randomProducts = await Product.aggregate([{ $sample: { size: limit } }]);
    res.status(200).send(randomProducts);
  } catch (error) {
    console.error('Error fetching random products:', error);
    res.status(500).send({ message: 'Failed to fetch random products', error: error.message });
  }
});

// GET RELATED PRODUCTS
router.get('/related/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid product ID format' });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ message: 'Product not found' });

    const titleRegex = new RegExp(
      product.title.split(' ').filter(word => word.length > 2).join('|'),
      'i'
    );

    const relatedProducts = await Product.find({
      _id: { $ne: id },
      $or: [
        { productType: product.productType },
        { productTag: product.productTag },
        { title: { $regex: titleRegex } }
      ]
    }).limit(10);

    res.status(200).send({ relatedProducts });
  } catch (error) {
    console.error('Error fetching related products:', error);
    res.status(500).send({ message: 'Failed to fetch related products', error: error.message });
  }
});

// GET PRODUCT BY ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid product ID format' });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ message: 'Product not found' });

    res.status(200).send(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send({ message: 'Failed to fetch product', error: error.message });
  }
});

// UPDATE PRODUCT
router.patch('/update/:id', upload.array('image', 5), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid product ID format' });
    }

    if (updateData.features && typeof updateData.features === 'string') {
      updateData.features = updateData.features.split(',').map(f => f.trim());
    }

    if (updateData.size && typeof updateData.size === 'string') {
      try {
        updateData.size = JSON.parse(updateData.size);
      } catch {
        return res.status(400).send({ message: 'Invalid size JSON format' });
      }
    }

    if (req.files?.length > 0) {
      updateData.image = req.files.map(file => file.path);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send({ message: 'Product updated successfully', product: updatedProduct });

  } catch (error) {
    console.error('Server update error:', error);
    res.status(500).send({
      message: 'Failed to update product',
      error: error.message,
      stack: error.stack,
    });
  }
});

// DELETE PRODUCT
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid product ID format' });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).send({ message: 'Product not found' });

    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send({ message: 'Failed to delete product', error: error.message });
  }
});
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    const regex = new RegExp(query, 'i');
    const results = await Product.find({ title: regex }).limit(20);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
});

module.exports = router;
