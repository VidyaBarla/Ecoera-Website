const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

let cart = []; // In-memory cart for now

app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Cart API! Use /cart to interact with the cart.');
});

// Get Cart
app.get('/cart', (req, res) => {
    // Calculate total carbon footprint
    const totalCarbonFootprint = cart.reduce((total, item) => total + item.carbonFootprint, 0).toFixed(2);

    res.json({
        cart,
        totalCarbonFootprint
    });
});

// Add Product to Cart
app.post('/cart', (req, res) => {
    const product = req.body;
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        res.status(400).json({ message: 'Product is already in the cart' });
    } else {
        cart.push(product);
        res.status(201).json({ message: 'Product added to cart', cart });
    }
});


// Remove Product from Cart
app.delete('/cart/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    cart = cart.filter(item => item.id !== productId);  // Remove item from cart

    // Calculate total carbon footprint after removal
    const totalCarbonFootprint = cart.reduce((total, item) => total + item.carbonFootprint, 0).toFixed(2);

    res.json({
        message: 'Product removed from cart',
        cart,
        totalCarbonFootprint
    });
});


// Clear Cart
app.delete('/cart', (req, res) => {
    cart = [];
    res.json({ message: 'Cart cleared', cart });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
