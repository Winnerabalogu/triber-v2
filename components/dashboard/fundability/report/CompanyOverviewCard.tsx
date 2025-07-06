import { Briefcase } from "lucide-react";

const DetailItem = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground break-words">{value}</p>
    </div>
);

export default function CompanyOverviewCard({ data }: { data: any }) {
    return (
        <div className="bg-background p-6 rounded-lg border border-foreground/60 h-full">
            <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary"/> Company Overview
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <DetailItem label="Legal Name" value={data.businessName || "JASON PORSH BESPOKE LTD"} />
                <DetailItem label="Registration" value={data.legalIdentity || "LTD"} />
                <DetailItem label="Years of Operation" value={data.establishedDate || "2012 years"} />
                <DetailItem label="Company Size" value={`${data.teamSizeConfidential || '31'} employees`} />
                <DetailItem label="Industry" value={data.industry || "MANUFACTURING, TEXTILE"} />
                <DetailItem label="Location" value={data.hqAddress || "Lagos, Nigeria"} />
            </div>
        </div>
    );
}