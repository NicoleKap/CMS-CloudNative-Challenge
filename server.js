const express = require("express"); // It grabs Express module so we can use it
const app = express(); // Now the app is an Express Application
const mongoose = require("mongoose"); // CMS connection to a MongoDB
const dotenv = require("dotenv");
const authRoutes = require("./public/routes/authRoutes"); // Routes for authentication
const articleRoutes = require("./public/routes/articleRoutes");
const uploadRoutes = require("./public/routes/uploadRoutes");
const cors = require("cors");
app.use(cors());

dotenv.config({ path: "./config.env" }); // Variables Uploading

// DB Connection
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)

  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

const port = 3000; // The port in which the server is running

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api", uploadRoutes);
app.use("/uploads", express.static("public/uploads"));

// Message to the client
app.get("/", (req, res) => {
  res.send("Welcome to This Article Management");
});
// We pick a port for our app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
