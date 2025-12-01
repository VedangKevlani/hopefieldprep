import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error("GET /api/events error:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Add new event (admin only)
router.post("/", async (req, res) => {
  const { date, title, description } = req.body;
  if (!date || !title) return res.status(400).json({ error: "Date and title required" });

  try {
    const newEvent = new Event({ date, title, description });
    await newEvent.save();
    res.json(newEvent);
  } catch (err) {
    console.error("POST /api/events error:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// Delete event (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Event not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/events/:id error:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
