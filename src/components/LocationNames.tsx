
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Loading from './Loading';
import { getNameRankingByLocation } from '@/services/ibgeService';
import { processNameRankingData } from '@/services/nameService';

const LocationNames: React.FC = () => {
  const [selectedUF, setSelectedUF] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [filterType, setFilterType] = useState<'uf' | 'city'>('uf');
  const [customCode, setCustomCode] = useState<string>('');
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>('');

  // Estados com seus códigos corretos
  const states = [
    { code: '11', name: 'Rondônia', uf: 'RO' },
    { code: '12', name: 'Acre', uf: 'AC' },
    { code: '13', name: 'Amazonas', uf: 'AM' },
    { code: '14', name: 'Roraima', uf: 'RR' },
    { code: '15', name: 'Pará', uf: 'PA' },
    { code: '16', name: 'Amapá', uf: 'AP' },
    { code: '17', name: 'Tocantins', uf: 'TO' },
    { code: '21', name: 'Maranhão', uf: 'MA' },
    { code: '22', name: 'Piauí', uf: 'PI' },
    { code: '23', name: 'Ceará', uf: 'CE' },
    { code: '24', name: 'Rio Grande do Norte', uf: 'RN' },
    { code: '25', name: 'Paraíba', uf: 'PB' },
    { code: '26', name: 'Pernambuco', uf: 'PE' },
    { code: '27', name: 'Alagoas', uf: 'AL' },
    { code: '28', name: 'Sergipe', uf: 'SE' },
    { code: '29', name: 'Bahia', uf: 'BA' },
    { code: '31', name: 'Minas Gerais', uf: 'MG' },
    { code: '32', name: 'Espírito Santo', uf: 'ES' },
    { code: '33', name: 'Rio de Janeiro', uf: 'RJ' },
    { code: '35', name: 'São Paulo', uf: 'SP' },
    { code: '41', name: 'Paraná', uf: 'PR' },
    { code: '42', name: 'Santa Catarina', uf: 'SC' },
    { code: '43', name: 'Rio Grande do Sul', uf: 'RS' },
    { code: '50', name: 'Mato Grosso do Sul', uf: 'MS' },
    { code: '51', name: 'Mato Grosso', uf: 'MT' },
    { code: '52', name: 'Goiás', uf: 'GO' },
    { code: '53', name: 'Distrito Federal', uf: 'DF' },
  ];

  // Principais cidades por estado
  const citiesByState = {
    '35': [ // São Paulo
      { code: '3550308', name: 'São Paulo' },
      { code: '3509502', name: 'Campinas' },
      { code: '3518800', name: 'Guarulhos' },
      { code: '3547809', name: 'Santo André' },
      { code: '3552205', name: 'São Bernardo do Campo' },
    ],
    '33': [ // Rio de Janeiro
      { code: '3304557', name: 'Rio de Janeiro' },
      { code: '3301702', name: 'Duque de Caxias' },
      { code: '3303500', name: 'Nova Iguaçu' },
      { code: '3303302', name: 'Niterói' },
    ],
    '31': [ // Minas Gerais
      { code: '3106200', name: 'Belo Horizonte' },
      { code: '3170206', name: 'Uberlândia' },
      { code: '3118601', name: 'Contagem' },
    ],
    '41': [ // Paraná
      { code: '4106902', name: 'Curitiba' },
      { code: '4113700', name: 'Londrina' },
      { code: '4115200', name: 'Maringá' },
    ],
    '43': [ // Rio Grande do Sul
      { code: '4314902', name: 'Porto Alegre' },
    ],
    '42': [ // Santa Catarina
      { code: '4205407', name: 'Florianópolis' },
      { code: '4209102', name: 'Joinville' },
    ],
    '23': [ // Ceará
      { code: '2304400', name: 'Fortaleza' },
    ],
    '29': [ // Bahia
      { code: '2927408', name: 'Salvador' },
    ],
    '53': [ // Distrito Federal
      { code: '5300108', name: 'Brasília' },
    ],
    '26': [ // Pernambuco
      { code: '2611606', name: 'Recife' },
    ],
    '13': [ // Amazonas
      { code: '1302603', name: 'Manaus' },
    ],
  };

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
    let locationCode = '';
    let displayName = '';
    
    if (customCode.trim()) {
      locationCode = customCode.trim();
      displayName = `Código ${locationCode}`;
    } else if (filterType === 'uf' && selectedUF) {
      locationCode = selectedUF;
      const state = states.find(s => s.code === selectedUF);
      displayName = state ? `${state.name} (${state.uf})` : `Estado ${selectedUF}`;
    } else if (filterType === 'city' && selectedCity) {
      locationCode = selectedCity;
      // Encontrar o nome da cidade
      for (const stateCode in citiesByState) {
        const city = citiesByState[stateCode].find(c => c.code === selectedCity);
        if (city) {
          const state = states.find(s => s.code === stateCode);
          displayName = `${city.name} - ${state?.uf}`;
          break;
        }
      }
    }
    
    if (!locationCode) {
      toast.error('Por favor, selecione uma localidade ou informe um código');
      return;
    }
    
    if (!validateLocationCode(locationCode)) {
      toast.error('Código inválido. Use 2 dígitos para UF (11-99) ou 7 dígitos para município');
      return;
    }
    
    setLoading(true);
    setRankingData([]);
    setLocationName('');
    
    try {
      console.log('Fetching data for location:', locationCode);
      const response = await getNameRankingByLocation(locationCode);
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
      setLocationName(displayName);
      toast.success(`Dados carregados com sucesso para ${displayName}`);
      
    } catch (error) {
      console.error('Error fetching location names data:', error);
      toast.error('Erro ao buscar dados. Verifique sua conexão e tente novamente.');
      setRankingData([]);
      setLocationName('');
    } finally {
      setLoading(false);
    }
  };

  const getCitiesForSelectedState = () => {
    return citiesByState[selectedUF] || [];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ranking de Nomes por Localidade</CardTitle>
        <CardDescription>
          Consulte os nomes mais frequentes em uma localidade específica (dados consolidados de todos os períodos)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Tipo de filtro */}
          <div>
            <Label>Tipo de Consulta</Label>
            <RadioGroup 
              value={filterType} 
              onValueChange={(value) => {
                setFilterType(value as 'uf' | 'city');
                setSelectedUF('');
                setSelectedCity('');
                setCustomCode('');
              }}
              className="flex gap-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="uf" id="uf" />
                <Label htmlFor="uf">Por Estado (UF)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="city" id="city" />
                <Label htmlFor="city">Por Cidade</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Seleção de Estado */}
          {filterType === 'uf' && (
            <div>
              <Label htmlFor="state">Estado</Label>
              <Select onValueChange={setSelectedUF} value={selectedUF}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um estado" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name} ({state.uf})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Seleção de Cidade */}
          {filterType === 'city' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="state-for-city">Primeiro selecione o Estado</Label>
                <Select onValueChange={(value) => {
                  setSelectedUF(value);
                  setSelectedCity('');
                }} value={selectedUF}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.filter(state => citiesByState[state.code]).map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name} ({state.uf})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedUF && (
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Select onValueChange={setSelectedCity} value={selectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCitiesForSelectedState().map((city) => (
                        <SelectItem key={city.code} value={city.code}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {/* Campo para código personalizado */}
          <div>
            <Label htmlFor="custom-code">Ou digite um código personalizado</Label>
            <Input
              id="custom-code"
              placeholder="Ex: 33 (RJ) ou 3304557 (Rio de Janeiro)"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div className="text-xs text-gray-500 mt-2">
              <p><strong>Estados:</strong> 2 dígitos (ex: 33 para RJ, 35 para SP)</p>
              <p><strong>Municípios:</strong> 7 dígitos (ex: 3304557 para Rio de Janeiro)</p>
            </div>
          </div>

          {/* Botão de busca */}
          <Button 
            onClick={handleSearch} 
            className="w-full"
            disabled={loading || (!customCode.trim() && !selectedUF && !selectedCity)}
          >
            {loading ? 'Buscando...' : 'Buscar Dados'}
          </Button>
        </div>
        
        <div className="mt-8">
          {loading ? (
            <Loading message="Buscando dados da localidade..." />
          ) : rankingData.length > 0 ? (
            <>
              <h3 className="text-lg font-medium mb-4">
                Ranking de Nomes - {locationName}
              </h3>
              <Table>
                <TableCaption>
                  Ranking dos nomes mais populares na localidade selecionada (dados consolidados)
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
                <p className="text-sm mt-2">Selecione uma localidade para ver o ranking de nomes</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationNames;
