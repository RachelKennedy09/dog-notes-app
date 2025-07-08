import express from "express";
import {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/register", showRegisterForm); //show form
router.post("/register", registerUser); //handle submission

//login routes
router.get("/login", showLoginForm);
router.post("/login", loginUser);

//logout route

router.post("/logout", (req, res) => {
  console.log("Logout route hit");
  req.session.destroy(() => {
    res.redirect(
      "http://127.0.0.1:5500/projects/DogWalking_Finderapp/main.html"
    );
  });
});

export default router;
