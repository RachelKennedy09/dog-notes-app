import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  weather: String,
  incidents: String,
  poop: Boolean,
  other: String,
  walker: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
