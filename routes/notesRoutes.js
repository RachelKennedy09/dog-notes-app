import express from "express";
import {
  showNewForm,
  createNote,
  listNotes,
  showEditForm,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

import { requireLogin } from "../middleware/auth.js";

const router = express.Router();

router.get("/notes/new", requireLogin, showNewForm);
router.post("/notes", requireLogin, createNote);
router.get("/notes", requireLogin, listNotes);

router.get("/notes/:id/edit", showEditForm);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

export default router;
