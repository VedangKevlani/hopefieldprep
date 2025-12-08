import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import fs from "fs";
import path from "path";

const router = express.Router();

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

// Configure CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hopefield-pdfs",
    resource_type: "raw", // PDFs are raw files
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

  // Also provide a list form for frontends that expect an array
  const list = [
    { name: "applicationForm", url: data.applicationForm || "" },
    { name: "handbook", url: data.handbook || "" },
    { name: "magazine", url: data.magazine || "" },
  ];

  res.json({ ...data, list });
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
  data[category] = req.file.path; // Cloudinary URL
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
