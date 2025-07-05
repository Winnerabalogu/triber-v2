interface InfoCardProps {
  title: string;
  description: string;
  className?: string;
}

export default function InfoCard({ title, description, className }: InfoCardProps) {
  return (
    <div className={`bg-background p-4 rounded-lg border border-foreground/60 h-full liquid-glass-card shadow-md shadow-foreground/20 ${className}`} >
        <h3 className="font-bold text-primary text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}