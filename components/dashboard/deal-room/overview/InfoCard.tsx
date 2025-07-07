import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function InfoCard({ title, icon: Icon, children }: InfoCardProps) {
  return (
    <div className="bg-background/50 border border-border p-6 rounded-lg liquid-glass-card shadow-md shadow-foreground/20">
      <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}