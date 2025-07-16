const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign Up controller
const signUp = async (req, res) => {
  const {
    name,
    address,
    email,
    password,
    gender,
    age,
    ageUnit
  } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    if (!gender) {
      return res.status(400).json({ message: 'Gender is required' });
    }

    const user = new User({
      name,
      address,
      email,
      password,
      gender,
      age,
      ageUnit
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Sign In controller
const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(" Login attempt:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(" No user found with email:", email);
      return res.status(401).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Password mismatch for:", email);
      console.log(" Password mismatch for:", email);
      console.log("Password entered:", password);
      console.log("Stored (hashed) password:", user.password);
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log("Login successful for:", email);

    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        userId: user.userId,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        age: user.age,
        ageUnit: user.ageUnit,
        gender: user.gender,
      },
    });
  } catch (err) {
    console.error('Sign-in error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// User info controller
const user = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  signUp,
  signIn,
  user
};
