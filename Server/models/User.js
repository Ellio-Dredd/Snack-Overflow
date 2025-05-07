import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// --- Embedded Counter Schema ---
const counterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

// --- User Schema ---
const userSchema = new mongoose.Schema({
  userId:    { type: String, unique: true },
  name:      { type: String, required: true },
  address:   { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  gender:    { type: String, enum: ['male', 'female'], required: true },
  age:       { type: Number, required: true },
  ageUnit: {
    years:  { type: Boolean, default: false },
    months: { type: Boolean, default: false },
    weeks:  { type: Boolean, default: false }
  },
  isAdmin:   { type: Boolean, default: false },
}, { timestamps: true });

// --- Pre-save: Hash password + generate userId ---
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isNew) {
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    const counter = await Counter.findOneAndUpdate(
      { id: 'userId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    user.userId = `USER-${String(counter.seq).padStart(3, '0')}`;
  }

  next();
});

export default mongoose.model('User', userSchema);
