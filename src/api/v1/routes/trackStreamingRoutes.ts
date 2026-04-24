import express from "express";
import { streamTrack } from "../controllers/trackStreamingController";

const trackStreamingRouter: express.Router = express.Router();

trackStreamingRouter.get("/tracks/stream/:filename", streamTrack)

export default trackStreamingRouter