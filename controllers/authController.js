import User from "../models/User.js";

export function showRegisterForm(req, res) {
  res.render("auth/register", { message: null });
}

export async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.render("auth/register", { message: "Username already taken" });
    }
    const user = new User({ username, password });
    await user.save();

    //log them in
    req.session.userId = user._id;
    res.redirect("/notes?message= Registered and logged in!");
  } catch (err) {
    console.error(" Registration error:", err);
    res.render("auth/register", { message: "Something went wrong" });
  }
}

//login controller functions

export function showLoginForm(req, res) {
  res.render("auth/login", { message: null });
}

export async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.isValidPassword(password))) {
      return res.render("auth/login", { message: "Invalid credentials" });
    }

    req.session.userId = user._id;
    res.redirect("/notes?message= Logged in!");
  } catch (err) {
    console.error("login error:", err);
    res.render("auth/login", { message: " Something went wrong" });
  }
}

export function logoutUser(req, res) {
  req.session.destroy(() => {
    res.redirect(
      "http://127.0.0.1:5500/projects/DogWalking_Finderapp/main.html"
    );
  });
}
