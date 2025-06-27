import express from "express";
import { showNewForm, createNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/notes/new", showNewForm);
router.post("/notes", createNote);

export default router;
