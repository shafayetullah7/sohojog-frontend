// src/types/namespaces.ts

export const NAMESPACES = {
  CHAT: "http://localhost:4000/chat",
  NOTIFICATION: "http://localhost:4000/notification",
} as const;

export type Namespace = keyof typeof NAMESPACES;
