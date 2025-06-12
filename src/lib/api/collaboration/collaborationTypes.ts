
export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  userId: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: string;
  creditPreference: 'own' | 'team_owner' | 'own_then_team' | 'team_then_own';
}

export interface Invitation {
  id: string;
  teamId: string;
  teamName: string;
  inviterEmail: string;
  inviteeEmail: string;
  role: 'editor' | 'viewer';
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  expiresAt: string;
}
