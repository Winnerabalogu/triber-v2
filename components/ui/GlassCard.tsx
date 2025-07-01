import { cn } from "@/lib/utils"; 
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

export default function GlassCard({ children, className, as: Component = 'div', ...props }: GlassCardProps) {
  return (
    <Component
      className={cn(
        "glass-card rounded-2xl transition-all duration-300",
        "hover:border-foreground/40 hover:shadow-md hover:shadow-foreground/20",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

