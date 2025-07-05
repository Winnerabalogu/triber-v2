"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Info } from "lucide-react"
import { useModal } from "@/contexts/ModalContext"
import RadialScoreChart from "./RadialScoreChart"
import { cn } from "@/lib/utils"

interface ValuationReportProps {
  data: any
  onRestart: () => void
}

const scoreDetails = [
  { label: "Supply Chain Management", status: "Optimized", value: 78 },
  { label: "The Environmental Sustainability", status: "Optimized", value: 75 },
  { label: "Social Sustainability", status: "Emergent", value: 18 },
  { label: "Economic Sustainability", status: "Managed", value: 34 },
  { label: "Partnerships and Collaboration", status: "Optimized", value: 56 },
]

const goalTrackingItems = [
  {
    isComplete: true,
    title: "Define social sustainability goals and objectives",
    description: "These may include improving labor practices, protecting human rights...",
  },
  {
    isComplete: true,
    title: "Establish performance indicators",
    description: "These may include employee satisfaction, community engagement...",
  },
  {
    isComplete: false,
    title: "Set targets",
    description: "Set targets for each performance indicator that you have identified.",
  },
]

const StatusPill = ({ status }: { status: string }) => {
  const color =
    status === "Optimized"
      ? "bg-green-500/10 text-green-400"
      : status === "Managed"
        ? "bg-yellow-500/10 text-yellow-400"
        : "bg-red-500/10 text-red-400"
  return <span className={cn("px-2 py-1 text-xs font-medium rounded-full", color)}>{status}</span>
}

export default function ValuationReport({ data, onRestart }: ValuationReportProps) {  
  const { score: valuationAmount,businessName,type, ...formData } = data
  const scoreForGauge = Math.min(90, Math.floor((valuationAmount / 200000) * 100))
  const { openModal } = useModal()

  return (
    <div className="space-y-8">
      <div className="bg-background p-4 rounded-lg border border-foreground/60 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg text-foreground">{businessName || "Bowery Farming"}</h2>
          <p className="text-sm text-muted-foreground">Food, Greentech, Agriculture</p>
        </div>
        <Button onClick={() => openModal("valuation-report-preview", data)}>Download Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 bg-background p-6 rounded-lg border border-foreground/60">
          <h3 className="font-bold mb-4 text-foreground">Score by Information</h3>
          <div className="space-y-4">
            {scoreDetails.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-3 gap-4 items-center text-sm border-b border-foreground/60/50 pb-3 last:border-b-0 last:pb-0"
              >
                <span className="text-muted-foreground col-span-1 flex items-center gap-2">
                  {item.label} <Info className="w-3 h-3" />
                </span>
                <div className="text-center">
                  <StatusPill status={item.status} />
                </div>
                <span className="font-bold text-foreground text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>        
        <div className="md:col-span-2 bg-background p-8 rounded-lg border border-foreground/60 flex flex-col items-center justify-center">
         <h3 className="font-bold mb-4 text-foreground">Valuation Score Chart</h3>
          <RadialScoreChart score={scoreForGauge} valuation={valuationAmount} />
          <p className="text-sm text-muted-foreground mt-2">Valuation Score helps better understand company's sustainability maturity.</p>          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background p-6 rounded-lg border border-foreground/60">
          <h3 className="font-bold mb-4 text-foreground">Goal Tracking</h3>
          <div className="space-y-4">
            {goalTrackingItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle
                  className={cn(
                    "w-5 h-5 mt-1 flex-shrink-0",
                    item.isComplete ? "text-green-500" : "text-muted-foreground/30",
                  )}
                />
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>                
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background p-6 rounded-lg border border-foreground/60">
          <h3 className="font-bold mb-4 text-foreground">How to Improve?</h3>
          <p className="text-sm text-muted-foreground">
            Read our recommended articles, videos, case studies, and visit our partners links to learn ways to increase
            your score.
          </p>
          <Button variant="link" className="p-0 h-auto mt-2 text-primary">
            Go to Resources and Guidance →
          </Button>
        </div>
      </div>

      <div className="text-center pt-4">
        <Button onClick={onRestart}>Start New Valuation</Button>
      </div>
    </div>
  )
}
