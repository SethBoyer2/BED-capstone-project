import { TrackMetadataInput } from "../models/models";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "tracks";

export const tracks: TrackMetadataInput[] = [];

export const createTrackService = async (trackData: {
    artist: String,
    album: String,
    title: String, //change
    length: String
}): Promise<TrackMetadataInput> => {
    try {
        const [min, sec] = trackData.length.split(':')
        const parsedLength = Number(min) * 60 + Number(sec)
// length input parser (mm:ss to seconds)

        const now = new Date();
        const newTrackData = {
            ...trackData,
            length: parsedLength,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<TrackMetadataInput>(COLLECTION, newTrackData);
        return { id, ...newTrackData } as TrackMetadataInput;
    } catch (error) {
        throw error;
    }
};

export const getAllTracksService = async (): Promise<TrackMetadataInput[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const tracks: TrackMetadataInput[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                artist: data.artist,
                album: data.album,
                title: data.title,
                length: data.length,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
            } as TrackMetadataInput;
        });
        return tracks;
    } catch (error) {
        throw error;
    }
};

export const getTrackByIdService = async (id: string): Promise<TrackMetadataInput> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        const data = doc.data();
        if (!data) {
          throw new Error(`No Valid Data.`)
        }

        const track: TrackMetadataInput = {
            id: doc.id,
            artist: data.artist,
            album: data.album,
            title: data.title,
            length: data.length,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
        } as TrackMetadataInput;

        return track;
    } catch (error) {
        throw error;
    }
};

export const deleteTrackService = async (id: string): Promise<void> => {
    try {
        // Check if item exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};

export const updateTrackService = async (
    id: string,
    trackData: Partial<Pick<TrackMetadataInput, "artist" | "album" | "title" | "length">>
): Promise<TrackMetadataInput> => {
    try {
        const updateData = {
            ...trackData,
            updatedAt: new Date(),
        };

        await updateDocument<TrackMetadataInput>(COLLECTION, id, updateData);

        // Return the updated item
        const updatedTrack = await getTrackByIdService(id);
        return updatedTrack;
    } catch (error) {
        throw error;
    }
};