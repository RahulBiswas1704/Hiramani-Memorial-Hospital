import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'teal' | 'success' | 'warning';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'border-transparent bg-[#0e4a7b] text-white',
    secondary: 'border-transparent bg-slate-100 text-slate-900',
    destructive: 'border-transparent bg-red-100 text-red-800 border border-red-200',
    outline: 'text-slate-800 border-slate-200',
    teal: 'border-transparent bg-teal-50 text-teal-800 border border-teal-200',
    success: 'border-transparent bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'border-transparent bg-amber-50 text-amber-900 border border-amber-200',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
