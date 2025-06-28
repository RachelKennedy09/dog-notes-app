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
