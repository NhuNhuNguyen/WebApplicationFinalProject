const Product = require('../models/product.model');

// Get all products
exports.getAllProducts = async (req, res) => {
  const keyword = req.query.name;
    if (keyword == null){
      try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      try {
        //const keyword = req.query.name;
        const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
  
  // Get product by ID
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Add new product
  exports.addProduct = async (req, res) => {
    try {
        console.log(req.body.name)
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Update product by ID
  exports.updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete product by ID
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete all products
  exports.deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany();
      res.json({ message: 'All products deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  