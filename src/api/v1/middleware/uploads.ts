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
    destination: '/.uploads/audio',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
  storage: storage, // set file destination as storage
  limits: { fileSize: 10000000 }, // set 10mb limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype != 'audio/mpeg') { // if file MIME type is not mp3, error.
        return cb(new Error('Wrong file type. Please input only MP3 files.'))
    }
  }
}).single('audio');

