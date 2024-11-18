import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({ success: false, status, message });
});

// Default get
app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello AI saas developers!" });
});

// function to connect to mongodb
const connetToMongoDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => {
      console.error("Failed to connect to DB!");
      console.log(err);
    });
};

// function to start the server
const startServer = async () => {
  try {
    connetToMongoDB();
    app.listen(8080, () => console.log("Server is running on port 8080"));
  } catch (error) {
    console.log(error);
    c;
  }
};

startServer();
