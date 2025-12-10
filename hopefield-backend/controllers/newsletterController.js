const Newsletter = require("../models/Newsletter");
const path = require("path");
const fs = require("fs");

// GET /api/newsletters
const getAllNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ date: -1 });
    res.json(newsletters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/newsletters/current
const getCurrentNewsletter = async (req, res) => {
  try {
    const latest = await Newsletter.findOne().sort({ date: -1 });
    res.json(latest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/newsletters/upload
const uploadNewsletter = async (req, res) => {
  try {
    const { title, description, date, year, volume } = req.body;
    if (!req.file) return res.status(400).json({ message: "PDF file required" });

    const fileUrl = `/uploads/newsletters/${req.file.filename}`;

    const newsletter = new Newsletter({
      title,
      description,
      date,
      year,
      volume,
      fileUrl,
    });

    await newsletter.save();
    res.status(201).json(newsletter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

// PUT /api/newsletters/:id
const updateNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Newsletter.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: "Newsletter not found" });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE /api/newsletters/:id
const deleteNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const newsletter = await Newsletter.findByIdAndDelete(id);
    if (!newsletter) return res.status(404).json({ message: "Newsletter not found" });

    // delete file from disk
    const filePath = path.join(__dirname, "../public", newsletter.fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  getAllNewsletters,
  getCurrentNewsletter,
  uploadNewsletter,
  updateNewsletter,
  deleteNewsletter,
};
