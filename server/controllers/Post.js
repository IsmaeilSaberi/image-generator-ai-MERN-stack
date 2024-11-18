import Post from "../models/Post.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// cloudinary.config({
//   cloud_name: "",
//   api_key: "",
//   api_secret: "<your_api_secret>", // Click 'View API Keys' above to copy your API secret
// });
