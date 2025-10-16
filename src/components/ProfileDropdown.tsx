'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProfilePicture from './ProfilePicture';

interface ProfileDropdownProps {
  userFullName: string;
  userProfilePicture?: string;
}

export default function ProfileDropdown({ 
  userFullName, 
  userProfilePicture 
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent border-none rounded-full cursor-pointer transition-all duration-200 focus:outline-none hover:ring-2 hover:ring-primary hover:ring-opacity-30"
      >
        <ProfilePicture 
          src={userProfilePicture} 
          alt={userFullName} 
          size="sm" 
        />
      </button>

      <div className={`absolute right-0 mt-3 w-52 bg-surface bg-opacity-95 backdrop-blur-md rounded-xl shadow-2xl border border-primary border-opacity-10 z-20 transition-all duration-300 origin-top-right ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        <Link
          href="/profile"
          onClick={() => setIsOpen(false)}
          className="block w-full px-5 py-3 text-left text-text hover:text-background hover:bg-primary hover:bg-opacity-10 rounded-xl transition-colors duration-200 no-underline"
        >
          Profile
        </Link>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}