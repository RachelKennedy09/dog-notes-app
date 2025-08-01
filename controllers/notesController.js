/*
  -------------------------------------------
  Note Controller — Handles dog walk reports
  -------------------------------------------
  This file contains all the logic for creating, listing, editing, and deleting notes.
  I chose to organize it into separate named exports for each route handler.
  I used Mongoose for interacting with the database and kept validation in the model.
  Each note is tied to a user via session authentication.
*/

// -------------------------
// Import the Note model
// -------------------------
import Note from "../models/Note.js";

/*
  ========================
  CREATE NOTE
  ========================
  - This function handles form submissions to add a new dog walk note.
  - I manually convert checkbox values to true/false (since unchecked checkboxes don’t get sent).
  - Then I attach the logged-in user ID from the session to track who created the note.
*/
export async function createNote(req, res) {
  try {
    // Convert checkbox values to Boolean manually
    req.body.poop = req.body.poop === "on";

    const note = new Note(req.body);
    note.user = req.session.userId; //associate note with logged-in user
    await note.save();

    req.flash("success", "Note saved successfully!");
    res.redirect("/notes");
  } catch (err) {
    console.log("Error saving note:", err.message);

    //If validation fails, collect all error messages and show them
    if (err.name === "ValidationError") {
      let messages = Object.values(err.errors).map((e) => e.message);
      req.flash("error", messages.join(" "));
    } else {
      req.flash("error", "Something went wrong.");
    }
    res.redirect("/notes/new");
  }
}

/*
  ========================
  RENDER NEW NOTE FORM
  ========================
  - Renders the EJS page where users can add a new dog walk report.
*/
export function showNewForm(req, res) {
  res.render("notes/new", { message: null });
}

/*
  ========================
  LIST ALL NOTES
  ========================
  - Fetch all notes that belong to the logged-in user.
  - Sort by most recent (descending by date).
  - If there's a message (like after update or delete), pass it to the view.
*/
export async function listNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.session.userId }).sort({
      date: -1,
    }); //most recent first
    const message = req.query.message || null; //capture message
    res.render("notes/index", { notes, message });
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).send("Error loading notes");
  }
}

/*
  ========================
  SHOW EDIT FORM
  ========================
  - This shows the pre-filled form for editing a note.
  - I fetch the note by its ID and render it in the edit template.
*/
export async function showEditForm(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    res.render("notes/edit", { note });
  } catch (err) {
    res.status(404).send("Note not found");
  }
}

/*
  ========================
  UPDATE A NOTE
  ========================
  - When the edit form is submitted, this function saves the updated info.
  - I manually convert the poop checkbox again.
  - Only the editable fields are updated.
*/
export async function updateNote(req, res) {
  try {
    const { weather, incidents, other, walker } = req.body;
    const poop = req.body.poop === "on";

    await Note.findByIdAndUpdate(req.params.id, {
      weather,
      incidents,
      poop,
      other,
      walker,
    });

    res.redirect("/notes?message=Note+updated+successfully!");
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).send("Error updating note");
  }
}

/*
  ========================
  DELETE A NOTE
  ========================
  - This function deletes the selected note from the database.
  - After deletion, the user is redirected back with a flash message.
*/
export async function deleteNote(req, res) {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/notes?message=Note+deleted+successfully!");
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).send("Error deleting note");
  }
}
