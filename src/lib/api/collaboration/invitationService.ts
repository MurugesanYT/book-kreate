
import { toast } from "sonner";
import { database, auth } from "@/lib/firebase";
import { ref, push, get, set, remove } from "firebase/database";
import { getCurrentUserId, createEmailKey } from "./utils";
import { Invitation, TeamMember } from "./collaborationTypes";

export const sendTeamInvitation = async (
  teamId: string,
  email: string,
  role: 'editor' | 'viewer'
): Promise<void> => {
  try {
    const userId = getCurrentUserId();
    const user = auth.currentUser;
    
    if (!user?.email) {
      throw new Error("User email is required");
    }
    
    // Get team details
    const teamRef = ref(database, `teams/${teamId}`);
    const teamSnapshot = await get(teamRef);
    
    if (!teamSnapshot.exists()) {
      throw new Error("Team not found");
    }
    
    const team = teamSnapshot.val();
    
    // Check if user is team owner
    if (team.ownerId !== userId) {
      throw new Error("Only team owner can send invitations");
    }
    
    const invitation: Omit<Invitation, 'id'> = {
      teamId,
      teamName: team.name,
      inviterEmail: user.email,
      inviteeEmail: email,
      role,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    };
    
    const invitationsRef = ref(database, `invitations`);
    const newInvitationRef = push(invitationsRef);
    await set(newInvitationRef, invitation);
    
    // Add invitation to invitee's pending invitations
    const emailKey = createEmailKey(email);
    await set(ref(database, `userInvitations/${emailKey}/${newInvitationRef.key}`), true);
    
    toast.success("Invitation sent successfully!");
  } catch (error) {
    console.error("Error sending invitation:", error);
    toast.error("Failed to send invitation");
    throw error;
  }
};

export const getPendingInvitations = async (): Promise<Invitation[]> => {
  try {
    const user = auth.currentUser;
    if (!user?.email) {
      return [];
    }
    
    const emailKey = createEmailKey(user.email);
    const userInvitationsRef = ref(database, `userInvitations/${emailKey}`);
    const snapshot = await get(userInvitationsRef);
    
    if (!snapshot.exists()) {
      return [];
    }
    
    const invitationIds = Object.keys(snapshot.val());
    const invitations: Invitation[] = [];
    
    for (const invitationId of invitationIds) {
      const invitationRef = ref(database, `invitations/${invitationId}`);
      const invitationSnapshot = await get(invitationRef);
      
      if (invitationSnapshot.exists()) {
        const invitation = invitationSnapshot.val();
        if (invitation.status === 'pending') {
          invitations.push({ id: invitationId, ...invitation });
        }
      }
    }
    
    return invitations;
  } catch (error) {
    console.error("Error fetching pending invitations:", error);
    return [];
  }
};

export const acceptTeamInvitation = async (invitationId: string): Promise<void> => {
  try {
    const userId = getCurrentUserId();
    const user = auth.currentUser;
    
    if (!user?.email) {
      throw new Error("User email is required");
    }
    
    // Get invitation details
    const invitationRef = ref(database, `invitations/${invitationId}`);
    const invitationSnapshot = await get(invitationRef);
    
    if (!invitationSnapshot.exists()) {
      throw new Error("Invitation not found");
    }
    
    const invitation = invitationSnapshot.val();
    
    // Add user to team
    const teamMember: TeamMember = {
      userId,
      email: user.email,
      role: invitation.role,
      joinedAt: new Date().toISOString(),
      creditPreference: 'own'
    };
    
    await set(ref(database, `teams/${invitation.teamId}/members/${userId}`), teamMember);
    
    // Add team to user's teams
    await set(ref(database, `users/${userId}/teams/${invitation.teamId}`), true);
    
    // Update invitation status
    await set(ref(database, `invitations/${invitationId}/status`), 'accepted');
    
    // Remove from pending invitations
    const emailKey = createEmailKey(user.email);
    await remove(ref(database, `userInvitations/${emailKey}/${invitationId}`));
    
    toast.success("Team invitation accepted!");
  } catch (error) {
    console.error("Error accepting invitation:", error);
    toast.error("Failed to accept invitation");
    throw error;
  }
};
