import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);
