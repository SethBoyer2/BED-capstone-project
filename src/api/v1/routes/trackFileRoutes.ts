import express from "express";
import multer from 'multer'

const upload = multer({ dest: 'media/upload'});

const trackFileRouter: express.Router = express.Router();


trackFileRouter.post(
  "/tracks/:id/audio",
  upload.single("audio"), uploadTrackAudio
);




export default trackFileRouter;