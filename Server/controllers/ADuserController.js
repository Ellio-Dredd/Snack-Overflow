import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 

// GET all users
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  // DELETE a user
export const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // PUT update user (simple example)
  export const updateUser = async (req, res) => {
    try {
      const { name, address, gender, age } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, address, gender, age },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };