// routes/staff.js
import express from "express";
import Staff from "../models/Staff.js";
import bcrypt from "bcrypt";

const router = express.Router();

// middleware to check admin password
router.use(async (req, res, next) => {
  const password = req.body.adminPassword || req.query.adminPassword || req.headers.adminpassword;

  console.log("🔑 Incoming admin password:", password ? "[RECEIVED]" : "[MISSING]");

  if (!password) {
    console.log("⛔ No adminPassword in request");
    return res.status(401).json({ message: "Unauthorized: Missing admin password" });
  }

  try {
    const match = await bcrypt.compare(password, process.env.ADMIN_HASH);
    console.log("🔍 Password match:", match);

    if (!match) {
      console.log("❌ Invalid password");
      return res.status(401).json({ message: "Unauthorized: Incorrect password" });
    }
    next();
  } catch (err) {
    console.log("🔥 Password comparison error:", err);
    return res.status(500).json({ message: "Server error during authentication" });
  }
});

// GET STAFF LIST — open, no password needed
router.get("/", async (req, res) => {
  const staff = await Staff.find();
  res.json(staff);
});

// CREATE STAFF
router.post("/", async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.json({ message: "Staff added", staff });
  } catch (err) {
    console.log("❌ Add staff error:", err);
    res.status(500).json({ message: "Error adding staff" });
  }
});

// UPDATE STAFF
router.put("/", async (req, res) => {
  try {
    await Staff.findOneAndUpdate({ name: req.body.name }, req.body);
    res.json({ message: "Staff updated" });
  } catch (err) {
    console.log("❌ Update staff error:", err);
    res.status(500).json({ message: "Error updating staff" });
  }
});

// DELETE STAFF
router.delete("/", async (req, res) => {
  try {
    await Staff.findOneAndDelete({ name: req.body.name });
    res.json({ message: "Staff deleted" });
  } catch (err) {
    console.log("❌ Delete staff error:", err);
    res.status(500).json({ message: "Error deleting staff" });
  }
});

export default router;
