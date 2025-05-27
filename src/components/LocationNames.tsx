
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import Loading from './Loading';
import { getNameRankingByLocation } from '@/services/ibgeService';
import { processNameRankingData } from '@/services/nameService';

const LocationNames: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>('');

  const validateLocationCode = (code: string): boolean => {
    const trimmedCode = code.trim();
    // UF codes: 2 digits (11-99)
    if (trimmedCode.length === 2 && /^\d{2}$/.test(trimmedCode)) {
      const numCode = parseInt(trimmedCode);
      return numCode >= 11 && numCode <= 99;
    }
    // Municipality codes: 7 digits
    if (trimmedCode.length === 7 && /^\d{7}$/.test(trimmedCode)) {
      return true;
    }
    return false;
  };

  const handleSearch = async () => {
    const trimmedLocation = location.trim();
    
    if (!trimmedLocation) {
      toast.error('Por favor, informe um código de localidade');
      return;
    }
    
    if (!validateLocationCode(trimmedLocation)) {
      toast.error('Código inválido. Use 2 dígitos para UF (11-99) ou 7 dígitos para município');
      return;
    }
    
    setLoading(true);
    setRankingData([]);
    setLocationName('');
    
    try {
      console.log('Fetching data for location:', trimmedLocation);
      const response = await getNameRankingByLocation(trimmedLocation);
      console.log('API Response:', response);
      
      if (!response || response.length === 0) {
        setRankingData([]);
        toast.error('Nenhum dado encontrado para esta localidade. Verifique o código informado.');
        return;
      }
      
      const processedData = processNameRankingData(response);
      console.log('Processed data:', processedData);
      
      if (processedData.length === 0) {
        toast.error('Não foi possível processar os dados desta localidade');
        return;
      }
      
      setRankingData(processedData);
      setLocationName(response[0].localidade || 'Localidade');
      toast.success(`Dados carregados com sucesso para ${response[0].localidade || 'a localidade'}`);
      
    } catch (error) {
      console.error('Error fetching location names data:', error);
      toast.error('Erro ao buscar dados. Verifique sua conexão e tente novamente.');
      setRankingData([]);
      setLocationName('');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ranking de Nomes por Localidade</CardTitle>
        <CardDescription>
          Consulte os três nomes mais frequentes por período em uma localidade específica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-3">
            <Label htmlFor="location">Código da Localidade</Label>
            <Input
              id="location"
              placeholder="Ex: 33 (Rio de Janeiro) ou 3304557 (Rio de Janeiro cidade)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="mt-1"
            />
            <div className="text-xs text-gray-500 mt-2 space-y-1">
              <p><strong>Estados (UF):</strong> Use 2 dígitos - Ex: 33 (RJ), 35 (SP), 31 (MG)</p>
              <p><strong>Municípios:</strong> Use 7 dígitos - Ex: 3304557 (Rio de Janeiro), 3550308 (São Paulo)</p>
            </div>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleSearch} 
              className="w-full"
              disabled={loading || !location.trim()}
            >
              {loading ? 'Buscando...' : 'Buscar Dados'}
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          {loading ? (
            <Loading message="Buscando dados da localidade..." />
          ) : rankingData.length > 0 ? (
            <>
              <h3 className="text-lg font-medium mb-4">
                Top 3 Nomes Mais Frequentes - {locationName}
              </h3>
              <Table>
                <TableCaption>
                  Ranking dos 3 nomes mais populares por período na localidade selecionada
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Período</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="w-[80px]">Ranking</TableHead>
                    <TableHead className="text-right w-[120px]">Frequência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankingData.map((period) => (
                    period.names.map((nameItem, nameIndex) => (
                      <TableRow key={`${period.period}-${nameItem.name}`}>
                        {nameIndex === 0 ? (
                          <TableCell 
                            rowSpan={period.names.length} 
                            className="font-medium align-top"
                          >
                            {period.period}
                          </TableCell>
                        ) : null}
                        <TableCell className="font-medium">{nameItem.name}</TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                            {nameItem.ranking}°
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {new Intl.NumberFormat('pt-BR').format(nameItem.frequency)}
                        </TableCell>
                      </TableRow>
                    ))
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 border border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-medium">Nenhum dado para exibir</p>
                <p className="text-sm mt-2">Digite um código de localidade válido e clique em "Buscar Dados"</p>
                <div className="mt-4 text-xs space-y-1">
                  <p><strong>Exemplos de códigos válidos:</strong></p>
                  <p>• 33 (Estado do Rio de Janeiro)</p>
                  <p>• 35 (Estado de São Paulo)</p>
                  <p>• 3304557 (Cidade do Rio de Janeiro)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationNames;
