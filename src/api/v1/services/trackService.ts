import { TrackMetadata } from "../models/models";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "tracks";

export const tracks: TrackMetadata[] = [];

export const createTrackService = async (trackData: {
    artist: String,
    album: String,
    title: String, //change
    length: String
}): Promise<TrackMetadata> => {
    try {
        const now = new Date();
        const newTrackData = {
            ...trackData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<TrackMetadata>(COLLECTION, newTrackData);
        return { id, ...newTrackData } as TrackMetadata;
    } catch (error) {
        throw error;
    }
};

export const getAllTracksService = async (): Promise<TrackMetadata[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const tracks: TrackMetadata[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                artist: data.artist,
                album: data.album,
                title: data.title,
                length: data.length,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
            } as TrackMetadata;
        });
        return tracks;
    } catch (error) {
        throw error;
    }
};

export const getTrackByIdService = async (id: string): Promise<TrackMetadata> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        const data = doc.data();
        if (!data) {
          throw new Error(`No Valid Data.`)
        }

        const track: TrackMetadata = {
            id: doc.id,
            artist: data.artist,
            album: data.album,
            title: data.title,
            length: data.length,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
        } as TrackMetadata;

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
    trackData: Partial<Pick<TrackMetadata, "artist" | "album" | "title" | "length">>
): Promise<TrackMetadata> => {
    try {
        const updateData = {
            ...trackData,
            updatedAt: new Date(),
        };

        await updateDocument<TrackMetadata>(COLLECTION, id, updateData);

        // Return the updated item
        const updatedTrack = await getTrackByIdService(id);
        return updatedTrack;
    } catch (error) {
        throw error;
    }
};