// src/data/staff.js
import express from "express";
import StaffMember from "../models/StaffMember.js";
import multer from "multer";
import path from "path";

export const STAFF_GROUPS = [
  {
    group: "Administration",
    members: [
      {
        name: "Mrs. Sujanani",
        role: "Principal",
        photo: "/images/staff/principal.png"
      },
      {
        name: "Mrs. Earle",
        role: "Vice Principal",
        photo: "/images/staff/vp.png"
      }
    ]
  },
  {
    group: "K1",
    members: [
      { name: "Miss Harrison", photo: "/images/staff/k1-harrison.png" },
      { name: "Miss Harris", photo: "/images/staff/k1-harris.png" },
      { name: "Nurse Williams", email: "hopefield.prek@gmail.com", photo: "/images/staff/k1-williams.png" }
    ]
  },
  {
    group: "K2",
    members: [
      { name: "Mrs. Reid", photo: "/images/staff/k2-reid.png" },
      { name: "Miss Martin", photo: "/images/staff/k2-martin.png" }
    ]
  },
  {
    group: "Grade 1",
    members: [
      { name: "Miss Lewis", photo: "/images/staff/grade1-lewis.png" },
      { name: "Mrs. Phillips", email: "hopefield.grade1@gmail.com", photo: "/images/staff/grade1-phillips.png" }
    ]
  },
  {
    group: "Grade 2",
    members: [
      { name: "Mrs. Coleman", photo: "/images/staff/grade2-coleman.png" },
      { name: "Mrs. Walcott", email: "hopefield.grade2@gmail.com", photo: "/images/staff/grade2-walcott.png" }
    ]
  },
  {
    group: "Grade 3",
    members: [
      { name: "Miss Merchandani", email: "hopefield.grade3@gmail.com", photo: "/images/staff/grade3-merchandani.png" }
    ]
  },
  {
    group: "Grade 4",
    members: [
      { name: "Miss Wilson", email: "hopefield.grade4@gmail.com", photo: "/images/staff/grade4-wilson.png" }
    ]
  },
  {
    group: "Grade 5",
    members: [
      { name: "Miss Williams", email: "hopefield.grade5@gmail.com", photo: "/images/staff/grade5-williams.png" }
    ]
  },
  {
    group: "Grade 6",
    members: [
      { name: "Miss Tomlinson", email: "ms.tomlinsongsat@gmail.com", photo: "/images/staff/grade6-tomlinson.png" }
    ]
  },
  {
    group: "Special Subjects",
    members: [
      { name: "Miss Ramprashad Computer Science/Library", subject: "Computer Science/Library", email: "hopefield.computer@gmail.com", photo: "/images/staff/ramprashad.png" },
      { name: "Mrs. Abrikian Spanish", subject: "Spanish", photo: "/images/staff/abrician.png" },
      { name: "Coach Cobran Physical Education", subject: "Physical Education", photo: "/images/staff/cobran.png" },
      { name: "Coach Levy Physical Education", subject: "Physical Education", photo: "/images/staff/levy.png" },
      { name: "Mrs. Thwaites Movement", subject: "Movement", photo: "/images/staff/thwaites.png" },
      { name: "Coach Pitterson Chess", subject: "Chess", photo: "/images/staff/pitterson.png" },
      { name: "Miss Castle Music", subject: "Music", photo: "/images/staff/castle.png" },
      { name: "Mr. Renford Music", subject: "Music", photo: "/images/staff/renford.png" }
    ]
  },
  {
    group: "Ancillary",
    members: [
      { name: "Miss Nadine Clarke", photo: "/images/staff/nadine-clarke.png" },
      { name: "Miss Tamara Gordon", photo: "/images/staff/tamara-gordon.png" },
      { name: "Mr. Henroy Gordon", photo: "/images/staff/henroy-gordon.png" }
    ]
  }
];

const router = express.Router();

// Multer setup for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    console.log("GET /staff hit");
    const staff = await StaffMember.find().sort({ group: 1, name: 1 });
    res.json(staff);
  } catch (err) {
    console.log("GET /staff error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Middleware to check admin password
const checkAdmin = async (req, res, next) => {
  console.log("🛂 Admin check triggered");
  console.log("Request body received:", req.body);

  const { adminPassword } = req.body;
  if (!adminPassword) {
    console.log("❌ No adminPassword sent");
    return res.status(401).json({ message: "Unauthorized - Missing password" });
  }

  try {
    console.log("🔐 Comparing hash...");
    const match = await bcrypt.compare(adminPassword, process.env.ADMIN_HASH);
    console.log("Password match:", match);

    if (!match) {
      console.log("❌ Incorrect admin password");
      return res.status(401).json({ message: "Unauthorized - Wrong password" });
    }

    console.log("✔ Admin authenticated");
    next();
  } catch (err) {
    console.log("❌ Error hashing password:", err);
    return res.status(500).json({ message: "Server error during authentication" });
  }
};

// POST new staff
router.post("/", checkAdmin, async (req, res) => {
  const { name, email, photo, group } = req.body;
  console.log("Adding staff:", name);

  try {
    const staff = new StaffMember({ name, email, photo, group });
    await staff.save();
    console.log("✔ Staff added:", staff);
    res.json({ success: true, staff });
  } catch (err) {
    console.log("❌ Add staff error:", err);
    res.status(400).json({ error: err.message });
  }
});

// PUT update staff
router.put("/", checkAdmin, async (req, res) => {
  console.log("Updating staff:", req.body.name);

  try {
    const staff = await StaffMember.findOneAndUpdate(
      { name: req.body.name },
      req.body,
      { new: true }
    );
    if (!staff) {
      console.log("❌ Staff not found");
      return res.status(404).json({ message: "Staff not found" });
    }
    console.log("✔ Staff updated");
    res.json({ success: true, staff });
  } catch (err) {
    console.log("❌ Update error:", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE staff
router.delete("/", checkAdmin, async (req, res) => {
  console.log("Deleting staff:", req.body.name);

  try {
    const staff = await StaffMember.findOneAndDelete({ name: req.body.name });
    if (!staff) {
      console.log("❌ Staff not found");
      return res.status(404).json({ message: "Staff not found" });
    }
    console.log("✔ Staff deleted");
    res.json({ success: true });
  } catch (err) {
    console.log("❌ Delete error:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;