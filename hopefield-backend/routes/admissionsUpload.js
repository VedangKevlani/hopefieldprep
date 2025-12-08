// routes/admissionsUpload.js
import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import MulterStorageCloudinary from "multer-storage-cloudinary";
import fs from "fs";
import path from "path";

const router = express.Router();

// Extract CloudinaryStorage
const { CloudinaryStorage } = MulterStorageCloudinary;

// Where we store category → URL mapping
const DATA_FILE = path.join(process.cwd(), "admissionsData.json");

// Load JSON or create it
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({
        applicationForm: "",
        handbook: "",
        magazine: "",
      })
    );
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hopefield-pdfs",
    resource_type: "raw",
    format: () => "pdf",
    public_id: (req) => {
      const timestamp = Date.now();
      return `${req.body.category}-${timestamp}`;
    },
  },
});

const upload = multer({ storage });

/* ------------------------------
    GET — return stored URLs
--------------------------------*/
router.get("/pdfs", (req, res) => {
  const data = loadData();

  const formatted = Object.entries(data).map(([category, url]) => ({
    name: category,
    url: url,
  }));

  res.json(formatted);
});


/* ------------------------------
    POST — upload & assign category
--------------------------------*/
router.post("/pdfs/upload", upload.single("pdf"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: "No file uploaded" });

  const { category } = req.body;

  if (!category)
    return res.status(400).json({ success: false, message: "Category missing" });

  const data = loadData();

  // Save Cloudinary URL under category
  data[category] = req.file.path;
  saveData(data);

  return res.json({
    success: true,
    fileUrl: req.file.path,
  });
});

/* ------------------------------
    DELETE — remove category PDF
--------------------------------*/
router.delete("/pdfs", (req, res) => {
  const { category } = req.body;

  if (!category)
    return res.status(400).json({ success: false, message: "Category missing" });

  const data = loadData();
  data[category] = "";
  saveData(data);

  return res.json({ success: true });
});

export default router;
