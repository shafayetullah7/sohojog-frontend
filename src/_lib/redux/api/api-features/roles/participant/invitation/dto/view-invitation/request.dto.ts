export interface UpdateInvitationSeenRequestDto {
  params: {
    id: string;
  };
  body: {
    seen: boolean;
  };
}
