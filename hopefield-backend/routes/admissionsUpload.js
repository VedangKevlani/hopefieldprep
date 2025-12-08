// routes/admissionsUpload.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// JSON data file to track uploaded PDFs
const DATA_FILE = path.join(process.cwd(), "admissionsData.json");

// Load JSON or create default
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({
        applicationForm: "",
        handbook: "",
        magazine: "",
      }, null, 2)
    );
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Multer setup for local PDF uploads
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const timestamp = Date.now();
    cb(null, `${file.fieldname}-${timestamp}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"));
  },
});

// GET all PDFs
router.get("/pdfs", (_req, res) => {
  res.json(loadData());
});

// POST upload PDF
router.post("/pdfs/upload", upload.single("pdf"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

  const { category } = req.body;
  if (!category) return res.status(400).json({ success: false, message: "Category missing" });

  const data = loadData();
  data[category] = `/uploads/${req.file.filename}`;
  saveData(data);

  res.json({ success: true, fileUrl: data[category] });
});

// DELETE PDF
router.delete("/pdfs", (req, res) => {
  const { category } = req.body;
  if (!category) return res.status(400).json({ success: false, message: "Category missing" });

  const data = loadData();
  if (data[category]) {
    const filePath = path.join(process.cwd(), "public", data[category]);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  data[category] = "";
  saveData(data);

  res.json({ success: true });
});

export default router;
