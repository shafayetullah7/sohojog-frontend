export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  isActive: boolean;
};

export type Group = {
  id: string;
  name: string;
  unread: number;
  lastMessage: string;
  lastMessageTime: Date;
  isActive: boolean;
};

export type Project = {
  id: string;
  name: string;
  unread: number;
  conversationsCount: number;
  createdAt: Date;
  isOwner: boolean;
  groups: Group[];
};

export type ProjectFilter = "all" | "myProjects" | "participatedProjects";

export function formatTimeSince(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
}
