/*
  -------------------------------------------
  Notes Routes
  -------------------------------------------
  These routes handle everything related to dog walking notes.
  I used Express Router to keep the app organized, and each route
  points to a specific controller function (CRUD).
  All routes are protected with requireLogin to ensure only 
  authenticated users can access them.
*/


// -------------------------
// Import Express so we can use the Router feature
// This lets us organize our note-related routes in a separate file
// -------------------------
import express from "express";

// -------------------------
// Import all the controller functions that handle the logic
// These are imported from notesController.js and map to each route
// -------------------------
import {
  showNewForm,
  listNotes,
  showEditForm,
  updateNote,
  deleteNote,
  createNote,
} from "../controllers/notesController.js";

// -------------------------
// Middleware to protect routes
// requireLogin ensures only logged-in users can access these routes
// -------------------------
import { requireLogin } from "../middleware/auth.js";

// -------------------------
// Initialize the router object
// This is where we define all the note-related routes
// -------------------------
const router = express.Router();

/*
  ========================
  Routes for Notes
  ========================
*/

// Show the form to create a new note
router.get("/notes/new", requireLogin, showNewForm);

// Display a list of notes for the logged-in user
router.get("/notes", requireLogin, listNotes);

// Handle the form submission to create a new note
router.post("/notes", requireLogin, createNote);

// Show the edit form for a specific note by ID
router.get("/notes/:id/edit", requireLogin, showEditForm);

// Handle the form submission to update a note
router.put("/notes/:id", requireLogin, updateNote);

// Handle deleting a note
router.delete("/notes/:id", requireLogin, deleteNote);

// -------------------------
// Export the router so it can be mounted in server.js
// -------------------------
export default router;
