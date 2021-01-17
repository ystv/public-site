export interface Teams {
  teams: Team[];
}

export interface Team {
  id: number;
  name: string;
  emailAlias: string;
  shortDescription: string;
  longDescription?: string;
  members: TeamMember[];
}

export interface TeamMember {
  userID: number;
  userName: string;
  avatar: string;
  officerID: number;
  emailAlias: string;
  officerName: string;
  officerDescription: string;
  historywikiURL: string;
}
