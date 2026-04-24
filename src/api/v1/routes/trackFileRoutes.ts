import express from "express";
import { upload } from "../middleware/uploads";
import { uploadTrackAudio } from "../controllers/trackFileController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const trackFileRouter: express.Router = express.Router();


trackFileRouter.post(
  "/tracks/audio", authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  upload, uploadTrackAudio
);

export default trackFileRouter;
