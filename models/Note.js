// Import the mongoose library to define schemas and interact with MongoDB
import mongoose from "mongoose";

//Define schema for a "Note" document in the database
const noteSchema = new mongoose.Schema({
  //Field for describing the weather during the walk (e.g sunny, rainy)
  weather: {
    type: String,
    required: [true, "Please describe the weather."], //custom error message if not provided
  },

  // Field to describe any incidents during the walk (e.g., barking, pulling, other dogs)
  incidents: {
    type: String,
    required: [true, "Please inform of any or none incidents"], //custom error message if not provided
  },

  // Field to record whether the dog pooped (Boolean: true or false)
  poop: {
    type: Boolean,
    required: [true, "Please indicate if the dog pooped."], //custom error message if not provided
  },
  // Field for any additional notes (e.g., playtime, behavior, or write 'none')
  other: {
    type: String,
    required: [true, "Please add any extra notes( or write 'none')."], //custom error message if not provided
  },
  // Name of the walker writing the report
  walker: {
    type: String,
    required: [true, "Please specify your name."], //custom error message if not provided
  },

  // Date of the walk; defaults to current date/time if not provided
  date: {
    type: Date,
    default: Date.now,
  },
  // Reference to the user who submitted the note (links to a User model by ID)
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Create the Note model from the schema so we can use it in other parts of the app
const Note = mongoose.model("Note", noteSchema);

// Export the Note model so it can be used in controllers and routes
export default Note;
