type Room = {
  id: string;
  lastMessage: string | null;
  _count: {
    participants: number;
  };
};

type Group = {
  id: string;
  name: string;
  room: Room;
};

type Team = {
  id: string;
  name: string;
  createdAt: string;
  _count: {
    memberShips: number;
  };
  group: Group;
};

export type ProjectChat = {
  admin: boolean;
  id: string;
  title: string;
  createdAt: string;
  group: Group;
  teams: Team[];
};

export type ProjectChatListQueryResponse = {
  projects: ProjectChat[];
};
