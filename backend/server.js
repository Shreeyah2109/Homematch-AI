const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

// Call the connect function
connectDB();

// Define Mongoose Schemas
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  preferences: {
    location: String,
    budget: Number,
    propertyType: String,
    bedrooms: Number,
    bathrooms: Number,
    facilities: {
      gym: Boolean,
      market: Boolean,
      school: Boolean,
      hospital: Boolean,
      park: Boolean,
      restaurant: Boolean,
      metroStation: Boolean
    }
  },
  createdAt: { type: Date, default: Date.now }
});

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  propertyType: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  images: [String],
  features: [String],
  listed: { type: Boolean, default: true },
  listedAt: { type: Date, default: Date.now },
  nearbyFacilities: {
    gym: Boolean,
    market: Boolean,
    school: Boolean,
    hospital: Boolean,
    park: Boolean,
    restaurant: Boolean,
    metroStation: Boolean
  }
});

// Create models
const User = mongoose.model('User', UserSchema);
const Property = mongoose.model('Property', PropertySchema);

// Authentication Middleware
const authenticate = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Routes

// Register User
app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role: 'user'
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Generate JWT
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ 
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        } 
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login User
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ 
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          preferences: user.preferences
        } 
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get user profile
app.get('/api/users/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update user preferences
app.put('/api/users/preferences', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.preferences = req.body;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Forgot Password - Request Reset
app.post('/api/users/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Set token and expiration (1 hour from now)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    await user.save();
    
    // In a real application, you would send an email with the reset link
    // For this demo, we'll just return the token
    res.json({ 
      message: 'Password reset initiated',
      resetToken: resetToken,
      userId: user._id
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Verify Reset Token
app.get('/api/users/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    // Find user by token and check if token is still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }
    
    res.json({ message: 'Token is valid', userId: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Reset Password
app.post('/api/users/reset-password', async (req, res) => {
  try {
    const { userId, token, password } = req.body;
    
    // Find user by ID and token, and check if token is still valid
    const user = await User.findOne({
      _id: userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();
    
    res.json({ message: 'Password has been reset' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find({ listed: true });
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get property by ID
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new property (admin only)
app.post('/api/properties', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const newProperty = new Property(req.body);
    const property = await newProperty.save();
    
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a property (admin only)
app.put('/api/properties/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a property (admin only)
app.delete('/api/properties/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const property = await Property.findByIdAndDelete(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ message: 'Property removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
