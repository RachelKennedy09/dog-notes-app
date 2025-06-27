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
