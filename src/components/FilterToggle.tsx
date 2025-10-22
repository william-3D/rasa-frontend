"use client";
import { useState } from "react";

interface FilterToggleProps {
  regions: string[];
  conditions: string[];
  allergies: string[];
  selectedRegions: string[];
  selectedConditions: string[];
  selectedAllergies: string[];
  onFiltersChange: (filters: { regions: string[]; conditions: string[]; allergies: string[] }) => void;
}

export default function FilterToggle({
  regions,
  conditions,
  allergies,
  selectedRegions,
  selectedConditions,
  selectedAllergies,
  onFiltersChange,
}: FilterToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (category: 'regions' | 'conditions' | 'allergies', value: string) => {
    const current = category === 'regions' ? selectedRegions : category === 'conditions' ? selectedConditions : selectedAllergies;
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    onFiltersChange({
      regions: category === 'regions' ? updated : selectedRegions,
      conditions: category === 'conditions' ? updated : selectedConditions,
      allergies: category === 'allergies' ? updated : selectedAllergies,
    });
  };

  const activeCount = selectedRegions.length + selectedConditions.length + selectedAllergies.length;

  const clearAll = () => {
    onFiltersChange({ regions: [], conditions: [], allergies: [] });
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-full px-4 py-3 bg-surface/80 backdrop-blur border border-text/20 rounded-2xl hover:border-primary transition-all duration-300 shadow-lg"
      >
        <svg className="w-6 h-6 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[90vw] max-w-md bg-surface/95 backdrop-blur rounded-2xl p-6 shadow-2xl border border-text/20 z-50 max-h-[70vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-text">Filters</h2>
            <div className="flex items-center gap-2">
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-text/70 hover:text-text transition-all duration-300"
                >
                  Clear
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="text-text/70 hover:text-text">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <FilterCategory label="Region" options={regions} selected={selectedRegions} onToggle={(v) => toggleFilter('regions', v)} />
            <FilterCategory label="Condition" options={conditions} selected={selectedConditions} onToggle={(v) => toggleFilter('conditions', v)} />
            <FilterCategory label="Allergy" options={allergies} selected={selectedAllergies} onToggle={(v) => toggleFilter('allergies', v)} />
          </div>
        </div>
      )}
    </div>
  );
}

function FilterCategory({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (value: string) => void }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-text/70 mb-3">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 px-4 py-2 bg-surface border border-text/20 rounded-2xl cursor-pointer hover:border-primary transition-all duration-300">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-sm text-text">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
