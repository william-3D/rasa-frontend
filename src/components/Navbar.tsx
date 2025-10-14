'use client';

import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
  return (
    <nav className="bg-surface border-b border-primary/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">
          Rasa
        </div>
        <ProfileDropdown 
          userFullName="John Doe" 
          userProfilePicture=""
        />
      </div>
    </nav>
  );
}