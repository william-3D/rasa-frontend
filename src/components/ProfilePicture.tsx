interface ProfilePictureProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProfilePicture({ 
  src, 
  alt, 
  size = 'md', 
  className = '' 
}: ProfilePictureProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-primary/20 flex items-center justify-center ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="text-primary font-semibold">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}