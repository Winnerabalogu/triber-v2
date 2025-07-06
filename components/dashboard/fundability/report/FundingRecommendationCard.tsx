import { FileText } from "lucide-react";

export default function FundingRecommendationCard({ recommendations }: { recommendations: string[] }) {
    return (
        <div className="bg-background p-6 rounded-lg border border-foreground/60">
            <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary"/> Funding Recommendation
            </h3>
            <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{rec}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}