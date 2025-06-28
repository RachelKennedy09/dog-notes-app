import express from "express";
import {
  showRegisterForm,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/register", showRegisterForm); //show form
router.post("/register", registerUser); //handle submission

export default router;
