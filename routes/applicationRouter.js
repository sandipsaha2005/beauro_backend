// routes/applicationRouter.js
import express from "express";
import multer from "multer";
import { isAuthorized } from "../middlewares/auth.js";
import { submitApplication } from "../controllers/applicationController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for submitting an application
router.post("/submit", isAuthorized, submitApplication);

export default router;
