import { Eye, FileText, Link2, Target } from "lucide-react";
import { FundabilityHistoryItem, ValuationHistoryItem } from '@/lib/types';
import FundabilityCalculator from './fundabilityCalculator.service';
// import api from './api';
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

interface ActivityData {
  title: string;
  status1: string;
  status2: string;
  date: string;
  completion: number;
}

interface BarChartItem {
    name: string;
    views: number;
}


const mockFeaturesUsedData: FeatureUsageData[] = [
  { name: 'Profile Views', value: 32, progress: 32, icon: Eye },
  { name: 'Fundability Test Score', value: 12, progress: 12, icon: FileText },
  { name: 'Listed Connections', value: 5, progress: 5, icon: Link2 },
  { name: 'Valuation Score', value: 40, progress: 40, icon: Target },
];
const mockValuationHistory: ValuationHistoryItem[] = [
  { id: 'val_1', name: "Bowery Farming", type: 'Startup', method: 'Berkus Method', date: '14th June 2025', score: 78, status: 'Completed' },
  { id: 'val_2', name: "Jumia CO.", type: 'SME', method: 'Cash Flow Method', date: '10th May 2025', score: 58, status: 'Completed' },
  { id: 'val_3', name: "Innovate Capital", type: 'Startup', method: 'VC Method', date: '2nd April 2025', score: 92, status: 'Completed' },
];

const mockFundabilityOverviewData: FundabilityOverviewData[] = [
  { month: 'Jan', yourScore: 220, averageScore: 200 },
  { month: 'Feb', yourScore: 180, averageScore: 230 },
  { month: 'Mar', yourScore: 280, averageScore: 210 },
  { month: 'Apr', yourScore: 250, averageScore: 330 },
  { month: 'May', yourScore: 350, averageScore: 400 },
  { month: 'Jun', yourScore: 320, averageScore: 450 },
  { month: 'Jul', yourScore: 380, averageScore: 300 },
  { month: 'Aug', yourScore: 330, averageScore: 250 },
  { month: 'Sep', yourScore: 200, averageScore: 310 },
  { month: 'Oct', yourScore: 150, averageScore: 360 },
  { month: 'Nov', yourScore: 190, averageScore: 420 },
  { month: 'Dec', yourScore: 280, averageScore: 440 },
];

const mockRecentActivity: ActivityData[] = [
    { title: "Chakra Soft Technologies", status1: "Completed", status2: "Funded", date: "14th June 2025", completion: 100 },
      { title: "Chakra Soft Technologies", status1: "Completed", status2: "Funded", date: "14th June 2025", completion: 100 },
    { title: "Valuation of Business", status1: "Not Completed", status2: "Yet to Complete Valuation", date: "14th June 2025", completion: 10 },
    { title: "Business Registration", status1: "Pending Review", status2: "Profile Registration", date: "14th June 2025", completion: 50 },
    { title: "Deal Room Profile Creation", status1: "Completed", status2: "Deal Room Profile Approved", date: "14th June 2025", completion: 100 },
    { title: "Proposal Submitted Successfully", status1: "Pending", status2: "Proposal Awaiting Review", date: "14th June 2025", completion: 25 },
    { title: "Business Registered Successfully", status1: "Completed", status2: "Profile Registered Successfully", date: "14th June 2025", completion: 100 }    
];
const mockBarChartData: BarChartItem[] = [
    { name: 'W1', views: 320 }, { name: 'W2', views: 220 }, { name: 'W3', views: 120 },
    { name: 'W4', views: 290 }, { name: 'W5', views: 500 }, { name: 'W6', views: 420 },
    { name: 'W7', views: 480 }, { name: 'W8', views: 290 }, { name: 'W9', views: 150 },
];
const mockDashboardData = {
  introCards: [
    { title: "Ready to take your business to the next level", description: ["Complete the fundability test", "Get your valuation score in just a few clicks", "Go to the Deal Room to explore"], featured: true },
    { title: "Sell your business, Find Investors", description: "List, connect and close deals with top investors today!", featured: false },
    { title: "Buy a business, Invest in a business", description: "Find opportunities, connect with founders, and grow your portfolio.", featured: false },
    { title: "Deal Room: Send proposals to businesses and investors", description: "Connect, Negotiate, and Finalize investments all in one place", featured: false },
],
  stats: [
    { label: "Profile Views", value: 0, icon: Eye },
    { label: "Fundability Test Score", value: 0, icon: FileText },
    { label: "Listed Connections", value: 0, icon: Link2 },
    { label: "Valuation Score", value: 0, icon: Target },
],
 featuresUsed: mockFeaturesUsedData,
  fundabilityOverview: mockFundabilityOverviewData,
  recentActivity: mockRecentActivity,
  barChartData: mockBarChartData,  
};
const mockFundabilityHistory: FundabilityHistoryItem[] = [
    { id: 'fun_1', name: "Jumia CO. Fundability", type: 'SME', date: '15th July 2025', score: 88, status: 'Completed' },
    { id: 'fun_2', name: "Bowery Farming Fundability", type: 'Startup', date: '1st July 2025', score: 72, status: 'Completed' },
];

class CoreService {
  async getDashboardData(): Promise<typeof mockDashboardData> {
    console.log("Fetching mock dashboard data...");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockDashboardData);
      }, 500); 
    });
  }
   async getValuationHistory(): Promise<ValuationHistoryItem[]> {
    console.log("[CoreService] Fetching valuation history...");
    // REAL API CALL: return (await api.get('/valuations/history')).data;
    return new Promise(resolve => setTimeout(() => resolve(mockValuationHistory), 1000));
  }

  async submitValuationForm(data: any): Promise<{ score: number; reportData: any }> {
    console.log("[CoreService] Calculating valuation from form data:", data);
    
    // MOCK CALCULATION LOGIC: This will be moved into the form component
    // but the service simulates receiving data and returning a result.
    const score = Math.floor(Math.random() * 40) + 50;
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                score,
                reportData: { title: "Valuation Report", score, ...data }
            });
        }, 1500);
    });
  }

   async uploadDocument(file: File, onProgress: (progress: number) => void): Promise<{ success: boolean, url: string }> {
        console.log(`[CoreService] Simulating upload for: ${file.name}`);
        return new Promise(resolve => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 20;
                onProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    console.log(`[CoreService] Upload complete for: ${file.name}`);
                    resolve({ success: true, url: `/documents/${file.name}` });
                }
            }, 300);
        });
    }

    async submitFundabilityTest(data: any): Promise<any> { 
      console.log("[CoreService] Calculating fundability from test data:", data);
         const { totalScore } = FundabilityCalculator.calculateAllScores(data);
       return new Promise(resolve => {
          setTimeout(() => {             
              const reportData = {
                  ...data,
                  score: totalScore,
              };
              console.log("[CoreService] Test processed. Returning report data:", reportData);
              resolve(reportData);
          }, 1000);
      });
  }

    async getFundabilityHistory(): Promise<FundabilityHistoryItem[]> {
        console.log("[CoreService] Fetching fundability history...");
        return new Promise(resolve => setTimeout(() => resolve(mockFundabilityHistory), 1000));
    }
     getFundingRecommendations(formData: any): string[] {
        const recommendations: string[] = [];
        const score = formData.score || 0; 
      
        if (score < 60) {
            recommendations.push("Your business shows moderate fundability. Consider angel investors, government grants, or asset-backed loans.");
        } else if (score < 85) {
            recommendations.push("Your business is attractive to a range of investors. Focus on networking with VCs and preparing for due diligence.");
        } else {
            recommendations.push("Your business has high fundability. You are in a strong position to negotiate terms with top-tier investors.");
        }
        if (formData.hasAuditedFinancials === 'No') {
            recommendations.push("Improving your documentation by getting audited financial statements could significantly increase your funding options.");
        }
        if (formData.hasBusinessPlan === 'No') {
            recommendations.push("Develop a comprehensive business plan to clearly articulate your vision and strategy to investors.");
        }
        if (Number(String(formData.arr_ttm_1 || '0').replace(/,/g, '')) < 50000) {
            recommendations.push("Focus on increasing your Annual Recurring Revenue to demonstrate market traction and product-market fit.");
        }

        return recommendations.slice(0, 2); 
    }
}

export default new CoreService();