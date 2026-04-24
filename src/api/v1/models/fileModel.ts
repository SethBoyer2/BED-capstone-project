export interface multerUploadInput {
    file: Express.Multer.File
}

export interface uploadResult {
    filename: string,
    originalName: string,
    size: number,
    extension: string,
    path: string,
    uploadedAt: Date

}