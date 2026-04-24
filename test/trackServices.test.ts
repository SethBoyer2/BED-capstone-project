import * as services from "../src/api/v1/services/trackService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
  getDocumentById: jest.fn(),
  deleteDocument: jest.fn(),
  createDocument: jest.fn(),
  getDocuments: jest.fn(),
  updateDocument: jest.fn(),
}));

jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Create track Validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should successfully create a track given valid metadata", async () => {
    // Arrange
    const mockTrackData = {
      album: "Test Album",
      artist: "Test Artist",
      title: "Test Song",
      length: "3:30",
    };
    const mockDocumentId = "test-id";

    (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
      mockDocumentId,
    );

    // Act
    const result = await services.createTrackService(mockTrackData);

    // Assert
    // Assert return value
    expect(result).toMatchObject({
      id: mockDocumentId,
      album: "Test Album",
      artist: "Test Artist",
      title: "Test Song",
      length: 210,
  });
});
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
})

  describe("Get Track by ID test", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

  it("Should return track with matching ID", async () => {

    //Arrange
    const mockItem = {
      id: "track-22",
      data: () => ({
        artist: "Test Artist",
        album: "Test Album",
        title: "Test Song",
        length: 250,
        createdAt: { toDate: () => new Date("2024-01-01") }, // toDate conversion because jest gets mad when it isn't converted
        updatedAt: { toDate: () => new Date("2024-01-02") },
      })
    } as any
    (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockItem);

    // Act
    const result = await services.getTrackByIdService("track-22")

    // Assert
    expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("tracks", "track-22")
    expect(result).toEqual({
      id: "track-22",
      artist: "Test Artist",
      album: "Test Album",
      title: "Test Song",
      length: 250,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-02"),
  })
})
});


