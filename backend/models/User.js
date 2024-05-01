// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profile: {
      bio: String,
      skills: [String],
      portfolio: [String]
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }]
  });
  

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);
