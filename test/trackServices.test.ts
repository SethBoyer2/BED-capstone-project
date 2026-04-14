import * as services from "../src/api/v1/services/trackService"
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository"

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
  getDocumentById: jest.fn(),
  deleteDocument: jest.fn(),
  createDocument: jest.fn(),
  getDocuments: jest.fn(),
  updateDocument: jest.fn(),
}));



jest.mock("../src/api/v1/repositories/firestoreRepository")

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
    }
    const mockDocumentId = "test-id";

    (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
      mockDocumentId
      );

    // Act
    const result = await services.createTrackService(mockTrackData)

    // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "tracks",
            expect.objectContaining({
                album: mockTrackData.album,
                artist: mockTrackData.artist,
                title: mockTrackData.title,
                length: mockTrackData.length,
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.title).toBe(mockTrackData.title);

  })
})

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

    (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

    // act
    await services.deleteTrackService(validId);

    // assert
    expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("tracks", validId);
    expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("tracks", validId);
  })

})


