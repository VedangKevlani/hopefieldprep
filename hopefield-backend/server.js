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

app.post("/api/pdfs/upload", upload.single("pdf"), (req, res) => {
  res.json({ success: true, file: req.file });
});

app.get("/api/pdfs", (req, res) => {
  const fs = require("fs");
  const path = require("path");
  const files = fs.readdirSync(path.join(__dirname, "uploads"))
                  .filter(f => f.endsWith(".pdf"))
                  .map(f => ({ name: f, url: `/uploads/${f}` }));
  res.json(files);
});


app.delete("/api/pdfs/:id", (req, res) => {
  fs.unlinkSync(`uploads/${req.params.id}`);
  res.json({ success: true });
});

app.post("/api/pdfs/replace", upload.single("pdf"), (req, res) => {
  const { replaceId } = req.body;
  if (replaceId) {
    fs.unlinkSync(`uploads/${replaceId}`);
  }
  res.json({ success: true, file: req.file });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
