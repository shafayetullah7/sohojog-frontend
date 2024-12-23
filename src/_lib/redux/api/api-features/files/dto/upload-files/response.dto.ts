interface UserFileResponse {
  id: string;
  file: string;
  publicId: string;
  fileType: string;
  fileName: string;
  extension: string;
  uploadBy: string;
  used: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UploadUserFilesResponse {
  files: UserFileResponse[];
}
