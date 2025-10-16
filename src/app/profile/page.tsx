"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import ProfilePicture from "@/components/ProfilePicture";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import SearchableSelect from "@/components/ui/SearchableSelect";

interface Condition {
  id: string;
  name: string;
}

interface Allergy {
  id: string;
  name: string;
}

type UserProfile = {
  id: string;
  fullName: string;
  username: string;
  profilePicture?: string;
  conditions: Condition[];
  allergies: Allergy[];
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [originalProfile, setOriginalProfile] = useState<UserProfile | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  
  const userId = "cmgsqn8cb00083seu9bdpj2du";
  const queryClient = useQueryClient();

  const { data: fetchedProfile, isLoading, error } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => apiClient.profile._userId(userId).$get(),
    retry: false,
  });

  const { data: availableConditionsData } = useQuery({
    queryKey: ['conditions'],
    queryFn: () => apiClient.conditions.$get(),
  });

  const { data: availableAllergiesData } = useQuery({
    queryKey: ['allergies'],
    queryFn: () => apiClient.allergies.$get(),
  });

  const updateMutation = useMutation({
    mutationFn: (data: { fullName?: string; username?: string; profilePicture?: string }) =>
      apiClient.profile._userId(userId).$patch({ body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
  });

  const updateConditionsMutation = useMutation({
    mutationFn: (conditionIds: string[]) =>
      apiClient.profile._userId(userId).conditions.$patch({ body: { conditionIds } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
  });

  const updateAllergiesMutation = useMutation({
    mutationFn: (allergyIds: string[]) =>
      apiClient.profile._userId(userId).allergies.$patch({ body: { allergyIds } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
  });

  const uploadProfilePictureMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`http://localhost:4000/profile/${userId}/profile-picture`, {
        method: 'POST',
        body: formData,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
  });

  useEffect(() => {
    if (fetchedProfile) {
      setProfile(fetchedProfile);
      setOriginalProfile(fetchedProfile);
    }
  }, [fetchedProfile]);

  useEffect(() => {
    if (profile && originalProfile) {
      const profileChanged = JSON.stringify(profile) !== JSON.stringify(originalProfile);
      setHasChanges(profileChanged);
    }
  }, [profile, originalProfile]);

  const removeCondition = (conditionId: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      conditions: profile.conditions.filter((c) => c.id !== conditionId),
    } as UserProfile);
  };

  const addCondition = (condition: Condition) => {
    if (!profile) return;
    if (!profile.conditions.find((c) => c.id === condition.id)) {
      setProfile({
        ...profile,
        conditions: [...profile.conditions, condition],
      } as UserProfile);
    }
  };

  const removeAllergy = (allergyId: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      allergies: profile.allergies.filter((a) => a.id !== allergyId),
    } as UserProfile);
  };

  const addAllergy = (allergy: Allergy) => {
    if (!profile) return;
    if (!profile.allergies.find((a) => a.id === allergy.id)) {
      setProfile({
        ...profile,
        allergies: [...profile.allergies, allergy],
      } as UserProfile);
    }
  };

  const handleSave = async () => {
    if (!profile || !originalProfile) return;

    const nameChanged = profile.fullName !== originalProfile.fullName || profile.username !== originalProfile.username;
    const conditionsChanged = JSON.stringify(profile.conditions) !== JSON.stringify(originalProfile.conditions);
    const allergiesChanged = JSON.stringify(profile.allergies) !== JSON.stringify(originalProfile.allergies);

    if (nameChanged) {
      await updateMutation.mutateAsync({
        fullName: profile.fullName,
        username: profile.username,
      });
    }

    if (conditionsChanged) {
      await updateConditionsMutation.mutateAsync(profile.conditions.map((c) => c.id));
    }

    if (allergiesChanged) {
      await updateAllergiesMutation.mutateAsync(profile.allergies.map((a) => a.id));
    }

    setOriginalProfile(profile);
  };

  const handleCancel = () => {
    if (originalProfile) {
      setProfile(originalProfile);
    }
  };

  const handleProfilePictureUpload = (file: File) => {
    uploadProfilePictureMutation.mutate(file);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text mb-2">Error loading profile</h2>
          <p className="text-text/70">Failed to connect to the API</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        Profile not found
      </div>
    );
  }

  const availableConditions = availableConditionsData?.filter(
    (c) => !profile.conditions.find((pc) => pc.id === c.id)
  ) ?? [];

  const availableAllergies = availableAllergiesData?.filter(
    (a) => !profile.allergies.find((pa) => pa.id === a.id)
  ) ?? [];

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-text mb-8">Profile</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-surface rounded-xl p-6">
          <div className="flex items-center gap-6 mb-6">
            <ProfilePicture
              src={profile.profilePicture}
              alt={profile.fullName}
              size="2xl"
              editable
              onUpload={handleProfilePictureUpload}
              priority
            />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-text/20 rounded-lg text-text focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Username
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-text/20 rounded-lg text-text focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-6">
          <h3 className="text-xl font-semibold text-text mb-4">
            Medical Conditions
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.conditions.map((condition) => (
              <Pill
                key={condition.id}
                label={condition.name}
                onRemove={() => removeCondition(condition.id)}
              />
            ))}
          </div>
          {availableConditions.length > 0 && (
            <SearchableSelect
              options={availableConditions}
              onSelect={addCondition}
              placeholder="Search and add conditions..."
            />
          )}
        </div>

        <div className="bg-surface rounded-xl p-6">
          <h3 className="text-xl font-semibold text-text mb-4">Allergies</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.allergies.map((allergy) => (
              <Pill
                key={allergy.id}
                label={allergy.name}
                onRemove={() => removeAllergy(allergy.id)}
              />
            ))}
          </div>
          {availableAllergies.length > 0 && (
            <SearchableSelect
              options={availableAllergies}
              onSelect={addAllergy}
              placeholder="Search and add allergies..."
            />
          )}
        </div>

        <div className="flex gap-4">
          <Button onClick={handleSave} disabled={!hasChanges}>
            Save
          </Button>
          <Button onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
