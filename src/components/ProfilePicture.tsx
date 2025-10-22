import { useRef, useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

interface ProfilePictureProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  editable?: boolean;
  onUpload?: (file: File) => void;
  priority?: boolean;
}

export default function ProfilePicture({ 
  src, 
  alt, 
  size = 'md', 
  className = '',
  editable = false,
  onUpload,
  priority = false
}: ProfilePictureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-24 h-24 text-2xl',
  };

  const handleClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div className="relative inline-block">
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-primary/20 flex items-center justify-center ${editable ? 'cursor-pointer' : ''} ${className}`} onClick={handleClick}>
        {src && !imageError ? (
          <Image 
            src={src} 
            alt={alt} 
            width={200} 
            height={200} 
            className="w-full h-full object-cover" 
            priority={priority}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-primary font-semibold">
            {alt.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      {editable && (
        <>
          <button
            onClick={handleClick}
            className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 hover:bg-primary/90 transition-colors"
          >
            <Camera size={16} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}