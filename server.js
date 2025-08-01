// -------------------------
// Load environment variables from .env file
// This keeps sensitive data (like my MongoDB URI) private
// -------------------------
import dotenv from "dotenv";
dotenv.config();

// -------------------------
// Import Express (main web server framework)
// Handles routes, middleware, HTTP methods
// -------------------------
import express from "express";
const app = express();

// -------------------------
// Import Mongoose to connect to MongoDB
// -------------------------
import mongoose from "mongoose";

// -------------------------
// Set up EJS as the view engine
// This lets me create dynamic HTML pages using JS logic inside .ejs files
// -------------------------
app.set("view engine", "ejs");

// -------------------------
// Allow HTTP methods like PUT & DELETE via forms
// (HTML forms don’t support these, so we override them using a query param like ?_method=DELETE)
// -------------------------
import methodOverride from "method-override";
app.use(methodOverride("_method"));

// -------------------------
// Set up session storage and flash messages
// Sessions help keep users logged in between pages
// Flash messages are used to show errors or success messages
// -------------------------
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// -------------------------
// Enable flash messages for one-time success/error notifications
// -------------------------
app.use(flash());

// -------------------------
// Make flash messages and current user accessible in all EJS views
// This avoids having to pass them manually into every render()
// -------------------------
import User from "./models/User.js";

app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      res.locals.currentUser = user?.username || null; //pass username to all EJS views
    } catch {
      res.locals.currentUser = null;
    }
  } else {
    res.locals.currentUser = null;
  }

  // Also attach flash messages
  res.locals.messages = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
});

// -------------------------
// Import Routes
// These route files handle all auth logic and note CRUD actions
// -------------------------
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// -------------------------
// Middleware for reading form data and JSON
// -------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -------------------------
// Route mounting
// These get applied to every request that starts with `/`
// -------------------------
app.use("/", notesRoutes);
app.use("/", authRoutes);

// -------------------------
// Serve static files like stylesheets or images from the /public folder
// -------------------------
app.use(express.static("public"));

// -------------------------
// Connect to MongoDB
// This connects to the database using credentials from .env
// -------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// -------------------------
// Start the server on localhost:3000
// -------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
