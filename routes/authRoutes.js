import express from "express";
import {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/register", showRegisterForm); //show form
router.post("/register", registerUser); //handle submission

//login routes
router.get("/login", showLoginForm);
router.post("/login", loginUser);

//logout route
router.post("/logout", logoutUser);

export default router;
