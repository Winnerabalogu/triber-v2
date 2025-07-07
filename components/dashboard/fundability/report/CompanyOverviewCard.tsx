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
                <DetailItem label="Legal Name" value={data.businessName || 'N/A'} />
                <DetailItem label="Registration" value={data.legalIdentity || 'N/A'} />
                <DetailItem label="Years of Operation" value={data.establishedDate || 'N/A'} />
                <DetailItem label="Company Size" value={`${data.employeeCount || 'N/A'} employees`} />
                <DetailItem label="Industry" value={data.industry || 'N/A'} />
                <DetailItem label="Location" value={data.businessAddress || 'N/A'} />
            </div>
        </div>
    );
}