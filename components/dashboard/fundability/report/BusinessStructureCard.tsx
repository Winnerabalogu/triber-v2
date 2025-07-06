// components/dashboard/fundability/report/BusinessStructureCard.tsx
import { Users } from "lucide-react";

const DetailItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
);

export default function BusinessStructureCard() {
    return (
        <div className="bg-background p-6 rounded-lg border border-foreground/60 h-full">
            <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary"/> Business Structure
            </h3>
            <div className="space-y-3">
                 <DetailItem label="Ownership" value={<span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>SAMUEL C.</span>} />
                 <DetailItem label="Executive management" value={<span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>SAMUEL C. <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>Uzoechina C.</span>} />
            </div>
        </div>
    );
}