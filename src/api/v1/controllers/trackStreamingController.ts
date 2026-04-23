import path from "path";
import { Request, Response } from "express";
import { HTTP_STATUS } from "src/constants/httpConstants";

export const streamTrack = (req: Request, res: Response) => {
    const filename  = req.params.filename as string // get filename from req.params
    // build path to audio file using working directory + uploads/audio + filename
    const filePath = path.join(process.cwd(), "uploads", "audio", filename);

    res.sendFile(filePath, (error) => {
        if(error) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({error: "file not found"})
        }
    })
}