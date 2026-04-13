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

trackRouter.post(
  "/tracks",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  createTrack,
);

trackRouter.get("/tracks", getAllTracks);

trackRouter.get("/tracks/:id", getTrackById,);

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
