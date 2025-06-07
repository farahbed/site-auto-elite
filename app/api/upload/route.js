// app/api/upload/route.js

import { NextResponse } from "next/server";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

// on force Node.js, pas Edge
export const runtime = "nodejs";

// Désactive le bodyParser interne de Next
export const config = {
  api: { bodyParser: false }
};

// configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// wrapper pour formidable.parse
function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(request) {
  let parsed;
  try {
    parsed = await parseForm(request);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  const photos = parsed.files.photos;
  const list   = Array.isArray(photos) ? photos : [photos];

  try {
    const uploads = await Promise.all(
      list.map(f =>
        cloudinary.uploader.upload(f.filepath, {
          folder: "voitures",
          use_filename: true,
          unique_filename: false,
          resource_type: "image",
        })
      )
    );
    const urls = uploads.map(u => u.secure_url);
    return NextResponse.json({ urls });
  } catch (uploadErr) {
    console.error("Cloudinary upload error:", uploadErr);
    return NextResponse.json({ error: uploadErr.message }, { status: 500 });
  }
}