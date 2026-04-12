import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "habito_profiles" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res.status(500).json({ message: "Upload failed" });
        }

        res.json({ imageUrl: result.secure_url });
      }
    );

    stream.end(req.file.buffer);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;