import Note from "../models/Note.js";

export async function createTestNote(req, res) {
  try {
    const note = new Note({
      weather: "Sunny",
      incidents: "Barked at a squirrel",
      poop: true,
      other: "Did great on leash",
      walker: "Rachel",
    });

    await note.save();

    res.send("✅ Test note saved to MongoDB!");
  } catch (err) {
    console.error("❌ Error saving note:", err);
    res.status(500).send("Error saving test note.");
  }
}
