/*
  -------------------------------------------
  Auth Routes
  -------------------------------------------
  This file contains all routes related to user authentication.
  Includes:
  - GET/POST for user registration
  - GET/POST for login
  - POST for logout

  I chose to handle login from the homepage "/" so that users land there by default.
  All logic is passed to controller functions to keep things clean and testable.
*/


// -------------------------
// Import Express and the router object
// This helps us organize all authentication-related routes separately
// -------------------------
import express from "express";

// -------------------------
// Import controller functions from authController.js
// These handle the logic for registering, logging in, and logging out
// -------------------------
import {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

// -------------------------
// Create an instance of the Express Router
// -------------------------
const router = express.Router();


/*
  ========================
  REGISTER ROUTES
  ========================
*/

//Show the registration form 
router.get("/register", showRegisterForm); 

//Handle form submission to register a new user
router.post("/register", registerUser);


/*
  ========================
  LOGIN ROUTES
  ========================
*/

//Show the login form
// Note: I use "/" here as the default landing page, which renders login by default
router.get("/", showLoginForm);

//Handle login form submission
router.post("/login", loginUser);

/*
  ========================
  LOGOUT ROUTE
  ========================
*/

// Handle user logout
// This destroys the session and redirects to the homepage (public-facing site)
router.post("/logout", logoutUser);

// -------------------------
// Export the router so it can be used in server.js
// -------------------------
export default router;

