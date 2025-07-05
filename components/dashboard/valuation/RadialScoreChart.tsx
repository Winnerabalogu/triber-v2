"use client"

import { motion } from "framer-motion"
import CountUp from "@/components/count-up"
import { cn } from "@/lib/utils"

interface RadialScoreChartProps {
  score: number
  valuation: number
}

// Helper to get status text and color based on the 0-100 score
const getScoreInfo = (score: number) => {
  if (score <= 18) return { status: "Emergent", color: "text-red-400", pill: "bg-red-500/20 text-red-400" }
  if (score <= 42) return { status: "Managed", color: "text-yellow-400", pill: "bg-yellow-500/20 text-yellow-400" }
  return { status: "Optimized", color: "text-green-400", pill: "bg-green-500/20 text-green-400" }
}

// Helper function to describe an SVG arc
const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {
  const start = {
    x: x + radius * Math.cos((startAngle * Math.PI) / 180),
    y: y + radius * Math.sin((startAngle * Math.PI) / 180),
  }
  const end = {
    x: x + radius * Math.cos((endAngle * Math.PI) / 180),
    y: y + radius * Math.sin((endAngle * Math.PI) / 180),
  }
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
}

export default function RadialScoreChart({ score, valuation }: RadialScoreChartProps) {
  const { status, color } = getScoreInfo(score)

  // Normalize the 0-100 score to the gauge's range (0-90)
  const normalizedScore = Math.min(Math.max(score, 0), 90)
  const scorePercentage = normalizedScore / 90

  const startAngle = 135 
  const endAngle = 45 
  const totalAngle = 270 
  const scoreAngle = startAngle + scorePercentage * totalAngle

  // Calculate positions for the segments
  const redEndAngle = startAngle + (18 / 90) * totalAngle 
  const yellowEndAngle = startAngle + (42 / 90) * totalAngle 

  return (
    <div className="w-full max-w-sm mx-auto">    
      {/* Chart Container */}
      <div className="relative w-64 h-64 mx-auto">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <mask id="scoreMask">
              <motion.path
                d={describeArc(100, 100, 70, startAngle, scoreAngle)}
                fill="none"
                stroke="white"
                strokeWidth="20"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
              />
            </mask>
          </defs>          
          <g opacity="0.3">
            {/* Red segment (0-18) */}
            <path
              d={describeArc(100, 100, 70, startAngle, redEndAngle)}
              stroke="#ef4444"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
            {/* Yellow segment (18-42) */}
            <path
              d={describeArc(100, 100, 70, redEndAngle, yellowEndAngle)}
              stroke="#eab308"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
            {/* Green segment (42-90) */}
            <path
              d={describeArc(100, 100, 70, yellowEndAngle, endAngle)}
              stroke="#22c55e"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Active track (revealed by mask) */}
          <g mask="url(#scoreMask)">
            {/* Red segment (0-18) */}
            <path
              d={describeArc(100, 100, 70, startAngle, redEndAngle)}
              stroke="#ef4444"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
            {/* Yellow segment (18-42) */}
            <path
              d={describeArc(100, 100, 70, redEndAngle, yellowEndAngle)}
              stroke="#eab308"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
            {/* Green segment (42-90) */}
            <path
              d={describeArc(100, 100, 70, yellowEndAngle, endAngle)}
              stroke="#22c55e"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
          </g>
          {/* 0 marker */}
          <text x="45" y="175" fill="#9ca3af" fontSize="14" fontWeight="500">
            0
          </text>

          {/* 18 marker with red dot */}
          <circle cx="25" cy="93" r="4" fill="#ef4444" />
          <text x="2" y="95" fill="#9ca3af" fontSize="14" fontWeight="500">
            18
          </text>

          {/* 42 marker */}
          <text x="70" y="19" fill="#9ca3af" fontSize="14" fontWeight="500">
            42
          </text>

          {/* 90 marker */}
          <text x="179" y="130" fill="#9ca3af" fontSize="14" fontWeight="500">
            90
          </text>
        </svg>

        {/* Central Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn("text-6xl font-bold mb-2", color)}>
            <CountUp end={normalizedScore} duration={2} decimals={0} />
          </div>
          <span className={cn("text-lg font-medium", color)}>{status}</span>
        </div>
      </div>      
      <div className="text-center mt-8 space-y-2">
        <p className="text-muted-foreground text-sm">Last assessed on March 24, 2023</p>        
      </div>
    </div>
  )
}
