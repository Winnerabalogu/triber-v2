import { Users } from "lucide-react";

const RenderList = ({ items }: { items?: string[] }) => {
   if (!Array.isArray(items) || items.length === 0 || (items.length === 1 && !items[0])) {
        return <span className="text-muted-foreground">Not provided</span>;
    }
    return (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
            {items.map((item, index) => item && (
                <span key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>{item}
                </span>
            ))}
        </div>
    );
};

const DetailItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="text-sm font-semibold text-foreground mt-1">{value}</div>
    </div>
);

export default function BusinessStructureCard({ data }: { data: any }) {
    return (
        <div className="bg-background p-6 rounded-lg border border-foreground/60 h-full">
            <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary"/> Business Structure
            </h3>
            <div className="space-y-4">
                 <DetailItem label="Ownership" value={<RenderList items={data.ownership} />} />
                 <DetailItem label="Executive Management" value={<RenderList items={data.management} />} />
                 <DetailItem label="Board of Directors" value={<RenderList items={data.directors} />} />
                 <DetailItem label="Legal Advisers" value={<RenderList items={data.advisers} />} />
            </div>
        </div>
    );
}