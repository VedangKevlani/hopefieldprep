import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import MulterStorageCloudinary from "multer-storage-cloudinary";

// Extract CloudinaryStorage from default CJS export
const { CloudinaryStorage } = MulterStorageCloudinary;

// Configure Cloudinary storage for PDFs
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hopefield-pdfs", // folder on Cloudinary
    resource_type: "raw", // PDFs are raw files
    format: () => "pdf", // force .pdf extension
    public_id: (req, file) => {
      const timestamp = Date.now();
      return `pdf-${timestamp}`;
    },
  },
});

// Multer upload instance
const parser = multer({ storage });

// Export correctly for ES Modules
export default parser;
