import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import MulterStorageCloudinary from "multer-storage-cloudinary";

const { CloudinaryStorage } = MulterStorageCloudinary;

// Set up Cloudinary storage for PDFs
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hopefield-pdfs", // optional folder in Cloudinary
    resource_type: "raw",     // 'raw' for PDFs
    format: async (req, file) => "pdf", // enforce pdf extension
  },
});

const parser = multer({ storage });
