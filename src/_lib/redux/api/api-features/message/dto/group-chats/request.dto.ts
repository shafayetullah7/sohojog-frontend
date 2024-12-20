export type ProjectChatListQueryRequest = {
  groupType?: "PROJECT" | "TEAM";
  groupRole?: "MEMBER" | "ADMIN";
  status?: "ACTIVE" | "INACTIVE";
  includeInactive?: boolean;
  page?: number;
  limit?: number;
};
