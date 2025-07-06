import { ShieldCheck } from "lucide-react";

const DetailItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
);

export default function DocumentationComplianceCard({ data }: { data: any }) {
    return (
        <div className="bg-background p-6 rounded-lg border border-foreground/60 h-full">
            <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-primary"/> Documentation & Compliance
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <DetailItem label="Business Plan" value={<span className="text-green-400">{data.hasBusinessPlan === 'Yes' ? 'Available' : 'N/A'}</span>} />
                <DetailItem label="Pitch Deck" value={<span className="text-green-400">{data.hasPitchDeck === 'Yes' ? 'Available' : 'N/A'}</span>} />
                <DetailItem label="5-Year Financials" value={<span className="text-green-400">{data.hasFinancialCashflow === 'Yes' ? 'Available' : 'N/A'}</span>} />
                <DetailItem label="Audited Financials" value={<span className="text-green-400">{data.hasAuditedFinancials === 'Yes' ? 'Available' : 'N/A'}</span>} />
                <DetailItem label="Legal Issues" value="No Issues" />
                <DetailItem label="Required Licenses" value="Not Applicable" />
            </div>
        </div>
    );
}