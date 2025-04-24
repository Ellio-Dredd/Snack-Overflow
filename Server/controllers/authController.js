const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// signUp controller
const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
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
      firstName,
      lastName,
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

// signIn controller
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (err) {
    console.error('Sign-in error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUp, signIn };
