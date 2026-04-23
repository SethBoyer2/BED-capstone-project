import { Request, Response, NextFunction } from "express";
import {
  TrackMetadataInput,
  TrackMetadataBuild,
  TrackMetadataEntity,
} from "../models/models";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse, successResponse } from "../models/responseModel";
import {
  createTrackService,
  deleteTrackService,
  getAllTracksService,
  getTrackByIdService,
  updateTrackService,
} from "../services/trackService";

export const getAllTracks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const tracks: TrackMetadataEntity[] = await getAllTracksService();
    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(tracks, "Track metadata retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

// need authorization
export const createTrack = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Create new Event object
  try {
    const track: TrackMetadataInput = req.body;
    const createdTrack = await createTrackService(track);

    res
      .status(HTTP_STATUS.CREATED)
      .json(
        successResponse(createdTrack, "Track metadata created successfully"),
      );
  } catch (error) {
    next(error);
  }
};

export const getTrackById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const track: TrackMetadataEntity = await getTrackByIdService(id);
    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(track, "Track Metadata retrieved successfully"));
  } catch (error) {
    next(error);
  }
};


export const deleteTrack = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id as string;
    await deleteTrackService(id);
    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(null, "Track metadata deleted successfully"));
  } catch (error) {
    next(error);
  }
};


export const updateTrack = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { artist, album, title, length } = req.body;

    // Create update data object with only the fields that can be updated
    const updateData = { artist, album, title, length };

    const updatedTrack: TrackMetadataEntity = await updateTrackService(
      id,
      updateData,
    );
    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(updatedTrack, "Track updated successfully"));
  } catch (error) {
    next(error);
  }
};


