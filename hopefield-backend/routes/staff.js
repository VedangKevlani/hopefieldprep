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
      { name: "Miss Ramprashad", subject: "Computer Science/Library", email: "hopefield.computer@gmail.com", photo: "/images/staff/ramprashad.png" },
      { name: "Mrs. Abrikian", subject: "Spanish", photo: "/images/staff/abrician.png" },
      { name: "Coach Cobran", subject: "Physical Education", photo: "/images/staff/cobran.png" },
      { name: "Coach Levy", subject: "Physical Education", photo: "/images/staff/levy.png" },
      { name: "Mrs. Thwaites", subject: "Movement", photo: "/images/staff/thwaites.png" },
      { name: "Coach Pitterson", subject: "Chess", photo: "/images/staff/pitterson.png" },
      { name: "Miss Castle", subject: "Music", photo: "/images/staff/castle.png" },
      { name: "Mr. Renford", subject: "Music", photo: "/images/staff/renford.png" }
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

// Middleware to check admin password
const checkAdmin = (req, res, next) => {
  const password = req.body.adminPassword;
  if (password !== process.env.ADMIN_HASH) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
};

// GET all staff
router.get("/", async (req, res) => {
  try {
    const staff = await StaffMember.find().sort({ group: 1, name: 1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new staff (admin only)
router.post("/", checkAdmin, async (req, res) => {
  const { name, email, photo, group } = req.body;
  try {
    const staff = new StaffMember({ name, email, photo, group });
    await staff.save();
    res.json({ success: true, staff });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT update staff (admin only)
router.put("/", checkAdmin, async (req, res) => {
  const { _id, name, email, photo, group } = req.body;
  try {
    const staff = await StaffMember.findByIdAndUpdate(
      _id,
      { name, email, photo, group },
      { new: true }
    );
    res.json({ success: true, staff });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE staff (admin only)
router.delete("/", checkAdmin, async (req, res) => {
  const { _id } = req.body;
  try {
    await StaffMember.findByIdAndDelete(_id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST upload photo
router.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

export default router;
