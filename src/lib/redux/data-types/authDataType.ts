export interface Tuser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
}

export interface TauthResponse {
  user: Tuser;
  token: string;
}
