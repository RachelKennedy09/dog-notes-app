import Note from "../models/Note.js";

//Save a new dog walking note
export async function createNote(req, res) {
  try {
    console.log("Form submitted:", req.body);
    const { weather, incidents, other, walker } = req.body;

    const poop = req.body.poop === "on";

    const newNote = new Note({
      weather,
      incidents,
      poop,
      other,
      walker,
    });

    await newNote.save();
    res.render("notes/new", { message: " Note submitted successfully!" });
  } catch (err) {
    console.error(" Error saving note:", err);
    res.render("notes/new", { message: " Error saving note." });
  }
}

//Rendering new note form
export function showNewForm(req, res) {
  res.render("notes/new", { message: null });
}

//Fetch notes
export async function listNotes(req, res) {
  try {
    const notes = await Note.find().sort({ date: -1 }); //most recent first
    res.render("notes/index", { notes });
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
    res.redirect("/notes");
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).send("Error updating note");
  }
}

//delete note

export async function deleteNote(req, res) {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/notes");
  } catch (err) {
    res.status(500).send("Error deleting note");
  }
}
