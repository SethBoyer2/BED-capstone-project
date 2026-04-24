import express from "express";
import { upload } from "../middleware/uploads";
import { uploadTrackAudio } from "../controllers/trackFileController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const trackFileRouter: express.Router = express.Router();

/**
 * @openapi
 * /tracks:
 *   post:
 *     summary: Create a new track
 *     tags: [Tracks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - req.file
 *             properties:
 *               req.file:
 *                   type: audio file
 *                   description: audio file to be uploaded
 *                   example: "song.mp3"
 *     responses:
 *       '201':
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
trackFileRouter.post(
  "/tracks/audio", authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  upload, uploadTrackAudio
);

export default trackFileRouter;
