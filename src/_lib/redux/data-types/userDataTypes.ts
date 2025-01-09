interface ProfilePicture {
  id: string;
  uploadBy: string;
  minUrl: string;
  midUrl: string;
  fullUrl: string;
  used: boolean;
}

export type Tuser = {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  passwordChangedAt: string | null;
  profilePicture?: ProfilePicture;
  createdAt: string;
  updatedAt: string;
};

export type TuserResponse = {
  user: Tuser;
};
