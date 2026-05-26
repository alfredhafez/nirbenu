import { cn } from '@/lib/utils';

export function Badge({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: string;
}) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
      variant === 'default' && 'bg-primary-100 text-primary-700',
      variant === 'success' && 'bg-emerald-100 text-emerald-700',
      variant === 'warning' && 'bg-amber-100 text-amber-700',
      variant === 'danger' && 'bg-red-100 text-red-700',
      variant === 'secondary' && 'bg-slate-100 text-slate-600',
      className,
    )}>
      {children}
    </span>
  );
}
