import express from "express";
import {
  showNewForm,
  createNote,
  listNotes,
  showEditForm,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/notes/new", showNewForm);
router.post("/notes", createNote);
router.get("/notes", listNotes);

router.get("/notes/:id/edit", showEditForm);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

export default router;
