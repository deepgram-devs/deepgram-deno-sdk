export type InvitationOptions = {
  email?: string;
  scope?: string;
};

export type InvitationList = {
  invites?: Array<InvitationOptions>;
};
