import { multerUploadInput, uploadResult } from "../models/fileModel"
import path from "path"

export const uploadTrackAudioService = (input: multerUploadInput): uploadResult => {
    const {file} = input

    if (!file){ // If request was sent with no file, error ):
        throw new Error("must input an audio file")
    }

    return {
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        extension: path.extname(file.originalname),
        path: file.path,
        uploadedAt: new Date()
    }
// Return file data. This information won't be stored anywhere except in the audio file itself.
// This is because I generally consider the FILE metadata out of scope (for now), as the API is based around MUSIC metadata specifically.
}