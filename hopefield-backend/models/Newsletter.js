// hopefield-backend/models/Newsletter.js
import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  year: { type: Number, required: true },
  volume: { type: String },
  fileUrl: { type: String, required: true },
});

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter; // ✅ default export
