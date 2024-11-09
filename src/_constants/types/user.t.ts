export interface SafeProfilePicture {
  id: string;
  uploadBy: string | null;
  minUrl: string | null;
  midUrl: string | null;
  fullUrl: string | null;
  used: boolean;
}

export interface SafeUserInfo {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  passwordChangedAt: Date;
  profilePictureId?: string | null;
  profilePicture?: SafeProfilePicture | null;
  createdAt: Date;
  updatedAt: Date;
}
