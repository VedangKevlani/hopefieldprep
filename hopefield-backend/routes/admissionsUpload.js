import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

// Set up Cloudinary storage for PDFs
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hopefield-pdfs",        // optional folder in Cloudinary
    resource_type: "raw",            // 'raw' for PDFs
    format: async (req, file) => "pdf", // enforce pdf extension
  },
});

const parser = multer({ storage });

router.post("/upload", parser.single("pdf"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

  // req.file.path contains the public Cloudinary URL
  res.json({ success: true, fileUrl: req.file.path });
});

export default router;
