interface RecipeCardProps {
  title: string;
  description: string;
  region: string;
  imageUrl: string;
}

export default function RecipeCard({ title, description, region, imageUrl }: RecipeCardProps) {
  return (
    <div className="group h-full flex flex-col bg-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-white">
          {region}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-text mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-text/60 line-clamp-3">{description}</p>
      </div>
    </div>
  );
}
