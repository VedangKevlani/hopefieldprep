import Newsletter from "../models/Newsletter.js"; // Mongoose model
import fs from "fs";
import path from "path";

// Get all newsletters
export async function getAllNewsletters(req, res) {
  try {
    const newsletters = await Newsletter.find().sort({ date: -1 });
    res.json(newsletters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch newsletters" });
  }
}

// Get latest newsletter
export async function getCurrentNewsletter(req, res) {
  try {
    const latest = await Newsletter.findOne().sort({ date: -1 });
    res.json(latest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch current newsletter" });
  }
}

// Upload newsletter PDF + metadata
export async function uploadNewsletter(req, res) {
  try {
    const { title, year, volume, date } = req.body;
    if (!req.file) return res.status(400).json({ error: "PDF file is required" });

    const newNewsletter = new Newsletter({
      title,
      year,
      volume,
      date,
      fileUrl: `/uploads/newsletters/${req.file.filename}`,
    });

    await newNewsletter.save();
    res.json({ message: "Newsletter uploaded", newsletter: newNewsletter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
}

// Update newsletter metadata
export async function updateNewsletter(req, res) {
  try {
    const { id } = req.params;
    const update = req.body;

    const updated = await Newsletter.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ error: "Newsletter not found" });

    res.json({ message: "Updated successfully", newsletter: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
}

// Delete newsletter
export async function deleteNewsletter(req, res) {
  try {
    const { id } = req.params;
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) return res.status(404).json({ error: "Newsletter not found" });

    // Remove file from disk
    const filePath = path.join("public", newsletter.fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await newsletter.deleteOne();
    res.json({ message: "Newsletter deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
}
