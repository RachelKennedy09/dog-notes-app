import express from "express";
import { createTestNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/notes/test", createTestNote);

export default router;
