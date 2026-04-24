import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const streamTrack = (req: Request, res: Response) => {
    const filename  = req.params.filename as string // get filename from req.params
    // build path to audio file using working directory + uploads/audio + filename
    const filePath = path.join(process.cwd(), "uploads", "audio", filename);

    if (!fs.existsSync(filePath)) { // use fs to check if the file exists
        return res.status(HTTP_STATUS.NOT_FOUND).json({error: "file not found"})
    }

    res.setHeader("Content-Type", "audio/mpeg") // set res headers. Previous to this endpoint would send whole file as download
    res.setHeader("Accept-Ranges", "bytes")

    const stream = fs.createReadStream(filePath) // use fs to start a file stream. Sends chunks of data
    stream.pipe(res) // send file stream with HTTP response to allow playback

    /*
    sendFile isn't needed anymore. Sending whole file doesn't allow playback.
    After looking into it, sendFile just sends the entire file as static data,
    which is why the file itself was sending, but wouldn't allow streaming.
    using stream.pipe, content-type and accept-ranges together allows seeking, and proper audio stream.
    */
}