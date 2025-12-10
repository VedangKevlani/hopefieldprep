import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllNewsletters,
  getCurrentNewsletter,
  uploadNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from "../controllers/newsletterController.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/newsletters"),
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  },
});

const upload = multer({ storage });

// API Endpoints
router.get("/", getAllNewsletters);
router.get("/current", getCurrentNewsletter);
router.post("/upload", upload.single("pdf"), uploadNewsletter);
router.put("/:id", updateNewsletter);
router.delete("/:id", deleteNewsletter);

export default router;
