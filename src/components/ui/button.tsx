import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'teal';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] shadow-sm';

    const variants = {
      default: 'bg-[#0e4a7b] text-white hover:bg-[#0b3459] shadow-md hover:shadow-lg',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-sm',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
      ghost: 'hover:bg-slate-100 text-slate-700 shadow-none',
      link: 'text-[#0e4a7b] underline-offset-4 hover:underline shadow-none',
      teal: 'bg-[#0d9488] text-white hover:bg-[#0f766e] shadow-md hover:shadow-lg',
    };

    const sizes = {
      default: 'h-11 px-5 py-2.5',
      sm: 'h-9 px-3.5 text-xs rounded-lg',
      lg: 'h-13 px-8 text-base rounded-2xl',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
