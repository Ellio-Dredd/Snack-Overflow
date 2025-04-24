const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  gender:    { type: String, enum: ['male', 'female'], required: true },
  age:       { type: Number, required: true },
  ageUnit: {
    years:  { type: Boolean, default: false },
    months: { type: Boolean, default: false },
    weeks:  { type: Boolean, default: false }
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
