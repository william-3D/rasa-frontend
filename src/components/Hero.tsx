interface HeroProps {
  title: string;
  subtitle: string;
  filterPills?: React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterButton?: React.ReactNode;
}

export default function Hero({ title, subtitle, filterPills, searchValue, onSearchChange, filterButton }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-primary/20 to-surface/50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-text mb-4">{title}</h1>
        <p className="text-xl text-text/70 mb-4">{subtitle}</p>
        {filterPills && <div className="mb-8">{filterPills}</div>}
        <div className="flex gap-3 max-w-2xl">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 px-6 py-4 bg-surface/80 backdrop-blur border border-text/20 rounded-2xl text-text placeholder:text-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-lg"
          />
          {filterButton}
        </div>
      </div>
    </div>
  );
}
