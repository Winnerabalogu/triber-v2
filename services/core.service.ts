import { Eye, FileText, Link2, Target } from "lucide-react";
import { FundabilityHistoryItem, Investor, User, ValuationHistoryItem } from '@/lib/types';
import FundabilityCalculator from './fundabilityCalculator.service';
import NotificationService from './notification.service';
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
const mockInvestors: Investor[] = [
  { id: 'inv_1', name: 'Amina Halim', company: 'Helios Investors', updatedAt: 'Jan 4', summary: 'Focused on high-growth technology and consumer goods across Africa.', locations: ['Lagos', 'Nairobi'], fundsUnderManagement: 750000000, rating: 4.8, reviewCount: 192, investorType: 'PE Firm', industryPreferences: ['Fintech', 'Retail', 'Logistics'], investmentSize: { min: 5000000, max: 20000000 }, avatarUrl: '/avatars/investor1.png', isVerified: true, professionalSummary: 'Helios Investors is one of the largest Africa-focused private investment firms, with a track record of building profitable and sustainable businesses.' },
  { id: 'inv_2', name: 'Babatunde Cole', company: 'EchoVC Partners', updatedAt: 'Jan 2', summary: 'Seed and early-stage venture capital for tech startups building the future.', locations: ['Lagos', 'Accra'], fundsUnderManagement: 50000000, rating: 4.5, reviewCount: 130, investorType: 'VC', industryPreferences: ['SaaS', 'AI', 'Healthcare'], investmentSize: { min: 100000, max: 1000000 }, avatarUrl: '/avatars/investor2.png', isVerified: true, professionalSummary: 'EchoVC Partners invests in underrepresented founders and underserved markets.' },
  { id: 'inv_3', name: 'Chidinma Okoro', company: 'TLcom Capital', updatedAt: 'Dec 28', summary: 'Investing in tech-enabled solutions for Africa’s biggest challenges.', locations: ['London', 'Lagos'], fundsUnderManagement: 150000000, rating: 4.6, reviewCount: 210, investorType: 'VC', industryPreferences: ['Education', 'Energy', 'Fintech'], investmentSize: { min: 500000, max: 5000000 }, avatarUrl: '/avatars/investor3.png', isVerified: false, professionalSummary: 'TLcom Capital is a venture capital firm with a focus on technology-enabled services and innovation for Sub-Saharan Africa.' },
  { id: 'inv_4', name: 'David Adeboye', company: 'Savannah Fund', updatedAt: 'Dec 22', summary: 'Early-stage fund backing Africa\'s most ambitious founders.', locations: ['Cape Town', 'Lagos'], fundsUnderManagement: 25000000, rating: 4.2, reviewCount: 88, investorType: 'Angel', industryPreferences: ['Marketplace', 'eCommerce', 'Media'], investmentSize: { min: 25000, max: 250000 }, avatarUrl: '/avatars/investor4.png', isVerified: true, professionalSummary: 'Savannah Fund is a seed capital fund specializing in US$25,000–US$500,000 investments in early-stage high-growth technology startups in sub-Saharan Africa.'},
  // ... I would add 10-15 more diverse investors here to ensure a full page
];
for (let i = 5; i <= 20; i++) {
  mockInvestors.push({ ...mockInvestors[i % 4], id: `inv_${i}`, name: `Investor ${i}`, company: `Capital Firm ${i}` });
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

  async getDashboardData(user: User | null): Promise<any> {
    console.log("Constructing DYNAMIC dashboard data...");
    
    const [fundabilityHistory, valuationHistory] = await Promise.all([
      this.getFundabilityHistory(),
      this.getValuationHistory(),
    ]);
    
    const latestFundabilityScore = fundabilityHistory[0]?.score || 0;
    const latestValuationScore = valuationHistory[0]?.score || 0;
    
    const dynamicStats = [
      { label: "Profile Views", value: 32, icon: Eye }, 
      { label: "Fundability Test Score", value: latestFundabilityScore, icon: FileText },
      { label: "Valuation Score", value: latestValuationScore, icon: Target },
      { label: "Listed Connections", value: 5, icon: Link2 }, 
    ];

    const featuresUsed = dynamicStats.map(stat => ({
        name: stat.label,
        value: stat.value,
        progress: stat.value, 
        icon: stat.icon,
    }));
    
    const fundabilityActivities = fundabilityHistory.map(item => ({
      title: `Fundability Test: ${item.name}`,
      status1: item.status,
      status2: "Fundability",
      date: item.date,
      completion: 100,
    }));
    
    const valuationActivities = valuationHistory.map(item => ({
      title: `Valuation: ${item.name}`,
      status1: item.status,
      status2: "Valuation",
      date: item.date,
      completion: 100,
    }));

    const recentActivity = [...fundabilityActivities, ...valuationActivities]      
      .sort((a, b) => b.date.localeCompare(a.date)) 
      .slice(0, 5); 
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          stats: dynamicStats,
          featuresUsed: featuresUsed,
          recentActivity: recentActivity.length > 0 ? recentActivity : mockRecentActivity.slice(0, 3),                  
          fundabilityOverview: mockFundabilityOverviewData,
          barChartData: mockBarChartData,
          introCards: mockDashboardData.introCards,
        });
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
        const score = Math.floor(Math.random() * 40) + 50;

        return new Promise(resolve => {
            setTimeout(() => {                
                NotificationService.addSystemNotification({
                    type: 'valuation_report',
                    text: `Your valuation report for ${data.businessName || 'your business'} is ready.`,
                });

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
              };NotificationService.addSystemNotification({
                    type: 'fundability_report',
                    text: `Your fundability report for ${data.businessName || 'your business'} is ready.`,
                });

                resolve(reportData);
            }, 1500);
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

   async getInvestors(filters: { name?: string; location?: string; industry?: string; investorType?: string; }): Promise<{ investors: Investor[], total: number }> {
        console.log("[CoreService] Fetching investors with filters:", filters);
        let filteredInvestors = mockInvestors.filter(inv => {
            const nameMatch = !filters.name || inv.name.toLowerCase().includes(filters.name.toLowerCase()) || inv.company.toLowerCase().includes(filters.name.toLowerCase());
            const locationMatch = !filters.location || inv.locations.includes(filters.location);
            const industryMatch = !filters.industry || inv.industryPreferences.includes(filters.industry);
            const typeMatch = !filters.investorType || inv.investorType === filters.investorType;
            return nameMatch && locationMatch && industryMatch && typeMatch;
        });
        return new Promise(resolve => setTimeout(() => resolve({ investors: filteredInvestors, total: filteredInvestors.length }), 500));
    }

    async getInvestorById(id: string): Promise<Investor | undefined> {
        console.log(`[CoreService] Fetching investor by ID: ${id}`);
        return new Promise(resolve => setTimeout(() => resolve(mockInvestors.find(inv => inv.id === id)), 300));
    }
    async submitProposal(proposalData: any): Promise<{ success: boolean }> {
        console.log("[CoreService] Submitting new proposal:", proposalData);

        // MOCK API LOGIC
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate a potential failure
                if (!proposalData.toInvestorId) {
                    return reject(new Error("Investor ID is missing."));
                }
                console.log("Proposal successfully logged on server.");
                resolve({ success: true });
            }, 1500); // Simulate network latency
        });

        // ** REAL API CALL **
        // const response = await api.post('/proposals', proposalData);
        // return response.data;
    }
     async toggleInvestorWishlist(investorId: string, isWishlisted: boolean): Promise<{ success: boolean }> {
        if (isWishlisted) {
            console.log(`[CoreService] Removing investor ${investorId} from wishlist.`);
        } else {
            console.log(`[CoreService] Adding investor ${investorId} to wishlist.`);
        }

        // MOCK API: Just returns success
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true });
            }, 500);
        });
    }
    async getWishlistedInvestors(): Promise<Investor[]> {
        console.log("[CoreService] Fetching wishlisted investors...");
        // MOCK LOGIC: In a real app, this would be an API call.
        // For now, we'll return the first 3 investors from our main mock list.
        return new Promise(resolve => {
            setTimeout(() => resolve(mockInvestors.slice(0, 3)), 500);
        });
    }
}

export default new CoreService();