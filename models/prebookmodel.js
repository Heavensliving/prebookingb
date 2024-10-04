// models/prebookmodel.js
import mongoose from 'mongoose'; // Use import syntax

const preBookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  customAmount: {
    type: Number,
    default: 999,
  },
  customAmountDetails: {
    type: String,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true, // Ensure transactionId is unique
  },
  referralName: {
    type: String,
  },
}, {
  timestamps: true,
});

const PreBook = mongoose.model('PreBook', preBookSchema);

export default PreBook; // Use export default
