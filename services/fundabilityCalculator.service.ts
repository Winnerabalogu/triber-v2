import { User } from '@/lib/types';

/**
 * SCORING_MATRIX: The single source of truth for all fundability calculations.
 * This object translates form data into a weighted score.
 */
const SCORING_MATRIX: { [key: string]: any } = {
  // --- General & Business Structure ---
  legalIdentity: { 
    category: 'Structure',
    rules: { type: 'MAPPING', values: { 'LTD': 4.0, 'Enterprise': 2.0, 'Sole proprietorship': 1.0, 'others': 0.5 }}
  },
  establishedDate: {
    category: 'Structure',
    rules: { type: 'MAPPING', values: { '10+ years': 5.0, '5-10 years': 3.3, '3 - 5 Years': 2.3, '1-2 years': 1.3, 'under 1 year': 0.3 }}
  },
  employeeCount: {
    category: 'Structure',
    rules: { type: 'MAPPING', values: { '30+': 4.0, '10-20': 3.0, '5-10': 2.0, 'Under 5': 1.0 }}
  },
  hasLegalCases: { // Assuming this field name exists in the form data
    category: 'Structure',
    rules: { type: 'MAPPING', values: { 'No': 0, 'Yes': -5.0 }}
  },
  ownership: {
    category: 'Structure',
    rules: { type: 'LIST_COUNT', tiers: [{ threshold: 2, score: 3.3 }, { threshold: 1, score: 1.3 }] }
  },
  management: {
    category: 'Structure',
    rules: { type: 'LIST_COUNT', tiers: [{ threshold: 3, score: 3.3 }, { threshold: 1, score: 1.3 }] }
  },
  directors: {
    category: 'Structure',
    rules: { type: 'LIST_COUNT', tiers: [{ threshold: 4, score: 3.3 }, { threshold: 1, score: 1.3 }] }
  },

  // --- Financial Health ---
  businessStatus: { // Corresponds to "Startup Stage"
    category: 'Financials',
    rules: { type: 'MAPPING', values: { 'Post Revenue': 3.3, 'Pre-revenue': 1.3 }}
  },
  arr_ttm_1: { // Company ARR/TTM
    category: 'Financials',
    rules: { type: 'NUMERIC_TIERS', tiers: [{ threshold: 100000000, score: 3.3 }, { threshold: 50000000, score: 1.3 }, { threshold: 0, score: 0.3 }] }
  },
  arr_ttm_2: { // Revenue Growth Rate
    category: 'Financials',
    rules: { type: 'NUMERIC_TIERS', tiers: [{ threshold: 60, score: 3.3 }, { threshold: 40, score: 2.3 }, { threshold: 30, score: 1.3 }, { threshold: 0, score: 0.3 }] }
  },
  isProfitable: {
    category: 'Financials',
    rules: { type: 'MAPPING', values: { 'Yes': 3.3, 'No': 1.3 }}
  },
  hasHighGrowth: { // Is the Company Highly scalable?
    category: 'Financials',
    rules: { type: 'MAPPING', values: { 'Yes': 3.3, 'No': 0.3 }}
  },
  hasSolidAssets: {
    category: 'Financials',
    rules: { type: 'MAPPING', values: { 'Yes': 3.3, 'No': 0.3 }}
  },
  hasLargeInventory: {
    category: 'Financials',
    rules: { type: 'MAPPING', values: { 'Yes': 2.3, 'No': 0.3 }}
  },
  hasLiabilitiesDebt: { // Company Liabilities
    category: 'Financials',
    rules: { type: 'MAPPING', values: { 'No': 3.3, 'Yes': 1.3 }} // Higher score for NO debt
  },
  hasOwnerDebt: { // Owner Liabilities
    category: 'Financials',
    rules: { type: 'MAPPING', values: { 'No': 3.3, 'Yes': 0.3 }} // Higher score for NO debt
  },

  // --- Documentation & Compliance ---
  hasAuditedFinancials: {
    category: 'Documentation',
    rules: { type: 'MAPPING', values: { 'Yes': 4.0, 'No': 1.0 }}
  },
  hasPitchDeck: {
    category: 'Documentation',
    rules: { type: 'MAPPING', values: { 'Yes': 3.3, 'No': 0.3 }}
  },
  hasBusinessPlan: {
    category: 'Documentation',
    rules: { type: 'MAPPING', values: { 'Yes': 3.3, 'No': 0.3 }}
  },
  hasFinancialCashflow: {
    category: 'Documentation',
    rules: { type: 'MAPPING', values: { 'Yes': 3.3, 'No': 0.3 }}
  },
  // Document Uploads
  certOfIncorporation: { category: 'Documentation', rules: { type: 'DOCUMENT', uploaded: 3.3, missing: 0.3 }},
  memoOfAssoc: { category: 'Documentation', rules: { type: 'DOCUMENT', uploaded: 3.3, missing: 0.3 }},
  statusReport: { category: 'Documentation', rules: { type: 'DOCUMENT', uploaded: 3.3, missing: 0.3 }},
  letterOfGoodStanding: { category: 'Documentation', rules: { type: 'DOCUMENT', uploaded: 3.3, missing: 0.3 }},
  // Assuming these field names for the liability schedule uploads
  companyLiabilitySchedule: { category: 'Documentation', rules: { type: 'DOCUMENT', uploaded: 3.3, missing: 0.3 }},
  proprietorLiabilitySchedule: { category: 'Documentation', rules: { type: 'DOCUMENT', uploaded: 3.3, missing: 0.3 }},
  relevantLicenses: { category: 'Documentation', rules: { type: 'DOCUMENT', uploaded: 3.3, missing: 0.3 }},
};

/**
 * A generic helper to calculate the score for a single metric based on its rules.
 */
function calculateMetricScore(value: any, metricRules: any): number {
  if (!metricRules || !value) return 0;
  
  const { type, values, tiers, uploaded, missing } = metricRules;

  switch (type) {
    case 'MAPPING':
      return values[value] ?? 0;

    case 'NUMERIC_TIERS':
      const numValue = Number(value);
      if (isNaN(numValue)) return 0;
      for (const tier of tiers) {
        if (numValue >= tier.threshold) return tier.score;
      }
      return 0;

    case 'LIST_COUNT':
      const count = Array.isArray(value) ? value.filter(v => v).length : 0;
      for (const tier of tiers) {
        if (count >= tier.threshold) return tier.score;
      }
      return 0;
      
    case 'DOCUMENT':
      return value ? uploaded : missing;

    default:
      return 0;
  }
}


class FundabilityCalculator {
  /**
   * Calculates the overall fundability score and the detailed breakdown by category.
   * Returns an object containing the total score and the scores for each category.
   */
  static calculateAllScores(data: any): { totalScore: number; breakdown: any[] } {
    const categoryScores: { [key: string]: { score: number; maxScore: number } } = {
      'Structure': { score: 0, maxScore: 0 },
      'Financials': { score: 0, maxScore: 0 },
      'Documentation': { score: 0, maxScore: 0 },
    };

    // Calculate score for each metric and aggregate by category
    for (const fieldName in SCORING_MATRIX) {
      const metric = SCORING_MATRIX[fieldName];
      const category = metric.category;
      
      const score = calculateMetricScore(data[fieldName], metric.rules);
            
      let maxPossibleScore = 0;
      if (metric.rules.type === 'MAPPING') maxPossibleScore = Math.max(...Object.values(metric.rules.values) as number[]);
      else if (metric.rules.type === 'NUMERIC_TIERS' || metric.rules.type === 'LIST_COUNT') maxPossibleScore = metric.rules.tiers[0].score;
      else if (metric.rules.type === 'DOCUMENT') maxPossibleScore = metric.rules.uploaded;
      
      if (categoryScores[category]) {
        categoryScores[category].score += score;
        categoryScores[category].maxScore += maxPossibleScore > 0 ? maxPossibleScore : 0;
      }
    }
    
    // Calculate final breakdown as a percentage
    const breakdown = [
      { label: "Business Structure Clarity", value: Math.round((categoryScores['Structure'].score / categoryScores['Structure'].maxScore) * 100) },
      { label: "Financial Health", value: Math.round((categoryScores['Financials'].score / categoryScores['Financials'].maxScore) * 100) },
      { label: "Documentation & Compliance", value: Math.round((categoryScores['Documentation'].score / categoryScores['Documentation'].maxScore) * 100) },
    ];
    
    // Calculate total score as an average of the category percentages
    const totalScore = Math.round(breakdown.reduce((acc, cat) => acc + cat.value, 0) / breakdown.length);

    return { totalScore, breakdown };
  }

  static getGoalTrackingStatus(data: any, user: User | null) {
    const { breakdown } = this.calculateAllScores(data);
    const financialHealthValue = breakdown.find(s => s.label === 'Financial Health')?.value ?? 0;

   return [
      { 
        isComplete: user?.isProfileComplete ?? false, 
        title: "Complete All Profile Sections", 
        description: "A full profile builds trust and provides clarity to potential partners." 
      },
      { 
        isComplete: data.hasBusinessPlan === 'Yes' && data.hasPitchDeck === 'Yes', 
        title: "Upload Key Documents", 
        description: "Ensure your Pitch Deck and Business Plan are marked as available." 
      },
      {         
        isComplete: financialHealthValue >= 80, 
        title: "Achieve 'Optimized' Financial Health", 
        description: "Review financial inputs to improve your fundability score." 
      },
    ];
  }
}

export default FundabilityCalculator;