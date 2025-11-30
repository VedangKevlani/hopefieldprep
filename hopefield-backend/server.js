import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://hopefieldprep.vercel.app", // replace with Vercel frontend URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // optional


// Replace this with your hashed password (see below)
const ADMIN_HASH = "$2b$10$JusM0cBR41D2lOv8e/fhdOgwJJZ74E2oqs6FRElIX.Tw4iDWBMlnW"; // example hashed password

app.post("/api/admin/login", async (req, res) => {
  const { password } = req.body;
  if (!password) return res.json({ success: false });

  try {
    const match = await bcrypt.compare(password, ADMIN_HASH);
    res.json({ success: match });
  } catch {
    res.json({ success: false });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
