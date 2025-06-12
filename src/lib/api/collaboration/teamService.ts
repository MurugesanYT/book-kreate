
import { toast } from "sonner";
import { database, auth } from "@/lib/firebase";
import { ref, push, get, set } from "firebase/database";
import { getCurrentUserId } from "./utils";
import { Team, TeamMember } from "./collaborationTypes";

export const createTeam = async (name: string, description?: string): Promise<Team> => {
  try {
    const userId = getCurrentUserId();
    const user = auth.currentUser;
    
    if (!user?.email) {
      throw new Error("User email is required");
    }
    
    const team: Omit<Team, 'id'> = {
      name,
      description,
      ownerId: userId,
      members: [{
        userId,
        email: user.email,
        role: 'owner',
        joinedAt: new Date().toISOString(),
        creditPreference: 'own'
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const teamsRef = ref(database, `teams`);
    const newTeamRef = push(teamsRef);
    await set(newTeamRef, team);
    
    const createdTeam = { ...team, id: newTeamRef.key! };
    
    // Add team to user's teams list
    await set(ref(database, `users/${userId}/teams/${newTeamRef.key}`), true);
    
    toast.success("Team created successfully!");
    return createdTeam;
  } catch (error) {
    console.error("Error creating team:", error);
    toast.error("Failed to create team");
    throw error;
  }
};

export const getUserTeams = async (): Promise<Team[]> => {
  try {
    const userId = getCurrentUserId();
    const userTeamsRef = ref(database, `users/${userId}/teams`);
    const snapshot = await get(userTeamsRef);
    
    if (!snapshot.exists()) {
      return [];
    }
    
    const teamIds = Object.keys(snapshot.val());
    const teams: Team[] = [];
    
    for (const teamId of teamIds) {
      const teamRef = ref(database, `teams/${teamId}`);
      const teamSnapshot = await get(teamRef);
      
      if (teamSnapshot.exists()) {
        teams.push({ id: teamId, ...teamSnapshot.val() });
      }
    }
    
    return teams;
  } catch (error) {
    console.error("Error fetching user teams:", error);
    return [];
  }
};
