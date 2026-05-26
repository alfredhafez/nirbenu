import { cn } from '@/lib/utils';

export function Card({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/60 bg-white p-6',
        hover && 'transition-all duration-300 hover:shadow-lg hover:shadow-primary-50 hover:border-primary-200/50 hover:-translate-y-0.5',
        className,
      )}
    >
      {children}
    </div>
  );
}
