// pages/api/upload.js
import { v2 as cloudinary } from "cloudinary";
export const config = { api: { bodyParser: false } };
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method!=="POST") {
    res.setHeader("Allow","POST");
    return res.status(405).end("Method Not Allowed");
  }
  const { IncomingForm } = await import("formidable");
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });
    const images = files.images;
    if (!images)  return res.status(400).json({ error: "Aucune image reçue" });
    const list = Array.isArray(images) ? images : [images];
    try {
      const ups = await Promise.all(
        list.map(f=>cloudinary.uploader.upload(f.filepath, {
          folder: "voitures",
          use_filename: true,
          unique_filename:false,
          resource_type:"image"
        }))
      );
      // on renvoie toutes les URLs
      return res.status(200).json({ urls: ups.map(u=>u.secure_url) });
    } catch(uErr){
      return res.status(500).json({ error: uErr.message });
    }
  });
}