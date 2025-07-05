"use client"
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MoreHorizontal } from 'lucide-react';

interface FeatureUsageData {
  name: string;
  value: number;
  progress: number;
  icon: React.ElementType;
}

interface FundabilityOverviewData {
  month: string;
  yourScore: number;
  averageScore: number;
}

interface AnalyticsSectionProps {
  featuresUsed: FeatureUsageData[];
  fundabilityOverview: FundabilityOverviewData[];
  barChartData: { name: string, views: number }[];
}

export default function AnalyticsSection({ featuresUsed, fundabilityOverview, barChartData }: AnalyticsSectionProps) {
 const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/80 backdrop-blur-sm border border-border p-3 rounded-lg shadow-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        {payload.map((pld: any) => (
          <div key={pld.dataKey} style={{ color: pld.stroke }} className="flex items-center gap-2 text-sm">
            <span>{pld.name}:</span>
            <span className="font-bold">{pld.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 bg-background border border-foreground/60 rounded-xl p-6 flex flex-col shadow-md shadow-foreground/20">
                {/* Top part: The Bar Chart */}
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <XAxis dataKey="name" hide />
                            <YAxis domain={[0, 500]} hide />
                            <Tooltip
                                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                contentStyle={{ 
                                    background: 'hsl(var(--background))', 
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: '0.5rem'
                                }}
                            />
                            <Bar dataKey="views" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} barSize={8} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Bottom part: Feature list with progress bars */}
                <div className="mt-6 pt-6 border-t border-muted-foreground">
                    <h3 className="font-bold text-foreground">Features Used</h3>
                    <p className="text-sm text-green-500">(3) last week</p>

                    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
                        {featuresUsed.map((feature, index) => (
                            <div key={index}>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <feature.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <span>{feature.name}</span>
                                </div>
                                <p className="text-2xl font-bold text-foreground mb-1">
                                    {feature.name.toLowerCase().includes('score') ? `${feature.value}%` : feature.value}
                                </p>
                                <div className="w-full bg-muted-foreground rounded-full h-1">
                                    <div className="bg-primary h-1 rounded-full" style={{ width: `${feature.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Chart: Fundability Overview */}
             <div className="lg:col-span-3 bg-background border border-foreground/60 rounded-xl p-4 flex flex-col shadow-md shadow-foreground/20">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-foreground">Fundability Overview</h3>
                        <p className="text-sm text-green-500">Increased by (+5) this year</p>
                    </div>
                     <button className="p-1 rounded-full text-muted-foreground hover:bg-muted">
                        <MoreHorizontal className="w-5 h-5"/>
                     </button>
                 </div>
                 

                 <div className="flex-grow">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={fundabilityOverview} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="fundabilityGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0fb492" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#0fb492" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis 
                                dataKey="month" 
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                            />
                            <YAxis 
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                domain={[0, 'dataMax + 50']} 
                            />
                            {/* tooltip */}
                            <Tooltip content={<CustomTooltip />} />                         
                            <Legend 
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{fontSize: "12px", paddingTop: "20px"}}
                            />
                                                       
                            <Area 
                                type="monotone" 
                                name="Your Score" 
                                dataKey="yourScore" 
                                stroke="hsl(var(--foreground))"
                                strokeWidth={2} 
                                fillOpacity={0} 
                                activeDot={{ r: 6 }}
                            />
                            <Area 
                                type="monotone" 
                                name="Average Score" 
                                dataKey="averageScore" 
                                stroke="#0fb492" 
                                strokeWidth={2} 
                                fillOpacity={1} 
                                fill="url(#fundabilityGradient)"
                                activeDot={{ r: 6 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        </div>
    )
}