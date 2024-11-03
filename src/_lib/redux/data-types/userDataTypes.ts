export type Tuser = {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  passwordChangedAt: string | null;
  profilePicture: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TuserResponse = {
  user: Tuser;
};
