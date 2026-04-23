import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { uploadTrackAudioService } from "../services/trackFileService";
import { successResponse } from "../models/responseModel";

export const uploadTrackAudio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = uploadTrackAudioService({
    file: req.file as Express.Multer.File,
  })
   res
      .status(HTTP_STATUS.CREATED)
      .json(
        successResponse(result, "Track uploaded successfully!"),
      );
  } catch (error) {
    next(error);
  }
};


