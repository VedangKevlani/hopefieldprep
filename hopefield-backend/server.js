import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import eventRoutes from "./routes/events.js";
import staffRoutes from "./routes/staff.js";
import staffUpload from "./routes/staffUpload.js";
import staffUploadRoute from "./routes/staffUpload.js";
import { seedStaff } from "./utils/seedStaff.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/staff", staffRoutes);
app.use(express.static("public"));
// Serve uploads folder
app.use("/uploads", express.static(path.join("public/uploads")));
app.use("/api/staff", staffUpload);
app.use("/api/staff/upload", staffUploadRoute);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI is missing in environment variables!");
  process.exit(1); // stop the server if no URI
}

mongoose
  .connect(process.env.MONGO_URI) // use one env variable
  .then(() => {
    console.log("MongoDB connected");
    seedStaff(); // Seed staff on startup
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Admin login route remains the same
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

// Event routes
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
