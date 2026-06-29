import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label, error, hint, leftIcon, rightIcon, className, ...props
}, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-medium text-secondary">{label}</label>}
    <div className="relative">
      {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{leftIcon}</span>}
      <input
        ref={ref}
        className={cn(
          'w-full h-9 px-3 text-sm bg-elevated border border-default rounded-xl text-primary placeholder:text-muted',
          'transition-all duration-150 outline-none',
          'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-danger focus:border-danger focus:ring-danger/20',
          leftIcon && 'pl-9',
          rightIcon && 'pr-9',
          className,
        )}
        {...props}
      />
      {rightIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">{rightIcon}</span>}
    </div>
    {error && <p className="text-xs text-danger">{error}</p>}
    {hint && !error && <p className="text-xs text-muted">{hint}</p>}
  </div>
));
Input.displayName = 'Input';
