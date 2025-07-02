import { cn } from "@/lib/utils";

interface StatusPillProps {
  score: number;
  className?: string;
}

const getStatusInfo = (score: number) => {
    if (score < 40) return { text: "Emergent", className: "bg-red-500/10 text-red-500" };
    if (score < 70) return { text: "Managed", className: "bg-yellow-500/10 text-yellow-400" };
    return { text: "Optimized", className: "bg-green-500/10 text-green-400" };
};

export default function StatusPill({ score, className }: StatusPillProps) {
    const { text, className: colorClass } = getStatusInfo(score);
    
    return (
        <span className={cn("px-2.5 py-1 text-xs font-medium rounded-full", colorClass, className)}>
            {text}
        </span>
    );
};