import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;

