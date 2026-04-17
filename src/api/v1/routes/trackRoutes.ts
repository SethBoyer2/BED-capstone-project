import express from "express";
import {
  getAllTracks,
  createTrack,
  getTrackById,
  deleteTrack,
  updateTrack,
} from "../controllers/trackController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";


const trackRouter: express.Router = express.Router();

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
 *               - album
 *               - artist
 *               - title
 *               - length
 *             properties:
 *               album:
 *                   type: string
 *                   description: The name of the album
 *                   example: "Hit Vibes"
 *               artist:
 *                   type: string
 *                   description: The artist that created the album/track
 *                   example: "Saint Pepsi"
 *               title:
 *                   type: string
 *                   description: The title of the track
 *                   example: "Enjoy Yourself"
 *               length:
 *                   type: string
 *                   description: The length of the track
 *                   example: "3:14"
 *     responses:
 *       '201':
 *         description: Track created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Track'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
trackRouter.post(
  "/tracks",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  createTrack,
);



/**
 * @openapi
 * /tracks:
 *   get:
 *     summary: Retrieve a list of all uploaded tracks
 *     tags: [Tracks]
 *     responses:
 *       '200':
 *         description: Successfully retrieved tracks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tracks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Track'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
trackRouter.get("/tracks", getAllTracks);

/**
 * @openapi
 * /tracks/:id:
 *   get:
 *     summary: display specific track based on ID
 *     tags: [Tracks]
 *     parameters:
 *       - id: string
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the track
 *     responses:
 *       '200':
 *         description: successfully retrieved track(s)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Track'
 *       '404':
 *         description: Track not found
 *       '403':
 *         description: Not authorized to update this track
 */
trackRouter.get("/tracks/:id", getTrackById);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update a specific tracks metadata
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the event
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Updated track date
 *               status:
 *                 type: string
 *                 enum: [Active, Cancelled, Completed]
 *                 description: Updated track status
 *               capacity:
 *                 type: number
 *                 description: Updated capacity
 *     responses:
 *       '201':
 *         description: track updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Track'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
trackRouter.put(
  "/tracks/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
  updateTrack,
);

trackRouter.delete(
  "/tracks/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  deleteTrack,
);

export default trackRouter;
