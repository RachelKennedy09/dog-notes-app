import express from "express";
import {
  showNewForm,
  listNotes,
  showEditForm,
  updateNote,
  deleteNote,
  createNote,
} from "../controllers/notesController.js";

import { requireLogin } from "../middleware/auth.js";

const router = express.Router();

router.get("/notes/new", requireLogin, showNewForm);
router.get("/notes", requireLogin, listNotes);
router.post("/notes", requireLogin, createNote);
router.get("/notes/:id/edit", requireLogin, showEditForm);
router.put("/notes/:id", requireLogin, updateNote);
router.delete("/notes/:id", requireLogin, deleteNote);


export default router;
