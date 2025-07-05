import { CheckCircle, MoreHorizontal, Inbox } from 'lucide-react';

interface Activity {
  title: string;
  status1: string;
  status2: string;
  date: string;
  completion: number;
}

interface RecentActivitySectionProps {
  recentActivity: Activity[];
}

export default function RecentActivitySection({ recentActivity }: RecentActivitySectionProps) {
    return (
        <div className="bg-background border border-foreground/60 rounded-xl p-6 shadow-md shadow-foreground/20">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
                    <div className="flex items-center gap-2 text-sm text-green-500 mt-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>30 done this month</span>
                    </div>
                </div>
                <button className="text-muted-foreground"><MoreHorizontal className="w-5 h-5"/></button>
            </div>
            
            {recentActivity.length > 0 ? (
                <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                        {/* Table Headers */}
                        <div className="grid grid-cols-5 gap-4 text-xs font-semibold uppercase text-muted-foreground/80 border-b border-border pb-2 mb-4">
                            <div className="col-span-2">Activity</div>
                            <div>Status</div>
                            <div>Date</div>
                            <div className="text-right">Completion</div>
                        </div>
                        {/* Table Body */}
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="grid grid-cols-5 gap-4 items-center text-sm">
                                    <div className="col-span-2 font-medium text-foreground">{activity.title}</div>
                                    <div className="text-muted-foreground">{activity.status1}</div>
                                    <div className="text-muted-foreground">{activity.date}</div>
                                    <div className="text-right">
                                        <div className="font-medium text-foreground">{activity.completion}%</div>
                                        <div className="w-full bg-border rounded-full h-1 mt-1">
                                            <div className="bg-primary h-1 rounded-full" style={{ width: `${activity.completion}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // If there is NO activity, render the empty state
                <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed border-border rounded-lg shadow-md shadow-foreground/20">
                    <Inbox className="w-12 h-12 text-muted-foreground/50 mb-4" />
                    <h4 className="font-semibold text-foreground">No activity performed yet</h4>
                    <p className="text-sm text-muted-foreground mt-1">Your recent actions will appear here.</p>
                </div>
            )}
        </div>
    )
}