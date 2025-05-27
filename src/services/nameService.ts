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
  
  // A API de ranking por localidade retorna dados gerais (todos os períodos consolidados)
  // não há separação por período específico nesta API
  const names = data[0].res.slice(0, 3).map((item) => ({
    name: item.nome,
    frequency: item.frequencia,
    ranking: item.ranking,
  }));
  
  result.push({
    period: "Todos os períodos",
    names: names,
  });
  
  return result;
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
