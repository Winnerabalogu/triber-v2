import { Activity } from "lucide-react";

const DetailItem = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
);

export default function FinancialHealthCard({ data }: { data: any }) {
     return (
        <div className="bg-background p-6 rounded-lg border border-foreground/60 h-full">
           <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
               <Activity className="w-5 h-5 text-primary"/> Financial Health
           </h3>
           <div className="grid grid-cols-2 gap-y-4 gap-x-2">
               <DetailItem label="Average Annual Revenue" value={data.arr_ttm_1 ? `$${Number(data.arr_ttm_1).toLocaleString()}` : 'M68,408,180'} />
               <DetailItem label="Revenue Growth Rate" value="24%" />
               <DetailItem label="Profitable (3+ Years)" value={data.isProfitable || 'Yes'} />
               <DetailItem label="High Scalability" value={data.hasHighGrowth || 'Yes'} />
               <DetailItem label="Solid Asset Holdings" value={data.hasSolidAssets || 'No'} />
               <DetailItem label="Current Liabilities" value={data.hasLiabilitiesDebt || 'Yes'} />
           </div>
       </div>
    );
}