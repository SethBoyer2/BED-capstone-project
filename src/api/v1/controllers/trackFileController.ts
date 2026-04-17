import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "src/constants/httpConstants";
import { errorResponse, successResponse } from "../models/responseModel";
import { trackFileService } from "../services/trackFileService";

export const uploadTrackAudio = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res
    .status(HTTP_STATUS.BAD_REQUEST)
    .json(errorResponse("Failure:", "No valid audio file was found."))
  }
  await trackFileService
}