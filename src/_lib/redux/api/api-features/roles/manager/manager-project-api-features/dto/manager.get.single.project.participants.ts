export interface ProfilePicture {
  minUrl: string;
}

export interface User {
  name: string;
  profilePicture: ProfilePicture;
}

export interface Participant {
  id: string;
  joinedAt: string;
  designation: string[]; // Assuming it's an array of strings (can be empty)
  user: User;
}

// ManagerSingleProjectResponse

export interface ManagerSingleProjectParticipantsResponse {
  participants: Participant[];
}
