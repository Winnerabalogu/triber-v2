"use client"

import { Button } from "@/components/ui/button";
import { CheckCircle, Info } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { useAuth } from "@/contexts/AuthContext";
import RadialScoreChart from "../valuation/RadialScoreChart";
import StatusPill from "@/components/ui/status-pill";
import { cn } from "@/lib/utils";
import CoreService from "@/services/core.service";
import FundabilityCalculator from "@/services/fundabilityCalculator.service"
import CompanyOverviewCard from "./report/CompanyOverviewCard";
import BusinessStructureCard from "./report/BusinessStructureCard";
import FinancialHealthCard from "./report/FinancialHealthCard";
import DocumentationComplianceCard from "./report/DocumentationComplianceCard";
import FundingRecommendationCard from "./report/FundingRecommendationCard";
interface FundabilityReportProps {
  data: any;
  onRestart: () => void;
}

export default function FundabilityReport({ data, onRestart }: FundabilityReportProps) {
  const { businessName , method, type} = data;
  const { openModal } = useModal();
  const { user } = useAuth();
  const recommendations = CoreService.getFundingRecommendations(data);
   const { totalScore, breakdown } = FundabilityCalculator.calculateAllScores(data);
  const goalTrackingItems = FundabilityCalculator.getGoalTrackingStatus(data, user);

  return (
    <div className="space-y-8">      
      <div className="bg-background p-4 rounded-lg border border-foreground/60 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-foreground text-lg">{businessName || "Your Business"} Fundability</h2>
          <p className="text-sm text-muted-foreground">Fundability Test Report</p>
        </div>
        <Button onClick={() => openModal("download-report-preview", data)}>Download Report</Button>
      </div>            
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">        
        <div className="space-y-6">
            <CompanyOverviewCard data={data} />
            <BusinessStructureCard data={data} />
        </div>        
        <div className="space-y-6">
            <FinancialHealthCard data={data} />
            <DocumentationComplianceCard data={data} />
        </div>
      </div>        
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 bg-background p-6 rounded-lg border border-foreground/60">
          <h3 className="font-bold mb-4 text-foreground">Score by Information</h3>
          <div className="space-y-4">
            
            {breakdown.map((item) => (
              <div key={item.label} className="grid grid-cols-3 gap-4 items-center text-sm border-b border-foreground/60/50 pb-3 last:border-b-0 last:pb-0">
                <span className="text-muted-foreground col-span-1 flex items-center gap-2">{item.label} <Info className="w-3 h-3" /></span>
                <div className="text-center"><StatusPill score={item.value} /></div>
                <span className="font-bold text-foreground text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>        
        <div className="md:col-span-2 bg-background p-6 rounded-lg border border-foreground/60 flex flex-col items-center justify-center text-center">
          <h3 className="font-bold mb-4 text-foreground">Fundability Score Chart</h3>
            <RadialScoreChart score={totalScore} valuation={totalScore} />
          <p className="text-sm text-muted-foreground mt-4 max-w-xs mx-auto">This score reflects your business's readiness for investment and partnerships.</p>
        </div>
      </div>      
      <div>
        <FundingRecommendationCard recommendations={recommendations} />
      </div>        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background p-6 rounded-lg border border-foreground/60">
          <h3 className="font-bold mb-4 text-foreground">Goal Tracking</h3>
          <div className="space-y-4">
            {/* THIS IS NOW DYNAMIC */}
            {goalTrackingItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle
                  className={cn("w-5 h-5 mt-1 flex-shrink-0", item.isComplete ? "text-green-500" : "text-muted-foreground/30")}
                />
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-background p-6 rounded-lg border border-foreground/60">
          <h3 className="font-bold mb-4 text-foreground">How to Improve?</h3>
          <p className="text-sm text-muted-foreground">Read our recommended articles and case studies to learn ways to increase your fundability score.</p>
          <Button variant="link" className="p-0 h-auto mt-2 text-primary">Go to Resources and Guidance →</Button>
        </div>
      </div>
      <div className="text-center pt-4">
        <Button onClick={onRestart}>Start New Fundability Test</Button>
      </div>
    </div>
  )
}