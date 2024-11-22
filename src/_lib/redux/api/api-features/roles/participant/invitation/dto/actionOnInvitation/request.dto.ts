export interface UpdateInvitationStatusRequestDto {
  params: {
    id: string;
  };
  body: {
    status: "ACCEPTED" | "DECLINED"; // e.g., "ACCEPTED"
  };
}
