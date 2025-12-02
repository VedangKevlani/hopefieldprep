// src/hopefield-backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";
import eventRoutes from "./routes/events.js";
import staffRoutes from "./routes/staff.js";
import staffUploadRoute from "./routes/staffUpload.js";
import { seedStaff } from "./utils/seedStaff.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve public folder (images, uploads)
app.use(express.static("public"));
app.use("/uploads", express.static(path.join("public/uploads")));

// Routes
app.use("/api/staff", staffRoutes);
app.use("/api/staff/upload", staffUploadRoute);
app.use("/api/events", eventRoutes);

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI is missing in environment variables!");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("✅ MongoDB connected");
    seedStaff(); // Seed staff on startup
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Admin login route
app.post("/api/admin/login", async (req, res) => {
  const bcrypt = (await import("bcrypt")).default;
  const { password } = req.body;
  if (!password) return res.json({ success: false });

  try {
    const match = await bcrypt.compare(password, process.env.ADMIN_HASH);
    res.json({ success: match });
  } catch {
    res.json({ success: false });
  }
});

//
// ===== Multer setup for PDF uploads =====
//
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join("public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

const pdfUpload = multer({
  storage: pdfStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"), false);
  },
});

//
// ===== PDF Routes =====
//

// Upload new PDF
app.post("/api/pdfs/upload", pdfUpload.single("pdf"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  res.json({ success: true, filePath: `/uploads/${req.file.filename}` });
});

// List all PDFs
app.get("/api/pdfs", (req, res) => {
  const files = fs
    .readdirSync(path.join("public", "uploads"))
    .filter((f) => f.endsWith(".pdf"))
    .map((f) => ({ name: f, url: `/uploads/${f}` }));
  res.json(files);
});

// Delete a PDF by filename
app.delete("/api/pdfs/:filename", (req, res) => {
  const filePath = path.join("public", "uploads", req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "File not found" });
  }
});

// Replace an existing PDF
app.post("/api/pdfs/replace", pdfUpload.single("pdf"), (req, res) => {
  const { replaceFilename } = req.body;
  if (replaceFilename) {
    const oldPath = path.join("public", "uploads", replaceFilename);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  res.json({ success: true, filePath: `/uploads/${req.file.filename}` });
});

//
// ===== Start server =====
//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
