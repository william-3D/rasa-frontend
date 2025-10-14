'use client';

import { useState } from 'react';

interface Option {
  id: string;
  name: string;
}

interface SearchableSelectProps {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder?: string;
}

export default function SearchableSelect({ 
  options, 
  onSelect, 
  placeholder = "Search..."
}: SearchableSelectProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    onSelect(option);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-surface border border-primary/20 rounded-lg text-text placeholder-text/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-primary/20 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-2 text-left text-text hover:bg-primary/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}