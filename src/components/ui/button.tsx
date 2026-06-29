import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variants: Record<ButtonVariant, string> = {
  primary:   'bg-brand-600 text-white hover:bg-brand-700 shadow-sm active:scale-[0.98]',
  secondary: 'bg-surface-100 text-surface-700 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700',
  outline:   'border border-default bg-transparent text-primary hover:bg-tertiary',
  ghost:     'bg-transparent text-secondary hover:bg-tertiary hover:text-primary',
  danger:    'bg-danger text-white hover:bg-red-600 shadow-sm active:scale-[0.98]',
  success:   'bg-success text-white hover:bg-green-600 shadow-sm active:scale-[0.98]',
};

const sizes: Record<ButtonSize, string> = {
  xs:   'h-7 px-2.5 text-xs rounded-lg gap-1.5',
  sm:   'h-8 px-3 text-sm rounded-lg gap-2',
  md:   'h-9 px-4 text-sm rounded-xl gap-2',
  lg:   'h-11 px-5 text-base rounded-xl gap-2.5',
  icon: 'h-9 w-9 rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary', size = 'md', loading, icon, iconPosition = 'left',
  className, children, disabled, ...props
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none',
      variants[variant], sizes[size], className,
    )}
    {...props}
  >
    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
      <>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </>
    )}
  </button>
));
Button.displayName = 'Button';
