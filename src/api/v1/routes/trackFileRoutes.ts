import express from "express";
import multer from 'multer'

import { upload } from "../middleware/uploads";
import { uploadTrackAudio } from "../controllers/trackFileController";

const trackFileRouter: express.Router = express.Router();


trackFileRouter.post(
  "/tracks/audio",
  upload, uploadTrackAudio
);

export default trackFileRouter;
