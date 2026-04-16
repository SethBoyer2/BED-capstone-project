export interface TrackMetadataInput {
    "artist": String,
    "album": String,
    "title": String,
    "length": String
}

export interface TrackMetadataBuild {
    "artist": String,
    "album": String,
    "title": String,
    "length": Number,
    "createdAt": Date,
    "updatedAt": Date
}

export interface TrackMetadataEntity {
    "id": String
    "artist": String,
    "album": String,
    "title": String,
    "length": Number,
    "createdAt": Date,
    "updatedAt": Date
}