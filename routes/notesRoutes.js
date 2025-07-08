import express from "express";
import {
  showNewForm,
  listNotes,
  showEditForm,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

import * as notesController from "../controllers/notesController.js";

import { requireLogin } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/notes/new", requireLogin, showNewForm);

router.get("/notes", requireLogin, listNotes);

router.get("/notes/:id/edit", showEditForm);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);
router.post(
  "/notes",
  upload.single("image"),
  requireLogin,
  notesController.createNote
);

export default router;
