export interface TrackMetadataInput {
    "artist": string,
    "album": string,
    "title": string,
    "length": string // "4:10"
}

export interface TrackMetadataBuild {
    "artist": string,
    "album": string,
    "title": string,
    "length": number,
    "createdAt": Date,
    "updatedAt": Date
}

export interface TrackMetadataEntity {
    "id": string
    "artist": string,
    "album": string,
    "title": string,
    "length": number,
    "createdAt": Date,
    "updatedAt": Date
}