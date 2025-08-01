// -------------------------
// Auth Controller
// Handles user login, logout, and registration
// Thought process:
// - I wanted the user flow to feel smooth, so I log people in automatically after registration.
// - Used EJS views to make it beginner-friendly and easy to edit visually.
// - Password hashing is done automatically in the model (see User.js)
// -------------------------

// -------------------------
// Import the User model
// -------------------------
import User from "../models/User.js";

// -------------------------
// Display the Register Form (GET /register)
// This renders the EJS page with an empty message by default
// -------------------------
export function showRegisterForm(req, res) {
  res.render("auth/register", { message: null });
}

// -------------------------
// Handle Register Form Submission (POST /register)
// This function handles:
// 1. Checking if the username already exists
// 2. Creating a new user (with password hashed in model)
// 3. Logging them in automatically after signup
// -------------------------
export async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    // Check if a user with the same username already exists
    const existing = await User.findOne({ username });
    if (existing) {
      return res.render("auth/register", { message: "Username already taken" });
    }

    //If not, create and save the new user
    const user = new User({ username, password });
    await user.save();

    //log them in by creating a session
    req.session.userId = user._id;

    // Redirect to notes dashboard with a message
    res.redirect("/notes?message= Registered and logged in!");
  } catch (err) {
    console.error("Registration error:", err);
    res.render("auth/register", { message: "Something went wrong" });
  }
}

// -------------------------
// Display the Login Form (GET /login)
// Same as register form, shows empty page with message area
// -------------------------
export function showLoginForm(req, res) {
  res.render("auth/login", { message: null });
}

// -------------------------
// Handle Login Form Submission (POST /login)
// This function handles:
// 1. Checking if the user exists
// 2. Verifying the password (using custom method on model)
// 3. Creating a session if login is successful
// -------------------------
export async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    //Find user by username
    const user = await User.findOne({ username });

    //If no user or invalid password, re-render with message
    if (!user || !(await user.isValidPassword(password))) {
      return res.render("auth/login", { message: "Invalid credentials" });
    }
    //Save user Id in session to keep them logged in
    req.session.userId = user._id;

    //Redirect to main notes page with flash message
    res.redirect("/notes?message= Logged in!");
  } catch (err) {
    console.error("login error:", err);
    res.render("auth/login", { message: " Something went wrong" });
  }
}

// -------------------------
// Log the user out (POST /logout)
// This function destroys their session and redirects
// I chose to redirect to the GitHub-hosted homepage after logout
// -------------------------
export function logoutUser(req, res) {
  console.log("Logout route hit");
  req.session.destroy(() => {
    res.redirect("https://rachelkennedy09.github.io/RockyMountainTails/");
  });
}
