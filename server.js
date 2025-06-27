//Load environment variables from /env file
import dotenv from "dotenv";
dotenv.config();

//import Express framework
import express from "express";
const app = express();

//import mongoose to connect to MongoDB
import mongoose from "mongoose";

//import routes
import notesRoutes from "./routes/notesRoutes.js";

//Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", notesRoutes);

//Server static files from the 'public' folder (CSS, images, etc.)
app.use(express.static("public"));

//Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// TEMP test route
app.get("/", (req, res) => {
  res.send("Rocky Mountain Tails App is running!");
});

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
