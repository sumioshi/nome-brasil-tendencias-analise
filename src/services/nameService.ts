
import { NameFrequency, NameRanking } from "./ibgeService";

export interface ProcessedNameData {
  name: string;
  data: Array<{
    period: string;
    frequency: number;
  }>;
}

export interface RankingData {
  period: string;
  names: Array<{
    name: string;
    frequency: number;
    ranking: number;
  }>;
}

/**
 * Process name frequency data for charting
 * @param data The raw name frequency data from IBGE API
 * @returns Processed data for charts
 */
export const processNameFrequencyData = (data: NameFrequency[]): ProcessedNameData[] => {
  return data.map((item) => {
    return {
      name: item.nome,
      data: item.res.map((period) => ({
        period: period.periodo.replace("[", "-").replace(")", ""),
        frequency: period.frequencia,
      })),
    };
  });
};

/**
 * Format period string for better display
 * @param period The period string from API (e.g., "1930[1940")
 * @returns Formatted period string (e.g., "1930-1940")
 */
export const formatPeriod = (period: string): string => {
  return period.replace("[", "-").replace(")", "");
};

/**
 * Process name ranking data for table display
 * @param data The raw name ranking data from IBGE API
 * @returns Processed data for ranking tables
 */
export const processNameRankingData = (data: NameRanking[]): RankingData[] => {
  const result: RankingData[] = [];
  
  if (data.length === 0) return result;
  
  // Group by period
  const namesByPeriod: Record<string, any[]> = {};
  
  data[0].res.forEach((item) => {
    if (!namesByPeriod[item.periodo]) {
      namesByPeriod[item.periodo] = [];
    }
    
    namesByPeriod[item.periodo].push({
      name: item.nome,
      frequency: item.frequencia,
      ranking: item.ranking,
    });
  });
  
  // Convert to array format
  Object.entries(namesByPeriod).forEach(([period, names]) => {
    result.push({
      period: formatPeriod(period),
      names: names.slice(0, 3), // Get top 3 names
    });
  });
  
  return result.sort((a, b) => a.period.localeCompare(b.period));
};

/**
 * Generate period ranges for the decade selector
 * @returns Array of decade ranges from 1930 to 2010
 */
export const getDecadeOptions = () => {
  const decades = [];
  for (let year = 1930; year <= 2010; year += 10) {
    if (year === 2010) {
      decades.push({ 
        value: `${year}[`, 
        label: `${year} em diante` 
      });
    } else {
      decades.push({ 
        value: `${year}[${year + 10}`, 
        label: `${year}-${year + 10}` 
      });
    }
  }
  return decades;
};

/**
 * Create period range string for API
 * @param startDecade Start decade (e.g., 1930)
 * @param endDecade End decade (e.g., 2000)
 * @returns Period range string for API (e.g., "1930[1940,1940[1950,...")
 */
export const createPeriodRange = (startDecade: number, endDecade: number): string => {
  const periods = [];
  
  for (let year = startDecade; year < endDecade; year += 10) {
    if (year === 2010) {
      periods.push(`${year}[`);
    } else {
      periods.push(`${year}[${year + 10}`);
    }
  }
  
  return periods.join(',');
};
