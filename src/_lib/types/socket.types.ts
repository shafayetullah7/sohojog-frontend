export interface JoinRoomPayload {
  roomId: string;
}

export interface SendMessagePayload {
  roomId: string;
  content: string;
}

export interface ReceiveMessagePayload {
  content: string;
  userId: string;
  timestamp: string;
}

export interface UserJoinedPayload {
  userId: string;
}
