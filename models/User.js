// Import mongoose to define schemas and interact with MongoDB
import mongoose from "mongoose";

// Import bcrypt to securely hash and compare passwords
import bcrypt from "bcrypt";

// ========================
// 1️ Define the User Schema
// ========================
const userSchema = new mongoose.Schema({
  // Username must be a unique string and is required
  username: { type: String, required: true, unique: true },

  // Password is required (will be hashed before saving)
  password: { type: String, required: true },
});

// ==========================================
// 2️ Pre-save Middleware: Hash Passwords
// ==========================================
// Before saving a user to the database, this function runs automatically.
// If the password field has been modified (e.g. new user or password change),
// it hashes the password using bcrypt (with 10 salt rounds) before storing it.
userSchema.pre("save", async function (next) {
  // Skip hashing if password hasn't changed
  if (!this.isModified("password")) return next();

  // Replace the plain-text password with a hashed version
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ==================================================
// 3️ Custom Method to Compare Passwords on Login
// ==================================================
// Adds a method called 'isValidPassword' to the user instance.
// When logging in, this checks if the entered password matches the hashed one.
userSchema.methods.isValidPassword = async function (password) {
  // Compare plain password input to the hashed password stored in the DB
  return await bcrypt.compare(password, this.password);
};

// ======================================
// 4️ Create and Export the User Model
// ======================================
// The User model allows us to create, read, update, and delete users in MongoDB
const User = mongoose.model("User", userSchema);

// Make the User model available to import in other files
export default User;
