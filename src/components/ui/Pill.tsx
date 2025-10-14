import { X } from 'lucide-react';

interface PillProps {
  label: string;
  onRemove?: () => void;
  removable?: boolean;
}

export default function Pill({ label, onRemove, removable = true }: PillProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
      <span>{label}</span>
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-primary/30 rounded-full p-1 transition-colors duration-200"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}