// hopefield-backend/controllers/newsletterController.js
import Newsletter from "../models/Newsletter.js"; // default export
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// ================================
// Helper to build file path
// ================================
const getFilePath = (fileUrl) => path.join("public", fileUrl);

// ================================
// Get all newsletters
// ================================
export async function getAllNewsletters(req, res) {
  try {
    const newsletters = await Newsletter.find().sort({ date: -1 });
    res.json(newsletters);
  } catch (err) {
    console.error("Error fetching newsletters:", err);
    res.status(500).json({ error: "Failed to fetch newsletters" });
  }
}

// ================================
// Get latest newsletter
// ================================
export async function getCurrentNewsletter(req, res) {
  try {
    const latest = await Newsletter.findOne().sort({ date: -1 });
    res.json(latest || null);
  } catch (err) {
    console.error("Error fetching current newsletter:", err);
    res.status(500).json({ error: "Failed to fetch current newsletter" });
  }
}

// ================================
// Upload newsletter PDF + metadata
// ================================
export async function uploadNewsletter(req, res) {
  try {
    const { title, year, volume, date } = req.body;

    // Validate required fields
    if (!title || !year || !date) {
      return res.status(400).json({ error: "Title, year, and date are required" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required" });
    }

    const newNewsletter = new Newsletter({
      title,
      year,
      volume,
      date: new Date(date),
      fileUrl: `/uploads/newsletters/${req.file.filename}`,
    });

    await newNewsletter.save();
    res.json({ message: "Newsletter uploaded", newsletter: newNewsletter });
  } catch (err) {
    console.error("Upload newsletter error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
}

// ================================
// Update newsletter metadata
// ================================
export async function updateNewsletter(req, res) {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid newsletter ID" });
    }

    const { title, year, volume, date, fileUrl } = req.body;

    const update = {};
    if (title) update.title = title;
    if (year) update.year = year;
    if (volume) update.volume = volume;
    if (date) update.date = new Date(date);
    if (fileUrl) update.fileUrl = fileUrl;

    const updated = await Newsletter.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ error: "Newsletter not found" });

    res.json({ message: "Updated successfully", newsletter: updated });
  } catch (err) {
    console.error("Update newsletter error:", err);
    res.status(500).json({ error: "Update failed" });
  }
}

// ================================
// Delete newsletter
// ================================
export async function deleteNewsletter(req, res) {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid newsletter ID" });
    }

    const newsletter = await Newsletter.findById(id);
    if (!newsletter) return res.status(404).json({ error: "Newsletter not found" });

    // Remove file from disk
    if (newsletter.fileUrl) {
      const filePath = getFilePath(newsletter.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await newsletter.deleteOne();
    res.json({ message: "Newsletter deleted" });
  } catch (err) {
    console.error("Delete newsletter error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
}
