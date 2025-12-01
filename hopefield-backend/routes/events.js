import express from "express";
import Event from "../models/Event.js";
import bcrypt from "bcrypt";

const router = express.Router();

// GET ALL EVENTS (Public)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch {
    res.status(500).json({ error: "Failed to get events" });
  }
});

// ADD EVENT (Admin Only)
router.post("/", async (req, res) => {
  const { password, date, title, description } = req.body;

  if (!password || !date || !title)
    return res.status(400).json({ success: false, message: "Missing fields" });

  const match = await bcrypt.compare(password, process.env.ADMIN_HASH);
  if (!match)
    return res.status(403).json({ success: false, message: "Invalid password" });

  try {
    const event = await Event.create({ date, title, description });
    res.json({ success: true, event });
  } catch {
    res.status(500).json({ success: false, message: "Failed to create event" });
  }
});

// DELETE EVENT (Admin Only)
router.delete("/:id", async (req, res) => {
  const { password } = req.body;

  const match = await bcrypt.compare(password, process.env.ADMIN_HASH);
  if (!match)
    return res.status(403).json({ success: false, message: "Invalid password" });

  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, message: "Failed to delete event" });
  }
});

export default router;
