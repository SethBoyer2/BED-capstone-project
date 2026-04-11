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

const loanRouter: express.Router = express.Router();

loanRouter.post(
    "/tracks",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    createTrack
);

loanRouter.get("/tracks", getAllTracks);

loanRouter.get("/loans/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager", "user"] }), getTrackById);

loanRouter.put(
    "/tracks/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    updateTrack
);

loanRouter.delete(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    deleteTrack
);

export default loanRouter;