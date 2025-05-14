
import { toast } from "sonner";

// Types
export interface NameFrequency {
  nome: string;
  sexo: string | null;
  localidade: string;
  res: Array<{
    periodo: string;
    frequencia: number;
  }>;
}

export interface NameRanking {
  localidade: string;
  sexo: string | null;
  res: Array<{
    nome: string;
    frequencia: number;
    ranking: number;
    periodo: string;
  }>;
}

// Base URL for IBGE API
const BASE_URL = "https://servicodados.ibge.gov.br/api/v2/censos/nomes";

/**
 * Fetch name frequency data from IBGE API
 * @param name The name to search for
 * @returns Promise with name frequency data
 */
export const getNameFrequency = async (name: string): Promise<NameFrequency[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(name)}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Erro ao buscar dados do nome");
    console.error("Error fetching name frequency:", error);
    return [];
  }
};

/**
 * Fetch name ranking data by location
 * @param location The location code (UF or municipality)
 * @returns Promise with name ranking data
 */
export const getNameRankingByLocation = async (location: string): Promise<NameRanking[]> => {
  try {
    const response = await fetch(`${BASE_URL}/ranking?localidade=${location}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Erro ao buscar ranking de nomes");
    console.error("Error fetching name ranking by location:", error);
    return [];
  }
};

/**
 * Fetch name frequency data with period filter
 * @param name The name to search for
 * @param period The period to filter by (e.g., "1930[1940")
 * @returns Promise with name frequency data
 */
export const getNameFrequencyByPeriod = async (
  name: string,
  period: string
): Promise<NameFrequency[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(name)}?periodo=${period}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Erro ao buscar dados do nome por período");
    console.error("Error fetching name frequency by period:", error);
    return [];
  }
};
