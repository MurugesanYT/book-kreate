
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Users, Plus, Mail, Crown, Eye, Edit, Trash2, UserPlus } from 'lucide-react';
import { 
  createTeam, 
  sendTeamInvitation, 
  getUserTeams, 
  getPendingInvitations, 
  acceptTeamInvitation,
  Team, 
  Invitation 
} from '@/lib/api/collaborationService';

interface CollaborationSectionProps {
  book: any;
}

const CollaborationSection = ({ book }: CollaborationSectionProps) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('editor');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  useEffect(() => {
    loadTeams();
    loadInvitations();
  }, []);

  const loadTeams = async () => {
    try {
      const userTeams = await getUserTeams();
      setTeams(userTeams);
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  };

  const loadInvitations = async () => {
    try {
      const pendingInvites = await getPendingInvitations();
      setInvitations(pendingInvites);
    } catch (error) {
      console.error('Error loading invitations:', error);
    }
  };

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) {
      toast.error('Team name is required');
      return;
    }

    try {
      setIsCreatingTeam(true);
      await createTeam(newTeamName, newTeamDescription);
      setNewTeamName('');
      setNewTeamDescription('');
      setShowCreateTeamDialog(false);
      await loadTeams();
    } catch (error) {
      console.error('Error creating team:', error);
    } finally {
      setIsCreatingTeam(false);
    }
  };

  const handleSendInvitation = async () => {
    if (!inviteEmail.trim()) {
      toast.error('Email address is required');
      return;
    }

    if (!selectedTeam) {
      toast.error('Please select a team');
      return;
    }

    try {
      setIsSendingInvite(true);
      await sendTeamInvitation(selectedTeam, inviteEmail, inviteRole);
      setInviteEmail('');
      setShowInviteDialog(false);
    } catch (error) {
      console.error('Error sending invitation:', error);
    } finally {
      setIsSendingInvite(false);
    }
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      await acceptTeamInvitation(invitationId);
      await loadInvitations();
      await loadTeams();
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4" />;
      case 'editor':
        return <Edit className="h-4 w-4" />;
      case 'viewer':
        return <Eye className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'default';
      case 'editor':
        return 'secondary';
      case 'viewer':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Pending Invitations ({invitations.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">{invitation.teamName}</p>
                  <p className="text-sm text-gray-600">
                    Invited by {invitation.inviterEmail} as {invitation.role}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleAcceptInvitation(invitation.id)}
                  >
                    Accept
                  </Button>
                  <Button size="sm" variant="outline">
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Teams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              My Teams ({teams.length})
            </div>
            <Dialog open={showCreateTeamDialog} onOpenChange={setShowCreateTeamDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Team</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input
                      id="teamName"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="Enter team name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamDescription">Description (Optional)</Label>
                    <Input
                      id="teamDescription"
                      value={newTeamDescription}
                      onChange={(e) => setNewTeamDescription(e.target.value)}
                      placeholder="Enter team description"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCreateTeam} 
                      disabled={isCreatingTeam}
                      className="flex-1"
                    >
                      {isCreatingTeam ? 'Creating...' : 'Create Team'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCreateTeamDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teams.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No teams yet</p>
              <p className="text-sm text-gray-400">Create a team to start collaborating</p>
            </div>
          ) : (
            teams.map((team) => (
              <div key={team.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{team.name}</h3>
                    {team.description && (
                      <p className="text-sm text-gray-600">{team.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                    </Badge>
                    <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-2"
                          onClick={() => setSelectedTeam(team.id)}
                        >
                          <UserPlus className="h-4 w-4" />
                          Invite
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Invite to {team.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="inviteEmail">Email Address</Label>
                            <Input
                              id="inviteEmail"
                              type="email"
                              value={inviteEmail}
                              onChange={(e) => setInviteEmail(e.target.value)}
                              placeholder="Enter email address"
                            />
                          </div>
                          <div>
                            <Label htmlFor="inviteRole">Role</Label>
                            <Select value={inviteRole} onValueChange={(value: 'editor' | 'viewer') => setInviteRole(value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="editor">Editor - Can edit and create content</SelectItem>
                                <SelectItem value="viewer">Viewer - Can only view content</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={handleSendInvitation} 
                              disabled={isSendingInvite}
                              className="flex-1"
                            >
                              {isSendingInvite ? 'Sending...' : 'Send Invitation'}
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setShowInviteDialog(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                {/* Team Members */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Members:</h4>
                  {team.members.map((member) => (
                    <div key={member.userId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(member.role)}
                        <span className="text-sm">{member.email}</span>
                      </div>
                      <Badge variant={getRoleBadgeVariant(member.role)}>
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Credit Usage Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Usage Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>When creating content in a team:</Label>
            <Select defaultValue="own">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="own">Use my credits only</SelectItem>
                <SelectItem value="team_owner">Use team owner's credits only</SelectItem>
                <SelectItem value="own_then_team">Use my credits first, then team owner's</SelectItem>
                <SelectItem value="team_then_own">Use team owner's credits first, then mine</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600">
              This setting controls whose credits are used when you create content in collaborative projects.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaborationSection;
