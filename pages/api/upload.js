import multiparty from 'multiparty';
import { v2 as cloudinary } from 'cloudinary';
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  console.log('length:', files.file.length);

  const links = [];
  for (const file of files.file) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
        folder: "your_folder_name", // Optional: You can specify a folder in Cloudinary
      });
      links.push(result.secure_url);
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({ error: "Error uploading to Cloudinary" });
    }
  }
  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
