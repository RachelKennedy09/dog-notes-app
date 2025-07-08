import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  weather: {
    type: String,
    required: [true, "Please describe the weather."],
  },

  incidents: { type: String, required: [true, "Please describe the weather."] },
  poop: {
    type: Boolean,
    required: [true, "Please indicate if the dog pooped."],
  },
  other: {
    type: String,
    required: [true, "Please add any extra notes( or write 'none')."],
  },
  walker: {
    type: String,
    required: [true, "Please specify your name."],
  },
  image: String,
  date: {
    type: Date,
    default: Date.now,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
