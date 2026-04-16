import {
  TrackMetadataInput,
  TrackMetadataBuild,
  TrackMetadataEntity,
} from "../models/models";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "tracks";

export const tracks: TrackMetadataInput[] = [];

// length parsing helper function
const parseLength = (length: string) => {
    const [min, sec] = length.split(":");
    return Number(min) * 60 + Number(sec)
}

// input data -> sanitize length and make build object -> add ID and return as entity
export const createTrackService = async (
  trackData: TrackMetadataInput,
): Promise<TrackMetadataEntity> => {
  try {
    const parsedLength = parseLength(trackData.length)

    const now = new Date();

    // add parsed length to build object (raw input doesn't accept numbers)
    const newTrackData: TrackMetadataBuild = {
      ...trackData,
      length: parsedLength,
      createdAt: now,
      updatedAt: now,
    };

    // Get ID
    const id = await createDocument<TrackMetadataBuild>(
      COLLECTION,
      newTrackData,
    );
    // Add id to track data and return entity (implicit with function return type)
    return { id, ...newTrackData };
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

// Change promise to track entity
export const getTrackByIdService = async (
  id: string,
): Promise<TrackMetadataEntity> => {
  try {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc) {
      throw new Error(`Item with ID ${id} not found`);
    }

    const data = doc.data();
    if (!data) {
      throw new Error(`No Valid Data.`);
    }

    const track: TrackMetadataEntity = {
      id: doc.id,
      artist: data.artist,
      album: data.album,
      title: data.title,
      length: data.length,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as TrackMetadataEntity;

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
  trackData: Partial<
    Pick<TrackMetadataInput, "artist" | "album" | "title" | "length">
  >,
): Promise<TrackMetadataEntity> => {
  try {
    // separate length from other metadata
    // This allows us to overwrite length later if it needs to be parsed
    const {length, ...metadata} = trackData

    const updateData: Partial<TrackMetadataBuild> = {
      ...metadata,
      updatedAt: new Date(),
    };

    if(length !== undefined) {
        updateData.length = parseLength(length)
    }

    await updateDocument<TrackMetadataBuild>(COLLECTION, id, updateData);

    // Return the updated item
    const updatedTrack = await getTrackByIdService(id);
    return updatedTrack;
  } catch (error) {
    throw error;
  }
};
