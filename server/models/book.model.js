import mongoose from "mongoose";
import crypto from "crypto";
//const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  language: {
    type: String,
    trim: true,
  },
  isbn: {
    type: String,
    trim: true,
  },
  genres: {
    type: String,
    trim: true,
  },
  pages: {
    type: Number,
    trim: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  publishDate: {
    type: Date,
    trim: true,
  },
  coverImg: {
    type: String,
    trim: true,
  }
});

//module.exports = mongoose.model('User', UserSchema);
export default mongoose.model("Book", BookSchema);
