
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  // Opções comuns de localidades
  const locationOptions = [
    { value: '11', label: 'Rondônia (RO)' },
    { value: '12', label: 'Acre (AC)' },
    { value: '13', label: 'Amazonas (AM)' },
    { value: '14', label: 'Roraima (RR)' },
    { value: '15', label: 'Pará (PA)' },
    { value: '16', label: 'Amapá (AP)' },
    { value: '17', label: 'Tocantins (TO)' },
    { value: '21', label: 'Maranhão (MA)' },
    { value: '22', label: 'Piauí (PI)' },
    { value: '23', label: 'Ceará (CE)' },
    { value: '24', label: 'Rio Grande do Norte (RN)' },
    { value: '25', label: 'Paraíba (PB)' },
    { value: '26', label: 'Pernambuco (PE)' },
    { value: '27', label: 'Alagoas (AL)' },
    { value: '28', label: 'Sergipe (SE)' },
    { value: '29', label: 'Bahia (BA)' },
    { value: '31', label: 'Minas Gerais (MG)' },
    { value: '32', label: 'Espírito Santo (ES)' },
    { value: '33', label: 'Rio de Janeiro (RJ)' },
    { value: '35', label: 'São Paulo (SP)' },
    { value: '41', label: 'Paraná (PR)' },
    { value: '42', label: 'Santa Catarina (SC)' },
    { value: '43', label: 'Rio Grande do Sul (RS)' },
    { value: '50', label: 'Mato Grosso do Sul (MS)' },
    { value: '51', label: 'Mato Grosso (MT)' },
    { value: '52', label: 'Goiás (GO)' },
    { value: '53', label: 'Distrito Federal (DF)' },
    { value: '3550308', label: 'São Paulo (Capital - SP)' },
    { value: '3304557', label: 'Rio de Janeiro (Capital - RJ)' },
    { value: '3106200', label: 'Belo Horizonte (MG)' },
    { value: '4106902', label: 'Curitiba (PR)' },
    { value: '4314902', label: 'Porto Alegre (RS)' },
    { value: '2304400', label: 'Fortaleza (CE)' },
    { value: '2927408', label: 'Salvador (BA)' },
    { value: '5300108', label: 'Brasília (DF)' },
    { value: '2611606', label: 'Recife (PE)' },
    { value: '1302603', label: 'Manaus (AM)' },
  ];

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
      toast.error('Por favor, selecione ou informe um código de localidade');
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
      
      // Encontrar o nome da localidade selecionada
      const selectedOption = locationOptions.find(opt => opt.value === trimmedLocation);
      const locationDisplayName = selectedOption 
        ? selectedOption.label 
        : response[0].localidade || `Código ${trimmedLocation}`;
      
      setLocationName(locationDisplayName);
      toast.success(`Dados carregados com sucesso para ${locationDisplayName}`);
      
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

  const handleSelectChange = (value: string) => {
    setLocation(value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ranking de Nomes por Localidade</CardTitle>
        <CardDescription>
          Consulte os três nomes mais frequentes em uma localidade específica (dados consolidados de todos os períodos)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-3">
            <Label htmlFor="location">Código da Localidade</Label>
            <div className="mt-1 space-y-3">
              <Select onValueChange={handleSelectChange} value={location}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um estado ou cidade" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Input
                  id="location"
                  placeholder="Ou digite um código personalizado (ex: 33 ou 3304557)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
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
                  Ranking dos 3 nomes mais populares na localidade selecionada (dados consolidados)
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="w-[80px]">Ranking</TableHead>
                    <TableHead className="text-right w-[120px]">Frequência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankingData[0]?.names.map((nameItem) => (
                    <TableRow key={nameItem.name}>
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
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 border border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-medium">Nenhum dado para exibir</p>
                <p className="text-sm mt-2">Selecione uma localidade no dropdown ou digite um código válido</p>
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
