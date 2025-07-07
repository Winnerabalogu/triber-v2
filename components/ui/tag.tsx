import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return (
    <div className={cn(
      "inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full",
      className
    )}>
      {children}
    </div>
  );
}