const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAllNewsletters,
  getCurrentNewsletter,
  uploadNewsletter,
  updateNewsletter,
  deleteNewsletter,
} = require("../controllers/newsletterController");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/newsletters"),
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getAllNewsletters);
router.get("/current", getCurrentNewsletter);
router.post("/upload", upload.single("pdf"), uploadNewsletter);
router.put("/:id", updateNewsletter);
router.delete("/:id", deleteNewsletter);

module.exports = router;

