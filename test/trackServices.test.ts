import * as services from "../src/api/v1/services/trackService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { tracks } from "../src/api/v1/services/trackService";

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
  getDocumentById: jest.fn(),
  deleteDocument: jest.fn(),
  createDocument: jest.fn(),
  getDocuments: jest.fn(),
  updateDocument: jest.fn(),
}));

jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Create Event Validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should successfully create a track given valid metadata", async () => {
    // Arrange
    const mockTrackData = {
      album: "Floral Shoppe",
      artist: "Macintosh Plus",
      title: "420",
      length: "3:21",
    };
    const mockDocumentId = "test-id";

    (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
      mockDocumentId,
    );

    // Act
    const result = await services.createTrackService(mockTrackData);

    // Assert
    expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
      "tracks",
      expect.objectContaining({
        album: mockTrackData.album,
        artist: mockTrackData.artist,
        title: mockTrackData.title,
        length: mockTrackData.length,
      }),
    );
    expect(result.id).toBe(mockDocumentId);
    expect(result.title).toBe(mockTrackData.title);
  });
});

describe("Track deletion validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should delete track metadata given a valid ID", async () => {
    // arrange
    const validId = "test-2";

    (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
      id: validId,
      album: "Hello",
      artist: "Hi",
      song: "yogurt",
      length: "4:00",
    });

    (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
      undefined,
    );

    // act
    await services.deleteTrackService(validId);

    // assert
    expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
      "tracks",
      validId,
    );
    expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
      "tracks",
      validId,
    );
  });


// not working yet

//   describe("Get Track by ID test", () => {
//     beforeEach(() => {
//         tracks.length = 0
//         tracks.push (
//             { id: "1", album: "hi", artist: "yes", title: "maybe", length: "1:23"},
//             { id: "2", album: "hello", artist: "no", title: "fosho", length: "1:54" }
//         )
//     })
//   it("Should return track with matching ID", async () => {

//     // Act
//     const result = await services.getTrackByIdService("1")

//     // Assert
//     expect(result?.id).toBe(1)

//   })
// })

// describe("Get Tracks test", () => {
//     beforeEach(() => {
//         tracks.length = 0
//         tracks.push (
//             { id: "1", album: "hi", artist: "yes", title: "maybe", length: "1:23"},
//             { id: "2", album: "hello", artist: "no", title: "fosho", length: "1:54" }
//         )
//     })
//   it("Should return all events", async () => {

//     // Act
//     const result = await services.getAllTracksService()

//     // Assert
//     expect(result.length).toBe(2)

//   })
// })
});
