## Overview
For my component, I'm planning on integrating multer for file uploads. Multer is a nodeJS middleware that allows you to handle multipart form data.
Multipart form data is basically a submission that involves a mix of JSON data and binary data (MP3 files, in my case.)

## Technical
Multer adds a req.body object and req.file/files to the request, with the body being the data (metadata) and the files being the binary data (mp3).
From what I've found, multer is relatively simple to integrate, mostly involving installing multer and implementing it into routes.
a small example of this would be: trackRouter.post("tracks/upload", upload.single('mp3').

Multer can also be configured for in-memory storage OR disk storage, which is good for my case, as I'm planning on including a local folder with the project
that holds the MP3s, which will allow the API to search for and stream MP3 files when it is complete.