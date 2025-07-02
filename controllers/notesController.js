import Note from "../models/Note.js";

//Save a new dog walking note
export async function createNote(req, res) {
  try {
    const note = new Note(req.body);
    note.user = req.session.userId; // if using login
    await note.save();
    req.flash("success", "Note saved successfully!");
    res.redirect("/notes");
  } catch (err) {
    console.log("Error saving note:", err.message);
    // If validation failed
    if (err.name === "ValidationError") {
      let messages = Object.values(err.errors).map((e) => e.message);
      req.flash("error", messages.join(" "));
    } else {
      req.flash("error", "Something went wrong.");
    }
    res.redirect("/notes/new");
  }
}

//Rendering new note form
export function showNewForm(req, res) {
  res.render("notes/new", { message: null });
}

//Fetch notes
export async function listNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.session.userId }).sort({
      date: -1,
    }); //most recent first
    const message = req.query.message || null; //capture message
    res.render("notes/index", { notes, message });
  } catch (err) {
    console.error(" Error fetching notes:", err);
    res.status(500).send("Error loading notes");
  }
}

//Edit Form
export async function showEditForm(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    res.render("notes/edit", { note });
  } catch (err) {
    res.status(404).send("Note not found");
  }
}

//update note
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

//delete note

export async function deleteNote(req, res) {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/notes?message=Note+deleted+successfully!");
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).send("Error deleting note");
  }
}
