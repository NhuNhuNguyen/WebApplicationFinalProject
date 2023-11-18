import mongoose from "mongoose";
import crypto from "crypto";
//const mongoose = require('mongoose');
const BorrowSchema = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
  },
  bookId: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    trim: true,
  },
  renew: {
    type: Number,
    trim: true,
  }
});

//module.exports = mongoose.model('User', UserSchema);
export default mongoose.model("Borrow", BorrowSchema);
