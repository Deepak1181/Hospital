


import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const connectCloudinary = () => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.error("Cloudinary ENV variables are missing!");
        return;
    }

    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log(" Cloudinary Connected Successfully");
    } catch (error) {
        console.error(" Cloudinary Connection Error:", error);
    }
};

export default connectCloudinary;
