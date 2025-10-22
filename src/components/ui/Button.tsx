interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  className = ''
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = variant === 'primary' 
    ? 'bg-primary text-background hover:bg-primary/90 focus:ring-primary/50' 
    : 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
}