import express from "express";
import multer from 'multer'

import { upload } from "../middleware/uploads";

const trackFileRouter: express.Router = express.Router();


trackFileRouter.post(
  "/tracks/:id/audio",
  upload.single("audio"), uploadTrackAudio
);




export default trackFileRouter;