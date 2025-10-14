'use client';

import { useState, useEffect } from 'react';
import ProfilePicture from '@/components/ProfilePicture';
import Button from '@/components/ui/Button';
import Pill from '@/components/ui/Pill';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface Condition {
  id: string;
  name: string;
}

interface Allergy {
  id: string;
  name: string;
}

interface UserProfile {
  fullName: string;
  username: string;
  profilePicture?: string;
  conditions: Condition[];
  allergies: Allergy[];
}

const mockConditions: Condition[] = [
  { id: '1', name: 'Diabetes' },
  { id: '2', name: 'GERD' },
  { id: '3', name: 'Hypertension' },
  { id: '4', name: 'Celiac Disease' }
];

const mockAllergies: Allergy[] = [
  { id: '1', name: 'Nuts' },
  { id: '2', name: 'Dairy' },
  { id: '3', name: 'Shellfish' },
  { id: '4', name: 'Gluten' }
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'John Doe',
    username: 'johndoe',
    conditions: [
      { id: '1', name: 'Diabetes' },
      { id: '2', name: 'GERD' }
    ],
    allergies: [
      { id: '1', name: 'Nuts' }
    ]
  });

  const [originalProfile, setOriginalProfile] = useState<UserProfile>(profile);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const profileChanged = JSON.stringify(profile) !== JSON.stringify(originalProfile);
    setHasChanges(profileChanged);
  }, [profile, originalProfile]);

  const removeCondition = (conditionId: string) => {
    setProfile(prev => ({
      ...prev,
      conditions: prev.conditions.filter(c => c.id !== conditionId)
    }));
  };

  const addCondition = (condition: Condition) => {
    if (!profile.conditions.find(c => c.id === condition.id)) {
      setProfile(prev => ({
        ...prev,
        conditions: [...prev.conditions, condition]
      }));
    }
  };

  const removeAllergy = (allergyId: string) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a.id !== allergyId)
    }));
  };

  const addAllergy = (allergy: Allergy) => {
    if (!profile.allergies.find(a => a.id === allergy.id)) {
      setProfile(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergy]
      }));
    }
  };

  const handleSave = () => {
    setOriginalProfile(profile);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
  };

  const availableConditions = mockConditions.filter(
    c => !profile.conditions.find(pc => pc.id === c.id)
  );

  const availableAllergies = mockAllergies.filter(
    a => !profile.allergies.find(pa => pa.id === a.id)
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-text mb-8">
        Profile
      </h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-6">
          <ProfilePicture 
            src={profile.profilePicture} 
            alt={profile.fullName} 
            size="lg" 
          />
          <div>
            <h2 className="text-2xl font-semibold text-text">{profile.fullName}</h2>
            <p className="text-text/70">@{profile.username}</p>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-6">
          <h3 className="text-xl font-semibold text-text mb-4">Medical Conditions</h3>
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
          <h3 className="text-xl font-semibold text-text mb-4">Food Sensitivities</h3>
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
              placeholder="Search and add food sensitivities..."
            />
          )}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}