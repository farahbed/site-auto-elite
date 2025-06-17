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

  const { IncomingForm } = await import("formidable");
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error", err);
      return res.status(500).json({ error: err.message });
    }

    const images = files.images;
    if (!images) {
      return res.status(400).json({ error: "Aucune image reçue" });
    }

    const fileList = Array.isArray(images) ? images : [images];

    try {
      const uploads = await Promise.all(
        fileList.map((file) =>
          cloudinary.uploader.upload(file.filepath, {
            folder: "voitures",
            use_filename: true,
            unique_filename: false,
            resource_type: "image",
          })
        )
      );

      const urls = uploads.map((u) => u.secure_url);
      return res.status(200).json({ urls }); // << renvoie toutes les URLs dans un tableau
    } catch (uploadErr) {
      console.error("Cloudinary upload error:", uploadErr);
      return res.status(500).json({ error: uploadErr.message });
    }
  });
}