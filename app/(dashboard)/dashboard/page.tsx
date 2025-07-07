"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CoreService from '@/services/core.service';
import IntroCardsSection from '@/components/dashboard/index/IntroCardsSection';
import StatsCardsSection from '@/components/dashboard/index/StatsCardsSection';
import TodosSection from '@/components/dashboard/index/TodosSection';
import AnalyticsSection from '@/components/dashboard/index/AnalyticsSection';
import RecentActivitySection from '@/components/dashboard/index/RecentActivitySection';

// Updated interface to match our new data structure
interface DashboardData {
    stats: any[];
    featuresUsed: any[];
    fundabilityOverview: any[];
    recentActivity: any[];
    barChartData: any[]; 
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return; // Don't fetch if there's no user
            setIsLoading(true);
            try {
                // Pass the user object to our new "dashboard brain"
                const data = await CoreService.getDashboardData(user);
                setDashboardData(data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [user]); // Re-run this effect if the user object changes

    if (isLoading) {
        return <div className="text-center p-10">Loading Dashboard...</div>;
    }

    if (!dashboardData) {
        return <div className="text-center p-10">Failed to load dashboard data.</div>;
    }
    
    return (
        <div className="space-y-3">
            <IntroCardsSection />
            {/* Pass the new dynamic stats to the StatsCardsSection */}
            <StatsCardsSection stats={dashboardData.stats} />
            <TodosSection user={user} />
            
            <AnalyticsSection 
                featuresUsed={dashboardData.featuresUsed} 
                fundabilityOverview={dashboardData.fundabilityOverview} 
                barChartData={dashboardData.barChartData}
            />
            
            <RecentActivitySection recentActivity={dashboardData.recentActivity} />
        </div>
    );
}