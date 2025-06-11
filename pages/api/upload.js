// pages/api/upload.js

import { v2 as cloudinary } from "cloudinary";

export const config = { api: { bodyParser: false } };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  // Import dynamique de formidable (important sur Vercel/Next.js 14)
  const { IncomingForm } = await import("formidable");
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error", err);
      return res.status(500).json({ error: err.message });
    }

    // Les fichiers doivent être dans files.images (même si 1 seul)
    let images = files.images;
    if (!images) {
      return res.status(400).json({ error: "Aucune image reçue" });
    }
    // Toujours travailler sur un tableau
    const fileList = Array.isArray(images) ? images : [images];

    try {
      const uploads = await Promise.all(
        fileList.map((f) =>
          cloudinary.uploader.upload(f.filepath, {
            folder: "voitures",
            use_filename: true,
            unique_filename: false,
            resource_type: "image",
          })
        )
      );
      const urls = uploads.map((u) => u.secure_url);
      return res.status(200).json({ urls });
    } catch (uploadErr) {
      console.error("Cloudinary upload error:", uploadErr);
      return res.status(500).json({ error: uploadErr.message });
    }
  });
}