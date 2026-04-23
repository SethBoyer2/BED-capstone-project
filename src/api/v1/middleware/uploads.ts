/* Storage:
Files go to uploads/audio
Filenames should be generated with timestamp + original filename

Audio only for now

Max size ~50mb for now

Filter MIME type (mp3 only)

Config includes how to store files, how to name files, what is allowed, and size limits
*/
import multer from 'multer'
import path from 'path'

// use diskStorage to configure local file storage
// add destination, and filename generation
const storage = multer.diskStorage({
    destination: './uploads/audio',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
  storage: storage, // set file destination as storage
  limits: { fileSize: 100000000 }, // set 100mb limit
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ["audio/flac", "audio/ogg", "audio/wav", "audio/opus"] // list of allowed MIME types
    if (!allowedMimeTypes.includes(file.mimetype)) { // if allowedMimeTypes does not include the mimeType of the file, return error.
        return cb(new Error("Please post a valid audio file. (OPUS, WAV, OGG, MP3."))
    }
    cb(null, true) // accept file if it isn't caught by the fileFilter
  }

}).single('audio');

export {storage, upload}

